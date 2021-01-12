let APIURL = '';

switch(window.location.hostname){
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3210';
        break;
    case 'feed-me-recipe-keeper.herokuapp.com':
        APIURL = 'https://feed-me-recipe-keeper.herokuapp.com/'
}

export default APIURL