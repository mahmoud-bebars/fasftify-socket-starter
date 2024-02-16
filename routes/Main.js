const HomeController = require("../controllers/HomeController");

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  fastify.get("/", HomeController.fetchHome);
  fastify.get("/types/users", HomeController.fetchRolesTypes);
}

module.exports = routes;
