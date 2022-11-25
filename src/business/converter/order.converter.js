'use strict'
const orderConverter = (orderData, detailsData) => {
  const order = {
    id: orderData.ID_PEDIDO,
    ...createOrder(orderData)
  }
  if (detailsData) order.details = detailsData
  return order
}

const createOrder = (orderData) => {
  if (!orderData.ID_ESTADO) {
    return {}
  }
  const order = {
    status: {
      code: orderData.ID_ESTADO,
      name: orderData.DESCRIPCION_ESTADO_PEDIDO
    },
    table: {
      number: orderData.NUMERO_MESA
    },
    total_amount: orderData.VALOR_PEDIDO
  }
  return order
}

module.exports = { orderConverter }
