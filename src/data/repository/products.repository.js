'use strict'
const { get } = require('../../business/utils/http-consumer/http-consumer.service')

const listProducts = async () => {
  try {
    const url = process.env.API_PRODUCTS_URL
    const headers = { 'Content_Type': 'application/json' }
    return await get({ url, headers })
  } catch (error) {
    throw error
  }
}

module.exports = {
  listProducts,
}
