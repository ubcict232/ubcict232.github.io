$(document).ready(function(){
	// Data tables
	$(function () {
	  	$('#students').DataTable({
	  		'paging'      : false,
	      'lengthChange': false,
	      'searching'   : true,
	      'ordering'    : false,
	      'info'        : true,
	      'autoWidth'   : false
	  	}),
	  	$('#studentsAd').DataTable({
	  		'paging'      : false,
	      'lengthChange': false,
	      'searching'   : true,
	      'ordering'    : false,
	      'info'        : true,
	      'autoWidth'   : false
	  	}),
	    $('#classes').DataTable({
	      'paging'      : false,
	      'lengthChange': false,
	      'searching'   : true,
	      'ordering'    : false,
	      'info'        : true,
	      'autoWidth'   : false
	    }),
	    $('#classesAd').DataTable({
	      'paging'      : false,
	      'lengthChange': false,
	      'searching'   : true,
	      'ordering'    : false,
	      'info'        : true,
	      'autoWidth'   : false
	    }),
	    $('#exams').DataTable({
	      'paging'      : false,
	      'lengthChange': false,
	      'searching'   : true,
	      'ordering'    : false,
	      'info'        : true,
	      'autoWidth'   : false
	    }),
	    $('#users').DataTable({
	    	'paging'      : false,
	      	'lengthChange': false,
	      	'searching'   : true,
	      	'ordering'    : false,
	      	'info'        : true,
	      	'autoWidth'   : false
	    })
  	})

	 // delete table rows
    $(".delete").click(function(e){
      console.log("delete")
      //send delete request and reload table
      //$(this).parent().fadeOut(1000);
      $(this).parent().remove();
    })

	  //todo
	  // send reuest to server and display first student in the class
	  // redirect is temporary
	$(document).on("click","#classes > tbody > tr", function(e){
	  		window.location="exams.html";
  	})
	  //todo
	  // send reuest to server and display requested student in the class
	  //redirect is temporary
	$(document).on("click","#students > tbody > tr", function(e){
	  		window.location="reports.html";
	})
  //todo
  // send reuest to server and display first student in the class
  // redirect is temporary
  $(document).on("click",".exams > tbody > tr", function(e){
      window.location="assesment.html";
  })
	  
	  // Validation
	$.validate({
	    modules : 'date, security'
	});

    //Date picker
    $('.datepicker').datepicker({
      autoclose: true
    });

    // MODALS

     // there has to be a better way to do this
    $('.userEdit').click(function(){
      //replace variable values with values from server response after sending get request
      var name = "Kgosi",
       surname = "Kenntse",
       userType ="normal",
       username = "Kenntse0365",
       subject = "Computer Studies", 
       classes = "classes";

      // get input fields
        var arr = $("#addUser").find(".form-control")
        var c = 0;
        while(c < arr.length){

          if(arr[c].name == "name"){
            arr[c].value = name;
          }else if(arr[c].name == "surname"){
            arr[c].value = surname;
          }else if(arr[c].name == "username"){
            arr[c].value == username;
          }else if (arr[c].name == "subjects") {

          }else if (arr[c].name == "classes") {
            j = arr[c].children;
            //todo

          }else if (arr[c].name == "userType") {
            j = arr[c].children;
            if(userType == "normal"){
              j[0].outerHTML = "<option class='input' selected = 'selected'>Normal</option>";
            }else{
              j[1].outerHTML = "<option class='input' selected = 'selected'>Admin</option>";
            }
          }
          c++;
        }
        //var pr = $('#addUser > .modal-dialog > .modal-content > .modal-header > .header-title').innerHTML;
        //console.log(pr)
        //$('#addUser > .modal-dialog > .modal-content > .modal-header > .header-title').Text = "Edit User Account";
        $(this).attr("data-toggle","modal");
    })

    // STUDENTS MODAL
    $('.studentEdit').click(function(){
      //replace variable values with values from server response(json format) after sending get request
      var name = "Elias",
       surname = "Bayona",
       gender ="male",
       classes = "3B",
       subjects = "Computer Studies"; // Json list of subjects taken by student

      // get input fields
        var arr = $("#editStudentForm").find(".form-control")
        var c = 0;
        while(c < arr.length){

          if(arr[c].name == "name"){
            arr[c].value = name;
          }else if(arr[c].name == "surname"){
            arr[c].value = surname;
          }else if(arr[c].name == "username"){
            arr[c].value == username;
          }else if (arr[c].name == "subjects") {

          }else if (arr[c].name == "classes") {
            j = arr[c].children;
             //todo
          }
          c++;
        }
        $(this).attr("data-toggle","modal");
    })

    //CLASSES
    $('.modifyClass').click(function(){
      //replace variable values with values from server response(json format) after sending get request
      var name = "1A",
       classTeacher = "Jaindoe";
      // get input fields
        var arr = $("#modifyClassForm").find(".form-control")
        var c = 0;
        while(c < arr.length){

          if(arr[c].name == "name"){
            arr[c].value = name;
          }else if(arr[c].name == "classTeacher"){
            //todo
          }
          c++;
        }
        $(this).attr("data-toggle","modal");
    })

    //Assements
    $('.assesmentEdit').click(function(){
      //replace variable values with values from server response(json format) after sending get request
      var name = "1A",
       date = "Jaindoe",
       paperCount = 3,
       paperWeights = [100,50,100]; //replace with json array
      // get input fields
        var arr = $("#modifyAssementForm").find(".form-control")
        var c = 0;
        while(c < arr.length){

          if(arr[c].name == "name"){
            arr[c].value = name;
          }else if(arr[c].name == "date"){
            //todo
          }else if(arr[c].name == "numberOfPapers"){
            arr[c].value = paperCount;
            var paper = 2;

            while(paperCount > 1){
              $('#papers2').append('<div class="row"><div class="col-xs-2 col-xs-push-2"><label class="control-label">Paper '+paper+'</label></div></div><div class="form-group"><div class="col-xs-2 col-xs-push-3"><label class="control-label">Weight:</label></div><div class="col-xs-4 col-xs-push-2"><input class="form-control input" type="number" name="weight'+paper+'" value="'+paperWeights[paper-2]+'" data-validation="required" data-validation-error-msg="Paper weight required"></div></div>');
              paperCount--;
              paper++;
            }
          }
          c++;
        }
        $(this).attr("data-toggle","modal");
    })

    //assesment papers
    $('.paperCount').change(function(){
      var count = $('.paperCount').val();
      var paper = 2;
      while(count > 1){
        $('.papers').append('<div class="row"><div class="col-xs-2 col-xs-push-2"><label class="control-label">Paper '+paper+'</label></div></div><div class="form-group"><div class="col-xs-2 col-xs-push-3"><label class="control-label">Weight:</label></div><div class="col-xs-4 col-xs-push-2"><input class="form-control input" type="number" name="weight'+paper+'" value="100" data-validation="required" data-validation-error-msg="Paper weight required"></div></div>');
        count--;
        paper++;
      }
    })
    
})