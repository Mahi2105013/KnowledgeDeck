import React, { Fragment, useState, useEffect } from "react";

const EditFlashcard = ({ todo }) => {
  //const [DESCRIPTIONN, setDESCRIPTIONN] = useState(todo.DESCRIPTIONN);
  const [WORD_STRING, setWORD_STRING] = useState(todo.WORD_STRING);
  const [MEANING, setMEANING] = useState(todo.MEANING);
  const [DIFFICULTY, setDIFFICULTY] = useState('E');
  const [CATEGORY, setCATEGORY] = useState('');
  const [PARTS_OF_SPEECH, setPARTS_OF_SPEECH] = useState('');
  const [EXAMPLE_SENTENCE, setEXAMPLE_SENTENCE] = useState(todo.EXAMPLE_SENTENCE);

  const resetToEarlier = (todo) => {
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

  useEffect(() => {
    console.log("todo was changed")
    setWORD_STRING(todo.WORD_STRING) // dummy code
    setMEANING(todo.MEANING)
    setDIFFICULTY(todo.DIFFICULTY)
    setCATEGORY(todo.CATEGORY)
    setPARTS_OF_SPEECH(todo.PARTS_OF_SPEECH)
    setEXAMPLE_SENTENCE(todo.EXAMPLE_SENTENCE)
  }, [todo]);

  return (
    <Fragment>
       <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        // data-target={`#id${todo.WORD_ID}`}
        data-target={`#editflashcard${todo.WORD_ID}`}
      >
        Edit Details
      </button>

      <div
        class="modal fade"
        // id={`id${todo.WORD_ID}`}
        id={`editflashcard${todo.WORD_ID}`}
        onClick={() => resetToEarlier(todo)}
      >
        <div class="modal-dialog modal-dialog-scrollable">
        <div className="modal-content" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
  <div className="modal-header" style={{ backgroundColor: '#28a745', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', color: '#fff' }}>
    <h4 className="modal-title">Edit Word / Phrase</h4>
    <button
      type="button"
      className="close"
      data-dismiss="modal"
      style={{ color: '#fff', fontSize: '1.5rem' }}
      onClick={() => resetToEarlier(todo)}
    > 
      &times;
    </button>
  </div>

  <div className="modal-body" style={{ padding: '20px' }}>
    <div className="form-group">
      <label htmlFor="WORD_STRING" style={{ fontWeight: 'bold', color: '#343a40' }}>Word:</label>
      <input
        type="text"
        className="form-control"
        placeholder="Set new word or phrase"
        value={WORD_STRING}
        onChange={e => setWORD_STRING(e.target.value)}
        style={{ marginBottom: '15px' }}
      />
    </div>

    <div className="form-group">
      <label htmlFor="MEANING" style={{ fontWeight: 'bold', color: '#343a40' }}>Meaning:</label>
      <textarea
        className="form-control"
        placeholder="Set new meaning..."
        value={MEANING}
        onChange={e => setMEANING(e.target.value)}
        rows="2"
        style={{ marginBottom: '15px' }}
      />
    </div>

    <div className="form-group">
      <label htmlFor="DIFFICULTY" style={{ fontWeight: 'bold', color: '#343a40' }}>Difficulty:</label>
      <select
        id="difficultySelector"
        className="form-control"
        value={DIFFICULTY === 'E' ? 'Easy' : DIFFICULTY === 'D' ? 'Difficult' : ''}
        onChange={handleDifficultyChange}
        style={{ marginBottom: '15px' }}
      >
        <option value="Easy">Easy</option>
        <option value="Difficult">Difficult</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="CATEGORY" style={{ fontWeight: 'bold', color: '#343a40' }}>Category:</label>
      <select
        id="categorySelector"
        className="form-control"
        value={CATEGORY}
        onChange={handleCategoryChange}
        style={{ marginBottom: '15px' }}
      >
        <option value="NONE">None</option>
        <option value="VOCABULARY">Vocabulary</option>
        <option value="MATH FORMULAE">Math Formulae</option>
        <option value="IMPORTANT DATES">Important Dates</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="PARTS_OF_SPEECH" style={{ fontWeight: 'bold', color: '#343a40' }}>Parts of Speech:</label>
      <select
        id="PARTS_OF_SPEECHSelector"
        className="form-control"
        value={PARTS_OF_SPEECH}
        onChange={handlePARTS_OF_SPEECHChange}
        style={{ marginBottom: '15px' }}
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

    <div className="form-group">
      <label htmlFor="EXAMPLE_SENTENCE" style={{ fontWeight: 'bold', color: '#343a40' }}>Example Sentence:</label>
      <textarea
        className="form-control"
        placeholder="Set new example sentence..."
        value={EXAMPLE_SENTENCE}
        onChange={e => setEXAMPLE_SENTENCE(e.target.value)}
        rows="2"
      />
    </div>
  </div>

  <div className="modal-footer" style={{ justifyContent: 'center' }}>
    <button
      type="button"
      className="btn btn-success"
      data-dismiss="modal"
      onClick={e => updateWord(e)}
      style={{ width: '100%', padding: '10px', fontSize: '1.1rem' }}
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
