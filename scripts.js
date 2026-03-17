1)

const obj = {
  name: "Suresh",
  getName() {
    return () => {
      console.log(this.name);
    };
  }
};

obj.getName()();
// o/p : The arrow function captures this from the getname, which is obj...when we immediately call returned 
// arrow function (obj.getName()()) it logs obj.name

2)

getName() {
  return function() {
    console.log(this.name);
  };
}

obj.getName()(); 
// o/p : undefined (or error in strict mode)
// because a normal function this depends on how it is called.

const fn = obj.getName;
fn()(); //undefined
// calliong fn() means getname is no longer bound to obj
