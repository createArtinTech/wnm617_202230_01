/*const makeNFTList = templater (o=>`
 <div>${o.name}</div>
 `); */




const makeNFTList = templater (o=>`
<li class="nft-list-item">
    <a href="#nft-profile-page" class="js-nft-jump" data-id="${o.id}">
        <div class="nft-list-image"><img src="${o.img}" alt=""></div>
        <div class="nft-list-body">
             <div class="NFT-list-name">${o.name}</div>
             <div class="NFT-list-type">Type: ${o.type}</div>
             <div class="NFT-list-category">Category: ${o.category}</div>
        </div>
     </a>
    </li>

`);


const makeUserProfilePage = o => `
    <img src="${o.img}">
    
    <div>
    <h2>${o.name}</h2>
    <h2>${o.address}</h2>
    </div>
    <div>
        <div><strong>Username</strong> @${o.username}</div>
        <div><strong>Email</strong> ${o.email}</div>
        <a href="#signin-page">Log-out<a/>
    </div>

    `;


const makeNFTProfilePage = o => `
    <h2>${o.name}</h2>
    <div>${o.type}</div>
    <div>${o.category}</div>
<a href="#nft-profile-page">Edit<a/>

    `;


const makeNFTProfileDescription = o => `
    <h2>${o.name}</h2>
    <div>${o.type}</div>
    <div>${o.category}</div>
<a href="#nft-profile-page">Edit<a/>

    `;


