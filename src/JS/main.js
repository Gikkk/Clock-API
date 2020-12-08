// quotes place
const quotes =  document.querySelector(".quotes")
const author = document.querySelector(".quotes__author");

// button
const toggler = document.querySelector(".switch");

// main content 
const mainContent = document.querySelector(".main");

// details 
const year = document.querySelector(".details__year");
const week = document.querySelector(".details__week");
const day = document.querySelector(".details__day");
const timezone = document.querySelector(".details__timezone");

// time place
const abbreviation = document.querySelector(".info__abbreviation");
const city = document.querySelector(".info__city");
const index = document.querySelector(".info__index");
const time = document.querySelector(".info__time");
const greeting =  document.querySelector('.greeting__text');
const dayNightIcon =  document.querySelector('.icon');


// http request function 
function sendHttpRequest(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = 'json';

    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(new Error('Something went wrong!'));
      }
    };

    xhr.onerror = function() {
      reject(new Error('Failed to send request!'));
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
}

// GET request - details
async function getTimezone() {
  try {
    const responseData = await sendHttpRequest(
      'GET',
      "http://worldtimeapi.org/api/ip"
    );

    year.textContent = `${responseData.day_of_year}`
    week.textContent = `${responseData.week_number}`
    day.textContent = `${responseData.day_of_week}`
    timezone.textContent = `${responseData.timezone}`
    abbreviation.textContent = `${responseData.abbreviation}`

  } catch (error) {
    console.log(error);
  }
}

// GET request - location
async function getLocation() {
  try {
    const responseData = await sendHttpRequest(
      'GET',
      'https://freegeoip.app/json/'
    );
    city.textContent = `${responseData.city}, `
    index.textContent = `${responseData.country_code}`

  } catch (error) {
    console.log(error);
  }
}

// GET request - quotes
async function getQuotes() {
  try {
    const responseData = await sendHttpRequest(
      'GET',
      'https://api.quotable.io/random'
    );

    quotes.innerHTML = `
      <section>
        <p class="quotes__text">${responseData.content}</p>
        <p class="quotes__author">${responseData.author}</p>
      </section>
      <button class="quotes__btn" onclick="getQuotes()"><svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M7.188 10.667a.208.208 0 01.147.355l-2.344 2.206a5.826 5.826 0 009.578-2.488l2.387.746A8.322 8.322 0 013.17 14.94l-2.149 2.022a.208.208 0 01-.355-.148v-6.148h6.52zm7.617-7.63L16.978.958a.208.208 0 01.355.146v6.23h-6.498a.208.208 0 01-.147-.356L13 4.765A5.825 5.825 0 003.43 7.26l-2.386-.746a8.32 8.32 0 0113.76-3.477z" fill: #000 fill-rule="nonzero" opacity=".5"/></svg>
      </button>`

      if (responseData.author === null) {
        author.textContent = 'Unknown author'
      } else {
        author.textContent = responseData.author;
      }  
          
  } catch (error) {
    console.log(error);
  }
}

// function of getting time 
function getTime(){
  let currentTime = new Date();
  let hour = currentTime.getHours()
  let minute = currentTime.getMinutes();
  
  if(hour < 10 && minute < 14){
    hour = 0 + `${hour}`;
    minute = 0 + `${minute}`;
    time.textContent = `${hour}:${minute}`
  }else if(hour < 10 && minute < 60){
    hour = 0 + `${hour}`;
    time.textContent = `${hour}:${minute}`
  }else if(hour < 25 && minute < 10){
    minute = 0 + `${minute}`;
    time.textContent = `${hour}:${minute}`
  }else{
    time.textContent = `${hour}:${minute}`
  }

  //Time of day
  let greetText = '';
  if (hour >= 5 && hour <= 11) {
    greetText = 'MORNING';
  } else if (hour >= 12 && hour <= 17) {
    greetText = 'AFTERNOON';
  } 
  else {
    greetText = 'EVENING';
  }

  greeting.textContent = `GOOD ${greetText}, IT'S CURRENTLY`

  // background & icons 
	if (hour >= 5 && hour <= 17 ) {
    mainContent.classList.add('day');
    dayNightIcon.classList.add('rotatable')
		dayNightIcon.src = './src/assets/icons/icon-sun.svg';
		dayNightIcon.setAttribute("alt", "sun icon");
	} else {
		mainContent.classList.add('night');
		dayNightIcon.src = './src/assets/icons/icon-moon.svg';
		dayNightIcon.setAttribute("alt", "moon icon");
	}

  let interval = (60 - (new Date()).getSeconds()) * 1000 + 5;
  setTimeout(getTime,interval)
}

// show more details btn 
function toggleInfo(){
  mainContent.classList.toggle("prop");
  if(toggler.textContent === `More`){
    toggler.textContent = "Less";
  } else if(toggler.innerHTML === "Less"){
    toggler.textContent = "More";
  }
}
toggler.addEventListener("click", toggleInfo);


// calling for functions 
getTimezone();
getLocation();
getQuotes();
getTime();
