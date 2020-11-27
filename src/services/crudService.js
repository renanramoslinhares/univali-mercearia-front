const URL_API = process.env.VUE_APP_BACKEND_URL;

export const createElement = (path, body) =>
  fetch(URL_API + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((result) => result.json());

export const readData = (path) =>
  fetch(URL_API + path, {
    method: "GET",
  }).then((response) => response.json());

export const updateElement = (path, body, elementId) =>
  fetch(URL_API + path + "/" + elementId, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((response) => response.json());

export const deleteElement = (path, elementId) =>
  fetch(URL_API + path + "/" + elementId, {
    method: "DELETE",
  }).then((response) => response.json());
