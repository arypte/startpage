const QUOTES = 'quotes';

function getTime() {
  const time = document.querySelector('.time');

  const newDate = new Date();

  const hours = String(newDate.getHours()).padStart(2, '0');
  const minutes = String(newDate.getMinutes()).padStart(2, '0');
  const seconds = String(newDate.getSeconds()).padStart(2, '0');

  if (seconds.toString().length === 1) {
    seconds = '0' + seconds;
  }

  // time.innerText = hours + ":" + minutes + ":" + seconds;
  time.innerText = `${hours} : ${minutes} : ${seconds}`;
}

getTime();
setInterval(getTime, 1000);

function getQuotes() {
  const quotesMsg = document.querySelector('.quotesMsg');
  let savedQuotes = localStorage.getItem(QUOTES);

  if (!savedQuotes) {
    localStorage.setItem(QUOTES, JSON.stringify(['1', '2', '3', '4']));

    savedQuotes = localStorage.getItem(QUOTES);
  }

  let quotesArray = JSON.parse(savedQuotes);

  quotesMsg.innerText =
    quotesArray[Math.floor(Math.random() * quotesArray.length)];
}

getQuotes();
setInterval(getQuotes, 3000);

function onClicksel() {
  const selQuotes = document.querySelector('.selQuotes');
  selQuotes.style.display = 'inline-block';
}

function onClickManage(value) {
  if (value) {
    const newQuotes = document.querySelector('.newQuotes');
    newQuotes.style.display = 'inline-block';
  } else {
    const delQuotes = document.querySelector('.delQuotes');
    delQuotes.style.display = 'inline-block';
  }
  const selQuotes = document.querySelector('.selQuotes');
  selQuotes.style.display = 'none';
}

function onClickRegist() {
  const quotesMsg = document.querySelector('.quotesMsg');
  const newQuotes = document.querySelector('.newQuotes');
  const newQuotesInput = document.querySelector('.newQuotesInput');

  if (!newQuotesInput.value) {
    return;
  }

  let savedQuotes = localStorage.getItem(QUOTES);

  let quotesArray = JSON.parse(savedQuotes);
  quotesArray.push(newQuotesInput.value);

  localStorage.setItem(QUOTES, JSON.stringify(quotesArray));

  quotesMsg.innerHTML = `<span style="color:red;">${newQuotesInput.value}</span>`;
  newQuotes.style.display = 'none';
}

function showDelQuotes() {
  const delQuotes = document.querySelector('.delQuotes');
  const delQuotesSelect = delQuotes.querySelector('.delQuotesSelect');

  let savedQuotes = localStorage.getItem(QUOTES);
  let quotesArray = JSON.parse(savedQuotes);

  while (delQuotesSelect.firstChild) {
    delQuotesSelect.removeChild(delQuotesSelect.firstChild);
  }

  for (let i = 0; i < quotesArray.length; i++) {
    const option = document.createElement('option');
    option.value = quotesArray[i];
    option.text = quotesArray[i];
    delQuotesSelect.appendChild(option);
  }

  delQuotesSelect.selectedIndex = 0;

  delQuotes.style.display = 'inline-block';
}

function onClickDel() {
  const quotesMsg = document.querySelector('.quotesMsg');
  const delQuotes = document.querySelector('.delQuotes');
  const delQuotesSelect = delQuotes.querySelector('.delQuotesSelect');
  const selectedQuote = delQuotesSelect.value;

  let savedQuotes = localStorage.getItem(QUOTES);
  let quotesArray = JSON.parse(savedQuotes);

  quotesArray = quotesArray.filter((quote) => quote !== selectedQuote);
  localStorage.setItem(QUOTES, JSON.stringify(quotesArray));
  getQuotes();

  delQuotes.style.display = 'none';
}

let isLoading = false;

async function onClickSearch() {
  // async 비동기 , await 사용하기 위해
  const searchInput = document.querySelector('.searchInput');
  const searchResult = document.querySelector('.searchResult');

  if (!searchInput.value) return;
  if (!isLoading) return;

  isLoading = true;
  const question = searchInput.value;

  searchInput.value = '검색 중 입니다... 잠시만 기다려주세요.';

  // 프론트엔드에서 백엔드로 보내는 소스
  const response = await axios.post(
    /* get 요청 post 요청.
    백엔드에서 post요청을 받게 설정을 해둬서 post로
    await 잠시 기다려달리
    */
    'https://holy-fire-2749.fly.dev/chat',
    {
      question,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer BLOCKCHAINSCHOOL3',
      },
    }
  );

  if (response.status == 200) {
    searchResult.style.display = 'inline';
    searchResult.innerText = response.data.choices[0].message.content;
  }

  searchInput.value = '';
  isLoading = false;
}

function onClickToggle(value) {
  const nft = document.querySelector('.nft');
  const nftView = document.querySelector('.nftView');

  if (value) {
    nft.style.display = 'inline-block';
    nftView.style.display = 'none';
  } else {
    nft.style.display = 'none';
    nftView.style.display = 'inline-block';
  }
}

const API_KEY = '9812c310627f5f1d4cf052d4df4a947e';

const weatherIcon = document.querySelector('.weatherIcon');
const weatherTemp = document.querySelector('.weatherTemp');

navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    console.log(url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        weatherTemp.innerText =
          data.name + ',' + parseInt(data.main.temp) + 'C';

        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      });
  },

  () => alert('Now allowed')
);

// 화살표함수 , 일반함수는 완전히 같진않다.
// 쿼리스트링?
