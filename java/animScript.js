/*(document).ready(function(){
  $window.scroll(function(event){
    var y =$(this).scrollTop();

    if(y >= 50){
    $('div').hide();
    }
  });
});*/

document.addEventListener('DOMContentLoaded',function(){

//var check1 = $(document).getElementById("mp4");
//var check2 = $(".GameDesignSection #mp42");
  $(window).scroll(function(event){
    if($(document).scrollTop() > 660 && $(document).scrollTop() < 1325){
      //alert(check1.eneded);
    //  if(check1.ended){

  //      $(".nav").fadeOut();
      //}
      if($("document").scrollTop() < 660){
      //  $(".nav").fadeIn();
      }
        //alert("yz");
    //  $(".logo").fadeIn();
      //.body.scrollTop(704);

    }
    //var link = "#MicrosoftSection"

    if(document.body.scrollTop < 680 ){


    //  $(".nav").fadeIn();
      /*  alert("zx");
      $('html', 'body').animate({

    }, 1000);
      console.log(document.body.scrollTop);
    }
    */
  //  alert(document.body.scrollTop);
    }
    if (document.body.scrollTop > 500 ) {
      //$(".nav").style.background= "black";

    }
  });
});
