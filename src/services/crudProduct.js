import {
  createElement,
  readData,
  updateElement,
  deleteElement,
} from "./crudService.js";

export const createProduct = (form) =>
  createElement("produto", {
    st_inativo: form.isActive,
    no_produto: form.name,
    qt_estoque: Number(form.amount),
    de_produto: form.description,
  });

export const readProducts = () =>
  readData("produto").then((response) =>
    response.map((element) => ({
      id: element.id_produto,
      name: element.no_produto,
      amount: element.qt_estoque,
      description: element.de_produto,
      isActive: element.st_inativo,
    }))
  );

export const updateProduct = (form, elementId) =>
  updateElement(
    "produto",
    {
      st_inativo: form.isActive,
      no_produto: form.name,
      qt_estoque: Number(form.amount),
      de_produto: form.description,
    },
    elementId
  );

export const deleteProduct = (elementId) => deleteElement("produto", elementId);
