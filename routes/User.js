const UserController = require("../controllers/UserController");

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  /* update User Profile */
  fastify.put(
    "/profile",
    { onRequest: [fastify.authenticate, fastify.isActive] },
    UserController.updateProfile
  );
  /* update User Info */
  fastify.put(
    "/password",
    { onRequest: [fastify.authenticate, fastify.isActive] },
    UserController.updatePassword
  );
}

module.exports = routes;
