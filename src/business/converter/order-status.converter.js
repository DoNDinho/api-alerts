'use strict'
const statusConverter = (orderData) => {
  return {
    code: orderData.ID_ESTADO,
    name: orderData.DESCRIPCION_ESTADO_PEDIDO
  }
}

module.exports = { statusConverter }
