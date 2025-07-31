import React, { useEffect, useState } from "react";
import EditFlashcard from "./EditFlashcard";
import EditNote from "./EditNote";
import Bookmark from "./Bookmark";
import { json } from "react-router-dom";

const DailyWord = () => {
    const [flashcards, setFlashCards] = useState([]);
    const [showMeaning, setShowMeaning] = useState(false); // boolean
    const [dailyWordIndex, setDailyWordIndex] = useState(0);

    const toggleMeaning = () => {
        setShowMeaning(!showMeaning); // Toggle the meaning visibility
    };

    const getFlashcards = async () => {
        try {
            // let response = await fetch("http://localhost:5000/flashcardshard");
            let Difficulty = 'D'
            const response = await fetch(`http://localhost:5000/flashcards?difficulty=${Difficulty}`);
            let jsonData = await response.json();
            console.log(jsonData)
            jsonData = jsonData.filter(item => item.DIFFICULTY === 'D' && item.CATEGORY === 'VOCABULARY');
            setFlashCards(jsonData);
            console.log(jsonData)

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

    return (
        <div 
        style={{ 
            backgroundImage: `url('https://th.bing.com/th/id/R.de849f4c948af44d4a0524ea314f6041?rik=%2f8%2fb9Gr4iXG5gA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fd%2fb%2f0%2f572445.jpg&ehk=QWUD1TpQMYhugRwjTX1p039nNHjoKaefwdo4kQQsmvA%3d&risl=&pid=ImgRaw&r=0')`,
        }}>
            <center><h1>DAILY WORD</h1></center>
            <p>.</p>

            {flashcards.length > 0 && flashcards[dailyWordIndex] && (
                <div style={{ border: '10px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '20px', marginLeft: '350px', marginRight: '350px', backgroundColor: 'white' }}>
                    <h5 style={{ float: 'right' }}> CATEGORY: {flashcards[dailyWordIndex]?.CATEGORY}</h5>
                    <span>
                        <h2>
                            <div style={{ color: 'red' }}>
                                {flashcards[dailyWordIndex]?.WORD_STRING}
                                <h5 style={{ color: 'blue' }}>
                                    {flashcards[dailyWordIndex]?.CATEGORY === 'VOCABULARY' ? ' [' + flashcards[dailyWordIndex]?.PARTS_OF_SPEECH + ']' : ''}
                                </h5>
                            </div>
                        </h2>
                    </span>
                    <div style={{ fontSize: '20px' }}> {flashcards[dailyWordIndex]?.MEANING}</div>
                    <p></p>
                    {flashcards[dailyWordIndex]?.CATEGORY === 'VOCABULARY' && <div style={{ fontSize: '17px', color: 'green' }}> <i> {flashcards[dailyWordIndex]?.EXAMPLE_SENTENCE} </i></div>}
                    <p></p>
                    
                        <div className="d-flex">
                            <span> <EditNote todo={flashcards[dailyWordIndex]} /> </span>
        
                            <h5>
                                <span style={{marginLeft: '10px'}}> <Bookmark todo={flashcards[dailyWordIndex]} /> </span>
                            </h5>
                        </div>

                        <p></p>

                    
                </div>
            )}
            <p></p>
            <p> . </p>
            <p> . </p>
            <p> . </p>
            <p> . </p> <p> . </p> <p> . </p> <p> . </p>
        </div>
    );
};

export default DailyWord;
