"use strict";
$(function() {
  var testContent = {
      title:  'Тест по физике',
      question: [
            {
              content:'Что называется инерцией?',
              variants: [
                    'состояние покоя',
                    'вращение на месте',
                    'равномерное прямолинейное движение',
                    'движение по наклонной плоскости'
                    ],
              answers:  [true, false, true, false]
            },
            {
              content:'Движения бывают?',
              variants: [
                    'поступательные',
                    'переменные',
                    'беспрерывные',
                    'вращательные'
                    ],
              answers:  [true, false, false, true]
            },
            {
              content:'Сила-это?',
              variants: [
                    'величина векторная',
                    'механическая величина',
                    'физическая величина, характеризующая взаимодействие тел',
                    'биофизическая величина'
                    ],
              answers:  [true, false, true, false]
            }
        ]
    };


var testStorage = JSON.stringify(testContent);    //transform test in JSON-format
localStorage.setItem("testContent", testStorage); //write test in local storage
testStorage = localStorage.getItem("testContent");//read test from local storage
testContent = JSON.parse(testStorage);            //parsing data from JSON-format
 
 var sumRes = [ ];                       //result signature 
 var sumTest = [ ];                      //test signature
 var sumN = [ ];                         //quantity mistakses
 var $modal;
 var $overlay;
 
 // Text in modal window
 var text1 = 'Выбраны все правильные ответы.';
 var text2 = 'Выбранo не правильныx ответов.'; 
 var text3 = 'Не выбрано ни одного правильного ответа.';
 var textModal = [ ];                        
 var flag = 0;                                    //flag for text4
 var $body = $('body');
 var $result = $('.submit');                      // button "test result"
 var $qLength = testContent.question.length;        //quantity of questions

 
//append data to html-page
var test = $('#test').html();                      
var contentTest = tmpl(test, {data: testContent});  
$('.form__wrapper').append(contentTest);           


  // Click-on button "test result"
$('.submit').click (function(e) {
  e.preventDefault();
  flag = 0;
  testProcessing();
  showModal();
});


//Test processing        
function testProcessing() {  
 for (var i = 0; i < $qLength; i++) {
 var answersTest = testContent.question[i].answers;  
 var answersUser = [false, false, false, false];     
 sumRes[i] = 0;
 sumTest[i] = 0;
 sumN[i] = 0;
 var $check = [ ];
   for (var j = 0; j < testContent.question[i].variants.length; j++) {
     var ind = '#check'+ i + j;
     $check[j] = $(ind);
     if ($check[j].prop('checked')) {
      answersUser[j] = true;
     };
     if (answersTest[j]) {
      sumTest[i]++;
     };
     if ((answersTest[j] & answersUser[j])) {
      sumRes[i]++;
     } else {
      sumN[i]++; 
     };
   };
  console.log('answersUser', answersUser);
  console.log('answersTest', answersTest);
 };
  console.log('sumRes', sumRes);
  console.log('sumTest', sumTest);
  for (var i = 0; i < $qLength; i++) {
    if (!sumRes[i]) {
      textModal[i] = text3;
    } else if (sumRes[i] === sumTest[i]) {
        textModal[i] = text1;
        flag++;
        } else {
          textModal[i] = 'Выбранo правильныx ответов - ' + sumRes[i] + '.';
        };
  };
};
   
function showModal(){
    var $overlay = $('<div class="modal__overlay"></div>');
    var $modal = $('<div class="modal"></div>');
    
    $body.append($overlay);
    $overlay.append($modal);
    $modal.append('<h4 class ="modal__title">Результаты теста:</h4>');
    $modal.append('<ol class="modal__list"></ol>');
    for (var i = 0; i < $qLength; i++) {
      var contentItem = '<li class ="modal__item">'+ textModal[i] + '</h4>';
      $('.modal__list').append(contentItem);
      };
     if (flag == $qLength) {
        $('.modal__list').after('<p class="modal__congr">Поздравляем! Вы прошли тест.</p>');
     };
     $modal.append('<a href="#" class="button__close">Закрыть</a>');

     $('.button__close').one('click', hideModal);
  }


//Close modal Window + uncheck chekcboxs
function hideModal(e) {
    e.preventDefault();
    $('.modal').remove();
    $('.modal__overlay').remove();
    $('input[type=checkbox]').prop('checked', false);
  }


});

