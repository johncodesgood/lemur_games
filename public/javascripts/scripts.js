function lemurPeak1(){
  var lemlem = $("<img class='lemlem' src='/images/tiger.png'>");
  $('body').append(lemlem);
  lemlem.css( {bottom:'-50%'});
  // lemlem.css( {transform: 'rotate(0.5turn)'});
  lemlem.css( {left: (Math.random()*25)+'%'});
  lemlem.delay(Math.random()*10000).animate({bottom: '-1em'}, 5000);
}

function lemurPeak2(){
  var lemlem = $("<img class='lemlem' src='/images/elephant.png'>");
  $('body').append(lemlem);
  lemlem.css( {bottom:'-50%'});
  // lemlem.css( {transform: 'rotate(0.5turn)'});
  lemlem.css( {left: (25+Math.random()*25)+'%'});
  lemlem.delay(Math.random()*10000).animate({bottom: '-1em'}, 5000);
}

function lemurPeak3(){
  var lemlem = $("<img class='lemlem' src='/images/cartoon_zebra_T.png'>");
  $('body').append(lemlem);
  lemlem.css( {bottom:'-50%'});
  // lemlem.css( {transform: 'rotate(0.5turn)'});
  lemlem.css( {left: (50+Math.random()*25)+'%'});
  lemlem.delay(Math.random()*10000).animate({bottom: '-1em'}, 5000);
}


function lemurPeak4(){
  var lemlem = $("<img class='lemlem' src='/images/toy_kangaroo-555px.png'>");
  $('body').append(lemlem);
  lemlem.css( {bottom:'-50%'});
  // lemlem.css( {transform: 'rotate(0.5turn)'});
  lemlem.css( {left: (75+Math.random()*25)+'%'});
  lemlem.delay(Math.random()*10000).animate({bottom: '-1em'}, 5000);
}

function lemurPeak5(){
  var lemlem = $("<img class='lemlem' src='/images/bird.png'>");
  $('body').append(lemlem);
  lemlem.css( {top:'-50%'});
  lemlem.css( {transform: 'rotate(0.5turn)'});
  lemlem.css( {left: (50+Math.random()*25)+'%'});
  lemlem.delay(Math.random()*10000).animate({top: '-1em'}, 5000);
}


$(function(){
  lemurPeak1();
  lemurPeak2();
  lemurPeak3();
  lemurPeak4();
  lemurPeak5();
})
