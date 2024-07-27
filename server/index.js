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
app.use("/authentication", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));

// const helperAppEdit = require('./editing, updating');
// app.use(helperAppEdit);

app.get("/loggingin", async(req, res) => {
    try {
    const query = "SELECT * FROM USERS";
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// NOW WITH THE FLASHCARDS

//get all patients PART 1
// app.get("/patients", async(req, res) => {
//     try {
//     const query = `SELECT A.ADMISSION_ID, TO_CHAR(A.DATE_OF_ADMISSION, 'DD/MM/YYYY') 
//     AS DATEADM,
//     P.* FROM ADMISSION A LEFT OUTER JOIN PATIENT P ON A.PATIENT_ID = P.PATIENT_ID 
//     wheRE TO_NUMBER(TO_CHAR(A.DATE_OF_ADMISSION, 'YYYY')) >= 2024 
//     order BY A.DATE_OF_ADMISSION DESC`;
//     const params = [];
//     const result = await db_query(query,params);
//     res.status(200).json(result);
//         //res.json("Todo was updated!");
//     } catch (error) {
//         console.log("ERROR! NO!");
//     }
// });

// get flashcards EASY
app.get("/flashcardseasy", async(req, res) => {
    try {
    const query = `SELECT * FROM FLASHCARDS WHERE DIFFICULTY = 'E' ORDER BY WORD_ID`;
    const params = [];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});


// get flashcards (HARD)
app.get("/flashcardshard", async(req, res) => {
    try {
        const query = `SELECT * FROM FLASHCARDS WHERE DIFFICULTY <> 'E' ORDER BY WORD_ID`;
        const params = [];
        const result = await db_query(query,params);
        res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// get flashcards (backup)
app.get("/backupflashcards", async(req, res) => {
    try {
        const query = `SELECT * FROM DELETED_FLASHCARDS`;
        const params = [];
        const result = await db_query(query,params);
        res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// get a flashcard
app.get("/flashcards/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const query = "SELECT WORD_STRING, MEANING, DIFFICULTY, CATEGORY FROM FLASHCARDS where WORD_ID = :id";
        const params = {id};
        
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// get flashcards related to vocab only (used in QUIZZES)
app.get("/flashcardsvocab/:id", async(req, res) => {
    try {
    const {id} = req.params;
    const query = `
    SELECT * FROM (
        SELECT * FROM (
            SELECT * FROM FLASHCARDS WHERE CATEGORY = 'VOCABULARY'
            AND WORD_ID <> :id 
            ORDER BY DBMS_RANDOM.VALUE
        )
        WHERE ROWNUM <= 3
        union
        SELECT * FROM FLASHCARDS WHERE WORD_ID = :id
    )
    ORDER BY DBMS_RANDOM.VALUE
    `;
    const params = {id};
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

//app.get("/comments/:storedDifficulty", async(req, res) => {
app.get("/comments", async(req, res) => {
    try {
        console.log('get comments')
        const storedDifficulty = req.query.storedDifficulty;
        const query = `
        SELECT C.*, U.USER_NAME FROM COMMENTS C
        JOIN USERS U
        ON C.USER_ID = U.USER_ID
        where C.DIFFICULTY = :storedDifficulty
        ORDER BY C.DATE_OF_COMMENT DESC
        `
        ;
        const params = {storedDifficulty};
        const result = await db_query(query,params);
        
        console.log('result!' + result)
        res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// quiz
app.get("/quiz", async(req, res) => {
    try {
    console.log('Hello! We`re at the quiz section in server')
    const { numberOfWords, difficulty } = req.query;
    const numberOfDifficultWords = numberOfWords / 5;

    let query = `
    SELECT *
    FROM (
        SELECT * 
        FROM FLASHCARDS 
        WHERE DIFFICULTY = 'E' AND CATEGORY = 'VOCABULARY'
        ORDER BY DBMS_RANDOM.VALUE
        ) 
    WHERE ROWNUM <= :numberOfDifficultWords * 4

    UNION ALL

    SELECT *
    FROM (
        SELECT * 
        FROM FLASHCARDS 
        WHERE DIFFICULTY = 'D' AND CATEGORY = 'VOCABULARY'
        ORDER BY DBMS_RANDOM.VALUE
        )
    WHERE ROWNUM <= :numberOfDifficultWords * 1
    `;

    if(difficulty === 'D') query = `
    SELECT *
    FROM (
        SELECT * 
        FROM FLASHCARDS 
        WHERE DIFFICULTY = 'D' AND CATEGORY = 'VOCABULARY'
        ORDER BY DBMS_RANDOM.VALUE
        )
    WHERE ROWNUM <= :numberOfDifficultWords * 5
    `;
    const params = {numberOfDifficultWords};
    
    const result = await db_query(query,params);
    res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// INSERTING PATIENTS
// app.post("/patients", async(req, res) => {
    //     try {
//         const {FIRST_NAME, LAST_NAME, DATE_OF_BIRTH, EMAIL, GENDER, CONTACT_NO, ADDRESS, CITY, DISEASE, BED_ID} = req.body;
//         const query1 = `DECLARE
//         ERRORVAR NUMBER := 1;
//         BEGIN
//         FOR R IN (select b.bed_id AS BID from bed b 
//         WHERE B.BED_ID NOT IN
//         (SELECT BED_ID FROM BED_TAKEN
//         WHERE END_DATE IS NULL)) 
//         LOOP
//             IF :BED_ID = R.BID THEN ERRORVAR := 0;
//             END IF;
//         END LOOP;
//         IF ERRORVAR = 1 THEN ERRORVAR := 1/0;
//         END IF;
//         END;
//         `
//         const params1 = [BED_ID]
//         const result1 = await db_query(query1, params1);
//         const query = "INSERT INTO PATIENT (FIRST_NAME, LAST_NAME, DATE_OF_BIRTH, EMAIL, GENDER, CONTACT_NO, ADDRESS, CITY, DISEASE) VALUES (:1, :2, :3, :4, :5, :6, :7, :8, :9)"; // RETURNING *";
//         const params = [FIRST_NAME, LAST_NAME, DATE_OF_BIRTH, EMAIL, GENDER, CONTACT_NO, ADDRESS, CITY, DISEASE];
//         await db_query(query, params);

//         await db_query(`INSERT INTO ADMISSION
//         (DATE_OF_ADMISSION, PATIENT_ID)
//         VALUES (SYSDATE, (SELECT MAX(PATIENT_ID) FROM PATIENT))`, []);

//         const query2 = `INSERT INTO BED_TAKEN (BED_ID, START_DATE, COST_PER_NIGHT, ADMISSION_ID, NUMBER_OF_NIGHTS_STAYED)
//         VALUES (:1, SYSDATE, 
//         (SELECT COST_PER_NIGHT FROM BED WHERE BED_ID = :2),
//         (SELECT MAX(ADMISSION_ID) FROM ADMISSION), 0
//         )`
//         const params2 = [BED_ID, BED_ID]
//         const result = await db_query(query2, params2);
//         //const query3 = 
//         res.status(200).json(result);
//         console.log("Done!");
//     } catch (error) {
//         console.log("ERROR! NO!");
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// insertion OF FLASHCARD
app.post("/flashcards", async(req, res) => {
        try {
            const {WORD_STRING, MEANING, DIFFICULTY, CATEGORY, PARTS_OF_SPEECH, EXAMPLE_SENTENCE} = req.body;
            const query = "INSERT INTO FLASHCARDS (WORD_STRING, MEANING, DIFFICULTY, CATEGORY, PARTS_OF_SPEECH, EXAMPLE_SENTENCE) VALUES (:1, :2, :3, :4, :5, :6)"; // RETURNING *";
            const params = [WORD_STRING, MEANING, DIFFICULTY, CATEGORY, PARTS_OF_SPEECH, EXAMPLE_SENTENCE];
            console.log('post!' + params)
            await db_query(query, params);
            
            res.status(200).json(result);
            console.log("Done!");
        } catch (error) {
            console.log("ERROR! NO!");
            res.status(500).json({ error: 'Internal Server Error' });
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

/*
// get a patient
app.get("/patients/:id", async(req, res) => {
    try {
    const {id} = req.params;
    const query = "SELECT * FROM PATIENT where PATIENT_ID = $1";
    const params = [id];
    
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});
*/

    
// DELETING PATIENTS
// app.delete("/patients/:id", async (req, res) => {
//     try {
//         const { id } = req.params;

//         if (isNaN(id)) {
//             return res.status(400).json({ error: 'Invalid ID provided' });
//         }

//         const query = "DELETE FROM PATIENT WHERE PATIENT_ID = :id";
//         const params = { id: parseInt(id) };

//         const delToDo = await db_query(query, params);
//         res.json(delToDo);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


// DELETING FLASHCARDS
app.delete("/flashcards/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { deletedBy } = req.query;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID provided' });
        }

        await db_query (
                `DECLARE 
                    W VARCHAR2(100) ; 
                    M VARCHAR2(100) ; 
                    C VARCHAR2(100); 
                    D VARCHAR2(100); 
                    P VARCHAR2(20);
                    E VARCHAR2(500);
                BEGIN
                    FOR R IN (SELECT WORD_STRING, MEANING, CATEGORY, DIFFICULTY, PARTS_OF_SPEECH, EXAMPLE_SENTENCE
                    FROM FLASHCARDS WHERE WORD_ID = :id) 
                    LOOP 
                        W := R.WORD_STRING;
                        M := R.MEANING;
                        C := R.CATEGORY;
                        D := R.DIFFICULTY;
                        P := R.PARTS_OF_SPEECH;
                        E := R.EXAMPLE_SENTENCE;
                    END LOOP ;

                    INSERT INTO DELETED_FLASHCARDS 
                    (WORD_STRING, MEANING, CATEGORY, DIFFICULTY, USER_NAME, DATE_OF_DELETION, PARTS_OF_SPEECH, EXAMPLE_SENTENCE)
                    VALUES (W, M, C, D, :deletedBy, TO_CHAR(SYSDATE, 'DD-MON-YYYY'), P , E);

                END;
            `,
            {id, deletedBy}
        )

        const query = "DELETE FROM FLASHCARDS WHERE WORD_ID = :id";
        const params = { id: parseInt(id) };

        const delToDo = await db_query(query, params);
        res.json(delToDo);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


/*
// editing
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
*/

// editing
app.put("/flashcards/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {WORD_STRING, MEANING, DIFFICULTY, CATEGORY, PARTS_OF_SPEECH, EXAMPLE_SENTENCE} = req.body;
        console.log(id);
        console.log('here you go:' + WORD_STRING + MEANING + DIFFICULTY + CATEGORY)
        const query = "UPDATE FLASHCARDS SET WORD_STRING = :WORD_STRING, MEANING = :MEANING, DIFFICULTY = :DIFFICULTY, CATEGORY = :CATEGORY, PARTS_OF_SPEECH = :PARTS_OF_SPEECH, EXAMPLE_SENTENCE = :EXAMPLE_SENTENCE WHERE WORD_ID = :id"
        const params = [WORD_STRING, MEANING, DIFFICULTY, CATEGORY, PARTS_OF_SPEECH, EXAMPLE_SENTENCE, id];

        const updateToDo = await db_query(query, params);
        res.json(updateToDo);
        res.json("Medicine was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// is already bookmarked or not?
app.get("/bookmarks", async(req, res) => {
    try {
    const USER_ID = req.query.USER_ID;
    const WORD_ID = req.query.WORD_ID
    console.log(USER_ID + " " + WORD_ID)
    const query = `SELECT * FROM BOOKMARKS WHERE USER_ID = :USER_ID AND WORD_ID = :WORD_ID`;
    const params = [USER_ID, WORD_ID];
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// add bookmark
app.post("/bookmarks", async(req, res) => {
    try {
        const {u, w} = req.body;
        const query = "INSERT INTO BOOKMARKS (USER_ID, WORD_ID) VALUES (:1, :2)"; // RETURNING *";
        const params = [u, w];
        console.log('post!' + params)
        await db_query(query, params);
        
        res.status(200).json(result);
        console.log("Done!");
    } catch (error) {
        console.log("ERROR! NO!");
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// delete bookmark
app.delete("/bookmarks/:u", async (req, res) => {
    try {
        const { u } = req.params;
        const { WORD_ID } = req.query;

        await db_query (
            `DELETE FROM BOOKMARKS WHERE USER_ID = :u AND WORD_ID = :WORD_ID`,
            {u, WORD_ID}
        )

    
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// server is at 5000 & react is at 3000
app.listen(5000, () => {
    //console.log("server listening at port 5000");
    console.log("Server has started on port 5000! Way to go!");
})
