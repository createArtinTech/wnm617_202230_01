
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
         case "edit-user-profile-page": EditUserProfilePage(); break;
      }
   })


   // FORM SUBMISSIONS
   .on("submit", "#signin-form", function(e) {
      e.preventDefault();
      checkLoginForm();
   })


   // CLICKS
   .on("click", ".js-logout", function() {
      sessionStorage.removeItem("userId");
      checkUserId();
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