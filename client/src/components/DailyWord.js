import React, { useEffect, useState } from "react";
import EditFlashcard from "./EditFlashcard";
import EditNote from "./EditNote";
import Bookmark from "./Bookmark";

const DailyWord = () => {
    const [flashcards, setFlashCards] = useState([]);
    const [showMeaning, setShowMeaning] = useState(false);
    const [dailyWordIndex, setDailyWordIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const toggleMeaning = () => {
        setIsAnimating(true);
        setShowMeaning(!showMeaning);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const getFlashcards = async () => {
        try {
            const Difficulty = 'D';
            const response = await fetch(`http://localhost:5000/flashcards?difficulty=${Difficulty}`);
            let jsonData = await response.json();
            jsonData = jsonData.filter(item => item.DIFFICULTY === 'D' && item.CATEGORY === 'VOCABULARY');
            setFlashCards(jsonData);

            // Set the daily word index after fetching flashcards
            const dayOfYear = new Date().getDay();
            setDailyWordIndex(dayOfYear % jsonData.length);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getFlashcards();
    }, []);

    const speakWord = () => {
        if (flashcards.length > 0 && flashcards[dailyWordIndex]) {
            const utterance = new SpeechSynthesisUtterance(flashcards[dailyWordIndex].WORD_STRING);
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/words.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            minHeight: '100vh',
            padding: '40px 20px',
            fontFamily: "'Poppins', sans-serif",
            color: '#fff'
        }}>
            {/* Animated Header */}
            <div style={{
                textAlign: 'center',
                marginBottom: '40px',
                animation: 'fadeInDown 1s ease'
            }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: '800',
                    background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '20px',
                    textShadow: '0 4px 8px rgba(0,0,0,0.3)'
                }}>
                    WORD OF THE DAY
                </h1>
                <div style={{
                    height: '4px',
                    width: '100px',
                    background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
                    margin: '0 auto',
                    borderRadius: '10px'
                }}></div>
            </div>

            {/* Daily Word Card */}
            {flashcards.length > 0 && flashcards[dailyWordIndex] && (
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto 60px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '20px',
                    padding: '40px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    transition: 'all 0.5s ease',
                    transform: isAnimating ? 'scale(0.98)' : 'scale(1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '::before': {
                        content: '""',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '8px',
                        background: 'linear-gradient(90deg, #ff8a00, #e52e71)'
                    }
                }}>
                    {/* Category Badge */}
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        backgroundColor: 'rgba(110, 72, 170, 0.1)',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        border: '1px solid rgba(110, 72, 170, 0.3)'
                    }}>
                        <h5 style={{ 
                            margin: '0',
                            color: '#6e48aa',
                            fontWeight: '600'
                        }}>
                            {flashcards[dailyWordIndex].CATEGORY}
                        </h5>
                    </div>

                    {/* Word and Pronunciation */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px'
                    }}>
                        <div>
                            <h2 style={{
                                color: '#ff4757',
                                fontSize: '2.5rem',
                                fontWeight: '700',
                                marginBottom: '5px',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                {flashcards[dailyWordIndex].WORD_STRING}
                                <button 
                                    onClick={speakWord}
                                    style={{
                                        marginLeft: '15px',
                                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                                        border: '1px solid rgba(52, 152, 219, 0.3)',
                                        borderRadius: '50%',
                                        width: '40px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        ':hover': {
                                            backgroundColor: 'rgba(52, 152, 219, 0.2)',
                                            transform: 'scale(1.1)'
                                        }
                                    }}
                                >
                                    <span style={{ fontSize: '1.2rem' }}>🔊</span>
                                </button>
                            </h2>
                            {flashcards[dailyWordIndex].CATEGORY === 'VOCABULARY' && (
                                <h5 style={{ 
                                    color: '#3498db',
                                    fontStyle: 'italic',
                                    marginTop: '0'
                                }}>
                                    [{flashcards[dailyWordIndex].PARTS_OF_SPEECH}]
                                </h5>
                            )}
                        </div>
                    </div>

                    {/* Meaning Section */}
                    <div style={{
                        backgroundColor: 'rgba(245, 245, 245, 0.8)',
                        borderRadius: '15px',
                        padding: '20px',
                        marginBottom: '25px',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
                    }}>
                        <h3 style={{
                            color: '#2c3e50',
                            marginTop: '0',
                            marginBottom: '15px',
                            fontSize: '1.3rem'
                        }}>
                            Definition
                        </h3>
                        <div style={{
                            color: '#2f3542',
                            fontSize: '1.2rem',
                            lineHeight: '1.6'
                        }}>
                            {flashcards[dailyWordIndex].MEANING}
                        </div>
                    </div>

                    {/* Example Sentence */}
                    {flashcards[dailyWordIndex].CATEGORY === 'VOCABULARY' && (
                        <div style={{
                            backgroundColor: 'rgba(46, 204, 113, 0.1)',
                            borderRadius: '15px',
                            padding: '20px',
                            marginBottom: '30px',
                            borderLeft: '4px solid #2ecc71'
                        }}>
                            <h3 style={{
                                color: '#2ecc71',
                                marginTop: '0',
                                marginBottom: '15px',
                                fontSize: '1.3rem'
                            }}>
                                Example Usage
                            </h3>
                            <div style={{
                                color: '#27ae60',
                                fontSize: '1.1rem',
                                fontStyle: 'italic',
                                lineHeight: '1.6'
                            }}>
                                {flashcards[dailyWordIndex].EXAMPLE_SENTENCE}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: '15px'
                    }}>
                        <button 
                            className="btn"
                            onClick={toggleMeaning}
                            style={{
                                padding: '12px 25px',
                                borderRadius: '30px',
                                border: 'none',
                                backgroundColor: showMeaning ? '#ff4757' : '#2ecc71',
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                ':hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                                    backgroundColor: showMeaning ? '#ff6b81' : '#27ae60'
                                }
                            }}
                        >
                            {showMeaning ? 'Hide Details' : 'Show Details'}
                        </button>
                        
                        <EditNote todo={flashcards[dailyWordIndex]} />
                        
                        <Bookmark todo={flashcards[dailyWordIndex]} />
                    </div>
                </div>
            )}

            {/* Daily Progress */}
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                padding: '20px',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255,255,255,0.2)'
            }}>
                <h3 style={{
                    color: 'white',
                    textAlign: 'center',
                    marginBottom: '15px'
                }}>
                    Your Learning Progress
                </h3>
                <div style={{
                    height: '10px',
                    width: '100%',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: '5px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        height: '100%',
                        width: `${(dailyWordIndex / (flashcards.length || 1)) * 100}%`,
                        background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
                        transition: 'width 0.5s ease'
                    }}></div>
                </div>
                <p style={{
                    color: 'rgba(255,255,255,0.8)',
                    textAlign: 'center',
                    marginTop: '10px'
                }}>
                    Day {dailyWordIndex + 1} of {flashcards.length} words mastered
                </p>
            </div>

            {/* Global Styles */}
            <style>
                {`
                    @keyframes fadeInDown {
                        from {
                            opacity: 0;
                            transform: translateY(-20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                    }

                    body {
                        font-family: 'Poppins', sans-serif;
                    }
                `}
            </style>
        </div>
    );
};

export default DailyWord;