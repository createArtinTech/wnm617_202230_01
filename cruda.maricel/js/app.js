
$(() => {
   checkUserId();

   // EVENT DELEGATION
   $(document)


   .on("pagecontainerbeforeshow", function(event, ui){
      console.log(ui.toPage[0].id)

      //PAGE ROUTING

      switch(ui.toPage[0].id) {
         case "recent-page": RecentPage(); break;
         case "list-page": ListPage(); break;

         case "user-profile-page": UserProfilePage(); break;
         case "user-edit-page": UserEditPage(); break;
         case "user-edit-photo-page": UserEditPhotoPage(); break;         


         case "nft-profile-page": NFTProfilePage(); break;
         case "nft-edit-page": NFTEditPage(); break;
         case "nft-add-page": NFTAddPage(); break;
         case "nft-edit-photo-page": NFTEditPhotoPage(); break;         

         case "choose-nft-page": ChooseNFTPage(); break;
         case "choose-location-page": ChooseLocationPage(); break;

         //case "signin-page": SigninPage(); break;
         //case "signup-page": SignupPage(); break;
         //case "landing-page": LandingPage(); break; not existing
         //case "list-add-nft-modal": ModalPage(); break; not existing
         //case "categories-page": CategoriesPage(); break; not existing
         //case "adding-nft-page": AddingNFTPage(); break; duplicate
         //case "edit-NFT-profile-page": EditNFTProfilePage(); break; not existing
         //case "nft-profile-description": NFTProfileDescription(); break;
         //case "edit-user-profile-page": EditUserProfilePage(); break; not existing

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


   .on("submit", "#list-search-form", function(e) {
      e.preventDefault();
      let s = $(this).find("input").val();
      checkSearchForm(s);
   })



     // FORM SUBMISSION CLICKS
   .on("click", ".js-submit-nft-add", function() {
      submitNFTAdd();
     /* sessionStorage.removeItem("userId");
      checkUserId();*/
   })

   .on("click", ".js-submit-nft-edit", function() {
      submitNFTEdit();
   })

   .on("click", ".js-submit-user-edit", function() {
      submitUserEdit();
   })

   .on("click", ".js-submit-location-add", function() {
      submitLocationAdd();
   })




   .on("change", "#choose-nft-input select", function(e) {
      $("#location-nft").val(this.value);
   })


   .on("change",".imagepicker input", function(e){
      checkUpload(this.files[0])
      .then(d=>{
         console.log(d)
         let filename = `uploads/${d.result}`;
         $(this).parent().prev().val(filename)
         $(this).parent().css({
            "background-image":`url(${filename})`
         }).addClass("picked");
      })
   })

   .on("click", ".js-submit-nft-upload", function(e) {
      let image = $("#nft-edit-photo-image").val();
      query({
         type: "update_nft_image",
         params: [image, sessionStorage.nftId]
      }).then(d=>{
         if(d.error) throw(d.error);
         history.go(-1);
      })
   })

   .on("click", ".js-submit-user-upload", function(e) {
      let image = $("#user-edit-photo-image").val();
      query({
         type: "update_user_image",
         params: [image, sessionStorage.userId]
      }).then(d=>{
         if(d.error) throw(d.error);
         history.go(-1);
      })
   })


   .on("click", "[data-filter]", function(e) {
      let {filter,value} = $(this).data();
      if(value=="") ListPage();
      else checkFilter(filter,value);
   })






   // CLICKS
   .on("click", ".js-logout", function() {
      sessionStorage.removeItem("userId");
      checkUserId();
   })

   .on("click", ".js-nft-jump", function(e) {
      try {
         e.preventDefault();
         sessionStorage.nftId = $(this).data('id');
         $.mobile.navigate("#nft-profile-page");
      } catch(e) {
         console.log("No id detected");
      }
   })

 .on("click",".js-nft-delete", function(e) {
      submitDeleteNFT();
   })
   .on("click",".js-location-choose-nft", function(e) {
      $("#location-nft").val(sessionStorage.nftId)
      $("#location-start").val(-2);
   })



   .on("click", ".nft-profile-nav>div", function(e) {
      let id = $(this).index();
      $(this).parent()
      .next().children().eq(id)
      .addClass("active")
      .siblings().removeClass("active")
       $(this).addClass("active")
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
        console.log($(".nav-icon-set li"))  /* 5-22-2022 */
         $(`.nav-icon-set li:nth-child(${i})`).addClass("active");
      }
   });

});