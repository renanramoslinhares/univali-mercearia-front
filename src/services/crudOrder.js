import {
  createElement,
  readList,
  updateElement,
  deleteElement,
} from "./crudService.js";

export const createOrder = (form) =>
  createElement("pedido", {
    st_inativo: form.isActive,
    no_cliente: form.name,
    de_email: form.email,
    nu_cpf: form.cpf,
  });

export const readOrders = () =>
  readList("pedido").then(
    (response) => {
      console.log("response", response);
    }
    // response.map((element) => ({
    //   id: element.id_pedido,
    //   name: element.no_pedido,
    //   amount: element.qt_estoque,
    //   description: element.de_pedido,
    //   isActive: element.st_inativo,
    // }))
  );

export const updateOrder = (form, elementId) =>
  updateElement(
    "pedido",
    {
      st_inativo: form.isActive,
      no_cliente: form.name,
      de_email: form.email,
      nu_cpf: form.cpf,
    },
    elementId
  );

export const deleteOrder = (elementId) => deleteElement("pedido", elementId);
