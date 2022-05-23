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



const makeUserProfilePage = o => {
    console.log(o)
    return `
    <img src="${o.img}">
    
    <div>
        <h2>${o.name}</h2>
        <h4>${o.address}</h4>
    </div>
    <div>
        <div><strong>Username</strong> @${o.user_name}</div>
        <div><strong>Email</strong> ${o.email}</div>
        <div><a href="#user-settings-page">Settings</a></div>
        <div><a href="#landing-page">Log-out<a/></div>
    </div>
    `;
}


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


const makeNFTPopupBody = o => `
   <div class="display-flex js-nft-jump noclick-children" data-id="${o.id}">
     <div class="nft-list-image"><img src="${o.img}" alt=""></div>
     <div>
        <h2>${o.name}</h2>
        <div>${o.type}</div>
        <div>${o.category}</div>
     </div>
 </div>
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



const SelectOptions = templater(o => `
   <option value="${o.value}" ${o.selected?'selected':''}>${o.text}</option>
`);
const FormSelect = (options,namespace,name,value="") => {
   return `
   <div class="form-select">
      <select id="${namespace}-${name}" data-role="none">
         ${SelectOptions(options.map(o=>({
            ...o,
            ...(o.id==value && {selected: true})
         })))}
      </select>
   </div>`;
}
const FormControlSelect = (options,namespace,name,displayname,value="") => {
   return `<div class="form-control">
      <label class="form-label" for="#${namespace}-${name}">${displayname}</label>
      ${FormSelect(options,namespace,name,value)}
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





const makeNFTListSet = (nfts, target="#list-page .nft-list") => {
   $(".filter-bar").html(makeFilterList(nfts));
   $(target).html(makeNFTList(nfts));
}

const capitalize = s => (s[0]||"").toUpperCase()+s.slice(1);

const filterList = (nfts,type) => {
   let a = [...(new Set(nfts.map(o=>o[type])))];
   return templater(o=>o?`<span data-filter="${type}" data-value="${o}">${capitalize(o)}</span>`:'')(a);
}

const makeFilterList = (nfts) => {
   return `
   <span data-filter="type" data-value="">All</span>
   |
   ${filterList(nfts,'type')}
   |
   ${filterList(nfts,'category')}
   `;
}