import mysql from "mysql2/promise";
import { mysqlConfig } from "../../config.js";
import { eventSchema } from "../models/Event.js";

export const createEvent = async (req, res) => {
  let eventData = req.body;

  try {
    eventData = await eventSchema.validateAsync(eventData);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: "Incorrect event data" }).end();
  }

  const query = `INSERT INTO eventsdb.events (name, event_date) VALUES (${mysql.escape(
    eventData.name
  )}, ${mysql.escape(eventData.event_date)})`;

  try {
    const connection = await mysql.createConnection(mysqlConfig);

    await connection.execute(query);

    await connection.end();

    res.status(200).send("Provided data was inserted into table");
  } catch (error) {
    console.log(error);

    return res.status(500).send({ error: "Please try again" }).end();
  }
};

export const getEvents = async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);

    const [result] = await con.execute(`SELECT * FROM eventsdb.events`);

    await con.end();

    res.status(200).send(result).end();
  } catch (error) {
    res.status(500).send(err).end();

    return console.error(err);
  }
};

export const getUsersByEventId = async (req, res) => {
  const { eventId } = req.params;

  const query = `SELECT eventsdb.users.name, eventsdb.users.surname, eventsdb.users.email, eventsdb.users.birthdate FROM eventsdb.users INNER JOIN eventsdb.events ON eventsdb.events.id = eventsdb.users.event_id WHERE eventsdb.events.id = '${eventId}' ORDER BY eventsdb.users.id`;

  try {
    const con = await mysql.createConnection(mysqlConfig);

    const [result] = await con.execute(query);

    await con.end();

    res.status(200).send(result).end();
  } catch (error) {
    res.status(500).send(err).end();

    return console.error(err);
  }
};
