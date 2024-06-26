document.addEventListener('DOMContentLoaded', () => {
  const fetchWordButton = document.getElementById('fetchWord');
  const inputWord = document.getElementById('inputWord');
  const para = document.getElementById('para');
  const imageElement = document.getElementById('IMAGE_ID');

  fetchWordButton.addEventListener('click', async () => {
    const inputValue = inputWord.value.trim();
    if (inputValue) {
      try {
        // Fetch word meaning
        const wordResponse = await fetch(`https://imagefetch.ishtiaqueahmedtoke.workers.dev/api/fetchWordMeaning?input=${inputValue}`);
        const wordData = await wordResponse.json();
        const meaning = wordData[0]?.meanings[0]?.definitions[0]?.definition || 'Meaning not found';
     
        para.textContent = meaning;

        // Fetch image related to the word
        const imageResponse = await fetch(`https://imagefetch.ishtiaqueahmedtoke.workers.dev/api/fetchImage?query=${inputValue}`);
        const imageData = await imageResponse.json();
  
        imageElement.src = imageData.results[0].urls.small_s3;
        imageElement.classList.add('show'); // Ensure the image is shown
       
        // Show modal
        const modal = document.querySelector('.newModal');
        modal.classList.add('View'); // Ensure the modal is shown
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      para.textContent = 'Please enter a word.';
    }
  });
});
