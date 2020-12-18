// quotes place
const quotes =  document.querySelector(".quotes")
const author = document.querySelector(".quotes__author");

// button
const toggler = document.querySelector(".switch");

// main content 
const mainContent = document.querySelector(".main");

// details 
const countryCode = document.querySelector(".details__code");
const ipAddress = document.querySelector(".details__ip");
const detailsCountryName = document.querySelector(".details__CountryName");
const timezone = document.querySelector(".details__timezone");

// time place
const city = document.querySelector(".info__city");
const countryName = document.querySelector(".info__country");
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
      <button class="quotes__btn" onclick="getQuotes()"><img class="quotes__btn--text" src="./assets/icons/icon-refresh.svg" alt="refresh"></button>`

      if (responseData.author === null) {
        author.textContent = 'Unknown author'
      } else {
        author.textContent = responseData.author;
      }  
          
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
    countryName.textContent = `${responseData.country_name}`
    timezone.textContent = `${responseData.time_zone}`
    detailsCountryName.textContent = `${responseData.country_name}`
    ipAddress.textContent = `${responseData.ip}`
    countryCode.textContent = `${responseData.country_code}`

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
		dayNightIcon.src = './assets/icons/icon-sun.svg';
    dayNightIcon.setAttribute("alt", "sun icon");
	} else {
		mainContent.classList.add('night');
		dayNightIcon.src = './assets/icons/icon-moon.svg';
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
getLocation();
getQuotes();
getTime();

