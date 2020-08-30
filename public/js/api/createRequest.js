/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  const formData = new FormData;
  xhr.withCredentials = true;
  let dataRequest;

  if (options.responseType) {
    xhr.responseType = options.responseType;
  }

  if (options.method === 'GET') {
    const data = [];
    for (key in options.data) {
      data.push(`${key}=${options.data[key]}`);
    }
    dataRequest = String(`${options.url}?${data[0]}&${data[1]}`);
  } else {
    for (key in options.data) {
      formData.append(key, options.data[key]);
    }
    dataRequest = options.url;
  }
    
  try {
    xhr.open(options.method, dataRequest);
    xhr.send(formData);
  } catch(err) {
    options.callback(err, null);
  }

  xhr.onreadystatechange = function() {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      options.callback(null, xhr.response);
    }
  };
};