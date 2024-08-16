/*Making API call Using plain JS  - XMLHttprequest
-> onLoad: Used to define what should happen when api call is completed.
-> xhr.send(): Used to send the request that have configures with api uri(xhr.open).
-> for get it is simply xhr.send().
-> for post xhr.send(queryParams)
*/


const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://dummyjson.com/users', true);
xhr.onload = function () {
  if (xhr.status >= 200) {
    console.log(JSON.parse(xhr.responseText));
    console.log(JSON.parse(xhr.responseText));
  }
};

xhr.onerror = function() {
  // for handling network error
  console.log(''Request failed);
}
xhr.send();
