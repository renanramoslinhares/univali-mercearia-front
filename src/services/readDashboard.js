import { readData } from "./crudService.js";

export const readDashboard = () => readData("dashboard");
// .then((response) =>
//   response.map((element) => ({
//     id: element.id_pedido,
//     client: {
//       id: element.cliente.id_cliente,
//       name: element.cliente.no_cliente,
//     },
//     totalValue: element.vr_pedido,
//   }))
// );
