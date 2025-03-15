//Race: It will return the promise as soon as one of the promise is resolved or rejected.
//Any: It will return the promise only if one of the promise if fullfilled
Promise.polyfillrace = (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach((prom) => {
      Promise.resolve(prom).then(resolve).catch(reject);
    });
  });
};
Promise.polyfillAny = (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach((prom) => {
      Promise.resolve(prom).then(resolve);
    });
  });
};

Promise.promiseRacePolyfill([makeApiCall(usersUrl), makeApiCall(productsUrl)])
  .then((el) => {
    console.log(el);
  })
  .catch((err) => console.log(err));
