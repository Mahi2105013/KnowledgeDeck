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
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${categoryImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    padding: '20px',
    color: '#fff',
    minHeight: '100vh',
    fontFamily: "'Poppins', sans-serif"
  }}>
    {/* Animated Header */}
    <div style={{
      textAlign: 'center',
      marginBottom: '40px',
      animation: 'fadeInDown 1s ease'
    }}>
      <h1 style={{
        fontSize: '3.5rem',
        color: '#fff',
        marginBottom: '20px',
        textShadow: '0 4px 8px rgba(0,0,0,0.3)',
        fontWeight: '700',
        background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block',
        padding: '0 20px'
      }}>Flashcard Viewer</h1>
      <div style={{
        height: '4px',
        width: '100px',
        background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
        margin: '0 auto',
        borderRadius: '10px'
      }}></div>
    </div>

    {/* Main Flashcard Container */}
    {flashcards.length > 0 && (
      <div style={{
        width: '70%',
        minWidth: '300px',
        maxWidth: '800px',
        margin: '0 auto 40px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: 'none',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
        transform: 'translateY(0)',
        ':hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
        },
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
        {/* Card Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '20px',
          alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            padding: '5px 15px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 0, 0, 0.3)'
          }}>
            <h5 style={{ 
              margin: '0',
              color: '#ff4757',
              fontWeight: '600'
            }}>
              Card {currentIndex + 1} of {totalRows}
            </h5>
          </div>
          <div style={{color: 'black'}}>
            <BookmarkSection todo={flashcards[currentIndex]} />
          </div>
        </div>
        
        {/* Word Section */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          marginBottom: showMeaning ? '30px' : '0',
          padding: '20px 0',
          borderBottom: showMeaning ? '1px dashed #eee' : 'none'
        }}>
          <h2 style={{ 
            margin: '0 0 15px 0',
            fontSize: '2.5rem',
            textAlign: 'center'
          }}>
            <span style={{ 
              color: '#ff4757',
              fontWeight: '700',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {flashcards[currentIndex].WORD_STRING}
            </span>
            <button 
              className="btn"
              onClick={() => {
                console.log(flashcards)
                window.speechSynthesis.speak(new SpeechSynthesisUtterance(flashcards[currentIndex].WORD_STRING))
              }}
              style={{
                marginLeft: '15px',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                border: '1px solid rgba(52, 152, 219, 0.3)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'inline-flex',
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
        </div>

        {/* Meaning Section */}
        {showMeaning && (
          <div style={{ 
            marginBottom: '30px',
            padding: '20px',
            backgroundColor: 'rgba(245, 245, 245, 0.8)',
            borderRadius: '15px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
          }}>
            <h5 style={{ 
              color: '#2f3542',
              marginTop: '0',
              fontSize: '1.2rem',
              lineHeight: '1.6',
              fontWeight: '500'
            }}>
              {flashcards[currentIndex].MEANING}
            </h5>
            <div style={{ 
              fontSize: '1.1rem',
              color: '#2ecc71',
              marginTop: '20px',
              fontStyle: 'italic',
              padding: '15px',
              backgroundColor: 'rgba(46, 204, 113, 0.05)',
              borderRadius: '10px',
              borderLeft: '4px solid #2ecc71'
            }}>
              <i>{flashcards[currentIndex].EXAMPLE_SENTENCE}</i>
            </div>
            <div style={{
              marginTop: '20px',
              padding: '10px',
              backgroundColor: 'rgba(155, 89, 182, 0.05)',
              borderRadius: '10px',
              borderLeft: '4px solid #9b59b6'
            }}>
              <h5 style={{ 
                color: '#9b59b6',
                margin: '0',
                fontWeight: '600'
              }}>
                CATEGORY: {flashcards[currentIndex].CATEGORY}
              </h5>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '20px',
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
            {showMeaning ? 'Hide Meaning' : 'Show Meaning'}
          </button>
          
          {showMeaning && (
            <>
              <EditNoteSection todo={flashcards[currentIndex]} />
              
              <button 
                className="btn"
                onClick={() => {
                  navigator.clipboard.writeText(flashcards[currentIndex].WORD_STRING.toUpperCase() + ": " + flashcards[currentIndex].MEANING);
                  handleClick();
                }}
                style={{
                  padding: '12px 25px',
                  borderRadius: '30px',
                  border: 'none',
                  backgroundColor: '#3498db',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  ':hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                    backgroundColor: '#2980b9'
                  }
                }}
              >
                {buttonText}
              </button>
            </>
          )}
        </div>
      </div>
    )}

    {/* Navigation Buttons */}
    <div style={{ 
      textAlign: 'center', 
      margin: '30px auto',
      maxWidth: '600px',
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '15px'
    }}>
      {currentIndex > 0 && (
        <button 
          className="btn"
          onClick={previousFlashcard}
          style={{
            padding: '12px 25px',
            borderRadius: '30px',
            border: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(5px)',
            ':hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
              backgroundColor: 'rgba(255, 255, 255, 0.3)'
            }
          }}
        >
          ← Previous Card
        </button>
      )}
      {currentIndex < flashcards.length - 1 && (
        <button 
          className="btn"
          onClick={nextFlashcard}
          style={{
            padding: '12px 25px',
            borderRadius: '30px',
            border: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(5px)',
            ':hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
              backgroundColor: 'rgba(255, 255, 255, 0.3)'
            }
          }}
        >
          Next Card →
        </button>
      )}
      {localStorage.getItem('useremail_currently_logged_in') === 'admin@gmail.com' && (
        <AddNewWordSectionModal 
          style={{
            backgroundColor: '#e67e22',
            ':hover': {
              backgroundColor: '#d35400'
            }
          }}
        />
      )}
    </div>

    {/* Words List Section */}
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '30px',
      margin: '40px auto',
      maxWidth: '1200px',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{
          color: '#2c3e50',
          fontWeight: '700',
          fontSize: '2.5rem',
          marginBottom: '15px',
          position: 'relative',
          display: 'inline-block',
          '::after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
            borderRadius: '2px'
          }
        }}>
          LIST OF WORDS IN THIS DECK
        </h1>
      </div>

      {/* Search Form */}
      <form onSubmit={Searcher} style={{ 
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        padding: '25px',
        borderRadius: '15px',
        marginBottom: '30px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <label htmlFor="WORD_STRING" style={{
              color: '#2c3e50',
              fontWeight: '600',
              fontSize: '1.1rem'
            }}>
              WORD/PHRASE:
            </label>
            <input
              type="text"
              name="WORD_STRING"
              style={{
                width: '100%',
                height: '50px',
                padding: '0 15px',
                borderRadius: '10px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                ':focus': {
                  outline: 'none',
                  borderColor: '#3498db',
                  boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.2)'
                }
              }}
              placeholder="Enter word/phrase to search..."
              value={WORD_STRING_SEARCH}
              onChange={e => setWORD_STRING_SEARCH(e.target.value)}
            />
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <label htmlFor="MEANING" style={{
              color: '#2c3e50',
              fontWeight: '600',
              fontSize: '1.1rem'
            }}>
              MEANING/SIGNIFICANCE:
            </label>
            <input
              type="text"
              name="MEANING"
              style={{
                width: '100%',
                height: '50px',
                padding: '0 15px',
                borderRadius: '10px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                ':focus': {
                  outline: 'none',
                  borderColor: '#3498db',
                  boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.2)'
                }
              }}
              placeholder="Enter meaning/significance to search..."
              value={WORD_MEANING_SEARCH}
              onChange={e => setWORD_MEANING_SEARCH(e.target.value)}
            />
          </div>
          
          <button 
            type="submit" 
            style={{
              padding: '15px 30px',
              borderRadius: '50px',
              border: 'none',
              backgroundColor: '#3498db',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              alignSelf: 'center',
              ':hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                backgroundColor: '#2980b9'
              }
            }}
          >
            SEARCH FOR A WORD
          </button>
        </div>
      </form>

      {/* Search Results Info */}
      <center style={{ marginBottom: '20px' }}>
        {rowsFetched !== -1 && rowsFetched !== 0 && rowsFetched !== totalRows && (
          <div style={{
            display: 'inline-block',
            padding: '8px 20px',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            borderRadius: '20px',
            color: '#3498db',
            fontWeight: '600'
          }}>
            Number of matching results: {rowsFetched}
          </div>
        )}
        {rowsFetched === 0 && (
          <div style={{
            display: 'inline-block',
            padding: '8px 20px',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            borderRadius: '20px',
            color: '#e74c3c',
            fontWeight: '600'
          }}>
            No results matched
          </div>
        )}
      </center>

      {/* Words Table */}
      <div style={{
        overflowX: 'auto',
        borderRadius: '15px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        marginTop: '30px'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: '0',
          borderRadius: '15px',
          overflow: 'hidden'
        }}>
          <thead style={{
            backgroundColor: '#34495e',
            color: 'white',
            fontWeight: '600',
            textAlign: 'center',
            position: 'sticky',
            top: '0'
          }}>
            <tr>
              <th style={{
                padding: '15px',
                borderBottom: '2px solid #2c3e50'
              }}>Word/Phrase</th>
              <th style={{
                padding: '15px',
                borderBottom: '2px solid #2c3e50'
              }}>Meaning</th>
              <th style={{
                padding: '15px',
                borderBottom: '2px solid #2c3e50'
              }}>Pronounce</th>
              <th style={{
                padding: '15px',
                borderBottom: '2px solid #2c3e50'
              }}>Bookmark</th>
              <th style={{
                padding: '15px',
                borderBottom: '2px solid #2c3e50'
              }}>Edit Note</th>
              {localStorage.getItem('useremail_currently_logged_in') === 'admin@gmail.com' && (
                <th style={{
                  padding: '15px',
                  borderBottom: '2px solid #2c3e50'
                }}>Delete</th>
              )}
            </tr>
          </thead>
          <tbody>
            {searchedflashcards.map((todo, index) => (
              <tr 
                key={todo.WORD_ID}
                style={{
                  backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa',
                  transition: 'all 0.2s ease',
                  ':hover': {
                    backgroundColor: '#e8f4fc'
                  }
                }}
              >
                <td style={{
                  padding: '15px',
                  borderBottom: '1px solid #eee',
                  fontWeight: '500',
                  color: '#2c3e50'
                }}>{todo.WORD_STRING}</td>
                <td style={{
                  padding: '15px',
                  borderBottom: '1px solid #eee',
                  color: '#7f8c8d'
                }}>
                  {todo.CATEGORY === "VOCABULARY" ? (
                    <span style={{
                      backgroundColor: 'rgba(155, 89, 182, 0.1)',
                      padding: '3px 8px',
                      borderRadius: '5px',
                      color: '#9b59b6',
                      marginRight: '8px',
                      fontSize: '0.9rem'
                    }}>
                      {todo.PARTS_OF_SPEECH}
                    </span>
                  ) : ''}
                  {todo.MEANING}
                </td>
                <td style={{
                  padding: '15px',
                  borderBottom: '1px solid #eee',
                  textAlign: 'center'
                }}>
                  <button 
                    className="btn"
                    onClick={() => window.speechSynthesis.speak(new SpeechSynthesisUtterance(todo.WORD_STRING + '. ' + todo.MEANING))}
                    style={{
                      backgroundColor: 'rgba(52, 152, 219, 0.1)',
                      border: '1px solid rgba(52, 152, 219, 0.3)',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'inline-flex',
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
                    <span style={{ fontSize: '1.1rem' }}>🔊</span>
                  </button>
                </td>
                <td style={{
                  padding: '15px',
                  borderBottom: '1px solid #eee',
                  textAlign: 'center'
                }}>
                  <BookmarkSection todo={todo} />
                </td>
                <td style={{
                  padding: '15px',
                  borderBottom: '1px solid ',
                  textAlign: 'center'
                }}>
                  <EditNoteSection todo={todo} />
                </td>
                {localStorage.getItem('useremail_currently_logged_in') === 'admin@gmail.com' && (
                  <td style={{
                    padding: '15px',
                    borderBottom: '1px solid #eee',
                    textAlign: 'center'
                  }}>
                    <button 
                      className="btn"
                      onClick={() => handleDelete(todo.WORD_ID)}
                      style={{
                        padding: '8px 20px',
                        borderRadius: '30px',
                        border: 'none',
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        ':hover': {
                          backgroundColor: '#c0392b',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Add global styles for animations */}
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