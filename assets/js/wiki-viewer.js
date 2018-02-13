var search = $('#wiki-search');
var results = $('#results');
var content = $('#content');


$(document).ready(function() {

  $('#random').on('click', function() {
    loadRandomWiki();
  });

  $('#copyright').on('click', function() {
    blankOutContent();
  })

});


function loadRandomWiki() {
  var iframe = $('#content');
  var randURL = "https://en.wikipedia.org/wiki/Special:Random";
  console.log("random article");
  iframe.attr('src', randURL);
  iframe.show();
}

function blankOutContent() {
  var iframe = $('#content');
  iframe.hide();
}
