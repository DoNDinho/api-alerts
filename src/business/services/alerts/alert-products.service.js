'use strict'
const productsRepository = require('../../../data/repository/products.repository')
const { orderDetailConverter } = require('../../converter/order-detail.converter')

const execute = async () => {
  try {
    const products = await listProducts()
    // TODO implementar filter para filtrar segun stock bajo
    // TODO si el arreglo.length es mayor a 0, se debe enviar por web socket (ver si se envia el arreglo completo o de a uno)
    // TODO implementar un cron job
  } catch (error) {
    throw error
  }
}

const listProducts = async () => {
  try {
    return await productsRepository.listProducts()
  } catch (error) {
    throw { httpCode: 422, message: error.message }
  }
}

module.exports = { execute }
