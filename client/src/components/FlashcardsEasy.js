import React, {Fragment, useEffect, useState} from "react";
import EditFlashcard from "./EditFlashcard";
import AddNewWordModal from "./InputFlashcard";
import InputComment from "./InputComment";
let rowsFetched = -1;
let totalRows = 0;


// const FlashcardsEasy = () => {
    const FlashcardsEasy = () => {

    //const [todos, setTodos] = useState([])
    const [flashcards, setFlashCards] = useState([]);
    const [comments, setcomments] = useState([]);
    const [showcomments, setshowcomments] = useState (false)
    const [currentIndex, setCurrentIndex] = useState(0); // State to track current flashcard index
    const [showMeaning, setShowMeaning] = useState(false); // boolean
    const [DIFFICULTY, setDIFFICULTY] = useState('');
    
    const [WORD_STRING, setWORD_STRING] = useState('');
    const [MEANING, setMEANING] = useState('');
    const [CATEGORY, setCATEGORY] = useState('');

    const [visibleComments, setVisibleComments] = useState(5);
    const commentsPerLoad = 10;

    const [visibleCards, setVisibleCards] = useState(30);
    const CardsPerLoad = 50;

    const loadMoreComments = () => {
        setVisibleComments(visibleComments + commentsPerLoad);
    };

    const loadMoreCards = () => {
        setVisibleCards(visibleCards + CardsPerLoad);
    };

    const nextFlashcard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalRows);
        setShowMeaning(false)
    };

    const previousFlashcard = () => {
        setCurrentIndex((prevIndex) => ((prevIndex - 1)  == -1 ? totalRows - 1 : prevIndex - 1));
        setShowMeaning(false)
    };

    const toggleMeaning = () => {
        setShowMeaning(!showMeaning); // Toggle the meaning visibility
    };

    // DELETE FUNCTION
    const deleteFlashcard = async (WORD_ID) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete?");
            if(!confirmed) return;

            const deletedBy = localStorage.getItem('username_currently_logged_in');
            const response = await fetch(`http://localhost:5000/flashcards/${WORD_ID}?deletedBy=${deletedBy}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                setFlashCards(prevTodos => prevTodos.filter(todo => todo.WORD_ID !== WORD_ID));
                //window.location = '/flashcardseasy'
                window.location.reload()
            } else {
                console.log(`Error deleting MEDICINE with ID ${WORD_ID}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getFlashcards = async() => {
        try {
            setshowcomments(false)
            getComments()
            console.log('comments' + comments)
            const storedUsername = localStorage.getItem('username_currently_logged_in');
            console.log('tai naki ' + storedUsername); // Output: 'JohnDoe

            const storedDifficulty = localStorage.getItem('difficulty');
            setDIFFICULTY(storedDifficulty)
            
           let response = await fetch("http://localhost:5000/flashcardseasy");        
           if (storedDifficulty === 'D') response = await fetch("http://localhost:5000/flashcardshard");        
           const jsonData = await response.json();
           totalRows = jsonData.length

            setFlashCards(jsonData); // changing the data
            console.log(jsonData)
            console.log('number of rows:' + totalRows)
        } catch (error) {
            console.log(error.message)
        }
    }

    const isAlreadyBookmarked = async (WORD_ID) => {
        try {
           const storedUserID = localStorage.getItem('userid_currently_logged_in');

           let response = await fetch(`http://localhost:5000/bookmarks?USER_ID=${encodeURIComponent(storedUserID)}&WORD_ID=${encodeURIComponent(WORD_ID)}`);
           const jsonData = await response.json();
            
           return jsonData.length === 1;
        } catch (error) {
            console.log(error.message)
        }
    }

    const addOrRemoveBookmark = async (string, WORD_ID) => {
        try {
            let w = WORD_ID, u = localStorage.getItem('userid_currently_logged_in')
            if(string === 'add') {
                // post request; insert into BOOKMARKS table
                const body = { u, w };

                await fetch(`http://localhost:5000/bookmarks`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
            }

            else if (string === 'remove') {
                // delete request; delete from BOOKMARKS table
                const response = await fetch(`http://localhost:5000/bookmarks/${u}?WORD_ID=${WORD_ID}`, {
                    method: "DELETE"
                });
            }
        }

        catch (error) {
            console.error(error.message)
        }

    }

    // localStorage.setItem('difficulty', 'E');
    const getComments = async() => {
        try {
            const storedDifficulty = localStorage.getItem('difficulty');
            console.log(storedDifficulty)
            
            let response = await fetch(`http://localhost:5000/comments?storedDifficulty=${encodeURIComponent(storedDifficulty)}`);
            const jsonData = await response.json();

            setcomments(jsonData); // changing the data
            console.log(jsonData);
        } catch (error) {
            console.log(error.message)
        }
    }

    const formatDateToDDMonYYYY = (dateString) => {
        const date = new Date(dateString);
        
        const day = String(date.getDate()).padStart(2, '0');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        
        return `${day}-${month}-${year}`;
    }


    useEffect(() => {
        getFlashcards();

        // Add event listener for keydown
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                nextFlashcard();
            } else if (e.key === 'ArrowLeft') {
                previousFlashcard();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentIndex, flashcards.length]);
    
    // useEffect(() => {
    //     isAlreadyBookmarked(flashcards[currentIndex].WORD_ID)
    // }, [currentIndex]);
    

    return (
        <div style = {{backgroundImage: `url('/flashcards.jpg')`, zIndex: -1}}>
            <center><h1>Flashcard Viewer</h1></center>
            {flashcards.length > 0 && (
                <div style={{ border: '10px solid #ccc', 
                    borderRadius: '5px', padding: '10px', 
                    marginBottom: '20px', marginLeft: '250px', 
                    marginRight: '250px', backgroundColor: 'white'
                }}>
                    <h5 style={{ float: 'right' }}> CATEGORY: {flashcards[currentIndex].CATEGORY}</h5>
                    <h5><span style={{ color: 'red' }}>{'Card ' + (currentIndex+1) + ' of ' + totalRows}</span></h5>
                    {/* <h5 style={{ float: 'right' }}> <button className="btn btn-dark" onClick={() => {
                        if ( isAlreadyBookmarked(flashcards[currentIndex].WORD_ID) ) {
                            addOrRemoveBookmark('remove', flashcards[currentIndex].WORD_ID)
                        }
                        else {
                            addOrRemoveBookmark('add', flashcards[currentIndex].WORD_ID)
                        }
                    }}> {isAlreadyBookmarked(flashcards[currentIndex].WORD_ID) ? "Remove from Bookmarks 🔖" : "Add to Bookmarks 🔖"}</button> </h5> */}
                    <span> <h2><div style={{ color: 'red' }}>{flashcards[currentIndex].WORD_STRING} <h5 style={{ color: 'blue' }}> {flashcards[currentIndex].CATEGORY == 'VOCABULARY' ? ' [' + flashcards[currentIndex].PARTS_OF_SPEECH + ']' : ''} </h5> </div></h2> </span>
                    {showMeaning && <div style={{fontSize: '20px'}}> {flashcards[currentIndex].MEANING}</div>}
                    <p></p>
                    {showMeaning && flashcards[currentIndex].CATEGORY == 'VOCABULARY' && <div style={{fontSize: '17px' , color: 'green'}}> <i> {flashcards[currentIndex].EXAMPLE_SENTENCE} </i></div>}
                    <p></p>
                    <center>
                    {!showMeaning && <button className="btn btn-success" onClick={toggleMeaning}>Show Meaning</button>}
                    {showMeaning && <button className="btn btn-danger" onClick={toggleMeaning}>Hide Meaning</button>}
                    </center>
                    <p></p>
                    {localStorage.getItem('useremail_currently_logged_in') === 'admin@gmail.com' && <center><EditFlashcard todo={flashcards[currentIndex]} />  </center>}
                    {/* <h5> <button className="btn btn-dark">Add Notes 📑</button> </h5> */}
                    {/* <h5> <button className="btn btn-dark">Add Notes 📑</button> </h5> */}

                </div>
            )}
            <div> <center>
                {currentIndex > 0 && (
                    <button className="btn btn-light" style={{ marginRight: '10px' }} onClick={previousFlashcard}>Previous Card   </button>
                )}
                
                {currentIndex < flashcards.length - 1 && (
                    <button className="btn btn-light" style={{ marginRight: '10px' }} onClick={nextFlashcard}>   Next Card</button>
                )}
                <div></div><div></div><div></div> <p></p>
            </center>
            </div> <p></p>
            {/* {'ok!' + localStorage.getItem('username_currently_logged_in')} */}
            <h1> DISCUSSION SECTION { " [Difficulty: " + (DIFFICULTY == 'E' ? "Easy" : "Difficult") + "]" }
            <br/>
            {"(" + comments.length + " comments so far)"}</h1>
            
            {!showcomments && <div style={{textAlign: 'center'}}>
                <button className="btn btn-light" onClick={() => setshowcomments(true)}>
                    Click to load comments
                 </button>
                 <p></p>
            </div>
            }
            
            {showcomments && <div>
                <InputComment />
            </div>
            }
            {showcomments && <div style={{ border: '10px solid #ccc', 
                        borderRadius: '5px', padding: '10px', 
                        marginBottom: '20px', marginLeft: '350px', 
                        marginRight: '350px', backgroundColor: 'white'}}>
                            
                {comments.slice(0, visibleComments).map(com => (
                    <div> 
                        {/* <div style={{fontSize: '20px'}}  */}
                        <span style={{fontSize: '22px'}}> <b> {com.USER_NAME}  </b> </span>
                        <span style={{ float: 'right' }}> {formatDateToDDMonYYYY(com.DATE_OF_COMMENT)} </span>
                        {/* // </div> */}
                        <br />
                        {com.COMMENT_BODY}
                        <br/>
                        <button className="btn btn-outline-dark"> 0 👍 LIKE </button>
                        <p> <span style={{color: 'white'}}> . </span> </p> 
                        {/* <p> <span style={{color: 'white'}}> . </span> </p>  */}

                        {visibleComments < comments.length && (
                        <div style={{ textAlign: 'center' }}>
                            <button className="btn btn-warning" onClick={loadMoreComments}>
                                Load More Comments
                            </button>
                        </div>
                        )}

                    </div>

                    
                ))}
            </div>}

            {showcomments && <div style={{textAlign: 'center'}}>
            <button className="btn btn-warning" onClick={() => {
                setshowcomments(false); 
                setVisibleComments(5);
                }}>
                    Click to hide comments
            </button>
                 <p></p>
            </div>}

                <div></div><div></div><div></div>
            <center><h1> LIST OF WORDS IN THIS DECK </h1>
            {localStorage.getItem('useremail_currently_logged_in') === 'admin@gmail.com' && <AddNewWordModal />}
    
    </center>
    <table class="table table-bordered mt-5 table-dark table-striped table-sm table-responsive">
    <thead>
      <tr style={{ textAlign: 'center' }}>
        <th>WORD</th>
        <th>MEANING / SIGNIFICANCE</th>
        <th>CATEGORY</th>
        <th>DIFFICULTY</th>
        <th>PARTS OF SPEECH</th>
        <th style={{width: '25%'}}>EXAMPLE SENTENCE</th>
      </tr>
    </thead>

    <tbody style={{ textAlign: 'center' }}>
    {flashcards.slice(0, visibleCards).map(todo => (
        <tr key = {todo.WORD_ID}>
            <td>
                 {todo.WORD_STRING}
            </td> 
            {/*table attribute like DESCRIPTIONN must be in upper case*/}
            <td> {todo.MEANING}  </td>
            <td> {todo.CATEGORY}  </td>
            <td> {todo.DIFFICULTY == "E" ? "EASY" : "DIFFICULT"} </td>
            <td>  {todo.CATEGORY == "VOCABULARY" ? todo.PARTS_OF_SPEECH : '-'} </td>
            <td> {todo.CATEGORY == "VOCABULARY" ? todo.EXAMPLE_SENTENCE : '-'} </td>
            {/* <td> <EditMedicine todo={todo} /> </td> */}
            {localStorage.getItem('useremail_currently_logged_in') === 'admin@gmail.com' && <td> <EditFlashcard todo={todo} /> </td>}
            {localStorage.getItem('useremail_currently_logged_in') === 'admin@gmail.com' && <td> 
                <button className="btn btn-danger" onClick={() => deleteFlashcard(todo.WORD_ID)}>
                 Delete </button> 
            </td>}
            {/* <td> DELETE </td> */}
        </tr>
    ))}

    </tbody>
    </table>

    
    <center> 
    {visibleCards < flashcards.length && (
                        <div style={{ textAlign: 'center' }}>
                            <button className="btn btn-warning" onClick={loadMoreCards}>
                                Load More Cards in this Deck
                            </button>
                        </div>
                        )}
    </center>





<p> . </p>
 <p> . </p><p> . </p><p> . </p><p> . </p><p> . </p><p> . </p><p> . </p><p> . </p>



</div> 
    
);

}

export default FlashcardsEasy;