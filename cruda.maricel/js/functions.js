

//PROMISE - will start to tun code -- will continue in sequence (start -do not finish right away - also asynchronous code ((of two or more objects or events) not existing or happening at the same time.))

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


const checkData = (exterior_check) => new Promise((resolve, reject)=>{
   let timeout = 0;
   const interior_check = () => {
      timeout++; if(timeout>100) return reject();
      return exterior_check() ? resolve() : setTimeout(interior_check, 10);
}
   interior_check();
});