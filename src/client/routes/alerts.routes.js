const express = require('express')
const alertProductsService = require('../../business/services/alerts/alert-products.service')
const router = express.Router()

router.get(`/Alerts/v1/products`, async (req, res, next) => {
  try {
    // await alertProductsService.execute()
    res.status(204).json()
  } catch (error) {
    console.log('error: ', error.message)
    next(error)
  }
})

module.exports = router
