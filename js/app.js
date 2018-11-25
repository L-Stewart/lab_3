'use strict';

const allHorn = [];
const keys = [];

function Horn (obj){
  this.title = obj.title;
  this.image_url = obj.image_url;
  this.description = obj.description;
  this.keyword = obj.keyword;
  
  allHorn.push(this);
};

Horn.prototype.render = function () {
  $('main').append('<section id="picture"></section>');
  let $picture = $('section[id="picture"]');
  let picTemplate = $('#photo-template').html();

  $picture.html(picTemplate);
  $picture.find('h2').text(this.title);
  $picture.find('img').attr({
    src: this.image_url,
    id: this.keyword
});
  $picture.find('p').text(this.description);
  
  $picture.removeClass('picture');
  $picture.attr('id', this.title);

};

Horn.prototype.optionMenu = function () {
  if( keys.indexOf( this.keyword ) === -1 ){
    $('select').append('<option class = "option"></option>');
    let $option = $('option[class="option"]');

    $option.attr('value', this.keyword);
    $option.text(this.keyword);

    $option.removeClass('option');

    keys.push(this.keyword);
  }
};

const arrClear = function(){
  for(let i = allHorn.length; i > 0; i--){
    allHorn.pop();
    // console.log(allHorn);
  }
  for(let i = keys.length; i > 0; i--){
    keys.pop();
    // console.log(keys);
  }
};


//selecting box filtering
$('select[name="horn_creatures"]').on('change', function() {
  let $selection = $(this).val();

  if($selection === 'default') {
    $('h2').show()
    $('img').show()
    $('p').show()
    // $('section').show()
    return;
  }

  $('h2').hide()
  $('img').hide()
  $('p').hide()
  // $('section').hide()
  $(`img[id="${$selection}"]`).show()
});

$('#json2').click(function(){
    $.get('./data/page-2.json', 'json')
    .then(arrClear())
    .then(data =>{
        data.forEach(hornObj =>{
          new Horn(hornObj);
        })
      })
    .then($( 'main' ).empty())
    .then($('select').empty())
    .then($('select').append('<option value="default">Filter by keyword</option>'))
    .then($('#json1').attr('id', 'json2'))
    .then(() => {allHorn.forEach(horn => {
        horn.render();
        horn.optionMenu();
      })
    })
});

$('#json1').click(function(){
  $.get('./data/page-1.json', 'json')
  .then(arrClear())
  .then(data =>{
      data.forEach(hornObj =>{
        new Horn(hornObj);
      })
    })
  .then($( 'main' ).empty())
  .then($('select').empty())
  .then($('select').append('<option value="default">Filter by keyword</option>'))
  .then($('#json2').attr('id', 'json1'))
  .then(() => {allHorn.forEach(horn => {
      horn.render();
      horn.optionMenu();
    })
  })
});


function readJson () {
  $.get('./data/page-1.json', 'json')
  .then(data =>{
    data.forEach(hornObj =>{
      new Horn(hornObj);
    })
  })
  .then(() => {allHorn.forEach(horn => {
    horn.render();
    horn.optionMenu();
  })
})
};

$(() => readJson());
