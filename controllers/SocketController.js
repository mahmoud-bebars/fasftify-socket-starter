// Broadcast Message to User in Room
module.exports.sendMessage = async (request, reply) => {
  try {
    const { socket, redis } = request.server;
    const { message, room, receiver_id } = request.body;

    const socket_user = await redis.get(receiver_id);

    socket.of("/socket").to(socket_user).emit(room, message);

    return reply.code(200).send({
      code: 200,
      results: `Stamping Done Sent Emit Message to ${socket_user} @ ${room}`,
    });
  } catch (error) {
    return reply.code(400).send(error);
  }
};
