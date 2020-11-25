import {
  createElement,
  readData,
  updateElement,
  deleteElement,
} from "./crudService.js";

export const createClient = (form) =>
  createElement("cliente", {
    st_inativo: form.isActive,
    no_cliente: form.name,
    de_email: form.email,
    nu_cpf: form.cpf,
  });

export const readClients = () =>
  readData("cliente").then((response) =>
    response.map((element) => ({
      email: element.de_email,
      created_at: element.dt_cadastro,
      id: element.id_cliente,
      name: element.no_cliente,
      cpf: element.nu_cpf,
      isActive: element.st_inativo,
    }))
  );

export const updateClient = (form, elementId) =>
  updateElement(
    "cliente",
    {
      st_inativo: form.isActive,
      no_cliente: form.name,
      de_email: form.email,
      nu_cpf: form.cpf,
    },
    elementId
  );

export const deleteClient = (elementId) => deleteElement("cliente", elementId);
