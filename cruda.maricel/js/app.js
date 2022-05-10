
$(() => {
   checkUserId();

   // EVENT DELEGATION
   $(document)


   .on("pagecontainerbeforeshow", function(event, ui){
      console.log(ui.toPage[0].id)

      //PAGE ROUTING

      switch(ui.toPage[0].id) {
         case "recent-page": RecentPage(); break;
         case "landing-page": LandingPage(); break;
         case "signin-page": SigninPage(); break;
         case "signup-page": SignupPage(); break;
         case "categories-page": CategoriesPage(); break;
         case "list-page": ListPage(); break;
         case "list-add-nft-modal": ModalPage(); break;
         case "nft-profile-page": NFTProfilePage(); break;
         case "edit-NFT-profile-page": EditNFTProfilePage(); break;
         case "adding-nft-page": AddingNFTPage(); break;
         case "user-profile-page": UserProfilePage(); break;
         case "user-edit-page": UserEditPage(); break;
         case "edit-user-profile-page": EditUserProfilePage(); break;
         case "nft-profile-description": NFTProfileDescription(); break;
         case "nft-edit-page": NFTEditPage(); break;
         case "nft-add-page": NFTAddPage(); break;
         
      }
   })


   // FORM SUBMISSIONS
   .on("submit", "#signin-form", function(e) {
      e.preventDefault();
      checkLoginForm();
   })



     .on("submit", "#signup-form", function(e) {
      e.preventDefault();
      submitUserSignup();
   })



     // FORM SUBMISSION CLICKS
   .on("click", ".js-submit-nft-add", function() {
      submitNFTAdd();
     /* sessionStorage.removeItem("userId");
      checkUserId();*/
   })



   // CLICKS
   .on("click", ".js-logout", function() {
      sessionStorage.removeItem("userId");
      checkUserId();
   })

   .on("click", ".js-nft-jump", function() {
      try {
         //e.preventDefault();
         sessionStorage.nftId = $(this).data('id');
         //$.mobile.navigate("#nft-profile-page");
      } catch(e) {
         console.log("No id detected");
      }
   })



   .on("click", ".nft-profile-nav>div", function(e) {
      let id = $(this).index();
      $(this).parent()
      .next().children().eq(id)
      .addClass("active")
      .siblings().removeClass("active")
       $(this)
      .addClass("active")
      .siblings().removeClass("active")
   })


   // ACTIVATE TOOLS
   .on("click", "[data-activate]", function() {
      let target = $(this).data("activate");
      $(target).addClass("active")
   })
   .on("click", "[data-deactivate]", function() {
      let target = $(this).data("deactivate");
      $(target).removeClass("active")
   })
   .on("click", "[data-toggle]", function() {
      let target = $(this).data("toggle");
      $(target).toggleClass("active")
   })
   .on("click", "[data-activateone]", function() {
      let target = $(this).data("activateone");
      $(target).addClass("active")
         .siblings().removeClass("active")
   })

   ;

   $("[data-template]").each(function(){
      let target = $(this).data("template");
      $(this).html($(target).html())
   });

   [,"#recent-page","#list-page","#user-profile-page"].forEach((p,i)=>{
      if(window.location.hash === p) {
         console.log($(".nav-icon-set li"))
         $(`.nav-icon-set li:nth-child(${i})`).addClass("active");
      }
   });

});