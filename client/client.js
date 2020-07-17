const tweetEle = document.querySelector('.tweet')
const form = document.querySelector('form')
const loadingEle = document.querySelector('.loading')
const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/tweet' : 'https://clonetweet4567.herokuapp.com/tweet';
loadingEle.style.display = ''
// call getAllTweets
listAllTweets();
form.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name')
    const content = formData.get('content')
    const data = {
        name,
        content
    }
    form.style.display = 'none';
    loadingEle.style.display = '';


    await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
        .then(new_tweet => {
            form.reset();
            form.style.display = '';
            listAllTweets();
            loadingEle.style.display = 'none';
        }).catch((error) => console.error('Name and content is required', error))


})

function listAllTweets() {
    tweetEle.innerHTML = '';
    fetch(API_URL)
        .then(response => response.json())
        .then(tweets => {
            tweets.reverse();
            tweets.forEach(tweet => {
                const div = document.createElement('div');
                const header = document.createElement('h3')
                header.textContent = tweet.name;
                const contents = document.createElement('p')
                const date = document.createElement('small')

                date.textContent = new Date(tweet.date)
                contents.textContent = tweet.content

                div.appendChild(header)

                div.appendChild(contents)
                div.appendChild(date)


                tweetEle.appendChild(div)
                loadingEle.style.display = 'none';


            })
        }).catch(e => console.error("error in getting data"))

}