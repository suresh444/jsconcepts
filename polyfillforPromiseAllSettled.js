/* 
Promise.allSettled will return everything if one of the promise fails also
o/p : [{status: fulfilled, value: []}, {status:rejected, reason: "api failed"}]
*/

const usersUrl = "https://dummyjson.com/users";
const productsUrl = "https://dummyjson.com/products";

function makeApiCall(url) {
  return fetch(url).then((res) => res.json());
}

Promise.allSettledPolyfill = (promises) => {
  let results = [];
  let totalPromises = promises.length;
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          totalPromises--;
          results[index] = { status: "fulFilled", value: res };
          if (totalPromises === 0) {
            resolve(results);
          }
        })
        .catch((err) => {
          results[index] = { status: "rejected", reason: err };
          if (totalPromises === 0) {
            resolve(results);
          }
        });
    });
  });
};

Promise.allSettledPolyfill([
  makeApiCall(usersUrl),
  makeApiCall(productsUrl),
]).then((res) => console.log(res));

Promise.allSettled([makeApiCall(usersUrl), makeApiCall(productsUrl)]).then(
  (res) => console.log(res)
);
