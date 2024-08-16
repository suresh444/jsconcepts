
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://dummyjson.com/users', true);
xhr.onload = function () {
  if (xhr.status >= 200) {
    console.log(JSON.parse(xhr.responseText));
    console.log(JSON.parse(xhr.responseText));
  }
};
xhr.send();
