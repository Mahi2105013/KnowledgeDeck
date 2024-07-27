import React, { Fragment, useState } from 'react';

const AddNewWordModal = (  ) => {
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
            //getFlashcards();
            window.location = "/flashcards" + (DIFFICULTY == 'E' ? 'easy' : 'hard');
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
                Add New Word/Phrase
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
                            <h5 className="modal-title" id="addNewWordModalLabel">Add New Word/Phrase</h5>
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
                                <div className="form-group d-flex">
                                    <label htmlFor="WORD_STRING">WORD/PHRASE:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={WORD_STRING}
                                        onChange={e => setWORD_STRING(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group d-flex">
                                    <label htmlFor="MEANING">MEANING:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={MEANING}
                                        onChange={e => setMEANING(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group d-flex">
                                    <label htmlFor="DIFFICULTY">DIFFICULTY:</label>
                                    <select
                                        id="difficultySelector"
                                        className="form-control"
                                        value={DIFFICULTY}
                                        onChange={e => setDIFFICULTY(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select Difficulty</option>
                                        <option value="E">Easy</option>
                                        <option value="D">Difficult</option>
                                    </select>
                                </div>
                                <div className="form-group d-flex">
                                    <label htmlFor="CATEGORY">CATEGORY:</label>
                                    <select
                                        id="categorySelector"
                                        className="form-control"
                                        value={CATEGORY}
                                        onChange={e => setCATEGORY(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select Category</option>
                                        <option value="VOCABULARY">Vocabulary</option>
                                        <option value="MATH FORMULAE">Math Formulae</option>
                                        <option value="IMPORTANT DATES">Important Dates</option>
                                    </select>
                                </div>
                                <div className="form-group d-flex">
                                    <label htmlFor="PARTS_OF_SPEECH">PARTS OF SPEECH:</label>
                                    <select
                                        id="PARTS_OF_SPEECH Selector"
                                        className="form-control"
                                        value={PARTS_OF_SPEECH}
                                        onChange={e => setPARTS_OF_SPEECH(e.target.value)}
                                        required
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
                                <div className="form-group d-flex">
                                    <label htmlFor="EXAMPLE_SENTENCE">EXAMPLE_SENTENCE:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={EXAMPLE_SENTENCE}
                                        onChange={e => setEXAMPLE_SENTENCE(e.target.value)}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                        onClick={resetForm}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-light"
                                        data-dismiss="modal"
                                        onClick={e => onSubmitForm(e)}
                                        disabled={WORD_STRING == "" || MEANING == "" || DIFFICULTY == "" || CATEGORY == "" || PARTS_OF_SPEECH == ""}
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
