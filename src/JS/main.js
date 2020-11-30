const quotes =  document.querySelector(".quotes")

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

async function getTime() {
  try {
    const responseData = await sendHttpRequest(
      'GET',
      "http://worldtimeapi.org/api/ip"
    );
    console.log(responseData.utc_offset);
    console.log(responseData.datetime);
    console.log(responseData.day_of_week);
    console.log(responseData.week_number);
    console.log(responseData.day_of_year);
    console.log(responseData.timezone);
  } catch (error) {
    console.log(error);
  }
}

async function getLocation() {
  try {
    const responseData = await sendHttpRequest(
      'GET',
      'https://freegeoip.app/json/'
    );
    console.log(responseData.country_code);
    console.log(responseData.city);    
  } catch (error) {
    console.log(error);
  }
}

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

      const author = document.querySelector(".quotes__author");
      if (responseData.author === null) {
        author.textContent = 'Unknown author'
      } else {
        author.textContent = responseData.author;
      }  
          
  } catch (error) {
    console.log(error);
  }
}

getTime();
getLocation();
getQuotes();
