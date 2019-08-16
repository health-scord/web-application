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

  execSuper(
    endpoint = "", 
    params = {}, 
    method = "GET", 
    headers = {}, 
    format = true, 
    onError = (err) => console.error("exec error", err)
  ) {
    try {
      if (method === "POST") {
        return superagent
          .post(format ? formatUrl(endpoint) : endpoint)
          .type('form')
          .send(params)
          .on('error', onError)
          // .withCredentials()
          // .set("accept", "json")
          // .set(headers);
      } else if (method === "GET") {
        // return superagent
        //   .post(format ? formatUrl(endpoint) : endpoint)
        //   .send(params)
        //   .withCredentials()
        //   .set("accept", "json");
        return this.exec(endpoint, params, method, format);
      }
    } catch(err) {
      console.error("err 5", err)
    }
  }

  paramsToString(params) {
    let sendParams = "?";
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          sendParams += key + "=" + params[key] + "&";
        }
      }
    return sendParams;
  }

  // exec currently unused
  exec(endpoint, params, method = "GET", format) {
    const newHeaders = new Headers();
    newHeaders.append("Content-Type", "application/json");

    let sendParams = "";
    let fetchParams;
    if (method === "GET") {
      sendParams = this.paramsToString(params);
      fetchParams = { method };
    } else if (method === "POST") {
      fetchParams = {
        method,
        body: JSON.stringify(params),
        headers: newHeaders,
      };
    }

    const fullUrl = format ? formatUrl(endpoint) + sendParams : endpoint + sendParams;

    console.info("FETCH ", method, fullUrl, fetchParams);

    return fetch(fullUrl, fetchParams).then(data => {
      if (!data.ok || data.status === 414) {
        console.error("Fetch error", data.status);
      }

      const jsonData = data.json();
      return jsonData;
    });
  }

  makeRequest(
    endpoint, 
    values, 
    callback, 
    method = "POST", 
    headers = {}, 
    format = true, 
    onError = (err) => console.error("exec/makeRequest error", err)
  ) {
    return new Promise((resolve, reject) => {
      try {
        console.info("exec", this.execSuper, "superagent", superagent)
        this.execSuper(endpoint, values, method, headers, format, onError).then((res, err) => {
          if (err) {
            console.error("err 3", err, res);
  
            if (typeof res !== "undefined") {
              if (res.body !== null) {
                console.error("error body", res.body.errorMessage);
              }
            }

            reject(err);
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
}
