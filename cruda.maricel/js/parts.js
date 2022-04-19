/*

const makeNFTList = templater (o=>`
 <div>${o.name}</div>
 `); 

*/

const makeNFTList = templater (o=>`
<li class="nft-list-item">
    <a href="#nft-profile-page">
        <div class="nft-list-image"><img src="${o.img}" alt=""></div>
        <div class="nft-list-body">
             <div class="NFT-list-name">${o.name}</div>
             <div class="NFT-list-type">Type: ${o.type}</div>
             <div class="NFT-list-category">Type: ${o.category}</div>
        </div>
     </a>
    </li>

`);
