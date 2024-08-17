/*
Promises: Promises is gaurantee that something that will happen in future and to make our code async aand to handle tasks after that particular task has completed.

promise.all() : To make multiple api calls we can use promise.all but if one of the api fails whole promise.all wont work it will reject completely if some of the api calls completed also it will ignore all values and goes into catch block to overcome this we need to use promise.allsettled.

promise.allsettled(): This will handle multiple api calls it will ensure that it will get all the data. If one of the api call fails also it will show 'fulfilled' or 'rejected' status

Promise.race(): This method returns the promise as soon as one of the promises in the array is rejected or resolved. 
*/

// Api call usinhg promise
function makeAPIcall(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = () => {
      if (xhr.status >= 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error("Failed to make api call"));
      }
    };
    xhr.onerror = () => reject(new Error("Failed to make api call"));
    xhr.send();
  });
}

makeAPIcall("https://dummyjson.com/users")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));

//making multiple api calls using promise

const usersUrl = "https://dummyjson.com/users";
const productsUrl = "https://dummyjson.com/products";

Promise.all([makeAPIcall(usersUrl), makeAPIcall(productsUrl)])
  .then((response) => {
    console.log(response);
    const [users, products] = response;
  })
  .catch((err) => console.log(err));

Promise.allSettled([makeAPIcall(usersUrl), makeAPIcall(productsUrl)])
  .then((response) => {
    console.log(response);
    response.forEach((el) => {
      console.log(el);
    });
  })
  .catch((err) => console.log(err));

/* output : {
     status: 'fullfilled',
     value: []
   } */
