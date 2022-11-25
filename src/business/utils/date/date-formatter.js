'use strict'
const formatDate = (date) => {
	const splitDate = date.toISOString().split('T')
	return splitDate[0]
}

module.exports = { formatDate }
