import {
  createElement,
  readList,
  updateElement,
  deleteElement,
} from "./crudService.js";

export const createProduct = (form) =>
  createElement("produto", {
    st_inativo: form.isActive,
    no_cliente: form.name,
    de_email: form.email,
    nu_cpf: form.cpf,
  });

export const readProducts = () =>
  readList("produto").then((response) =>
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
      no_cliente: form.name,
      de_email: form.email,
      nu_cpf: form.cpf,
    },
    elementId
  );

export const deleteProduct = (elementId) => deleteElement("produto", elementId);
