const URL_API = "https://how4-challenge-api.herokuapp.com/";

export const createElement = (path, body) => {
  return fetch(URL_API + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
};

export const readList = (path) => {
  return fetch(URL_API + path, {
    method: "GET",
  }).then((response) => response.json());
};

export const updateElement = (path, body, elementId) => {
  return fetch(URL_API + path + "/" + elementId, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body,
  });
};

export const deleteElement = (path, elementId) => {
  return fetch(URL_API + path + "/" + elementId, {
    method: "DELETE",
  });
};
