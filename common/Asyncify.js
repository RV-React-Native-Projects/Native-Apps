export default function asyncify(object) {
  const asyncObject = {};
  for (const f in object) {
    if (typeof object[f] !== "function") {
      continue;
    }
    asyncObject[f] = (...args) => {
      return new Promise((resolve) => {
        object[f].bind(object)(
          ...args,
          (response) => {
            resolve([null, response]);
          },
          (error) => {
            resolve([error, null]);
          }
        );
      });
    };
  }
  return asyncObject;
  return new Proxy(object, {
    get(target, name) {
      console.log("Target : ", name);

      if (!object[name]) {
        throw new Error("No such function ");
      }

      return (...args) => {
        return new Promise((resolve) => {
          const newargs = args.slice(0, args.length - 2);
          object[name](
            ...newargs,
            (response) => {
              resolve([null, response]);
            },
            (error) => {
              resolve([error, null]);
            }
          );
        });
      };
    },
  });
}
