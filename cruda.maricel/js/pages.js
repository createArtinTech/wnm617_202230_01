//query({
// type:'check_signin',
//    params:["user", "pass"]
//  }).then(d=>{
//       console.log(d)
//   })


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

*/

// Connection to database //

const RecentPage = () => {
    query({
        type:'locations_all',
        params:["user", "pass"]
    }).then(d=>{
        console.log(d)
    })


    
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
    query({
        type:'users_all',
        params:["user", "pass"]
    }).then(d=>{
        console.log(d)
    })

}


const EditUserProfilePage = () => {

}