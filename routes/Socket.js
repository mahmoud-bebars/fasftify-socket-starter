const SocketController = require("../controllers/SocketController");

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */

async function routes(fastify, options) {
  /* Verfiy Token */
  fastify.post(
    "/message",
    { onRequest: [fastify.authenticate, fastify.isActive] },
    SocketController.sendMessage
  );
}

module.exports = routes;
