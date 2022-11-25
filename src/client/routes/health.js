const express = require('express')
const router = express.Router()
const { version } = require('../../../package.json')

router.get(`/Authorizations/v1/health`, (req, res) => {
	res.json({
		status: 'API Users is up',
		version,
		date: new Date().toString(),
		uptime: process.uptime()
	})
})

module.exports = router
