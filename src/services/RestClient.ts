// const methods = ['get', 'post', 'put', 'patch', 'del'];
import fetch from "cross-fetch";
import superagent from "superagent";

// get endpoint in proper format
function formatUrl(path) {
  let pathBase = "";

  pathBase = process.env.SERVER_URL;

  const adjustedPath = path[0] !== "/" ? "/" + path : path;
  const formattedUrl = pathBase + adjustedPath;

  return formattedUrl;
}

export default class RestClient {
  constructor() {}

  makeRequest(endpoint, values, callback, method = "POST", headers = {}, format = true) {
    return new Promise((resolve, reject) => {
      try {
        this.execSuper(endpoint, values, method, headers, format).end((err, res) => {
          if (err) {
            console.error(err);
  
            if (typeof res !== "undefined") {
              if (res.body !== null) {
                console.error(res.body.errorMessage);
              }
            }
          }
          callback(err, res);
          resolve(res);
        });
      } catch (err) {
        console.error("ERROR 2001: ", err);
        reject(err);
      }
    });
  }

  execSuper(endpoint, params, method = "GET", headers = {}, format = true) {
    if (method === "POST") {
      return superagent
        .post(format ? formatUrl(endpoint) : endpoint)
        .type('form')
        .send(params)
        // .withCredentials()
        // .set("accept", "json")
        // .set(headers);
    }
  }

  // exec currently unused
  exec(endpoint, params, method = "GET") {
    const newHeaders = new Headers();
    newHeaders.append("Content-Type", "application/json");

    let sendParams = "";
    let fetchParams;
    if (method === "GET") {
      sendParams += "?";
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          sendParams += key + "=" + params[key] + "&";
        }
      }
      fetchParams = { method };
    } else if (method === "POST") {
      fetchParams = {
        method,
        body: JSON.stringify(params),
        headers: newHeaders,
      };
    }

    const fullUrl = formatUrl(endpoint) + sendParams;

    console.info("FETCH ", method, fullUrl, fetchParams);

    return fetch(fullUrl, fetchParams).then(data => {
      if (!data.ok || data.status === 414) {
        console.error("Fetch error", data.status);
      }

      const jsonData = data.json();
      return jsonData;
    });
  }
}
