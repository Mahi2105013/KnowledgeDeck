//const express = require("express");
//const router = express.Router();
const bcrypt = require("bcrypt");
//const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

const morgan = require('morgan');
const express = require('express');
const router = require('express-promise-router')();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT;
const cors = require('cors');
let connection = undefined;
async function db_query(query,params){
    if( connection === undefined ){
        connection = await oracledb.getConnection({
            //user:'c##tamim',
            //password:'password',
            user: 'hr',
            password: 'hr',
            //connectionString:'localhost/orcl'
            connectString: 'localhost:1521/ORCL'
        });
    }
    try{
        //let result = await connection.execute(query,params);
        let result = await connection.execute(query, params, { autoCommit: true });
        return result.rows;
    }catch (error){
        console.log(error);
    }
}

// GET -> get all todos
// POST -> inserting data

const app = express();
app.use(cors());
app.options('*',cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(router);


//authorizeentication
/*
        const {DESCRIPTIONN} = req.body;
        const query = "INSERT INTO TODO (DESCRIPTIONN) VALUES (:1)"; // RETURNING *";
        const params = [DESCRIPTIONN];
        const result = await db_query(query, params);
        //res.json({message : "done!"});
        res.status(200).json(result);
        console.log("Done!");
*/
app.post("/register", validInfo, async (req, res) => {
  const { email, name, password } = req.body;

  try {
    // const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
    //   email
    // ]);
      const user = await db_query("SELECT * FROM USERS WHERE USER_EMAIL = $1", [
        email
      ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // let newUser = await pool.query(
    //   "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
    //   [name, email, bcryptPassword]
    // );

    /*
        const {DESCRIPTIONN} = req.body;
        const query = "INSERT INTO TODO (DESCRIPTIONN) VALUES (:1)"; // RETURNING *";
        const params = [DESCRIPTIONN];
        const result = await db_query(query, params);
    */

    let newUser = await db_query(  "INSERT INTO USERS (USER_NAME, USER_EMAIL, USER_PASSWORD) VALUES (:1, :2, :3)",
    [name, email, bcryptPassword]
  );

  
    const jwtToken = jwtGenerator(newUser.rows[0].USER_ID);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM USERS WHERE USER_EMAIL = $1", [
      email
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].USER_PASSWORD
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = jwtGenerator(user.rows[0].USER_ID);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = app;
