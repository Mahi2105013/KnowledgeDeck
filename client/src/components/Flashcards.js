import React, { Fragment, useEffect, useState } from "react";
import {motion, AnimatePresence} from 'framer-motion'
import Swal from 'sweetalert2';
import EditFlashcard from "./EditFlashcard";
import AddNewWordModal from "./InputFlashcard";
import InputComment from "./InputComment";
import EditNote from "./EditNote";
import Bookmark from "./Bookmark";
import AddNewCustomWordModal from "./InputFlashcardCustom";
import EditComment from "./EditComment";
// import InteractiveLottie from "./InteractiveLottie";

let rowsFetched = -1;
let totalRows = 0;

const titleStyle = {
  fontSize: '3rem',
  color: 'black',
  marginBottom: '40px'
};

const Flashcards = () => {
  const [flashcards, setFlashCards] = useState([]);
  const [searchedflashcards, setsearchedFlashCards] = useState([]);
  const [WORD_STRING_SEARCH, setWORD_STRING_SEARCH] = useState(""); 
  const [WORD_MEANING_SEARCH, setWORD_MEANING_SEARCH] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalRows, setTotalRows] = useState(-1)
  const [showMeaning, setShowMeaning] = useState(false);
  const [difficulty, setDifficulty] = useState('');
  const [sortingOfComments, setsortingOfComments] = useState('Latest first');
  const [visibleComments, setVisibleComments] = useState(5);
  const commentsPerLoad = 10;
  const [visibleCards, setVisibleCards] = useState(10);
  const cardsPerLoad = 30;

  const handleSortingChange = (e) => {
    const value = e.target.value;
    setsortingOfComments(value)
    
    comments.sort((a, b) => {
      let dateA = new Date(a.DATE_OF_COMMENT);
      let dateB = new Date(b.DATE_OF_COMMENT);
      if (value === 'Earliest First') return dateA - dateB; // Ascending order
      else return dateB - dateA; // Descending order, if you prefer
    });
  };

  const loadMoreComments = () => {
    setVisibleComments(visibleComments + commentsPerLoad);
  };

  const loadMoreCards = () => {
    setVisibleCards(visibleCards + cardsPerLoad);
  };

  const nextFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalRows);
    setShowMeaning(false);
  };

  const previousFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalRows) % totalRows);
    setShowMeaning(false);
  };

  const toggleMeaning = () => {
    setShowMeaning(!showMeaning);
  };

  /*const deleteFlashcard = async (WORD_ID) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete?");
      if (!confirmed) return;

      const deletedBy = localStorage.getItem('username_currently_logged_in');
      const response = await fetch(`http://localhost:5000/flashcards/${WORD_ID}?deletedBy=${deletedBy}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setFlashCards(prevCards => prevCards.filter(card => card.WORD_ID !== WORD_ID));
        window.location.reload();
      } else {
        console.error(`Error deleting flashcard with ID ${WORD_ID}`);
      }
    } catch (error) {
      console.error(error);
    }
  };*/

  /*const deleteComment = async (COMMENT_ID) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete?");
      if (!confirmed) return;

      const response = await fetch(`http://localhost:5000/comments/${COMMENT_ID}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setComments(comments => comments.filter(com => com.COMMENT_ID !== COMMENT_ID));
      } else {
        console.error(`Error deleting comment`);
      }
    } catch (error) {
      console.error(error);
    }
  };*/

  const handleDelete = async (string, id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            // Perform the delete action here
            if(string === 'comment') {
              try {
                const response = await fetch(`http://localhost:5000/comments/${id}`, {
                  method: "DELETE"
                });
          
                if (response.ok) {
                  setComments(comments => comments.filter(com => com.COMMENT_ID !== id));
                } else {
                  console.error(`Error deleting comment`);
                }
              } catch (error) {
                console.error(error);
              }
            }
            
            else if(string === 'flashcard') {
              try {
                const deletedBy = localStorage.getItem('username_currently_logged_in');
                const response = await fetch(`http://localhost:5000/flashcards/${id}?deletedBy=${deletedBy}`, {
                  method: "DELETE"
                });
          
                if (response.ok) {
                  setFlashCards(prevCards => prevCards.filter(card => card.WORD_ID !== id));
                } else {
                  console.error(`Error deleting flashcard with ID ${id}`);
                }
              } catch (error) {
                console.error(error);
              }
            }
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            );
        }
    });
  };  

  const getFlashcards = async () => {
    try {
      setShowComments(false);
      await getComments();
      
      const USER_ID = localStorage.getItem('userid_currently_logged_in');
      const storedDifficulty = localStorage.getItem('difficulty');
      setDifficulty(storedDifficulty);

      const response = await fetch(`http://localhost:5000/flashcards?difficulty=${storedDifficulty}`);
      
      const jsonData = await response.json();
      // setFlashCards(jsonData);
      // setTotalRows(jsonData.length)
      
      const responseCustom = await fetch(`http://localhost:5000/flashcardscustom?USER_ID=${USER_ID}&storedDifficulty=${storedDifficulty}`);

      const jsonDataCustom = await responseCustom.json();
      // totalRows = jsonData.length;
      
      const x = jsonData.concat(jsonDataCustom)
      setFlashCards(x)
      setsearchedFlashCards(x)
      setTotalRows(jsonData.length + jsonDataCustom.length)
      // console.log('custombool' + flashcards[60].CUSTOMBOOL)
      // setFlashCards((jsonDataCustom))
      // setTotalRows(jsonDataCustom.length)

      // setsearchedFlashCards(jsonData.concat(jsonDataCustom))
    } catch (error) {
      console.error(error.message);
    }
  };

  const Searcher = async e => {
    e.preventDefault();
    try {
    const difficulty = localStorage.getItem('difficulty')
    const response = await fetch(`http://localhost:5000/flashcardsearch/?WORD_STRING_SEARCH=${WORD_STRING_SEARCH}&WORD_MEANING_SEARCH=${WORD_MEANING_SEARCH}&difficulty=${difficulty}`);
    const parseResponse = await response.json();
    rowsFetched = parseResponse.length

    parseResponse.sort((a, b) => {
      return a.WORD_STRING.localeCompare(b.WORD_STRING)
    });

    setsearchedFlashCards(parseResponse);

    } catch (err) {
    console.error(err.message);
    } 
};


  const getComments = async () => {
    try {
      const storedDifficulty = localStorage.getItem('difficulty');
      const response = await fetch(`http://localhost:5000/comments?storedDifficulty=${encodeURIComponent(storedDifficulty)}`);
      const jsonData = await response.json();

      setComments(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const [buttonText, setButtonText] = useState('Copy to Clipboard');
  const handleClick = () => {
      setButtonText('Copied! ✅');
      setTimeout(() => {
        setButtonText('Copy to Clipboard');
      }, 1000);
  };

  const formatDateToDDMonYYYY = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    getFlashcards();

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextFlashcard();
      } else if (e.key === 'ArrowLeft') {
        previousFlashcard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, flashcards.length]);



  const [isOpen, setIsOpen] = useState(false)
  const [flipped, setFlipped] = useState(false);

    const handleClick2 = () => {
        setFlipped(!flipped);
    };

  return (
    <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 80 }}
    transition={{ duration: 1.5 }}
    style={{
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
      <center>
        <h1 style={titleStyle}>Flashcard Viewer</h1>    
        {flashcards.length > 0 && (
        <motion.div
        style={{
            width: '60%',
            backgroundColor: '#fff',
            border: '2px solid #ccc',
            borderRadius: '10px',
            padding: '15px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden', // Ensure content doesn't overflow during animation
        }}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
    >
        <AnimatePresence mode="wait">
            <motion.div
                key={currentIndex} // Key helps in tracking which card is currently active
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.4 }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h5><span style={{ color: 'red' }}>{`Card ${currentIndex + 1} of ${flashcards.length}`}</span></h5>
                    <span style={{ color: 'black', textAlign: 'left' }}> <Bookmark todo={flashcards[currentIndex]} /> </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: showMeaning ? '10px' : '0' }}>
                    <h2 style={{ margin: '0' }}>
                        <span style={{ color: 'red' }}>{flashcards[currentIndex].WORD_STRING}</span>
                        &nbsp;
                        <motion.button  
                        whileHover={{ scale: [1, 1.05, 1], transition: { duration: 0.6, repeat: Infinity } }}
                        whileTap={{ scale: 0.9 }}
                        style={{backgroundColor: '#acb0b7'}}
                        className="btn"
                            onClick={() => {
                                window.speechSynthesis.speak(new SpeechSynthesisUtterance(flashcards[currentIndex].WORD_STRING))
                            }}>
                            🔊
                        </motion.button>
                    </h2>
                    {flashcards[currentIndex].CATEGORY === 'VOCABULARY' && <span style={{ color: 'blue', fontSize: '20px', marginTop: '5px' }}>
                        [{flashcards[currentIndex].PARTS_OF_SPEECH}]
                    </span>}
                </div>

                <AnimatePresence>
                    {showMeaning && (
                        <motion.div
                            style={{ marginBottom: '10px' }}
                            initial={{ height: 0, opacity: 0, scale: 0.9, y: -20 }}
                            animate={{ height: 'auto', opacity: 1, scale: 1, y:0 }}
                            exit={{ height: 0, opacity: 0, scale: 0.9, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h5 style={{ color: 'black', marginTop: '10px' }}>{flashcards[currentIndex].MEANING}</h5>
                            {flashcards[currentIndex].CATEGORY === 'VOCABULARY' && (
                                <div style={{ fontSize: '17px', color: 'green', marginTop: '10px' }}>
                                    <i>{flashcards[currentIndex].EXAMPLE_SENTENCE}</i>
                                </div>
                            )}
                            <h5 style={{ color: 'brown', marginTop: '10px' }}>CATEGORY: {flashcards[currentIndex].CATEGORY}</h5>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div style={{ textAlign: 'center', marginTop: !showMeaning ? '10px' : '0' }}>
                    <motion.button  
                        whileHover={{ scale: [1, 1.05, 1], transition: { duration: 0.6, repeat: Infinity } }}
                        whileTap={{ scale: 0.9 }}
                        className={`btn ${showMeaning ? 'btn-danger' : 'btn-success'}`} onClick={toggleMeaning}>
                        {showMeaning ? 'Hide Meaning' : 'Show Meaning'}
                    </motion.button>
                    &nbsp;&nbsp;
                    {showMeaning && (
                        <span style={{ color: 'black', textAlign: "left" }}>
                            <EditNote todo={flashcards[currentIndex]} />
                            &nbsp;&nbsp;
                        </span>
                    )}

                    {((localStorage.getItem('useremail_currently_logged_in') === 'admin@gmail.com' && flashcards[currentIndex].CUSTOMBOOL === 0) || (localStorage.getItem('userid_currently_logged_in') === flashcards[currentIndex].USER_ID && flashcards[currentIndex].CUSTOMBOOL === 1)) && (
                        <span style={{ textAlign: 'left' }}>
                            <EditFlashcard todo={flashcards[currentIndex]} />
                            &nbsp;&nbsp;
                        </span>
                    )}

                    {flashcards[currentIndex].CUSTOMBOOL === 1 && (
                        <>
                            <EditFlashcard todo={flashcards[currentIndex]} />
                            &nbsp;&nbsp;
                        </>
                    )}

                    {showMeaning && (
                        <motion.button
                            className="btn btn-success"
                            onClick={() => {
                                navigator.clipboard.writeText(flashcards[currentIndex].WORD_STRING.toUpperCase() + ": " + flashcards[currentIndex].MEANING);
                                handleClick();
                            }}
                            whileHover={{ scale: [1, 1.05, 1], transition: { duration: 0.6, repeat: Infinity } }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {buttonText}
                        </motion.button>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    </motion.div>
  )
  }

    </center>

    <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {currentIndex > 0 && ( <motion.button
                className="btn btn-light"
                onClick={previousFlashcard}
                whileHover={{ scale: [1, 1.05, 1], transition: { duration: 0.6, repeat: Infinity } }}
                whileTap={{ scale: 0.9 }}
                style={{marginLeft: '10px'}}
            >
                Previous Card
            </motion.button> )}
            {currentIndex < flashcards.length - 1 && ( <motion.button
                className="btn btn-light"
                onClick={nextFlashcard}
                whileHover={{ scale: [1, 1.05, 1], transition: { duration: 0.6, repeat: Infinity } }}
                whileTap={{ scale: 0.9 }}
                style={{marginLeft: '10px'}}
            >
                Next Card
            </motion.button> )}
            {localStorage.getItem('useremail_currently_logged_in') === 'admin@gmail.com' && <span style={{marginLeft: '10px'}}> <AddNewWordModal/> </span>}
            <span style={{marginLeft: '10px'}}> <AddNewCustomWordModal/> </span>
        </div>


      <div style={{ textAlign: 'center', margin: '20px' }}>
      </div>

      <div style={{
      maxWidth: '1200px',
      margin: 'auto',
      padding: '20px'
    }}>
      <center>
        <h1 style={{
          color: '#343a40',
          fontSize: '2.5rem',
          marginBottom: '20px'
        }}>
          List of Words in This Deck
        </h1>
      </center>

      <form onSubmit={Searcher} style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <input
            type="text"
            name="WORD_STRING"
            style={{
              flex: '1',
              padding: '10px',
              fontSize: '1rem',
              borderRadius: '5px',
              border: '1px solid #ced4da',
              minWidth: '200px'
            }}
            placeholder="Search by word/phrase..."
            value={WORD_STRING_SEARCH}
            onChange={e => setWORD_STRING_SEARCH(e.target.value)}
          />
          <input
            type="text"
            name="MEANING"
            style={{
              flex: '1',
              padding: '10px',
              fontSize: '1rem',
              borderRadius: '5px',
              border: '1px solid #ced4da',
              minWidth: '200px'
            }}
            placeholder="Search by meaning/significance..."
            value={WORD_MEANING_SEARCH}
            onChange={e => setWORD_MEANING_SEARCH(e.target.value)}
          />
          <motion.button 

whileHover={{ scale: [1, 1.05, 1], transition: { duration: 0.6, repeat: Infinity } }}
                        whileTap={{ scale: 0.9 }}
type="submit"
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              borderRadius: '5px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              minWidth: '150px'
            }}
          >
            Search
          </motion.button>
        </div>
      </form>

      <center>
        {rowsFetched !== -1 && rowsFetched !== 0 && rowsFetched !== totalRows && (
          <p style={{
            fontSize: '1.2rem',
            color: 'black',
            backgroundColor: 'white'
          }}>
            Number of matching results: {rowsFetched}
          </p>
        )}
        {rowsFetched === 0 && (
          <p style={{
            fontSize: '1.2rem',
            color: '#dc3545'
          }}>
            No results matched
          </p>
        )}
      </center>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
      }}>
        <thead style={{
          backgroundColor: '#343a40',
          color: '#ffffff'
        }}>
          <tr style={{
              padding: '10px',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
            <th>Word/Phrase</th>
            <th>Meaning</th>
            <th>Pronounce</th>
            <th>Bookmark</th>
            <th>Edit Note</th>
            {localStorage.getItem('useremail_currently_logged_in') === 'admin@gmail.com' && (
              <>
                <th>Edit</th>
                <th>Delete</th>
              </>
            )}
          </tr>
        </thead>
        <tbody style={{backgroundColor: 'white', color: 'black'}}>
        <AnimatePresence>
          {searchedflashcards.slice(0, visibleCards).map(todo => (
            <motion.tr key={todo.WORD_ID}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, height: 0 }}
            style={{ borderBottom: '1px solid #dee2e6' }}>
              <td style={{
                padding: '10px'
              }}>{todo.WORD_STRING}</td>
              <td style={{
                padding: '10px'
              }}>{todo.CATEGORY === "VOCABULARY" ? `[${todo.PARTS_OF_SPEECH}] ` : ''}{todo.MEANING}</td>
              <td style={{
                padding: '10px'
              }}>
                <motion.button  
                whileHover={{ scale: [1, 1.05, 1], transition: { duration: 0.6, repeat: Infinity } }}
                        whileTap={{ scale: 0.9 }}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#007bff',
                  filter: 'brightness(50%)'
                }} onClick={() => window.speechSynthesis.speak(new SpeechSynthesisUtterance(todo.WORD_STRING + '. ' + todo.MEANING))}>
                  🔊🎤
                </motion.button>
              </td>
              <td style={{
                padding: '10px'
              }}><Bookmark todo={todo} /></td>
              <td style={{
                padding: '10px'
              }}><EditNote todo={todo} /></td>
              {((localStorage.getItem('useremail_currently_logged_in') === 'admin@gmail.com' && todo.CUSTOMBOOL === 0) ||
                (todo.CUSTOMBOOL === 1 && localStorage.getItem('userid_currently_logged_in') === todo.USER_ID)) && (
                <>
                  <td style={{
                    padding: '10px'
                  }}><EditFlashcard todo={todo} /> </td>
                  <td style={{
                    padding: '10px'
                  }}> 
                    <motion.button  
                    whileHover={{ scale: [1, 1.05, 1], transition: { duration: 0.6, repeat: Infinity } }}
                        whileTap={{ scale: 0.9 }}
                    className="btn btn-danger" onClick={() => handleDelete('flashcard', todo.WORD_ID)}>
                      Delete
                    </motion.button> 
                  </td>
                </>
              )}
            </motion.tr>
          ))}
          </AnimatePresence>
        </tbody>
      </table>

      <center>
        {visibleCards < flashcards.length && (
          <div style={{
            marginTop: '20px'
          }}>
            <motion.button
            whileHover={{ scale: [1, 1.05, 1], transition: { duration: 0.6, repeat: Infinity } }}
                        whileTap={{ scale: 0.9 }}
            lassName="btn btn-warning" onClick={loadMoreCards} style={{
              padding: '10px 20px',
              fontSize: '1rem',
              borderRadius: '5px',
              backgroundColor: '#ffc107',
              color: '#000',
              border: 'none',
              cursor: 'pointer'
            }}>
              Load More Cards in this Deck
            </motion.button>  
            &nbsp;&nbsp;
            {localStorage.getItem('useremail_currently_logged_in') === 'admin@gmail.com' && <AddNewWordModal/>}
            <span style={{
              marginLeft: '10px',
              padding: '10px 20px',
              fontSize: '1rem',
              borderRadius: '5px',
              color: '#000',
              border: 'none',
              cursor: 'pointer'
            }}> <AddNewCustomWordModal/> </span>
          </div>
        )}
      </center>
    </div>

      <h1 style={titleStyle}>
        DISCUSSION SECTION {`[Difficulty: ${difficulty === 'E' ? 'Easy' : difficulty == 'D' ? 'Difficult' : 'Intermediate'}]`}
        <br />
        <div style={{fontSize: '22px'}}> {`(${comments.length} comments so far)`}</div>
      </h1>

      {!showComments ? (
        <div style={{ textAlign: 'center', color: 'black' }}>
          <button  className="btn btn-light" onClick={() => setShowComments(true)}>
            Click to load comments
          </button>
        </div>
      ) : (
        <Fragment>
          <InputComment />
          <div style={{  
                    borderRadius: '5px', padding: '10px', 
                    color: 'black',
                    marginBottom: '20px', marginLeft: '400px', 
                    marginRight: '400px', backgroundColor: 'white',
                    textAlign: 'center'  }}
          >
                Sort comments by: <select
                value={
                  sortingOfComments === 'Latest First' ? 'Latest First' : 'Earliest First'
                }
                onChange={handleSortingChange}
                >
                <option value="Latest First" selected>Latest First</option>
                <option value="Earliest First">Earliest First</option>
                </select>
          </div>

          <div style={{
            border: '2px solid #ccc',
            borderRadius: '10px',
            padding: '20px',
            margin: '20px auto',
            color: 'black',
            width: '80%',
            backgroundColor: '#fff'
          }}>
            {comments.slice(0, visibleComments).map(com => (
              <div key={com.USER_NAME + com.DATE_OF_COMMENT} style={{ marginBottom: '15px' }}>
                <span style={{ fontSize: '22px', fontWeight: 'bold' }}>{com.USER_NAME}</span>
                <span style={{ float: 'right' }}>{formatDateToDDMonYYYY(com.DATE_OF_COMMENT)}</span>
                <p>{com.COMMENT_BODY}</p>
                <div className="d-flex">
                <button  className="btn btn-outline-dark">0 👍 LIKE</button>
                &nbsp;&nbsp;
                { com.USER_NAME === localStorage.getItem('username_currently_logged_in') &&
                <EditComment comment={com.COMMENT_ID} body={com.COMMENT_BODY}/>}
                &nbsp;&nbsp;
                { (com.USER_NAME === localStorage.getItem('username_currently_logged_in') || localStorage.getItem('username_currently_logged_in') === 'admin') &&
                // <button  className="btn btn-outline-danger" onClick={() => deleteComment(com.COMMENT_ID)}>Delete Comment</button> }
                <button  className="btn btn-outline-danger" onClick={() => handleDelete('comment', com.COMMENT_ID)}>Delete Comment</button> }
                
                </div>
              </div>
            ))}
            {visibleComments < comments.length && (
              <div style={{ textAlign: 'center' }}>
                <button  className="btn btn-warning" onClick={loadMoreComments}>
                  Load More Comments
                </button>
              </div>
            )}

          </div>
          <div style={{ textAlign: 'center' }}>
            <button  className="btn btn-warning" onClick={() => {
              setShowComments(false);
              setVisibleComments(5);
            }}>
              Click to hide comments
            </button>
          </div>
        </Fragment>
      )}

    </motion.div>
  );
};

const titleStyle2 = {
  color: '#2c3e50',
  fontWeight: 'bold',
  fontFamily: 'Arial, sans-serif',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  marginTop: '20px',
};

const formGroupStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '20px 0',
};

const inputStyle = {
  width: '300px',
  height: '40px',
  margin: '0 10px',
  padding: '5px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '16px',
  textAlign: 'center',
};

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#3498db',
  color: 'white',
  fontSize: '16px',
  cursor: 'pointer',
};

const tableStyle = {
  width: '90%',
  margin: 'auto',
  marginTop: '50px',
  borderCollapse: 'collapse',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const tableHeaderStyle = {
  backgroundColor: '#34495e',
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
};

const tableRowStyle = {
  textAlign: 'center',
  padding: '15px 10px',
};

export default Flashcards;