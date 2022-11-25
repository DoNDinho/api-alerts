'use strict'
const orderDetailConverter = (orderData) => {
  const detail = {
    menu: {
      name: orderData.NOMBRE_MENU,
      price: {
        amount: orderData.VALOR_MENU
      }
    },
    quantity: orderData.CANTIDAD
  }
  if (orderData.TIEMPO_PREP) detail.menu.preparation_time = orderData.TIEMPO_PREP
  if (orderData.DESCRIPCION_ESTADO) detail.status = { name: orderData.DESCRIPCION_ESTADO }
  if (orderData.ID_DETALLE) detail.id = orderData.ID_DETALLE
  if (orderData.NUMERO_MESA) detail.table = { number: orderData.NUMERO_MESA }
  if (orderData.COMENTARIO) detail.comment = orderData.COMENTARIO
  if (orderData.IMAGEN) detail.menu.image = orderData.IMAGEN
  return detail
}

module.exports = { orderDetailConverter }
