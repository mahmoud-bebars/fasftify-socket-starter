const { User, Role } = require("../models");
const moment = require("moment");

const {
  authentication,
  compareHashs,
  testPassword,
} = require("../utils/authenticate");

// Register
module.exports.register = async (request, reply) => {
  try {
    const { phone, email, password, ...user } = request.body;
    /* 
    ? User Object
    first_name,
    last_name,
    username,
    country_id,
    */

    const existPhone = await User.findOne({
      where: {
        phone: phone,
      },
      attributes: ["id"],
    });

    if (existPhone) {
      throw new Error("Phone Already Taken...");
    }

    if (email !== "") {
      const existEmail = await User.findOne({
        where: {
          email: email,
        },
        attributes: ["id"],
      });
      if (existEmail) {
        throw new Error("Email Already Taken...");
      }
    }

    const checkPassword = testPassword(password);

    if (checkPassword.error) {
      throw new Error(testPassword.message);
    }

    // check if password correct
    const hash = authentication(password);

    // Create User
    await User.create({
      phone: phone,
      email: email,
      password: hash,
      ...user,
    });

    let results = {
      message: "user created Successfully",
      name: user.first_name + " " + user.last_name,
      phone: phone,
    };

    return reply.code(201).send({
      code: 201,
      results,
    });
  } catch (error) {
    return reply.code(400).send(error);
  }
};

// Login
module.exports.login = async (request, reply) => {
  try {
    const fastify = request.server;
    const { phone, password } = request.body;

    const user = await User.findOne({
      where: { phone },
      attributes: [
        "id",
        "first_name",
        "last_name",
        "phone",
        "email",
        "password",
        "role_id",
        "log_limits",
        "created_at",
      ],
      include: [{ model: Role, as: "role" }],
    });

    if (!user) {
      throw new Error("User does not exist!");
    }

    // destructure user data
    let existUser = user.toJSON();

    // check if password correct
    const authenticated = compareHashs(password, existUser.password);

    if (!authenticated) {
      if (existUser.log_limits === 3) {
        user.is_active = false;
        await user.save();
        throw new Error(
          "Incorrect Password Entered 3 times, Account is Deactivated"
        );
      } else if (existUser.log_limits < 3) {
        user.log_limits = user.log_limits + 1;
        await user.save();
        throw new Error("Incorrect password");
      }
    }
    // sign token
    const token = fastify.jwt.sign({
      user_id: existUser.id,
      name: `${user.first_name} ${user.last_name}`,
      phone: existUser.phone,
      email: existUser.email,
      role: existUser.role,
    });

    // creating results
    let results = {
      accessToken: `Bearer ${token}`,
      user_id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      phone: user.phone,
      email: user.email,
      role: user.role,
      joined_at: moment(user.created_at).format("YYYY-MM-DD hh:mm A"),
    };

    user.log_limits = 0;
    await user.save();
    return reply.code(200).send({
      code: 200,
      results,
    });
  } catch (error) {
    return reply.code(400).send(error);
  }
};

// Token Verfication
module.exports.verifyToken = async (request, reply) => {
  try {
    const results = request.user;

    return reply.code(200).send({
      code: 200,
      results: results,
    });
  } catch (error) {
    return reply.code(400).send(error);
  }
};
