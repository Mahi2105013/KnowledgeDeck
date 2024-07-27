import React, { Fragment, useState } from "react";

const EditFlashcard = ({ todo }) => {
  //const [DESCRIPTIONN, setDESCRIPTIONN] = useState(todo.DESCRIPTIONN);
  const [WORD_STRING, setWORD_STRING] = useState(todo.WORD_STRING);
  const [MEANING, setMEANING] = useState(todo.MEANING);
  const [DIFFICULTY, setDIFFICULTY] = useState('E');
  const [CATEGORY, setCATEGORY] = useState('');
  const [PARTS_OF_SPEECH, setPARTS_OF_SPEECH] = useState('');
  const [EXAMPLE_SENTENCE, setEXAMPLE_SENTENCE] = useState(todo.EXAMPLE_SENTENCE);

  const resetToEarlier = (todo) => {
    //setWORD_STRING(todo.WORD_STRING);
    //setMEANING(todo.MEANING);
    //setCATEGORY(todo.CATEGRY);
    //setDIFFICULTY(todo.DIFFICULTY);
  };

  const handleDifficultyChange = (e) => {
    const value = e.target.value;
    setDIFFICULTY(value === 'Easy' ? 'E' : 'D');
  };

  const handleCategoryChange = (e) => {
    console.log(WORD_STRING + MEANING + DIFFICULTY + CATEGORY)
    if(e.target.value == "NONE") {
        alert('Category cannot be None, you must select a category')
    }
    else {
        setCATEGORY(e.target.value);
        setCATEGORY(e.target.value);
    }
  };

  const handlePARTS_OF_SPEECHChange = (e) => {
    if(e.target.value == "") {
        alert('Please select parts of speech!')
    }
    else {
        setPARTS_OF_SPEECH(e.target.value);
        setPARTS_OF_SPEECH(e.target.value);
    }
  };

  const updateWord = async e => {
    e.preventDefault();
    try {
      if(WORD_STRING.trim() === '' || MEANING.trim() === '' || CATEGORY.trim() == '' || DIFFICULTY.trim() == '' || PARTS_OF_SPEECH.trim() == '' || EXAMPLE_SENTENCE.trim() == '')
      {
        alert("You must fil up all the boxes")
        return;
      }
      const body = { WORD_STRING, MEANING, DIFFICULTY, CATEGORY, PARTS_OF_SPEECH, EXAMPLE_SENTENCE };
      const response = await fetch(
        `http://localhost:5000/flashcards/${todo.WORD_ID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      
      console.log('response: ' + response)

      alert("Editing was successful")
      //window.location = "/flashcardseasy";
      window.location.reload()

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
       <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.WORD_ID}`}
      >
        Edit Details
      </button>

      <div
        class="modal fade"
        id={`id${todo.WORD_ID}`}
        //onClick={() => setDESCRIPTIONN(todo.DESCRIPTIONN)}
        onClick={() => resetToEarlier(todo)}
      >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content" style={{backgroundColor: 'rgba(40,167,69,1)'}}>
            <div class="modal-header"> {/*the header*/}
              <h4 class="modal-title">Edit Word / Phrase</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                //onClick={() => setDESCRIPTIONN(todo.DESCRIPTIONN)}
                onClick={() => resetToEarlier(todo)}
              > CLOSE
                &times;
            </button>
            </div>

            <div class="modal-body"> {/*body of modal*/}
            <div class="d-flex">
            <label for="WORD_STRING"> {"WORD: "} </label>
              <input
                type="text"
                className="form-control"
                placeholder="Set new trade name"
                value={WORD_STRING}
                onChange={e => setWORD_STRING(e.target.value)} 
                />
              </div>
            <p></p>
            <div class="d-flex">
            <label for="MEANING"> {"MEANING : "} </label>
              <input
                type="text"
                className="form-control"
                placeholder="Set new generic name"
                value={MEANING}
                onChange={e => {
                    console.log(e.target.value)
                    setMEANING(e.target.value)
                }
                }
              />
            </div>
            <p></p>  
            <div class="d-flex">
            <label for="DIFFICULTY"> {"DIFFICULTY : "} </label>
            <select
            id="difficultySelector"
            className="form-control"
            value={DIFFICULTY === 'E' ? 'Easy' : DIFFICULTY === 'D' ? 'Difficult' : ''}
            onChange={handleDifficultyChange}
            >
            <option value="Easy">Easy</option>
            <option value="Difficult">Difficult</option>
            </select>
              </div>
              <p></p>
            <div class="d-flex">
            <label for="CATEGORY"> {"CATEGORY : "} </label>
                <select
                id="categorySelector"
                className="form-control"
                value={CATEGORY}
                onChange={handleCategoryChange}
                >
                <option value="NONE">None</option>
                <option value="VOCABULARY">Vocabulary</option>
                <option value="MATH FORMULAE">Math Formulae</option>
                <option value="IMPORTANT DATES">Important Dates</option>
                </select>
            </div>
                <p></p>
            <div class="d-flex">
            <label for="PARTS_OF_SPEECH"> {"PARTS_OF_SPEECH : "} </label>
                <select
                id="PARTS_OF_SPEECHSelector"
                className="form-control"
                value={PARTS_OF_SPEECH}
                onChange={handlePARTS_OF_SPEECHChange}
                >
                <option value="" disabled>Select Parts of Speech</option>
                <option value="None">None</option>
                <option value="Noun">Noun</option>
                <option value="Pronoun">Pronoun</option>
                <option value="Adjective">Adjective</option>
                <option value="Verb">Verb</option>
                <option value="Adverb">Adverb</option>
                <option value="Preposition">Preposition</option>
                <option value="Conjunction">Conjunction</option>
                </select>
            </div>
                <p></p>
            <div class="d-flex">
            <label for="EXAMPLE_SENTENCE"> {"EXAMPLE_SENTENCE : "} </label>
              <input
                type="text"
                className="form-control"
                placeholder="Set new example sentence"
                value={EXAMPLE_SENTENCE}
                onChange={e => {
                    console.log(e.target.value)
                    setEXAMPLE_SENTENCE(e.target.value)
                }
                }
              />
            </div>
                <p></p>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateWord(e)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditFlashcard;
