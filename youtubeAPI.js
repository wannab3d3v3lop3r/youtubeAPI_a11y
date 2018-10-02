const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback, failed){
    const settings = {
        url: YOUTUBE_SEARCH_URL,
        data: {
            q: `${searchTerm} in:name`,
            part: "snippet",
            key: "AIzaSyC68NGJp8YjxtvckrxeRGQ3JvCf3E4MJVU",
            maxResults: 32
        },
        dataType: "json",
        type: "GET",
        success: callback,
        error: failed
        };
        $.ajax(settings);
}

function displayNumberOfResults(result){
    let total = $('.total-results');
    let resultLength = $(result.items).length;

    total.append(`<p>Number of Results: ${resultLength}`);
}

function renderResult(result){
    return `
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}"  target="_blank"><img alt=${result.snippet.title} src="${result.snippet.thumbnails.medium.url}"/></a>
  `;
}

function displayYouTubeSearchData(data) {
    const results = data.items.map((item, index) => renderResult(item));
    $('.js-search-results').html(results);

    displayNumberOfResults(data);
    
  }

function errorMsg(){
    const errorMessage = `<p>Sorry, there was no results<p>`;

    $('.js-search-results').html(errorMessage);
}

function watchSubmit(){
    $('.js-search-form').submit(event => {
        event.preventDefault();
        const numberOfResult = $('.total-results');
        const queryTarget = $(event.currentTarget).find('.js-query');
        const query = queryTarget.val();

        numberOfResult.empty();
        queryTarget.val("");
        getDataFromApi(query, displayYouTubeSearchData, errorMsg); 
    })
}

$(watchSubmit);