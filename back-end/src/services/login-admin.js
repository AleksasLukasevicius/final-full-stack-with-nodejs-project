import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtSecret, mysqlConfig } from "../../config.js";
import { adminSchema } from "../models/Admin.js";

export const loginAdmin = async (req, res) => {
  let userData = req.body;

  try {
    userData = await adminSchema.validateAsync(userData);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: "Incorrect Name or password" }).end();
  }

  try {
    const connection = await mysql.createConnection(mysqlConfig);

    const [data] = await connection.execute(
      `SELECT * FROM eventsdb.admin_users WHERE admin_name = ${mysql.escape(
        userData.admin_name
      )}`
    );

    await connection.end();

    if (data.length === 0) {
      return res
        .status(400)
        .send({ error: "Incorect admin_name or password" })
        .end();
    }

    const userID = data[0].id;
    const isAuthed = bcrypt.compareSync(userData.password, data[0].password);

    if (isAuthed) {
      const accessToken = jwt.sign(
        { id: data[0].id, admin_name: data[0].admin_name },
        jwtSecret
      );

      return res
        .send({ message: "Succesfully logged in", accessToken, userID })
        .end();
    }

    return res.status(400).send({ error: "Incorect Name or password" }).end();
  } catch (error) {
    console.log(error);

    return res.status(500).send({ error: "Please try again" }).end();
  }
};
