const morgan = require('morgan');
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
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
        let result = await connection.execute(query, params, { autoCommit: true } );
        return result.rows;
    }catch (error){
        console.log(error);
    }
}

// GET -> get all todos
// POST -> inserting data

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options('*',cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(router);
app.use("/authentication", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));

const searchHelper = require('./searching');
app.use(searchHelper);

const bookmark_notes = require('./bookmarks and notes');
app.use(bookmark_notes);

const comments = require('./comments');
app.use(comments);

const sectionwisewords = require('./sectionwisewords');
app.use(sectionwisewords);

 // sending email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tasnimulislam1320@gmail.com',
        pass: 'ymwd plkx zcpz dzgr' // this is an app password. Google app passwords.
    },
    tls: {
        rejectUnauthorized: false // Allow self-signed certificates
    }
});

app.post("/send-email", async (req, res) => {
    console.log('emails? yay!')
    const { to, subject, message } = req.body;

    const mailOptions = {
        from: '12115013mahi@gmail.com',
        to: to,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent');
    });
});

// login
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

// get flashcards
app.get("/flashcards", async(req, res) => {
    try {
    const difficulty = req.query.difficulty
    // const storedDifficulty = req.query.storedDifficulty;
    const query = `SELECT * FROM FLASHCARDS WHERE DIFFICULTY = :difficulty AND CUSTOMBOOL = 0 ORDER BY WORD_ID`;
    const params = [difficulty];
    console.log(params)
    const result = await db_query(query,params);
    res.status(200).json(result);
        //res.json("Todo was updated!");
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// get custom flashcards of a particular user
app.get("/flashcardscustom", async(req, res) => {
    try {
        const USER_ID = req.query.USER_ID
        const storedDifficulty = req.query.storedDifficulty;
        const query = `SELECT * FROM FLASHCARDS WHERE DIFFICULTY LIKE :storedDifficulty || '%' AND USER_ID = :USER_ID AND CUSTOMBOOL = 1 ORDER BY WORD_ID`;
        const params = [storedDifficulty, USER_ID];
        console.log(params)
        const result = await db_query(query,params);
        res.status(200).json(result);
    } catch (error) {
        console.log("ERROR! NO!");
    }
});

// get deleted (backup) flashcards
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

// insetion of custom flashcard
app.post("/flashcardscustom", async(req, res) => {
    try {
        const {WORD_STRING, MEANING, DIFFICULTY, CATEGORY, PARTS_OF_SPEECH, EXAMPLE_SENTENCE, USER_ID} = req.body;
        const query = "INSERT INTO FLASHCARDS (WORD_STRING, MEANING, DIFFICULTY, CATEGORY, PARTS_OF_SPEECH, EXAMPLE_SENTENCE, CUSTOMBOOL, USER_ID) VALUES (:1, :2, :3, :4, :5, :6, 1, :7)"; // RETURNING *";
        const params = [WORD_STRING, MEANING, DIFFICULTY, CATEGORY, PARTS_OF_SPEECH, EXAMPLE_SENTENCE, USER_ID];
        console.log('post!' + params)
        await db_query(query, params);
        
        res.status(200).json(result);
        console.log("Done!");
    } catch (error) {
        console.log("ERROR! NO!");
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

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

// editing flashcard
app.put("/flashcards/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {WORD_STRING, MEANING, DIFFICULTY, CATEGORY, PARTS_OF_SPEECH, EXAMPLE_SENTENCE} = req.body;
        console.log(id);
        console.log('here you go:' + WORD_STRING + MEANING + DIFFICULTY + CATEGORY)
        
        let query = `
            DECLARE
                W VARCHAR2(1000) := :WORD_STRING;
                M VARCHAR2(1000) := :MEANING;
                D VARCHAR2(1000) := :DIFFICULTY;
                C VARCHAR2(1000) := :CATEGORY;
                P VARCHAR2(1000) := :PARTS_OF_SPEECH;
                E VARCHAR2(1000) := :EXAMPLE_SENTENCE;
                I VARCHAR2(1000) := :id;
            BEGIN
                FOR R IN (SELECT * FROM CUSTOM_FLASHCARDS) 
                LOOP
                    IF (R.WORD_STRING = W) THEN
                       UPDATE CUSTOM_FLASHCARDS SET WORD_STRING = W, MEANING = M, DIFFICULTY = D, CATEGORY = C, PARTS_OF_SPEECH = P, EXAMPLE_SENTENCE = E WHERE WORD_ID = I;
                       COMMIT;
                       I := 1/0;                        
                    END IF;
                END LOOP;

                UPDATE FLASHCARDS SET WORD_STRING = W, MEANING = M, DIFFICULTY = D, CATEGORY = C, PARTS_OF_SPEECH = P, EXAMPLE_SENTENCE = E WHERE WORD_ID = I;
            END;
        `
        //let query = "UPDATE FLASHCARDS SET WORD_STRING = :WORD_STRING, MEANING = :MEANING, DIFFICULTY = :DIFFICULTY, CATEGORY = :CATEGORY, PARTS_OF_SPEECH = :PARTS_OF_SPEECH, EXAMPLE_SENTENCE = :EXAMPLE_SENTENCE WHERE WORD_ID = :id"
        const params = [WORD_STRING, MEANING, DIFFICULTY, CATEGORY, PARTS_OF_SPEECH, EXAMPLE_SENTENCE, id];

        const updateToDo = await db_query(query, params);
        res.json(updateToDo);
    } catch (error) {
        console.log(error)
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

// server is at 5000 & react is at 3000
app.listen(5000, () => {
    //console.log("server listening at port 5000");
    console.log("Server has started on port 5000! Way to go!");
})
