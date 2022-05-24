/*query({
type:'check_signin',
params:["user2", "pass"]
}).then(d=>{
      console.log(d)
})
*/

/*{
    query({
        type:'users_all',
        params:["user", "pass"]
    }).then(d=>{
        console.log(d)
    })
}
 query({
        type:'nfts_all',
        params:["user", "pass"]
    }).then(d=>{
        console.log(d)
    })




    query({
        type:'nfts_all',
        params:["user", "pass"]
    }).then(d=>{
        console.log(d)
    })



query({
        type:'users_all',
        params:["user", "pass"]
    }).then(d=>{
        console.log(d)
    })


query({
        type:'nfts_by_user_id',
        params:[sessionStorage.userId]
    }).then(d=>{
        console.log(d)
    })


    const RecentPage = () => {
    let {result:nfts} = await query({
        type:'recent_nft_locations',
        params:[sessionStorage.userId]
    })
        console.log(result)

*/


 /*  let {result} = await query({
        type:'recent_nft_locations',
        params:[sessionStorage.userId]
    });
        console.log(result); */

//let {result} = await query({
//    type:'recent_nft_locations',
//    params:[sessionStorage.userId]
//    });
//         console.log(result); 


// Connection to database //
 // console.log(window.google)


    //destructuring

 /*let {result:nfts} = await query({
        type:'nfts_by_user_id',
        params:[sessionStorage.userId]
    })

         console.log(nfts)
    $("#list-page .nft-list").html(makeNFTList(nfts));*/

/*see lesson 10 part 2 at 0.03.53* - add img and photo in database/
 /*  makeMap("#recent-page .map");*/    

const RecentPage = async() => {
   
    let {result,error} = await query({
    type:'recent_nft_locations',
    params:[sessionStorage.userId]
    });
    console.log(result);

    if(error) throw(error);

    let valid_nfts = result.reduce((r,o)=>{
        o.icon = o.img;
        if(o.lat && o.lng) r.push(o);
        return r;
    },[]);

   /* console.log([...valid_nfts])*/
 

    let map_el = await makeMap("#recent-page .map");
    makeMarkers(map_el,valid_nfts)

    map_el.data("markers").forEach((m,i)=>{
        console.log(m)
        m.addListener("click",function(e){
            let nft = valid_nfts[i];

            console.log(nft)

            //just to navigate
            //sessionStorage.nftId = nft.nft_id;
            //$.mobile.navigate("#nft-profile-page");


            //open Google INfoWindow
            //map_el.data("infoWindow")
            //.open(map_el.data("map"),m);
            //map_el.data("infoWindow")
            //.setContent(makeNFTPopupBody(nft));


            $("#map-drawer")
                .addClass("active")
                .find(".modal-body")
                .html(makeNFTPopupBody({...nft,id:nft.nft_id}))
        })
    })

}

const ListPage = async() => {
     //destructuring
    let {result:nfts} = await query({
    type:'nfts_by_user_id',
    params:[sessionStorage.userId]
    })
          console.log(nfts)
   
  /*$("#list-page .nft-list").html(makeNFTList(nfts));*/
    makeNFTListSet(nfts);
}


/* USER PROFILE PAGE */

const UserProfilePage = async() => {

    let {result:users} = await query({
        type:'user_by_id',
        params:[sessionStorage.userId]
    })

    let [user] = users;

    console.log(user)

    $("#user-profile-page [data-role='main']").html(makeUserProfilePage(user));

}


const UserEditPage = async() => {
    let {result:users} = await query({
        type:'user_by_id',
        params:[sessionStorage.userId]
    })
    let [user] = users;

    /*$("#user-nft-edit-form").html(makeUserForm(user,"user-edit"))*/
    $("#user-edit-form").html(makeUserForm(user,"user-edit"))
}


const UserEditPhotoPage = async () => {
   let {result:users} = await query({
      type:'user_by_id',
      params:[sessionStorage.userId]
   })
   let [user] = users;

   $("#user-edit-photo-page .imagepicker").css({
      "background-image":`url(${user.img})`
   })
}



/* NFT PROFILE PAGE */


const NFTProfilePage = async() => {

    let {result:nfts} = await query({
            type:'nft_by_id',
            params:[sessionStorage.nftId]
        })

    let [nft] = nfts;
    $(".nft-profile-top").css({"background-image":`url(${nft.img})`})
    $("#nft-profile-page h1").html(nft.name)
    $(".nft-profile-description").html(makeNFTProfileDescription(nft));

    let {result:locations} = await query({
        type:'locations_by_nft_id',
        params:[sessionStorage.nftId]

    })
    console.log(locations)

    let map_el = await makeMap("#nft-profile-page .map");
    makeMarkers(map_el,locations)

}


const NFTEditPage = async() => {
    let {result:nfts} = await query({
            type:'nft_by_id',
            params:[sessionStorage.nftId]
        })
    let [nft] = nfts;
    $("#nft-edit-form").html(makeNFTForm(nft,"nft-edit"))
}

const NFTAddPage = async() => {
    let {result:nfts} = await query({
            type:'nft_by_id',
            params:[sessionStorage.nftId]
        })
    let [nft] = nfts;
    $("#nft-add-form").html(makeNFTForm({},"nft-add"))
}

const NFTEditPhotoPage = async () => {
   let {result:nfts} = await query({
      type:'nft_by_id',
      params:[sessionStorage.nftId]
   })
   let [nft] = nfts;

   $("#nft-edit-photo-page .imagepicker").css({
      "background-image":`url(${nft.img})`
   })
}



/*
const AddingNFTPage = async() => {
      query({
        type:'nfts_all',
        params:["user", "pass"]
    }).then(d=>{
        console.log(d)
    })
}
*/


const ChooseNFTPage = async () => {
   let {result:nfts} = await query({
      type:'nfts_by_user_id',
      params:[sessionStorage.userId]
   });

   $("#location-nft").val(nfts[0]?.id);
   $("#location-start").val(-3);

   $("#choose-nft-input").html(FormSelect(
      nfts.map(o=>({value:o.id,text:o.name})),
      'choose-nft',
      'select',
      'Choose nft',
      ''
   ));
}


/* Choose Location Page */

const ChooseLocationPage = async () => {
   let map_el = await makeMap("#choose-location-page .map");

   map_el.data("map").addListener("click",function(e){
      console.log(e)
      $("#location-lat").val(e.latLng.lat())
      $("#location-lng").val(e.latLng.lng())
      makeMarkers(map_el,[e.latLng])
   })
}

/*
const SigninPage = async() => {
}
const SignupPage = async() => {
}*/