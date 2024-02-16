const AuthController = require("../controllers/AuthController");

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  /* Login */
  fastify.post("/login", AuthController.login);

  /* Register */
  fastify.post("/register", AuthController.register);

  /* Verfiy Token */
  fastify.get(
    "/verfiy",
    { onRequest: [fastify.authenticate, fastify.isActive] },
    AuthController.verifyToken
  );
}

module.exports = routes;
