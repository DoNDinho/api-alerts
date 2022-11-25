'use strict'
const axios = require('axios').default

const get = async (serviceData) => {
	const { url, headers } = serviceData
	const config = { headers }
	const func = async () => await axios.get(url, config)
	return consume(func, serviceData)
}

const consume = async (func, serviceData) => {
	const { url, body } = serviceData
	try {
		console.log(`Se consume la API ${url}`, { body })
		const response = await func()
		console.log(`Respuesta de la API ${url}`, { response: response.data })
		return response.data
	} catch (error) {
		console.error(`Error al consumir servicio. ${error.message}`)
		throw error
	}
}

module.exports = { get }
