/* 
Below code has two api Urls
Function makeAPIcall takes uri as input and makes api call
Promise.All rejeccts the whole promise if one of it fails also


*/

const usersUrl = "https://dummyjson.com/users";
const productsUrl = "https://dummyjson.com/products";

function makeApiCall(apiUrl) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl);
    xhr.onload = () => {
      if (xhr.status >= 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error("Failed to load"));
      }
    };
    xhr.onerror = () => resolve("Failed");
    xhr.send();
  });
}

Promise.promisePolyfill = (promises) => {
  let results = [];
  var totalPromises = promises.length;

  return new Promise((resolve, reject) => {
    promises.forEach((prom, index) => {
      Promise.resolve(prom).then((res) => {
        results[index] = res;
        totalPromises--;
        if (totalPromises === 0 && res !== "Failed") {
          resolve(results);
        } else if (res === "Failed") {
          reject(new Error("Unable to Fulfill"));
        }
      });
    });
  });
};

Promise.promisePolyfill([makeApiCall(usersUrl), makeApiCall(productsUrl)])
  .then((el) => {
    console.log(el);
  })
  .catch((err) => console.log(err));
