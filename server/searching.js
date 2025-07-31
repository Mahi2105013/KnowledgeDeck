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

// flashcards search - advanced search
app.get("/flashcardsearch", async (req, res) => {
    try {
        console.log(req.query);
        const { WORD_STRING_SEARCH, WORD_MEANING_SEARCH, difficulty } = req.query;        //const params = { name: `%${name}%` }; // Bind variables should be an object with property names matching placeholders
        const query = `SELECT * FROM FLASHCARDS WHERE LOWER(WORD_STRING) LIKE LOWER(:WORD_STRING_SEARCH) 
        AND LOWER(MEANING) LIKE LOWER(:WORD_MEANING_SEARCH) AND DIFFICULTY = :difficulty`;
        const params = { WORD_STRING_SEARCH: `%${WORD_STRING_SEARCH}%`, WORD_MEANING_SEARCH: `%${WORD_MEANING_SEARCH}%`, difficulty};
        const result = await db_query(query, params);
        res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" }); // Handle error and send appropriate response
    }
});
  
app.get("/sectionwisewordsearch", async (req, res) => {
    try {
        console.log(req.query);
        const { WORD_STRING_SEARCH, WORD_MEANING_SEARCH, category } = req.query;
        const query = `SELECT * FROM SECTION_WISE_WORDS WHERE LOWER(WORD_STRING) LIKE LOWER(:WORD_STRING_SEARCH) 
        AND LOWER(MEANING) LIKE LOWER(:WORD_MEANING_SEARCH) AND CATEGORY = :category`;
        const params = { WORD_STRING_SEARCH: `%${WORD_STRING_SEARCH}%`, WORD_MEANING_SEARCH: `%${WORD_MEANING_SEARCH}%`, category};
        const result = await db_query(query, params);
        res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" }); // Handle error and send appropriate response
    }
});
module.exports = app;