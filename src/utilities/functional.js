export const compose = (...functions) => args =>
  functions.reduceRight((arg, fn) => fn(arg), args);

// currify the reduce function
export const reduce = cb => arr => arr.reduce(cb);

// currify the map function
export const map = cb => arr => arr.map(cb);

// currify the filter function
export const filter = cb => arr => arr.filter(cb);

export const trace = msg => passover => {
  console.log(msg, passover);
  return passover;
};
