'use strict';

const allHorn = [];
const keys = [];

function Horn (obj){
  this.title = obj.title;
  this.image_url = obj.image_url;
  this.description = obj.description;
  this.keyword = obj.keyword;
  
  allHorn.push(this);
}
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

}

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

//selecting box filtering
$('select[name="horn_creatures"]').on('change', function() {
  let $selection = $(this).val();

  if($selection === 'default') {
    $('div').show();
    return;
  }

  $('h2').hide()
  $('img').hide()
  $('p').hide()
  $(`img[id="${$selection}"]`).show()
})

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
}

$(() => readJson());
