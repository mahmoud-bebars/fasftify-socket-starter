const fp = require("fastify-plugin");
const { User } = require("../models");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("@fastify/jwt"), {
    secret: JWT_SECRET,
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
  fastify.decorate("isAdmin", async function (request, reply) {
    try {
      const { role } = request.user;
      if (role.id !== 1) {
        throw new Error("401 Not Authorized to make this action");
      }
    } catch (err) {
      reply.code(401).send(err);
    }
  });
  fastify.decorate("isActive", async function (request, reply) {
    try {
      const { user_id } = request.user;
      const { is_active } = await User.findOne({
        where: { id: user_id },
        attributes: ["id", "is_active"],
      });

      if (!is_active) {
        throw new Error("401 Deactivated User");
      }
    } catch (err) {
      reply.code(401).send(err);
    }
  });
});
