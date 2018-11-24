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

function readJson() {
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
}

$(() => readJson());
