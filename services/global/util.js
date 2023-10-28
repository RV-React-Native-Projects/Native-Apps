import _ from "lodash";
export function each(obj, func) {
  if (!obj) {
    return;
  }

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; ++i) {
      func(i, obj[i], obj);
    }
  }

  if (typeof obj === "object" && !Array.isArray(obj)) {
    for (let key in obj) {
      func(key, obj[key], obj);
    }
  }
}

export default {
  each,
  values: _.values,
  clone: _.clone,
};
