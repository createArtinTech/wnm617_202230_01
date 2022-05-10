



const submitNFTAdd = async () => {
	
	let name = $("#nft-add-name").val();
	let	type = $("#nft-add-type").val();
	let category = $("#nft-add-category").val();
	let description = $("#nft-add-description").val();

	console.log({name,type,category,description});

	if(name!="" && type!="" && category!="" && description!="") {
		let  {id,error} = await query({
		type: 'insert_nft',
		params: [sessionStorage.userId,name,type,category,description]
	});

	if(error) throw(error);
	
	sessionStorage.nftId = id;
	history.go(-1);

	} else {
		throw("Not all data present");
	}
}


const submitUserSignup = async () => {
	let username = $("#signup-username").val();
	let email = $("#signup-email").val();
	let password = $("#signup-password").val();
	let password2 = $("#signup-password2").val();
	
	if(username!="" && email!="" && password!="" && password2==password) {
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