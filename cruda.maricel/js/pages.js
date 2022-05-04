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
         

const RecentPage = async() => {
   
    let {result} = await query({
    type:'recent_nft_locations',
    params:[sessionStorage.userId]
    });
    console.log(result);

    let valid_nfts = result.reduce((r,o)=>{
        o.icon = o.img;
        if(o.lat && o.lng) r.push(o);
        return r;
    },[]);
 /*see lesson 10 part 2 at 0.03.53* - add img and photo in database/
 /*  makeMap("#recent-page .map");*/

    let map_el = await makeMap("#recent-page .map");
    makeMarkers(map_el,valid_nfts)

}

const LandingPage = async() => {

}
const SigninPage = async() => {

}
const SignupPage = async() => {

}
const CategoriesPage = async() => {

}
const ListPage = async() => {
     //destructuring
    let {result:nfts} = await query({
    type:'nfts_by_user_id',
    params:[sessionStorage.userId]
    })
          console.log(nfts)
    $("#list-page .nft-list").html(makeNFTList(nfts));
    
}


const ModalPage = async() => {

}


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


const EditNFTProfilePage = async() => {

}


const AddingNFTPage = async() => {
      query({
        type:'nfts_all',
        params:["user", "pass"]
    }).then(d=>{
        console.log(d)
    })
}

const UserProfilePage = async() => {
     let {result:users} = await query({
    type:'user_by_id',
    params:[sessionStorage.userId]
    })
    let [user] = users;

    console.log(user)

    $("#user-profile-page [data-role='main']").html(makeUserProfilePage(user));
    
}

const EditUserProfilePage = () => {

}

