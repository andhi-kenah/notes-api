import dotenv from "dotenv"
import fs from "fs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Validator from "../libs/Validator.js";
import User from "../libs/User.js";

dotenv.config()

const expiresIn = "1h"

const generateToken = (user) => {
  const payload = {id: user.id, username: user.username}
  return jwt.sign(payload, process.env.KEY, {expiresIn, algorithm: "HS256"})
}

const register = (req, res) => {
  try {
    if (req.method != "POST") {
      return res
        .status(405)
        .json({ error: "Invalid method, only POST method" });
    }

    let { username, password, confirmation } = req.body;

    username = username.trim();
    password = password.trim();
    confirmation = confirmation.trim();

    if (!Validator.stringNotEmpty(username, password, confirmation)) {
      return res.status(400).json({ error: "Input cannot be empty" });
    }
    
    let userAlreadyExist = User.getUserByUsername(username)
    
    if (userAlreadyExist) {
      return res.status(400).json({ message: "Invalid username" });
    }
    

    if (password != confirmation) {
      return res.status(400).json({ message: "Invalid password confirmation" });
    }

    const myHash = bcrypt.genSaltSync(11);

    const users = getUsers()

    const newUser = {
      id: users.length + 1,
      username: username.trim(),
      password: bcrypt.hashSync(password, myHash),
      role: "USER",
      created_at: new Date(Date.now()),
    };

    users.push(newUser);
    fs.writeFileSync("./database/users.json", JSON.stringify(users));

    delete newUser.password;
    return res.status(201).json({ user: newUser, message: "user created" });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

const login = (req, res) => {
  try {
    if (req.method != "POST") {
      return res
        .status(405)
        .json({ error: "Invalid method, only POST method" });
    }

    let { username, password } = req.body;

    username = username.trim();
    password = password.trim();

    if (!Validator.stringNotEmpty(username, password)) {
      return res.status(400).json({ error: "Input cannot be empty" });
    }

    let user = User.getUserByUsername(username)

    if (!user) {
      return res.status(400).json({error: "Invalid user"})
    }

    const isValid = bcrypt.compareSync(password, user.password)

    if (!isValid) {
        return res.status(400).json({error: 'error credentials'})
    }

    const token = generateToken(user)

    delete user.password;

    return res.status(200).json({
      message: "user connected",
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

export { register, login };
