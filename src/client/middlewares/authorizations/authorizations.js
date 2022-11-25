'use strict'
const httpConsumer = require('../../../business/utils/http-consumer/http-consumer.service')
const AUTH_URL = process.env.AUTH_URL

const authorizate = async (req, res, next) => {
	if (!req.headers.authorization) {
		res.status(401).json({ message: 'Token requerido' })
	}
	const token = req.headers.authorization.replace('Bearer ', '')
	const url = AUTH_URL.replace('{token}', token)
	const headers = { 'Content-Type': 'application/json' }
	try {
		await httpConsumer.get({ headers, url })
		next()
	} catch (error) {
		res.status(401).json({ message: 'Token invalido' })
	}
}

module.exports = { authorizate }
