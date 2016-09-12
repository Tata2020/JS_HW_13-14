;"use strict";
$(function() {
$.getJSON('data_test.js', {}, function (data) {
       var testContent = data;
      console.log('testContent', testContent);  
    });

 var testStorage = JSON.stringify(testContent);
 localStorage.setItem("testContent", testStorage);
 testStorage = localStorage.getItem("testContent");
 testContent = JSON.parse(testStorage);
 
var $body = $('body');
var test = $('#test').html();
var contentTest = tmpl(test, {data: testContent});

$('.form__wrapper').append(contentTest);




// button "test result"
 var $result = $('input[type=submit]');
 
 //Test processing
 var answersUser = [false, false, false, false];

 for (var i = 0; i < i < testContent.question.length; i++) {
   for (var j = 0; j < testContent.question[i].variants.length; j++) {
    var check = $('.list:list__item .list__item:eq(j) input[type=checkbox]').prop('checked');
    console.log ('i=', i);
    console.log ('j=', j);
    console.log ('check=', check);

   };
 };

 //Click "test result"
 $result.click(function(e) {        
        e.preventDefault();

       $result.on('click', showModal); 
      });
//console.log($('input[type=checkbox]'));

function showModal(e) {
    var $modal = $('<div class="modal"></div>');
    var $overlay = $('<div class="modal__overlay"></div>');
    e.preventDefault();
    
    $body.append($overlay);
    $body.append($modal);
    $overlay.one('click', hideModal);
  }


//Close modal Window + uncheck chekcboxs
function hideModal() {
    $modal.remove();
    $overlay.remove();
    $('input[type=checkbox]').prop('checked', false);
  }
});
