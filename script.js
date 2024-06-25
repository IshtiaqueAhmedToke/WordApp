const card = document.querySelector('.newModal');
const button = document.getElementById('fetchWord');
const para = document.getElementById('para');
const imgElement = document.getElementById('IMAGE_ID');
let buttonCounter = 0;

async function fetchWordMeaning() {
  try {
    const input = document.getElementById('inputWord').value.toLowerCase();
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
    const data = await response.json();
    const res = data[0].meanings[0].definitions[0].definition;
    para.textContent = res;

    card.classList.toggle('View');

    if (card.firstChild !== 0) {
      document.querySelector('.input input').classList.add('newViewSearch');
      document.querySelector('.button button').classList.add('newViewButton');
      document.querySelector('.img img').classList.add('show');
    } else {
      document.querySelector('.input input').classList.toggle('newViewSearch');
      document.querySelector('.button button').classList.toggle('newViewButton');
      document.querySelector('.img img').classList.toggle('show');
    }
  } catch (error) {
    console.error(error);
  }
}

async function fetchImage() {
  const url = 'https://api.unsplash.com/search/photos';
  const input = document.getElementById('inputWord').value.toLowerCase();
  const query = `query=${input}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`;

  try {
    const response = await fetch(`${url}?${query}`);
    const data = await response.json();
    const imageSrc = data.results[0].urls.thumb;
    imgElement.src = imageSrc;

    console.log(imageSrc);
  } catch (error) {
    console.error(error);
  }
}

function renderQueue() {
  if (card.firstChild !== 0) {
    para.textContent = '';
    card.classList.remove('View');
    imgElement.src = '';
    imgElement.classList.remove('show');
  }
}

function buttonHandler() {
  renderQueue();
  fetchWordMeaning();
  fetchImage();
}

button.addEventListener('click', buttonHandler);
