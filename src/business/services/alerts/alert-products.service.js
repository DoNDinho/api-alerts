'use strict'
const productsRepository = require('../../../data/repository/products.repository')
const Socket = require('../../utils/socket/socket')

const execute = async () => {
  try {
    const products = await listProducts()
    const productsWithCriticalStock = products.filter(product => product.stock < product.minimum_stock)
    publishProductsStockEvent(productsWithCriticalStock)
  } catch (error) {
    throw error
  }
}

const listProducts = async () => {
  try {
    const response = await productsRepository.listProducts()
    return response.products
  } catch (error) {
    throw { httpCode: 422, message: error.message }
  }
}

const publishProductsStockEvent = (products) => {
  try {
    const socket = Socket.getInstance()
    const event = 'productsWithCriticalStock'
    console.log({ products })
    socket.emit(event, { products })
  } catch (error) {
    console.log('No hay usuarios conectados al socket')
  }
}

module.exports = { execute }
