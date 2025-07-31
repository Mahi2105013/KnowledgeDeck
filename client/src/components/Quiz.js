import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const Quiz = () => {
    const [flashcards, setFlashCards] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [options, setOptions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [WORD_ID, setWORD_ID] = useState(1);
    const [MEANING, setMEANING] = useState('');
    const [mistakes, setMistakes] = useState([]);
    const [endOfQuiz, setEndOfQuiz] = useState(false);

    const [numberOfWords, setNumberOfWords] = useState(5);
    const [showSelectNumberOfWords, setShowSelectNumberOfWords] = useState(false);
    const [DIFFICULTY, setDIFFICULTY] = useState('E');
    const [showDifficultyPortion, setShowDifficultyPortion] = useState(true);

    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [correctOption, setCorrectOption] = useState(null);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const nextFlashcard = () => {
        if (currentIndex === totalRows - 1) {
            window.location = "/home";
        } else {
            setCurrentIndex((prevIndex) => (prevIndex + 1));
            setWORD_ID(flashcards[currentIndex + 1].WORD_ID);
            setSelectedOption(null);
            setCorrectOption(null);
            setIsCorrect(false);
            console.log(`[${flashcards[currentIndex + 1].DIFFICULTY}] correct answer is ${flashcards[currentIndex + 1].WORD_ID} ${flashcards[currentIndex + 1].MEANING}`);
        }
    };

    const getFlashcards = async () => {
        try {
            let response = await fetch(`http://localhost:5000/quiz?numberOfWords=${numberOfWords}&difficulty=${DIFFICULTY}`);
            const jsonData = await response.json();
            setTotalRows(jsonData.length);
            setFlashCards(jsonData);
            console.log('number of rows:' + totalRows);
            setWORD_ID(jsonData[currentIndex].WORD_ID);
            getOptions(jsonData[currentIndex].WORD_ID);
        } catch (error) {
            console.log(error.message);
        }
    };

    const getMeaning = (WORD_ID) => {
        const flashcard = flashcards.find(f => f.WORD_ID === WORD_ID);
        return flashcard ? `${flashcard.WORD_STRING.toUpperCase()}: ${flashcard.MEANING}` : '';
    };

    const getOptions = async (WORD_ID) => {
        try {
            if (currentIndex <= totalRows - 1) {
                let response = await fetch(`http://localhost:5000/flashcardsvocab/${WORD_ID}`);
                const jsonData = await response.json();
                setOptions(jsonData);
                setCorrectOption(WORD_ID);
                console.log('the correct word id:' + WORD_ID);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleOptionClick = async (option) => {
        setSelectedOption(option.WORD_ID);
        if (option.WORD_ID === WORD_ID) {
            setScore(score + 1);
            setIsCorrect(true);
        } else {
            setMistakes([...mistakes, getMeaning(WORD_ID)]);
        }

        if (currentIndex === totalRows - 1) {
            await sleep(2000);
            setEndOfQuiz(true);
            mistakes.forEach(m => console.log(m));
        } else {
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
        fetch(`http://localhost:5000/quiz?numberOfWords=${numberOfWords}&difficulty=${DIFFICULTY}`)
            .then(response => response.json())
            .then(data => {
                setFlashCards(data);
                setDIFFICULTY(DIFFICULTY);
                getFlashcards();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [numberOfWords, DIFFICULTY]);

    return (
        <div
          style={{ 
            backgroundImage: `url('https://th.bing.com/th/id/R.de849f4c948af44d4a0524ea314f6041?rik=%2f8%2fb9Gr4iXG5gA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fd%2fb%2f0%2f572445.jpg&ehk=QWUD1TpQMYhugRwjTX1p039nNHjoKaefwdo4kQQsmvA%3d&risl=&pid=ImgRaw&r=0')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            padding: '20px',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', color: '#fff' }}
          >
            QUIZ
          </motion.h1>
    
          <AnimatePresence>
                {showDifficultyPortion && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -50 }} 
                        transition={{ duration: 0.5 }}
                        style={{ textAlign: 'center', paddingTop: '50px' }}
                    >
                        <motion.div 
                            style={{
                                border: '2px solid #ccc',
                                borderRadius: '10px',
                                padding: '20px',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                fontSize: '24px',
                                maxWidth: '600px',
                                margin: '0 auto 20px auto'
                            }}
                            whileHover={{ scale: 1.05 }}
                        >
                            SELECT DIFFICULTY OF QUIZ
                        </motion.div>
                        <motion.button 
                            className="btn btn-light" 
                            style={{ padding: '10px 20px', fontSize: '20px', margin: '10px' }} 
                            onClick={() => {
                                setShowDifficultyPortion(false);
                                setShowSelectNumberOfWords(true);
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        > 
                            EASY 
                        </motion.button>
                        <motion.button 
                            className="btn btn-light" 
                            style={{ padding: '10px 20px', fontSize: '20px', margin: '10px' }} 
                            onClick={() => {
                                setShowDifficultyPortion(false);
                                setDIFFICULTY('D');
                                setShowSelectNumberOfWords(true);
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        > 
                            DIFFICULT 
                        </motion.button>
                    </motion.div>
                )}

                {showSelectNumberOfWords && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        // exit={{ opacity: 0, y: -50 }} 
                        transition={{ duration: 0.5 }}
                        style={{ textAlign: 'center', paddingTop: '50px' }}
                    >
                        <motion.div 
                            style={{
                                border: '2px solid #ccc',
                                borderRadius: '10px',
                                padding: '20px',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                fontSize: '24px',
                                maxWidth: '600px',
                                margin: '0 auto 20px auto'
                            }}
                            whileHover={{ scale: 1.05 }}
                        >
                            SELECT NUMBER OF WORDS FOR YOUR QUIZ
                        </motion.div>
                        <motion.button 
                            className="btn btn-light" 
                            style={{ padding: '10px 20px', fontSize: '20px', margin: '10px' }} 
                            onClick={() => {
                                setShowSelectNumberOfWords(false);
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        > 
                            5 WORDS 
                        </motion.button>
                        <motion.button 
                            className="btn btn-light" 
                            style={{ padding: '10px 20px', fontSize: '20px', margin: '10px' }} 
                            onClick={() => {
                                setNumberOfWords(10);
                                setShowSelectNumberOfWords(false);
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        > 
                            10 WORDS 
                        </motion.button>
                        <motion.button 
                            className="btn btn-light" 
                            style={{ padding: '10px 20px', fontSize: '20px', margin: '10px' }} 
                            onClick={() => {
                                setNumberOfWords(20);
                                setShowSelectNumberOfWords(false);
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        > 
                            20 WORDS 
                        </motion.button>
                    </motion.div>
                )}
          </AnimatePresence>
    
          <AnimatePresence>
            <center>
            {flashcards.length > 0 && !endOfQuiz && !showSelectNumberOfWords && !showDifficultyPortion && (
              <motion.div
                //key="quiz"
                key = {{options}}
                // initial={{ opacity: 0, scale: 0.5 }}
                // animate={{ opacity: 1, scale: 1 }}
                // exit={{ opacity: 0, scale: 0.5 }}
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                exit={{ rotateY: -90 }}
                transition={{ duration: 0.5 }}
                style={{
                    width: '70%',
                    backgroundColor: '#fff',
                    border: '2px solid #ccc',
                    borderRadius: '10px',
                    padding: '15px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    //justifyContent: 'space-between',
                    justifyContent: 'center',
                    textAlign: 'left',
                    overflow: 'hidden'
                }}
              >
                <div key="quizinner">
                <h5>
                  <span style={{ color: 'red' }}>{`QUESTION ${currentIndex + 1} OF ${totalRows}`}</span>
                </h5>
                <h5>
                  <span style={{ color: 'blue', fontSize: '18px' }}>
                    {'CHOOSE THE CORRECT MEANING OF THE FOLLOWING WORD'}
                  </span>
                </h5>
                <h2>
                  <span style={{ color: 'red' }}>{flashcards[currentIndex].WORD_STRING.toUpperCase()}</span>
                </h2>
                  <AnimatePresence>
                  {options.map((option, index) => (
                    <motion.div
                      //key={index}
                      key={option.WORD_ID} // Use a unique identifier for the key
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      //transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                      //exit={{ opacity: 0, y: -20 }}

                      transition={{ type: 'spring', stiffness: 120, damping: 10, duration: 0.3,  delay: options.indexOf(option) * 0.5 }}
                      style={{ marginBottom: '10px', fontSize: '24px' }}
                    >
                      <button
                        className={
                          selectedOption === option.WORD_ID
                            ? option.WORD_ID === correctOption
                              ? 'btn btn-success'
                              : 'btn btn-danger'
                            : option.WORD_ID === correctOption && selectedOption !== null
                            ? 'btn btn-success'
                            : 'btn btn-outline-dark'
                        }
                        style={{ fontSize: '20px', whiteSpace: 'normal' }}
                        disabled={selectedOption !== null}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option.MEANING}
                      </button>
                    </motion.div>
          
                  ))}
                  </AnimatePresence>
              </div>
              </motion.div>
            )}
            </center>
          </AnimatePresence>
    
          <AnimatePresence>
            {endOfQuiz && (
              <motion.div
                key="endQuiz"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                style={{
                  border: '10px solid #ccc',
                  borderRadius: '10px',
                  padding: '20px',
                  marginBottom: '20px',
                  backgroundColor: 'white',
                  textAlign: 'center',
                }}
              >
                <h1>YOUR QUIZ IS OVER!</h1>
                <h2>SCORE: {score} / {totalRows}</h2>
                <div style={{ textAlign: 'left', paddingLeft: '20px' }}>
                  {mistakes.length > 0 && (
                    <div>
                      <h2>WORDS YOU GOT WRONG:</h2>
                      <h5>
                        <ul>
                          {mistakes.map((mistake, index) => (
                            <li key={index}>{mistake}</li>
                          ))}
                        </ul>
                      </h5>
                    </div>
                  )}
                </div>
                <div>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="btn btn-outline-dark"
                    onClick={() => window.location.reload()}
                    style={{ margin: '10px' }}
                  >
                    Restart Quiz
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="btn btn-outline-dark"
                    onClick={() => window.location = "/home"}
                    style={{ margin: '10px' }}
                  >
                    Go to Home Page
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
};

export default Quiz;


