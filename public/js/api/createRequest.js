/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  const formData = new FormData;
  xhr.withCredentials = true;

  if (options.responseType) {
    xhr.responseType = options.responseType;
  }

  if (options.method === 'GET') {
    const data = [];
    for (key in options.data) {
      data.push(`${key}=${options.data[key]}`);
    }
    const dataRequest = String(`${options.url}?${data[0]}&${data[1]}`);
    try {
      xhr.open(options.method, dataRequest);
      // xhrHeader();
      xhr.send();
    } catch(err) {
      options.callback(err, null);
    }

  } else {
    for (key in options.data) {
      formData.append(key, options.data[key]);
    }
    try {
      xhr.open(options.method, options.url);
      // xhrHeader();
      xhr.send(formData);
    } catch(err) {
      options.callback(err, null);
    }
  }

  // function xhrHeader() {
  //   if (options.headers !== undefined) {
  //     for (let header in options.headers) {
  //       xhr.setRequestHeader(header, options.headers[header]);
  //     }
  //   }
  // }

  xhr.onreadystatechange = function() {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      options.callback(null, xhr.response);
    }
  };

  return xhr;
};