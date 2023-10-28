import Qs from "qs";
import axios from "axios";

function shouldNotIncludeCredentials(url) {
  return (
    url.indexOf("search-staging") >= 0 ||
    url.indexOf("staging-websites") >= 0 ||
    url.indexOf("search-search-prod") >= 0
  );
}

function get(url, params, headers = undefined, body = {}) {
  var isStaging = shouldNotIncludeCredentials(url);
  if (params && params.params) {
    url = url + "?" + Qs.stringify(params.params);
  }
  return new Promise((success, failure) => {
    axios({
      url: url,
      params: params && params.params,
      responseType: "json",
      withCredentials: isStaging ? false : true,
      headers: { "Content-Type": "application/json", ...headers },
      ...body,
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          success({ data: response.data });
        } else {
          failure({ data: response.data });
        }
      })
      .catch((error) => {
        failure({ data: error });
      });
  });
}

function deleteRequest(url, headers = undefined, body = {}) {
  var isStaging = shouldNotIncludeCredentials(url);

  return new Promise((success, failure) => {
    fetch(url, {
      method: "DELETE",
      cache: "no-cache",
      credentials: isStaging ? undefined : "include",
      headers: { "Content-Type": "application/json", ...headers },
      ...body,
    })
      .then((response) => Promise.all([response.status, response.text()]))
      .then(([status, text]) => {
        return [status, text.length ? JSON.parse(text) : {}];
      })
      .then(([status, response]) => {
        if (status >= 200 && status < 300) {
          success({ data: response });
        } else {
          failure({ data: response });
        }
      });
  });
}

function post(url, data, headers = undefined, body = {}) {
  var isStaging = shouldNotIncludeCredentials(url);

  return new Promise((success, failure) => {
    axios({
      method: "post",
      url: url,
      data: data,
      responseType: "json",
      credentials: isStaging ? undefined : "include",
      headers: { ...headers },
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          success({ data: response.data ?? response });
        } else {
          failure({ data: response.data ?? response });
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          failure({ data: error.response.data });
        } else {
          failure({ data: error });
        }
      });
  });
}

function put(url, params, headers = undefined, body = {}) {
  var isStaging = shouldNotIncludeCredentials(url);
  return new Promise((success, failure) => {
    fetch(url, {
      method: "PUT",
      cache: "no-cache",
      credentials: isStaging ? undefined : "include",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(params),
    })
      .then((response) => {
        return Promise.all([response.status, response.json()]);
      })
      .then(([status, response]) => {
        if (status >= 200 && status < 300) {
          success({ data: response });
        } else {
          failure({ data: response });
        }
      });
  });
}
const defaults = {};

export default {
  get,
  post,
  put,
  delete: deleteRequest,
  defaults: defaults,
};
