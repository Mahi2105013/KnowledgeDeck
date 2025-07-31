import React, { Fragment, useEffect, useState } from "react";
import {motion} from 'framer-motion'
import Swal from 'sweetalert2';
import AddNewWordSectionModal from "./AddNewWordSection";
// import EditFlashcard from "./EditFlashcard";
// import AddNewWordModal from "./InputFlashcard";
import EditNoteSection from "./NoteSection";
import BookmarkSection from "./BookmarkSection";

const SectionWiseWords = () => {
  const [flashcards, setFlashCards] = useState([]);
  const [category, setCategory] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [searchedflashcards, setsearchedFlashCards] = useState([]);
  const [WORD_STRING_SEARCH, setWORD_STRING_SEARCH] = useState(""); 
  const [WORD_MEANING_SEARCH, setWORD_MEANING_SEARCH] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalRows, setTotalRows] = useState(-1)
  const [rowsFetched, setRowsFetched] = useState(-1)
  const [showMeaning, setShowMeaning] = useState(false);

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

  const handleDelete = async (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete permanently!'
    }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                const response = await fetch(`http://localhost:5000/sectionwisewords/${id}`, {
                  method: "DELETE"
                });
          
                if (response.ok) {
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  ).then(async (result) => {
                    if(result.isConfirmed) setFlashCards(prevCards => prevCards.filter(card => card.WORD_ID !== id));
                  });
                } else {
                  console.log(`Error deleting flashcard with ID ${id}`);
                }
              } catch (error) {
                console.log(error);
              }
            }
        })
      };  

  const getFlashcards = async () => {
    try {      
      const category = localStorage.getItem('section_category');
      setCategory(category);
      const img = localStorage.getItem('section_image');
      setCategoryImage(img);
      console.log(categoryImage)
      const response = await fetch(`http://localhost:5000/sectionwisewords?category=${category}`);      
      const jsonData = await response.json();            
      
      setFlashCards(jsonData)
      setTotalRows(jsonData.length)
      setRowsFetched(jsonData.length)

      console.log('here are the flashcards!')
      console.log(flashcards)
      setsearchedFlashCards(jsonData)
    } catch (error) {
      console.error(error.message);
    }
  };

  const Searcher = async e => {
    e.preventDefault();
    try {
        const category = localStorage.getItem('section_category')
        const response = await fetch(`http://localhost:5000/sectionwisewordsearch/?WORD_STRING_SEARCH=${WORD_STRING_SEARCH}&WORD_MEANING_SEARCH=${WORD_MEANING_SEARCH}&category=${category}`);
        const parseResponse = await response.json();
        setRowsFetched(parseResponse.length)

        setsearchedFlashCards(parseResponse);
        console.log(parseResponse);
    } catch (err) {
    console.error(err.message);
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
    <div style={{
      //backgroundImage: `url('https://th.bing.com/th/id/R.de849f4c948af44d4a0524ea314f6041?rik=%2f8%2fb9Gr4iXG5gA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fd%2fb%2f0%2f572445.jpg&ehk=QWUD1TpQMYhugRwjTX1p039nNHjoKaefwdo4kQQsmvA%3d&risl=&pid=ImgRaw&r=0')`,
      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(${categoryImage})`,
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
    <div
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
        }}
    >

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h5><span style={{ color: 'red' }}>{`Card ${currentIndex + 1} of ${totalRows}`}</span></h5>
            <span style={{color: 'black', textAlign: 'left'}}> <BookmarkSection todo={flashcards[currentIndex]} /> </span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: showMeaning ? '10px' : '0' }}>
            <h2 style={{ margin: '0' }}>
                <span style={{ color: 'red' }}>{flashcards[currentIndex].WORD_STRING}</span>
                &nbsp;
                <button className="btn btn-light"
                    onClick={() => {
                      console.log(flashcards)
                      window.speechSynthesis.speak(new SpeechSynthesisUtterance(flashcards[currentIndex].WORD_STRING))
                    }}>
                    🔊🎤 
                </button>
            </h2>
        </div>

        {showMeaning && (
            <div style={{ marginBottom: '10px' }}>
                <h5 style={{ color: 'black', marginTop: '10px' }}>{flashcards[currentIndex].MEANING}</h5>
                <div style={{ fontSize: '17px', color: 'green', marginTop: '10px' }}>
                    <i>{flashcards[currentIndex].EXAMPLE_SENTENCE}</i>
                </div>
                <h5 style={{ color: 'brown', marginTop: '10px' }}>CATEGORY: {flashcards[currentIndex].CATEGORY}</h5>
            </div>
        )}
        {!showMeaning && <p></p>}
        <div style={{ textAlign: 'center', marginTop: showMeaning ? '10px' : '0' }}>
            <button className={`btn ${showMeaning ? 'btn-danger' : 'btn-success'}`} onClick={toggleMeaning}>
                {showMeaning ? 'Hide Meaning' : 'Show Meaning'}
            </button>
            &nbsp;&nbsp;
            {showMeaning && (
                <>
                    <EditNoteSection todo={flashcards[currentIndex]} />  
                    &nbsp;&nbsp;
                </>
            )}
            {/*
            {localStorage.getItem('useremail_currently_logged_in') === 'admin@gmail.com' && (
                <>
                    <EditFlashcard todo={flashcards[currentIndex]} />
                    &nbsp;&nbsp;
                </>
            )}

            {localStorage.getItem('useremail_currently_logged_in') !== 'admin@gmail.com' && flashcards[currentIndex].CUSTOMBOOL === null && (
                <>
                    <EditFlashcard todo={flashcards[currentIndex]} />
                    &nbsp;&nbsp;
                </>
            )} */}

            {showMeaning && (
                <button className="btn btn-success"
                    onClick={() => {
                        navigator.clipboard.writeText(flashcards[currentIndex].WORD_STRING.toUpperCase() + ": " + flashcards[currentIndex].MEANING);
                        handleClick();
                    }}>
                    {buttonText}
                </button>
            )}
        </div>
      </div>
    )}

    </center>


      <div style={{ textAlign: 'center', margin: '20px' }}>
        {currentIndex > 0 && (
          <button className="btn btn-light" style={{ marginRight: '10px' }} onClick={previousFlashcard}>
            Previous Card
          </button>
        )}
        {currentIndex < flashcards.length - 1 && (
          <button className="btn btn-light" style={{ marginLeft: '10px' }} onClick={nextFlashcard}>
            Next Card
          </button>          
        )}
        {localStorage.getItem('useremail_currently_logged_in') === 'admin@gmail.com' && <span style={{marginLeft: '10px'}}> <AddNewWordSectionModal/> </span>}
        {/* <span style={{marginLeft: '10px'}}> <AddNewCustomWordModal/> </span> */}
      </div>

      <div>
            <center>
                <h1 style={titleStyle2}>LIST OF WORDS IN THIS DECK</h1>
            </center>

            <form onSubmit={Searcher} className="text-center" style={{ backgroundColor: 'rgba(40,167,69,0.1)', padding: '20px', borderRadius: '10px' }}>
                <div style={formGroupStyle}>
                    <label htmlFor="WORD_STRING">WORD/PHRASE:</label>
                    <input
                        type="text"
                        name="WORD_STRING"
                        style={inputStyle}
                        placeholder="Enter word/phrase to search..."
                        value={WORD_STRING_SEARCH}
                        onChange={e => setWORD_STRING_SEARCH(e.target.value)}
                    />
                    <label htmlFor="MEANING">MEANING/SIGNIFICANCE:</label>
                    <input
                        type="text"
                        name="MEANING"
                        style={inputStyle}
                        placeholder="Enter meaning/significance to search..."
                        value={WORD_MEANING_SEARCH}
                        onChange={e => setWORD_MEANING_SEARCH(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" style={buttonStyle}>SEARCH FOR A WORD</button>
            </form>

            <center>
                {rowsFetched !== -1 && rowsFetched !== 0 && rowsFetched !== totalRows ? `Number of matching results: ${rowsFetched}` : ""}
                {rowsFetched === 0 ? "No results matched" : ""}
            </center>

            <table style={tableStyle} className="table table-bordered mt-2 table-condensed table-striped table-sm table-responsive">
                <thead style={tableHeaderStyle}>
                    <tr>
                        <th>Word/Phrase</th>
                        <th>Meaning</th>
                        <th>Pronounce</th>
                        <th>Bookmark</th>
                        <th>Edit Note</th>
                        {/* {localStorage.getItem('useremail_currently_logged_in') === 'admin@gmail.com' && <th>Edit</th>} */}
                        {localStorage.getItem('useremail_currently_logged_in') === 'admin@gmail.com' && <th>Delete</th>} 
                    </tr>
                </thead>
                <tbody style={tableRowStyle}>
                    {searchedflashcards.map(todo => (
                        <tr key={todo.WORD_ID}>
                            <td>{todo.WORD_STRING}</td>
                            <td>{todo.CATEGORY === "VOCABULARY" ? `[${todo.PARTS_OF_SPEECH}] ` : ''}{todo.MEANING}</td>
                            <td>
                                <button className="btn btn-light" onClick={() => window.speechSynthesis.speak(new SpeechSynthesisUtterance(todo.WORD_STRING + '. ' + todo.MEANING))}> 🔊🎤 </button>
                            </td>
                            <td><BookmarkSection todo={todo} /></td>
                            <td><EditNoteSection todo={todo} /></td>
                            {localStorage.getItem('useremail_currently_logged_in') === 'admin@gmail.com' && (
                                <>
                                    {/* <td><EditFlashcard todo={todo} /> </td> */}
                                    <td> <button className="btn btn-danger" onClick={() => handleDelete(todo.WORD_ID)}>Delete</button> </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <center>
                    <div style={{ marginTop: '20px' }}>
                        {/* {localStorage.getItem('useremail_currently_logged_in') === 'admin@gmail.com' && <AddNewWordModal/>}
                        <span style={{marginLeft: '10px'}}> <AddNewCustomWordModal/> </span> */}
                    </div>
            </center>
        </div>
    </div>
  );
};

const titleStyle = {
    fontSize: '3rem',
    color: 'black',
    marginBottom: '40px'
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

export default SectionWiseWords;