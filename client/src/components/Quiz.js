import React, { useEffect, useState, Link } from "react";

const Quiz = () => {
    const [flashcards, setFlashCards] = useState([]);
    const [totalRows, setTotalRows] = useState(0) // total rows in flashcards[] array
    const [options, setOptions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // State to track current flashcard index
    const [score, setScore] = useState(0); // State to track the score
    const [WORD_ID, setWORD_ID] = useState(1)
    const [MEANING, setMEANING] = useState('')
    const [mistakes, setMistakes] = useState([])
    const [endOfQuiz, setEndOfQuiz] = useState(false)

    const [numberOfWords, setNumberOfWords] = useState(5)
    const [showselectnumberofwords, setShowselectnumberofwords] = useState(false)
    const [DIFFICULTY, setDIFFICULTY] = useState('E')
    const [showDifficultyPortion, setshowDifficultyPortion] = useState(true)

    const [selectedOption, setSelectedOption] = useState(null); // State to track selected option
    const [isCorrect, setIsCorrect] = useState(false); // State to track if selected option is correct
    const [correctOption, setCorrectOption] = useState(null);

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    const nextFlashcard = () => {
        if(currentIndex == totalRows - 1) {
            window.location = "/home"
        }
        else setCurrentIndex((prevIndex) => (prevIndex + 1));
        setWORD_ID(flashcards[currentIndex+1].WORD_ID)
        setSelectedOption(null);
        setCorrectOption(null);
        setIsCorrect(false);
        console.log('[' + flashcards[currentIndex+1].DIFFICULTY + '] ' + 'correct answer is ' + flashcards[currentIndex+1].WORD_ID + ' ' + flashcards[currentIndex+1].MEANING)
    };

    const getFlashcards = async () => {
        try {
            let response = await fetch(`http://localhost:5000/quiz?numberOfWords=${numberOfWords}&difficulty=${DIFFICULTY}`);
            // ?name=${name}&name2=${name2}
            const jsonData = await response.json();
            setTotalRows(jsonData.length);

            setFlashCards(jsonData); // changing the data
            flashcards.map(f => {
                console.log(f.WORD_ID + " ")
            })
            console.log('number of rows:' + totalRows);
            setWORD_ID(jsonData[currentIndex].WORD_ID);
            getOptions(jsonData[currentIndex].WORD_ID); // Fetch options for the first flashcard
        } catch (error) {
            console.log(error.message);
        }
    };

    const getMeaning = (WORD_ID) => {
        const flashcard = flashcards.find(f => f.WORD_ID === WORD_ID);
        return flashcard ? flashcard.WORD_STRING.toUpperCase() + ": " + flashcard.MEANING : 'totalRows - 1totalRows - 1totalRows - 1totalRows - 1';
    }

    const getOptions = async (WORD_ID) => { // all FOUR options including the correct one
        try {
            if(currentIndex <= totalRows - 1) {
            let response = await fetch(`http://localhost:5000/flashcardsvocab/${WORD_ID}`);
            
            const jsonData = await response.json();

            setOptions(jsonData);
            {options.map( option => (
                option.WORD_ID === WORD_ID ? setMEANING(option.MEANING) : setTotalRows(totalRows) //console.log(option.WORD_ID + " ")
            ))}
            setCorrectOption(WORD_ID);
            console.log('the correct word id:' + WORD_ID)
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleOptionClick = async (option) => {
        setSelectedOption(option.WORD_ID);
        if(option.WORD_ID === WORD_ID) {
            setScore(score + 1)
            setIsCorrect(true);
        }

        else {
            // mistake!
            //mistakes.push(WORD_ID)
            mistakes.push(getMeaning(WORD_ID))
        }

        //setTimeout(doNothing, 1200); // 1.2 second
        

        if(currentIndex == totalRows - 1) {
            await sleep(2000)
            //window.location = "/home" // change this to produce a report of the wrong words!
            setEndOfQuiz(true)
            mistakes.map(m => {
                console.log(m)
            })
        }
        else {
           //setTimeout(nextFlashcard, 2000);
           setTimeout(nextFlashcard, 2000);
        }
    };

    useEffect(() => {
        getFlashcards();

    }, []);

    useEffect(() => {
        if (flashcards.length > 0) {
            getOptions(flashcards[currentIndex].WORD_ID);
        }
    }, [currentIndex, flashcards]);

    useEffect(() => {
        console.log(`Number of words changed to ${numberOfWords}`);
        // Perform actions based on numberOfWords change, such as fetching data
        fetch(`http://localhost:5000/quiz?numberOfWords=${numberOfWords}&difficulty=${DIFFICULTY}`)
            .then(response => response.json())
            .then(data => {
                setFlashCards(data);
                setDIFFICULTY(DIFFICULTY)
                getFlashcards()
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [numberOfWords, DIFFICULTY]);

    return (
        <div style={{ backgroundImage: `url('/flashcards.jpg')`, zIndex: -1 }}>
            {/* <center><h1>Flashcard Viewer</h1></center> */}

            {showDifficultyPortion && <div style = {{ paddingTop: '100px'}}> 
                <center>
                <div style={{
                    border: '10px solid #ccc',
                    borderRadius: '5px', padding: '10px',
                    marginBottom: '20px', marginLeft: '250px',
                    marginRight: '250px', backgroundColor: 'white',
                    fontSize: '30px'
                }}>
                    SELECT DIFFICULTY OF QUIZ
                </div>
                <p> . </p>

                <button className="btn btn-light" style={{ padding: '10px 20px', fontSize: '24px' }} onClick={() => {
                setshowDifficultyPortion(false)
                setShowselectnumberofwords(true);
                }}> EASY </button>

                &nbsp;&nbsp;&nbsp;
                <button className="btn btn-light" style={{ padding: '10px 20px', fontSize: '24px' }} onClick={() => { 
                setshowDifficultyPortion(false)
                setDIFFICULTY('D')
                setShowselectnumberofwords(true);
                }}> DIFFICULT </button>
                
                </center>
            </div>
            }

            {showselectnumberofwords && <div style = {{ paddingTop: '100px'}}>
                <center>
                <div style={{
                    border: '10px solid #ccc',
                    borderRadius: '5px', padding: '10px',
                    marginBottom: '20px', marginLeft: '250px',
                    marginRight: '250px', backgroundColor: 'white',
                    fontSize: '30px'
                }}>
                    SELECT NUMBER OF WORDS FOR YOUR QUIZ
                </div>
                <p> . </p>
                <button className="btn btn-light" style={{ padding: '10px 20px', fontSize: '24px' }} onClick={() => {
                setShowselectnumberofwords(false);
                }}> 5 WORDS </button>

                &nbsp;&nbsp;&nbsp;
                <button className="btn btn-light" style={{ padding: '10px 20px', fontSize: '24px' }} onClick={() => {
                setNumberOfWords(10); 
                setShowselectnumberofwords(false);
                }}> 10 WORDS </button>
                &nbsp;&nbsp;&nbsp;
                <button className="btn btn-light" style={{ padding: '10px 20px', fontSize: '24px' }} onClick={() => {
                setNumberOfWords(20); 
                setShowselectnumberofwords(false);
                }}> 20 WORDS </button>
                </center>
            </div>
            }

            {flashcards.length > 0 && !endOfQuiz && !showselectnumberofwords && !showDifficultyPortion && (
                <div style={{
                    border: '10px solid #ccc',
                    borderRadius: '5px', padding: '10px',
                    marginBottom: '20px', marginLeft: '200px',
                    marginRight: '200px', backgroundColor: 'white'
                }}>
                    <h5><span style={{ color: 'red' }}>{'QUESTION ' + (currentIndex + 1) + ' OF ' + totalRows}</span></h5>
                    <h5><span style={{ color: 'blue', fontSize: '18px'}}>{'CHOOSE THE CORRECT MEANING OF THE FOLLOWING WORD'}</span></h5>
                    <h2><span style={{ color: 'red' }}>{flashcards[currentIndex].WORD_STRING.toUpperCase()}</span></h2>
                    <div>
                        {options.map((option, index) => (
                            <div key={index} style={{ marginBottom: '10px', fontSize: '24px' }}>
                            <button className = {
                                // ((selectedOption === option.WORD_ID) ? (isCorrect ? 'btn btn-success' : 'btn btn-danger')
                                // : 'btn btn-light')
                                selectedOption === option.WORD_ID
                                ? (option.WORD_ID === correctOption ? 'btn btn-success' : 'btn btn-danger')
                                : (option.WORD_ID === correctOption && selectedOption !== null ? 'btn btn-success' : 'btn btn-outline-dark')
                            } style = {{ fontSize: '20px' }}
                            disabled={selectedOption !== null}
                            key={index} onClick={() => handleOptionClick(option)}>
                            {option.MEANING} 
                            </button>
                            <p> </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {endOfQuiz && !showselectnumberofwords && !showDifficultyPortion && (
                <div style={{
                    border: '10px solid #ccc',
                    borderRadius: '5px', padding: '10px',
                    marginBottom: '20px', backgroundColor: 'white'
                    , textAlign: 'center', fontSize: '30px'
                }}>
                    {score == totalRows && "Congratulations! \n You have scored full marks"}
                    {score != totalRows &&  (
                        <div>
                        <div style={{color : 'red', fontSize: '30px'}}> Mistakes found! Correct Meanings:  </div>
                        {mistakes.length > 0 ? (
                            mistakes.map((mistake, index) => (
                                <div key={index} style={{color : 'green', fontSize: '24px'}}>
                                    <i>{mistake}</i>
                                    <p></p>
                                </div>
                            ))
                        ) : (
                            <div>No mistakes found.</div>
                        )}
                        </div>
                    )}
                </div>
            )}
            <center>
                {!showselectnumberofwords && !showDifficultyPortion && <div style={{
                    color: 'blue', border: '10px solid #ccc',
                    borderRadius: '5px', padding: '10px',
                    marginBottom: '20px', backgroundColor: 'white',
                    marginLeft: '300px',
                    marginRight: '300px',
                    textAlign: 'center', fontSize: '30px'
                    }}> 
                    <b> {endOfQuiz && "YOUR FINAL "}
                    SCORE: {score} OF {totalRows} </b>
                    
                    {endOfQuiz &&
                        // <Link to = "/home">
                        <div> 
                           <p></p>
                           <a href="/home"> <button className="btn btn-outline-success" style={{padding: '10px 20px', fontSize: '24px'}}>Go back to Home Page</button> </a>
                        </div>
                    //    </Link>
                    }
                </div>}
            </center>
            <p> . </p>
            <p> . </p><p> . </p><p> . </p><p> . </p><p> . </p><p> . </p><p> . </p><p> . </p>
            <p> . </p><p> . </p><p> . </p><p> . </p><p> . </p><p> . </p><p> . </p><p> . </p>
        </div>
    );
}

export default Quiz;
