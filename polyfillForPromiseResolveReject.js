/*
   In polyfill code below it will execute differently for async code and synchronous code, in promise below if setTimeout or api call is used
    .then() callback function will be called first if there is no setTimout reolve() method will be called first .
    
    In onResolve the code that is written in .then will be set and whatever the data passed to onresolve(value) will be passed to callback function

    we are checking isfullfilled and called to avoid errors that will occur running synchronous code as onresolve will be undefined to overcome that if condition has been written
*/

function promisePolyfill(executor) {
  let onResolve, onReject;
  let isFulfilled = false,
    called = false,
    promiseValue;

  function resolve(value) {
    isFulfilled = true;
    promiseValue = value;
    if (typeof onResolve === "function") {
      onResolve(value);

      called = true;
    }
  }

  function reject(value) {
    onReject(value);
  }

  this.then = (callback) => {
    onResolve = callback;
    if (isFulfilled && !called) {
      onResolve(promiseValue);
    }
    return this;
  };

  this.catch = (callback) => {
    onReject = callback;
    return this;
  };

  executor(resolve, reject);
}

let prom = new promisePolyfill((resolve, reject) => {
  setTimeout((el) => {
    resolve(2);
  }, 1000);
});
prom.then((el) => console.log(el));
