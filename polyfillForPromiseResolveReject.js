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
