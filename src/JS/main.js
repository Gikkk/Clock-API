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

async function getQoutes() {
  try {
    const responseData = await sendHttpRequest(
      'GET',
      'https://type.fit/api/quotes'
    );
    console.log(responseData[0].text);
    console.log(responseData[0].author);
    
  } catch (error) {
    console.log(error);
  }
}

getTime();
getLocation();
getQoutes();