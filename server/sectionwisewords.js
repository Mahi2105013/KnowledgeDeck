const morgan = require('morgan');
const express = require('express');
const router = require('express-promise-router')();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT;
const cors = require('cors');
let connection = undefined;
async function db_query(query,params) {
    if( connection === undefined ) {
        connection = await oracledb.getConnection({
            //user:'c##tamim',
            //password:'password',
            user: 'hr',
            password: 'hr',
            //connectionString:'localhost/orcl'
            connectString: 'localhost:1521/ORCL'
        });
    }
    try {
        //let result = await connection.execute(query,params);
        let result = await connection.execute(query, params, { autoCommit: true });
        return result.rows;
    } catch (error) {
        console.log(error);
    }
}

const app = express();
app.use(cors());
app.options('*',cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(router);

// section-wise words


// get section-wise words
app.get("/sectionwisewords", async(req, res) => {
    try {
        const category = req.query.category
        const query = `SELECT * FROM SECTION_WISE_WORDS WHERE CATEGORY = :CATEGORY ORDER BY WORD_ID`;
        const params = [category];
        console.log(params)
        const result = await db_query(query,params);
        res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// insert a word
app.post("/sectionwisewords", async(req, res) => {
    try {
        const {WORD_STRING, MEANING, CATEGORY, EXAMPLE_SENTENCE} = req.body;
        const query = "INSERT INTO SECTION_WISE_WORDS (WORD_STRING, MEANING, CATEGORY, EXAMPLE_SENTENCE) VALUES (:1, :2, :3, :4)"; // RETURNING *";
        const params = [WORD_STRING, MEANING, CATEGORY, EXAMPLE_SENTENCE];
        console.log('post!' + params)
        await db_query(query, params);
        
        res.status(200).json(result);
        console.log("Done!");
    } catch (error) {
        console.log("ERROR! NO!");
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETING section-wise words
app.delete("/sectionwisewords/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID provided' });
        }

        const query = "DELETE FROM SECTION_WISE_WORDS WHERE WORD_ID = :id";
        const params = { id: parseInt(id) };

        const delToDo = await db_query(query, params);
        res.json(delToDo);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// is already bookmarked or not?
app.get("/bookmarkedboolsec", async(req, res) => {
    try {
    const USER_ID = req.query.userid;
    const WORD_ID = req.query.wordid
    console.log(USER_ID + " " + WORD_ID)
    const query = `SELECT * FROM SECTION_WISE_WORDS_NOTES_BOOKMARKS
    WHERE USER_ID = :USER_ID AND WORD_ID = :WORD_ID AND BOOKMARK_BOOL = 1`;
    const params = [USER_ID, WORD_ID];
    const result = await db_query(query,params);

    res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO! Can't check bookmark " + error.message);
    }
});

// add/remove bookmark
app.post("/bookmarksec", async(req, res) => {
    try {
        console.log("here we are!")
        const {u, w} = req.body
        const id = w, USER_ID = u

        console.log("WORD ID: " + w + "AND USER ID: " + u);
        const updateToDo = await db_query (
            `DECLARE
                W NUMBER;
                U NUMBER;
                IS_BOOKMARKED NUMBER := -1; -- [-1 = doesnt even exist in table, 0 = exists but not bookmarked, 1 = bookmarked]
            BEGIN
                W := :id;
                U := :USER_ID;
                FOR R IN (SELECT * FROM SECTION_WISE_WORDS_NOTES_BOOKMARKS
                WHERE USER_ID = U AND WORD_ID = W)
                LOOP
                    IF R.BOOKMARK_BOOL = 1 THEN IS_BOOKMARKED := 1;
                    ELSIF R.BOOKMARK_BOOL = 0 THEN IS_BOOKMARKED := 0;
                    END IF;
                END LOOP;
                IF IS_BOOKMARKED = 1 THEN
                    UPDATE SECTION_WISE_WORDS_NOTES_BOOKMARKS SET BOOKMARK_BOOL = 0
                    WHERE USER_ID = U AND WORD_ID = W;
                ELSIF IS_BOOKMARKED = 0 THEN
                    UPDATE SECTION_WISE_WORDS_NOTES_BOOKMARKS SET BOOKMARK_BOOL = 1
                    WHERE USER_ID = U AND WORD_ID = W;
                ELSE 
                    INSERT INTO SECTION_WISE_WORDS_NOTES_BOOKMARKS
                    (USER_ID, WORD_ID, BOOKMARK_BOOL)
                    VALUES (U, W, 1);
                END IF;
            END;
            `, 
        [id, USER_ID]
        )        

        res.json(updateToDo);
    } catch (error) {
        console.log("ERROR! NO! Updating bookmark was NOT successful!");
        console.log(error.message)
    }
});

// notes!
app.get("/notessec", async(req, res) => {
    try {
    const USER_ID = req.query.userid;
    const WORD_ID = req.query.wordid
    console.log(USER_ID + " " + WORD_ID)
    const query = `SELECT * FROM SECTION_WISE_WORDS_NOTES_BOOKMARKS
    WHERE USER_ID = :USER_ID AND WORD_ID = :WORD_ID`;
    
    const params = [USER_ID, WORD_ID];
    const result = await db_query(query,params);
    res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// update notes
app.put("/notessec/:id", async(req, res) => {
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
                FOR R IN (SELECT * FROM SECTION_WISE_WORDS_NOTES_BOOKMARKS WHERE WORD_ID = :id AND USER_ID = :USER_ID)
                LOOP
                    NOTE_EXIST_BOOL := 1;
                END LOOP;

                IF NOTE_EXIST_BOOL = 1 THEN
                    UPDATE SECTION_WISE_WORDS_NOTES_BOOKMARKS SET NOTE_BODY = N WHERE WORD_ID = W AND USER_ID = U;
                ELSE 
                    INSERT INTO SECTION_WISE_WORDS_NOTES_BOOKMARKS (USER_ID, WORD_ID, NOTE_BODY)
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
app.delete("/notessec/:id", async (req, res) => {
    try {
        const {id} = req.params; // WORD_ID
        const USER_ID = req.query.USER_ID
        
        const delToDo = await db_query (
            `UPDATE SECTION_WISE_WORDS_NOTES_BOOKMARKS 
            SET NOTE_BODY = NULL
            WHERE WORD_ID = :id AND USER_ID = :USER_ID`,
            [id, USER_ID]
        )
        res.json(delToDo);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

  
module.exports = app;