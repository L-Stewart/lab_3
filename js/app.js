'use strict';

const allHorn = [];
const keys = [];

function Horn (obj){
  this.title = obj.title;
  this.image_url = obj.image_url;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns
  
  allHorn.push(this);
};

Horn.prototype.toHtml = function () {
  let templateHtml = $('#horns-template').html();
  let hornTemplate = Handlebars.compile(templateHtml);
  let newHornTemplate = hornTemplate(this);
  
  return newHornTemplate;
};

function renderToPage () {
  allHorn.forEach(newHorns => {
  $('main').append(newHorns.toHtml())
});
};

Horn.prototype.optionMenu = function () {
  if( keys.indexOf( this.keyword ) === -1 ){
    $('#filter').append('<option class = "option"></option>');
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

const clearRender = function() {
  $('main').empty();
  allHorn.forEach(horn => { 
    horn.optionMenu();
  })
}

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

$('select[name="sort_creatures"]').on('change', function() {
  let $selection = $(this).val();

  if ($selection === 'default') {
    arrClear();
    readJson();
    clearRender();
    renderToPage();
  } else if ($selection === 'sort_title') {
    allHorn.sort(function(a, b) {
      var nameA = a.title.toUpperCase(); 
      var nameB = b.title.toUpperCase(); 
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    clearRender();
    renderToPage();
  } else if ($selection === 'sort_num_horns') {
    allHorn.sort(function(a, b) {
      var hornNumA = a.horns;
      var hornNumB = b.horns;
      if(hornNumA < hornNumB) {
        return -1;
      }
      if (hornNumA > hornNumB) {
        return 1;
      }
      return 0;
    })
    clearRender();
    renderToPage();
  }
})

$('#json2').click(function() {
    $.get('./data/page-2.json', 'json')
    .then(arrClear())
    .then(data => {
        data.forEach(hornObj => {
          new Horn(hornObj);
        })
      })
    .then($( 'main' ).empty())
    .then($('select').empty())
    .then($('select').append('<option value="default">Filter by keyword</option>'))
    .then($('#json1').attr('id', 'json2'))
    .then(() => {
        renderToPage();
        allHorn.forEach(horn => { 
        horn.optionMenu();
      })
    })
});

$('#json1').click(function(){
  $.get('./data/page-1.json', 'json')
  .then(arrClear())
  .then(data => {
      data.forEach(hornObj => {
        new Horn(hornObj);
      })
    })
  .then($( 'main' ).empty())
  .then($('select').empty())
  .then($('select').append('<option value="default">Filter by keyword</option>'))
  .then($('#json2').attr('id', 'json1'))
  .then(() => {
      renderToPage();
      allHorn.forEach(horn => {
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
  .then(() => {
    renderToPage();
    allHorn.forEach(horn => {
    horn.optionMenu();
  })
})
};

$(() => readJson());


