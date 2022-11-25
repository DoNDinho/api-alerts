'use strict'
const errorHandler = (error, res) => {
  const { httpCode, message, errors } = error
  logger.error(error)
  res.status(httpCode).json({ message, errors })
}

module.exports = { errorHandler }
