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

const app = express();
app.use(cors());
app.options('*',cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(router);

// update medicine
app.put("/medicines/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {TRADE_NAME, GENERIC_NAME, STRENGTH, DESCRIPTION, MANUFACTURER, PRICE} = req.body;
        console.log(id);
        const query = "UPDATE MEDICINE SET TRADE_NAME = :TRADE_NAME, GENERIC_NAME = :GENERIC_NAME, STRENGTH = :STRENGTH, DESCRIPTION = :DESCRIPTION, MANUFACTURER = :MANUFACTURER, PRICE = :PRICE WHERE MEDICINE_ID = :id"
        const params = [TRADE_NAME, GENERIC_NAME, STRENGTH, DESCRIPTION, MANUFACTURER, PRICE , id];

        const updateToDo = await db_query(query, params);
        res.json(updateToDo);
        res.json("Medicine was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});


// update test
app.put("/tests/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {TYPE, DESCRIPTION, COST} = req.body;
        console.log(id);

        //const query = "UPDATE TODO SET DESCRIPTIONN = $1 WHERE TODO_ID = $2";
        //const query = "UPDATE TODO SET DESCRIPTIONN = :DESCRIPTIONN WHERE TODO_ID = :id";
        const query = "UPDATE TEST SET TYPE = :TYPE, DESCRIPTION = :DESCRIPTION, COST = :COST WHERE TEST_ID = :id"
        const params = [TYPE, DESCRIPTION, COST, id];

        const updateToDo = await db_query(query, params);
        res.json(updateToDo);
        res.json("TEST was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});





module.exports = app;