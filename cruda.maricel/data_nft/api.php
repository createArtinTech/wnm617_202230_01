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
      return makeQuery($c, "SELECT * FROM `userdata` WHERE `id` = ?", $p);

   case "nft_by_id":
      return makeQuery($c, "SELECT * FROM `nftlistdata` WHERE `id` = ?", $p);

   case "location_by_id":
      return makeQuery($c, "SELECT * FROM `locationdata` WHERE `id` = ?", $p);


case "nfts_by_user_id":
      return makeQuery($c, "SELECT * FROM `userdata` WHERE `user_name` = ?", $p);

case "locations_by_nft_id":
      return makeQuery($c, "SELECT * FROM `locationdata` WHERE `nft_id` = ?", $p);


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

$data = json_decode(file_get_contents("php://input"));

echo json_encode(
   makeStatement($data),
   JSON_NUMERIC_CHECK
);