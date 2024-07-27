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

//const app = require("express").Router();
const authorize = require("../middleware/authorize");
//const pool = require("../db");



app.post("/", authorize, async (req, res) => {
  try {

    /*
        const {DESCRIPTIONN} = req.body;
        const query = "INSERT INTO TODO (DESCRIPTIONN) VALUES (:1)"; // RETURNING *";
        const params = [DESCRIPTIONN];

        //await db_query(query, params);
        const result = await db_query(query, params);
        //res.json({message : "done!"});
        res.status(200).json(result);
        console.log("Done!");
    */
    const user = await db_query(
    //const user = await pool.query(
      "SELECT USER_NAME FROM USERS WHERE USER_ID = $1",
      [req.user.id] 
    ); 
    
  //if would be req.user if you change your payload to this:
    
  //   function jwtGenerator(user_id) {
  //   const payload = {
  //     user: user_id
  //   };
    
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = app;
