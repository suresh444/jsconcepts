// async/await is used to make our asynchronous , asysnc/await interally has promises
// once js finds await it will pause the execution of await function until it is resolved and it goes on executing next line
// we cannot declare multiple async in one function we can have multiple awaits
// we cannot have await without async but if it is of module type (<script type="module">)

async function makeApiCall() {
  try {
    console.log("started api call");
    const data = await fetch(url);
    console.log("1");
    if (!data.response) {
      console.log("err9r");
    }
    const res = await data.json();
    console.log(data);
  } catch {
    console.log("Error");
  }
}
