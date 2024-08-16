/* Making api call using fetch, we need to pass request params for post request as example below */

const apiURL = "https://dummyjson.com/users";

//for making get request
fetch(apiURL)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

//for making post request
const requestParams = {
  id: "123",
};

fetch(apiURL, {
  method: "post",
  headers: "content-type: application/json",
  body: JSON.stringify(requestParams),
})
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
