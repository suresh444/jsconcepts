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

//simplified version

function simplifiedPromisePolyfill(functionFromCallingMethod) {
  let value = null;
  let onResolve = null;
  let onReject = null;
  function resolve(response) {
    //this method will be called once we get the avluef rom api
    //assigning response from api to local value
    value = response;
    //here Onresolve is a function which can take value as input
    onResolve(value);
  }

  function reject(error) {
    value = error;
    onReject(error);
  }

  this.then = (callback) => {
    //this method will be called first
    onResolve = callback;
    /*
      Here we are returing this so that we can use optional chaing
      prom.then((el) => console.log(el))
      .catch((err) => console.log(err));
      if we dont return then we need to use them as seperately
      prom.then((el) => console.log(el));
      prom.catch((err) => console.log(err));
    */
    return this;
  };
  this.catch = (callback) => {
    onReject = callback;
    return this;
  };

  functionFromCallingMethod(resolve, reject);
}

let prom = new promisePolyfill((resolve, reject) => {
  setTimeout((el) => {
    resolve(2);
  }, 1000);
});
prom.then((el) => console.log(el)).catch((err) => console.log(err));
