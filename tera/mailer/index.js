const fp = require("fastify-plugin");
const nodemailer = require('nodemailer');

const mailer = async (fastify, options, next) => {
    const transporter = nodemailer
        .createTransport(options.defaults || {}, options.transport || {})

    // returns true if authenticated by smtp server
    const verifyDefaultCallback = error => !Boolean(error);

    const send = async mailOptions => await transporter.sendMail(mailOptions);
    const verify = (callback = verifyDefaultCallback) => transporter.verify(callback)

    fastify.decorate(options.namespace || 'mailer', {
        send,
        verify,
        transporter
    })

    next()
}

module.exports = fp(mailer, {
    fastify: '>=2.0.0',
    name: 'tuos-mailer'
});