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

// notes!
app.get("/notes", async(req, res) => {
    try {
    const USER_ID = req.query.userid;
    const WORD_ID = req.query.wordid
    console.log(USER_ID + " " + WORD_ID)
     const query = `SELECT * FROM NOTES WHERE USER_ID = :USER_ID AND WORD_ID = :WORD_ID`;
    
    const params = [USER_ID, WORD_ID];
    const result = await db_query(query,params);
    res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// update notes
app.put("/notes/:id", async(req, res) => {
    try {
        const {id} = req.params; // WORD_ID
        const USER_ID = req.query.USER_ID

        const {NOTE_BODY} = req.body;
        console.log(id);

        const updateToDo = await db_query(
        `
            DECLARE
                NOTE_EXIST_BOOL NUMBER := 0;
                N VARCHAR2(1000);
                W NUMBER;
                U NUMBER;
            BEGIN
                N := :NOTE_BODY;
                W := :id;
                U := :USER_ID;
                FOR R IN (SELECT * FROM NOTES WHERE WORD_ID = :id AND USER_ID = :USER_ID)
                LOOP
                    IF (R.NOTE_ID > 0) -- NOTE EXISTS
                    THEN NOTE_EXIST_BOOL := 1;
                    END IF;
                END LOOP;

                IF NOTE_EXIST_BOOL = 1 THEN
                    UPDATE NOTES SET NOTE_BODY = N WHERE WORD_ID = W AND USER_ID = U;
                ELSE 
                    INSERT INTO NOTES (USER_ID, WORD_ID, NOTE_BODY)
                    VALUES (U, W, N);
                END IF;
            END;
        `, [NOTE_BODY, id, USER_ID]);

        res.json(updateToDo);
        console.log('here we are!')
    } catch (error) {
        console.log("ERROR! NO! Updating note was NOT successful!");
        console.log(error.message)
    }
});

// delete note!
app.delete("/notes/:id", async (req, res) => {
    try {
        const {id} = req.params; // WORD_ID
        const USER_ID = req.query.USER_ID
        
        const delToDo = await db_query (
            `DELETE FROM NOTES WHERE WORD_ID = :id AND USER_ID = :USER_ID`,
            [id, USER_ID]
        )
        res.json(delToDo);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// is already bookmarked or not?
app.get("/bookmarkedbool", async(req, res) => {
    try {
    const USER_ID = req.query.userid;
    const WORD_ID = req.query.wordid
    console.log(USER_ID + " " + WORD_ID)
    const query = `SELECT * FROM BOOKMARKS WHERE USER_ID = :USER_ID AND WORD_ID = :WORD_ID`;
    const params = [USER_ID, WORD_ID];
    const result = await db_query(query,params);

    res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO! Can't check bookmark " + error.message);
    }
});

// add/remove bookmark
app.post("/bookmarks", async(req, res) => {
    try {
        console.log("here we are!")
        const {u, w, IS_BOOKMARKED} = req.body
        const id = w, USER_ID = u

        console.log("WORD ID: " + w + "AND USER ID: " + u);
        const checkIfBookmarkExists = await db_query(
            `SELECT * FROM BOOKMARKS WHERE WORD_ID = :id AND USER_ID = :USER_ID`,
            [id, USER_ID]
        )        
        let updateToDo = [];

        if(!IS_BOOKMARKED) {
            updateToDo = await db_query(
                `INSERT INTO BOOKMARKS (USER_ID, WORD_ID)
                VALUES (:USER_ID, :id)`,
                [USER_ID, id]
            )
        }

        else {
            const query = "DELETE FROM BOOKMARKS WHERE WORD_ID = :id AND USER_ID = :USER_ID"
            const params = [id, USER_ID];

            updateToDo = await db_query(query, params);
        }

        res.json(updateToDo);
    } catch (error) {
        console.log("ERROR! NO! Updating bookmark was NOT successful!");
        console.log(error.message)
    }
});

// get all bookmarked flashcards by a user
app.get("/bookmarkedlist", async(req, res) => {
    try {
        //const {USER_ID} = req.params;
        const USER_ID = req.query.USER_ID
        const query = `
        SELECT * FROM FLASHCARDS WHERE WORD_ID IN
        (SELECT WORD_ID FROM BOOKMARKS where USER_ID = :USER_ID)
        ORDER BY WORD_STRING`;
        const params = {USER_ID};
        
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// get all noted flashcards by a user
app.get("/noteslist", async(req, res) => {
    try {
        const USER_ID = req.query.USER_ID
        const query = `
        SELECT * FROM FLASHCARDS F JOIN NOTES N
        ON F.WORD_ID = N.WORD_ID
        AND N.USER_ID = :USER_ID
        ORDER BY F.WORD_STRING
        `
        const params = {USER_ID};
        
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});
  
module.exports = app;