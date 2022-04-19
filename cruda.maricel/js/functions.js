

//PROMISE - will start to tun code -- will continue in sequence (start -do not finish right away)
const query = (options) => {
   return fetch('data_nft/api.php',{
      method:'POST',
      body:JSON.stringify(options)
   }).then(d=>d.json());
}


 //Curried Function
const templater = f => a =>
  	(Array.isArray(a)?a:[a])
 	 .reduce((r,o,i,a)=>r+f(o,i,a),'');