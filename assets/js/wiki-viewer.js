var search = $('#wiki-search');
var results = $('#results');
var content = $('#content');
var iframe = $('#content');


$(document).ready(function() {

  search.val('');
  blankOutContent();

  $('#search-form').on('submit', function(e) {
    e.preventDefault();
    if (search.val()) {
      wikiSearch();
    }
  });

  $('#random').on('click', function() {
    loadRandomWiki();
  });

});


function loadRandomWiki() {
  var iframe = $('#content');
  var randURL = "https://en.wikipedia.org/wiki/Special:Random";
  iframe.attr('src', randURL);
  iframe.show();
}

function blankOutContent() {
  iframe.hide();
}

function wikiSearch() {
  var searchTerm = search.val();
  var apiString = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
  var callback = '&callback=JSON_CALLBACK';

  $.ajax({
    method: "GET",
    dataType: "jsonp",
    url: apiString + searchTerm + callback
  })
  .done(function(response) {
    console.log(response);
    renderResults(response.query.pages);
  });
}

function renderResults(results) {
  var resultsList = $('#results-list');
  resultsList.empty();
  $.each(results, function(key, value) {
    var card = [
      '<li style="order: ' + results[key].index + ';">',
      '<div class="card" data-page-id=' + results[key].pageid + '>',
      '<h1>' + results[key].title + '</h1>',
      '<p>' + results[key].extract + '</p>',
      '</div>',
      '</li>'
    ].join('');
    $('#results-list').append(card);
  });

  $('.card').on('click', function(e) {
    e.stopPropagation();
    clearSelected();
    var pageId = $(this).attr('data-page-id');
    console.log(pageId);
    viewSelected(pageId);
    $(this).attr('selected', '');
  });

}

function viewSelected(pageId) {
  var page = 'https://en.wikipedia.org/?curid=' + pageId;
  iframe.attr('src', page);
  iframe.show();
}

function clearSelected() {
  $('[selected]').removeAttr('selected');
}
