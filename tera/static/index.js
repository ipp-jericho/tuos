const fp = require("fastify-plugin")
module.exports = fp(async function (app, options) {
	app.register(require('../../aplos/root-js'),options)
})