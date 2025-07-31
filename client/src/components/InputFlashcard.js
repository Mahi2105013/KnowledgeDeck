import React, { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
const AddNewWordModal = () => {
    const [WORD_STRING, setWORD_STRING] = useState("");
    const [MEANING, setMEANING] = useState("");
    const [DIFFICULTY, setDIFFICULTY] = useState("");
    const [CATEGORY, setCATEGORY] = useState("");
    const [PARTS_OF_SPEECH, setPARTS_OF_SPEECH] = useState("");
    const [EXAMPLE_SENTENCE, setEXAMPLE_SENTENCE] = useState("");

    const resetForm = () => {
        setWORD_STRING("");
        setMEANING("");
        setDIFFICULTY("");
        setCATEGORY("");
        setPARTS_OF_SPEECH("");
        setEXAMPLE_SENTENCE("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitForm({ WORD_STRING, MEANING, DIFFICULTY, CATEGORY, PARTS_OF_SPEECH, EXAMPLE_SENTENCE });
        resetForm();
    };

    // inputting a new word / flashcard
    const onSubmitForm = async (e) => {
        try {
            const body = { WORD_STRING, MEANING, DIFFICULTY, CATEGORY, PARTS_OF_SPEECH, EXAMPLE_SENTENCE };

            if(!WORD_STRING.trim() || !MEANING.trim() || !DIFFICULTY.trim() || !CATEGORY.trim())
            {
                alert("YOU MUST INPUT ALL THE FIELDS"); 
                return;
            }
            
            await fetch("http://localhost:5000/flashcards", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            
            Swal.fire({
                title: 'Insertion Done!',
                text: "You have successfully inserted a new flashcard",
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    window.location.reload();
            }})
        
            console.log('Submitted body:', body);
        } catch (err) {
            console.error(err.message);
        }
    };
    
    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-light"
                data-toggle="modal"
                data-target="#addNewWordModal"
            >
                Add New Word (As Admin)
            </button>

            <div
                className="modal fade"
                id="addNewWordModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="addNewWordModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content" style={{ backgroundColor: 'rgba(40,167,69,1)' }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="addNewWordModalLabel">
                                Add New Word/Phrase as Admin
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={resetForm}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <textarea
        placeholder="Word/Phrase"
        className="form-control"
        value={WORD_STRING}
        onChange={e => setWORD_STRING(e.target.value)}
        rows="1"
        required
        aria-label="Word/Phrase"
      />
    </div>
    <div className="form-group">
      <textarea
        placeholder="Meaning"
        className="form-control"
        value={MEANING}
        onChange={e => setMEANING(e.target.value)}
        rows="2"
        required
        aria-label="Meaning"
      />
    </div>
    <div className="form-group">
      <select
        className="form-control custom-select"
        value={DIFFICULTY}
        onChange={e => setDIFFICULTY(e.target.value)}
        required
        aria-label="Difficulty"
      >
        <option value="" disabled>Select Difficulty</option>
        <option value="E">Easy</option>
        <option value="I">Intermediate</option>
        <option value="D">Difficult</option>
      </select>
    </div>
    <div className="form-group">
      <select
        className="form-control custom-select"
        value={CATEGORY}
        onChange={e => setCATEGORY(e.target.value)}
        required
        aria-label="Category"
      >
        <option value="" disabled>Select Category</option>
        <option value="VOCABULARY">Vocabulary</option>
        <option value="MATH FORMULAE">Math Formulae</option>
        <option value="IMPORTANT DATES">Important Dates</option>
      </select>
    </div>
    <div className="form-group">
      <select
        className="form-control custom-select"
        value={PARTS_OF_SPEECH}
        onChange={e => setPARTS_OF_SPEECH(e.target.value)}
        required
        aria-label="Parts of Speech"
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
      <textarea
        placeholder="Example Sentence"
        className="form-control"
        value={EXAMPLE_SENTENCE}
        rows="2"
        onChange={e => setEXAMPLE_SENTENCE(e.target.value)}
        aria-label="Example Sentence"
      />
    </div>
    <div className="modal-footer">
      <button
        type="submit"
        className="btn btn-light"
        onClick={e => onSubmitForm(e)}
        disabled={WORD_STRING === "" || MEANING === "" || DIFFICULTY === "" || CATEGORY === "" || PARTS_OF_SPEECH === ""}
      >
        Add Word/Phrase
      </button>
    </div>
  </form>
</div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default AddNewWordModal;
