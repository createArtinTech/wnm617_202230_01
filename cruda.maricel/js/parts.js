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
        <a href="#landing-page">Log-out<a/>
    </div>
    `;


/*const makeNFTProfilePage = o => `
    <h2>${o.name}</h2>
    <div>${o.type}</div>
    <div>${o.category}</div>
<a href="#nft-profile-page">Edit<a/>

    `;*/


const makeNFTProfileDescription = o => `
    <h2>${o.name}</h2>
    <div>${o.type}</div>
    <div>${o.category}</div>
    `;


const FormControlInput = ({namespace,name,displayname,type,placeholder,value=""}) => {
   return `<div class="form-control">
      <label class="form-label" for="#${namespace}-${name}">${displayname}</label>
      <input data-role="none" class="form-input" type="${type}"  placeholder="${placeholder}" id="${namespace}-${name}" value="${value}">
   </div>`;
}


const FormControlTextarea = ({namespace,name,displayname,placeholder,value=""}) => {
   return `<div class="form-control">
      <label class="form-label" for="#${namespace}-${name}">${displayname}</label>
      <textarea data-role="none" class="form-input" placeholder="${placeholder}" id="${namespace}-${name}">${value}</textarea>
   </div>`;
}


const makeNFTForm = (nft,namespace = "nft-add") => {
  return `
${FormControlInput({
    namespace,
    name:"name",
    displayname:"Name",
    type:"text",
    placeholder:"Type a Name",
    value:nft.name,
})}


${FormControlInput({
    namespace,
    name:"type",
    displayname:"Type",
    type:"text",
    placeholder:"Type a Type",
    value:nft.type,
})}


${FormControlInput({
    namespace,
    name:"category",
    displayname:"Category",
    type:"text",
    placeholder:"Type a Category",
    value:nft.category,
})}


${FormControlTextarea({
    namespace,
    name:"description",
    displayname:"Description",
    placeholder:"Type a Description",
    value:nft.description,
})}
`;
}


const makeUserForm = (user,namespace = "user-edit") => {
  return `
${FormControlInput({
    namespace,
    name:"name",
    displayname:"Name",
    type:"text",
    placeholder:"Type a Name",
    value:user.name,
})}

${FormControlInput({
    namespace,
    name:"username",
    displayname:"Username",
    type:"text",
    placeholder:"Type a Username",
    value:user.username,
})}


${FormControlInput({
    namespace,
    name:"email",
    displayname:"Email",
    type:"text",
    placeholder:"Type an Email",
    value:user.email,
})}
`;
}