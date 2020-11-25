import {
  createElement,
  readData,
  updateElement,
  deleteElement,
} from "./crudService.js";

export const createOrder = (data) =>
  createElement("pedido", {
    cliente: Number(data.clientId),
    vr_pedido: Number(data.totalValue),
    itens: data.items.map((item) => ({
      produto: Number(item.productId),
      qt_produto_item: Number(item.productAmount),
      vr_unitario: Number(item.productValue),
    })),
  });

export const readOrderById = (elementId) =>
  readData("pedido/" + elementId).then((element) => ({
    id: element.id_pedido,
    client: {
      id: element.cliente.id_cliente,
      name: element.cliente.no_cliente,
    },
    items: element.itens.map((item) => ({
      productId: item.produto.id_produto,
      productAmount: item.qt_produto_item,
      productValue: item.vr_unitario,
    })),
    totalValue: element.vr_pedido,
  }));

export const readOrders = () =>
  readData("pedido").then((response) =>
    response.map((element) => ({
      id: element.id_pedido,
      client: {
        id: element.cliente.id_cliente,
        name: element.cliente.no_cliente,
      },
      totalValue: element.vr_pedido,
    }))
  );

export const updateOrder = (data, elementId) =>
  updateElement(
    "pedido",
    {
      cliente: Number(data.clientId),
      vr_pedido: Number(data.totalValue),
      itens: data.items.map((item) => ({
        produto: Number(item.productId),
        qt_produto_item: Number(item.productAmount),
        vr_unitario: Number(item.productValue),
      })),
    },
    elementId
  );

export const deleteOrder = (elementId) => deleteElement("pedido", elementId);
