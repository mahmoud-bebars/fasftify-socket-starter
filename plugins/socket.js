const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  const { Server } = require("socket.io");
  const { redis } = fastify;
  // configuration
  const io = new Server(fastify.server, {
    cors: { origin: "*" },
  });

  fastify.decorate("socket", io);

  // LOGIC GOES HERE
  fastify.ready((err) => {
    if (err) throw err;
    const mainSocket = io.of("/socket");
    // authentication middleware
    mainSocket.use(async (socket, next) => {
      const { token } = socket.handshake.query;

      if (token) {
        const { user_id, name, role } = fastify.jwt.verify(token);
        socket.name = name;
        socket.user_id = user_id;
        socket.role = role;
        await redis.setex(user_id, 600, socket.id);
        next();
      }
    });

    // SOCKET IO Testing Socket For Stamping
    mainSocket.on("connection", async (socket) => {
      console.log(
        `${socket.name} with id: ${socket.user_id} has role: ${socket.role.name} connected! with socket id: ${socket.id}`
      );

      // connect to user room
      socket.join("schatting");

      socket.on("disconnect", async () => {
        await redis.del(socket.user_id);
        console.log(`${socket.name} disconnected!`);
      });
    });
  });
});
