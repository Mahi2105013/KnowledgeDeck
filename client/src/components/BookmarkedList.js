import React, { Fragment, useEffect, useState } from "react";
import Bookmark from "./Bookmark";

const BookmarkedList = () => {
    const [flashcards, setFlashcards] = useState([]);

    const getFlashcards = async () => {
        try {
            const USER_ID = localStorage.getItem("userid_currently_logged_in");
            const response = await fetch(`http://localhost:5000/bookmarkedlist?USER_ID=${USER_ID}`);
            const jsonData = await response.json();
            setFlashcards(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getFlashcards();
    }, []);

    return (
        <Fragment>
            <div style={{
      // backgroundImage: `url('/flashcards.jpg')`,
      backgroundImage: `url('https://th.bing.com/th/id/R.de849f4c948af44d4a0524ea314f6041?rik=%2f8%2fb9Gr4iXG5gA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fd%2fb%2f0%2f572445.jpg&ehk=QWUD1TpQMYhugRwjTX1p039nNHjoKaefwdo4kQQsmvA%3d&risl=&pid=ImgRaw&r=0')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      padding: '20px',
      color: '#fff',
      minHeight: '100vh' // Ensures that the div is at least the height of the viewport

    }}>
                <center><h1 className="mt-5">BOOKMARKED WORDS</h1></center>
                <div className="row">
                    {flashcards.map((todo) => (
                        <div key={todo.WORD_ID} className="col-sm-6 col-md-4 col-lg-3 mt-4">
                            <div className="card text-dark bg-white">
                                <div className="card-body">
                                    <h3 className="card-title">{todo.WORD_STRING}</h3>
                                    <p className="card-text"><strong>Meaning/Significance:</strong> {todo.MEANING}</p>
                                    <p className="card-text"><strong>Category:</strong> {todo.CATEGORY}</p>
                                    <p className="card-text"><strong>Difficulty:</strong> {todo.DIFFICULTY === 'E' ? 'Easy' : 'Difficult'}</p>
                                    {todo.CATEGORY == 'VOCABULARY' && <p className="card-text"><strong>Parts of Speech:</strong> {todo.CATEGORY === 'VOCABULARY' ?  todo.PARTS_OF_SPEECH : '-'}</p>}
                                    {todo.CATEGORY == 'VOCABULARY' && <p className="card-text"><strong>Example Sentence:</strong> {todo.CATEGORY === 'VOCABULARY'?  todo.EXAMPLE_SENTENCE : '-'}</p>}
                                    <p> <Bookmark todo = {todo} text="Remove Bookmark"/> </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="my-5"></div>
            </div>
        </Fragment>
    );
};

export default BookmarkedList;
