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

app.get("/comments", async(req, res) => {
    try {
        console.log('get comments')
        const storedDifficulty = req.query.storedDifficulty;
        let firstChar = storedDifficulty.charAt(0)
        const query = `
        SELECT C.*, U.USER_NAME FROM COMMENTS C
        JOIN USERS U
        ON C.USER_ID = U.USER_ID
        where C.DIFFICULTY LIKE :firstChar || '%'
        ORDER BY C.DATE_OF_COMMENT DESC
        `
        ;
        const params = {firstChar};
        const result = await db_query(query,params);
        
        console.log('result!' + result)
        res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// insertion of comments
app.post("/comments", async(req, res) => {
    try {
        const {id, d, COMMENT_BODY} = req.body;
        console.log(req.body)
        const query = "INSERT INTO COMMENTS (USER_ID, DIFFICULTY, COMMENT_BODY) VALUES (:1, :2, :3)"; // RETURNING *";
        const params = [id, d, COMMENT_BODY];
        console.log('post!' + params)
        await db_query(query, params);
        
        res.status(200).json(result);
        console.log("Done!");
    } catch (error) {
        console.log("ERROR! NO!");
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// edit comment
app.put("/comments/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {COMMENT_BODY} = req.body;
        console.log(id);
        
        let query = "UPDATE COMMENTS SET COMMENT_BODY = :COMMENT_BODY WHERE COMMENT_ID = :id"
        const params = [COMMENT_BODY, id];

        const updateToDo = await db_query(query, params);
        res.json(updateToDo);
    } catch (error) {
        console.log(error)
        console.log("ERROR! NO!");
    }
});
  
// delete comment
app.delete("/comments/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const delToDo = await db_query (
            `DELETE FROM COMMENTS WHERE COMMENT_ID = :id`, [id]
        );
        res.json(delToDo);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = app;