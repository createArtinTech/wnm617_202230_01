


const submitNFTAdd = async () => {
	let name = $("#nft-add-name").val();
	let	type = $("#nft-add-type").val();
	let category = $("#nft-add-category").val();
	let description = $("#nft-add-description").val();
	/*let image = $("#nft-add-image-url").val();*/

	console.log({name,type,category,description});

	if(name!="" && type!="" && category!="" && description!="") {
		let  {id,error} = await query({
		type: 'insert_nft',
		params: [
			sessionStorage.userId,
			name,
			type,
			category,
			description,
			/*image==='' ? 'https://via.placeholder.com/400/?text=NFT' : image*/
			/*img==='' ? 'https://crudacreativeart.tech/aau/wnm617/cruda.maricel/img/categories/originals/azuki.png' : image*/
			]
			
	});

	if(error) throw(error);
	
	sessionStorage.nftId = id;
	history.go(-1);

	} else {
		throw("Not all data present");
	}
}



const submitNFTEdit = async () => {
   let name = $("#nft-edit-name").val();
   let type = $("#nft-edit-type").val();
   let category= $("#nft-edit-category").val();
   let description = $("#nft-edit-description").val();

   let {result,error} = await query({
      type: 'update_nft',
      params: [name,type,category,description,sessionStorage.nftId]
   });

   if(error) throw(error);

   history.go(-1);
}

const submitDeleteNFT = async () => {
   let {result,error} = await query({
      type: 'delete_nft',
      params: [sessionStorage.nftId]
   });

   if(error) throw(error);
   history.go(-1);
}




const submitUserSignup = async () => {
	let username = $("#signup-username").val();
	let email = $("#signup-email").val();
	let password = $("#signup-password").val();
	let password2 = $("#signup-password2").val();

	if (password2!=password) {
		throw("Passwords don't match");
	} else
	{
		if(username!="" && email!="" && password!="") {
			let  {id,error} = await query({
			type: 'insert_user',
			params: [username,email,password]
		});

			if(error) throw(error);

			sessionStorage.userId = id;
			$.mobile.navigate("#list-page");
		} else {
			throw("Not all data present");
		}
}	
}

const submitUserEdit = async () => {
	let name = $("#user-edit-name").val();
	let user_name = $("#user-edit-username").val();
	let email = $("#user-edit-email").val();

	console.log({name,user_name,email})  

	//let {id,error} = await query({
	let {result,error} = await query({
		type: 'update_user',
		params: [name,user_name,email, sessionStorage.userId]
	});

	if(error) throw(error);
	history.go(-1);
}



const submitLocationAdd = async () => {
   let nft = $("#location-nft").val();
   let lat = $("#location-lat").val();
   let lng = $("#location-lng").val();
   let description = $("#location-description").val();

   let {result,error} = await query({
      type: 'insert_location',
      params: [nft,lat,lng,description]
   });

   if(error) throw(error);

   history.go(+$("#location-start").val());
}



const checkSearchForm = async (s) => {
   let {result:nfts,error} = await query({
      type: 'search_nfts',
      params: [s, sessionStorage.userId]
   });

   if(error) throw(error);

   makenftListSet(nfts);
}
const checkFilter = async (f,v) => {
   let {result:nfts,error} = await query({
      type: 'filter_nfts',
      params: [f, v, sessionStorage.userId]
   });

   if(error) throw(error);

   makeNFTListSet(nfts);
}