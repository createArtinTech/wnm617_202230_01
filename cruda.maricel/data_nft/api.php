<?php

function makeConn() {
   include_once "auth.php";
   try {
      $conn = new PDO(...Auth());
      $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      return $conn;
   } catch(PDOException $e) {
      die('{"error":"'.$e->getMessage().'"}');
   }
}


// $r = PDO result
function fetchAll($r) {
   $a = [];
   while($row = $r->fetch(\PDO::FETCH_OBJ)) $a[] = $row;
   return $a;
}


/*
$c = connection
$ps = prepared statement
$p = parameters
*/
function makeQuery($c,$ps,$p,$makeResults=true) {
   try {
      if(count($p)) {
         $stmt = $c->prepare($ps);
         $stmt->execute($p);
      } else {
         $stmt = $c->query($ps);
      }

      $r = $makeResults ? fetchAll($stmt) : [];

      return [
         //"statement"=>$ps,
        // "params"=>$p,
         "result"=>$r
      ];
   } catch(PDOException $e) {
      return ["error"=>"Query Failed: ".$e->getMessage()];
   }
}



function makeUpload($file,$folder) {
   $filename = microtime(true) . "_" . $_FILES[$file]['name'];

   if(@move_uploaded_file(
      $_FILES[$file]['tmp_name'],
      $folder.$filename
   )) return ["result"=>$filename];
      else return [
         "error"=>"File Upload Failed",
         "filename"=>$filename
      ];
}


function makeStatement($data) {
   $c = makeConn();
   $t = $data->type;
   $p = $data->params;

switch($t) {

   case "users_all":
      return makeQuery($c, "SELECT * FROM `userdata`", $p);

   case "nfts_all":
      return makeQuery($c, "SELECT * FROM `nftlistdata`", $p);

   case "locations_all":
      return makeQuery($c, "SELECT * FROM `locationdata`", $p);

   case "user_by_id":
      return makeQuery($c, "SELECT `name`,`address`,`email`,`user_name`,`img` FROM `userdata` WHERE `id` = ?", $p);
      /*return makeQuery($c, "SELECT `id`,`name`,`email`,`address`,`username` FROM `userdata` WHERE `id` = ?", $p);*/

   case "nft_by_id":
      return makeQuery($c, "SELECT * FROM `nftlistdata` WHERE `id` = ?", $p);

   case "location_by_id":
      return makeQuery($c, "SELECT * FROM `locationdata` WHERE `id` = ?", $p);

   case "nfts_by_user_id":
      return makeQuery($c, "SELECT * FROM `nftlistdata` WHERE `user_id` = ?", $p);

   case "locations_by_nft_id":
      return makeQuery($c, "SELECT * FROM `locationdata` WHERE `nft_id` = ?", $p);


//JOINING DATA

   case "recent_nft_locations":
   return makeQuery($c, "SELECT *
      FROM `nftlistdata` a
/*      RIGHT JOIN ( */
      JOIN (
         SELECT lg.*
         FROM `locationdata` lg
         WHERE lg.id = (
            SELECT lt.id 
            FROM `locationdata` lt
            WHERE lt.nft_id = lg.nft_id 
            ORDER BY lt.date_create DESC 
            LIMIT 1
            )
        ) l 
      ON a.id = l.nft_id 
      WHERE a.user_id = ?
      ORDER BY l.nft_id, l.date_create DESC 
      ", $p);


/* INSERT SECTION */

   case "insert_user":
//      $r = makeQuery($c,"SELECT id FROM `userdata` WHERE `user_name` = ? OR `email` = ?",$p);

      $r = makeQuery($c,"SELECT id FROM `userdata` WHERE `user_name` = ? OR `email` = ?", [ $p[0], $p[1] ]);

      if(count($r['result'])) return ["error"=>"Username or Email already exists"];

      makeQuery($c,"INSERT INTO 
      `userdata`
      (`user_name`,`email`,`password`,`img`,`member_since`)
      VALUES 
      (?, ?, md5(?), 'https://via.placeholder.com/400/?text=USER', NOW())
      ", $p, $false);
      return ["id"=>$c->lastInsertId()];


   case "insert_nft":
      makeQuery($c,"INSERT INTO 
      `nftlistdata`
      (`user_id`,`name`,`type`,`category`,`description`,`img`,`date_create`)
      VALUES 
      (?, ?, ?, ?, ?, 'https://via.placeholder.com/400/?text=NFT', NOW())
      ", $p, $false);
      return ["id"=>$c->lastInsertId()];


   case "insert_location":
      makeQuery($c,"INSERT INTO 
      `locationdata`
      (`nft_id`,`lat`,`lng`,`description`,`photo`, `icon`,`date_create`)
      VALUES 
      (?, ?, ?, ?, 'https://via.placeholder.com/400/?text=PHOTO', 'https://via.placeholder.com/400/?text=ICON', NOW())
      ", $p, $false);
      return ["id"=>$c->lastInsertId()];






/* UPDATE SECTION */

   case "update_user":
      $r = makeQuery($c,"UPDATE
         `userdata`
         SET 
            `name` = ?,
            `user_name` = ?,
            `email` = ?
         WHERE `id` = ?
         ",$p,false);
      if(isset($r['error'])) return $r;
      return ["result"=>"Success"];


   case "update_password":
         $r = makeQuery($c,"UPDATE
            `userdata`
            SET
               `password` = md5(?)
            WHERE `id` = ?
            ",$p,false);
         if(isset($r['error'])) return $r;
         return ["result"=>"Success"];

   case "update_nft":
         $r = makeQuery($c,"UPDATE
            `nftlistdata`
            SET
               `name` = ?,
               `type` = ?,
               `category` = ?,
               `description` = ?
            WHERE `id` = ?
            ",$p,false);
         if(isset($r['error'])) return $r;
         return ["result"=>"Success"];

   case "update_location":
         $r = makeQuery($c,"UPDATE
            `locationdata`
            SET
               `description` = ?
            WHERE `id` = ?
            ",$p,false);
         if(isset($r['error'])) return $r;
         return ["result"=>"Success"];




 /* UPLOAD */

      case "update_user_image":
         $r = makeQuery($c,"UPDATE
            `userdata`
            SET `img` = ?
            WHERE `id` = ?
            ",$p,false);
         if(isset($r['error'])) return $r;
         return ["result"=>"Success"];

      case "update_nft_image":
         $r = makeQuery($c,"UPDATE
            `nftlistdata`
            SET `img` = ?
            WHERE `id` = ?
            ",$p,false);
         if(isset($r['error'])) return $r;
         return ["result"=>"Success"];


 /* DELETE */

      case "delete_nft":
         $r = makeQuery($c,"DELETE FROM
            `nftlistdata`
            WHERE `id` = ?
            ",$p,false);
         if(isset($r['error'])) return $r;
         return ["result"=>"Success"];


   case "check_signin":
      return makeQuery($c, "SELECT id from `userdata` WHERE `user_name` = ? AND `password` = md5(?)", $p);

      default:
      return ["error"=> "No Matched Type"];
   }
} 

/*
"SELECT * FROM userdata",
"SELECT * FROM userdata WHERE id = ?",
"SELECT * FROM nftlistdata WHERE user_id = ?",
"SELECT * FROM locationdata WHERE user_id = ?",
*/


if(!empty($_FILES)) {
   $r = makeUpload("image","../uploads/");
   die(json_encode($r));
}


$data = json_decode(file_get_contents("php://input"));

echo json_encode(
   makeStatement($data),
   JSON_NUMERIC_CHECK
);