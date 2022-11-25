'use strict'
const orderRepository = require('../../../data/repository/products.repository')
const { orderDetailConverter } = require('../../converter/order-detail.converter')
const Socket = require('../../utils/socket/socket')

const execute = async (details, id) => {
  try {
    const { errors, orders } = await insertDetailOrder(details, parseInt(id))

    if (orders.length != 0) {
      publishOrderEvents(orders)
    }
    return createErrors(errors)
  } catch (error) {
    throw error
  }
}

const insertDetailOrder = async (details, id) => {
  try {
    const results = await Promise.allSettled(
      details.map((detail) => orderRepository.insertDetailOrder(detail, id))
    )
    const errors = results
      .filter((result) => result.status == 'rejected')
      .map((result) => result.reason.message)
    const orders = results
      .filter((result) => result.status == 'fulfilled')
      .map((result) => result.value[0])

    if (errors.length == results.length) {
      const error = new Error('No se pudo ingresar el pedido')
      error.errors = createErrors(errors)
      throw error
    }
    return { errors, orders: orders }
  } catch (error) {
    throw { httpCode: 422, message: error.message }
  }
}

const createErrors = (errors) => {
  if (errors.length != 0) {
    return errors.map((error) => {
      return { message: error }
    })
  }
  return []
}

const publishOrderEvents = (orders) => {
  try {
    const socket = Socket.getInstance()
    const event = 'orderDetails'
    for (const order of orders) {
      socket.emit(event, orderDetailConverter(order))
    }
  } catch (error) {
    console.log('No hay usuarios conectados al socket')
  }
}

module.exports = { execute }
