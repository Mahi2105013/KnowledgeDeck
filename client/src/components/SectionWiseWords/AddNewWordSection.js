import React, { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const AddNewWordSectionModal = () => {
    const [WORD_STRING, setWORD_STRING] = useState("");
    const [MEANING, setMEANING] = useState("");
    const [CATEGORY, setCATEGORY] = useState(localStorage.getItem('section_category'));
    const [EXAMPLE_SENTENCE, setEXAMPLE_SENTENCE] = useState("");

    const resetForm = () => {
        setWORD_STRING("");
        setMEANING("");
        setEXAMPLE_SENTENCE("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setCATEGORY(localStorage.getItem('section_category'))
        onSubmitForm({ WORD_STRING, MEANING, CATEGORY, EXAMPLE_SENTENCE });
        resetForm();
    };

    // inputting a new word / flashcard
    const onSubmitForm = async (e) => {
        try {
            setCATEGORY(localStorage.getItem('section_category'))
            const body = { WORD_STRING, MEANING, CATEGORY, EXAMPLE_SENTENCE };

            if(!WORD_STRING.trim() || !MEANING.trim())
            {
                alert("YOU MUST INPUT ALL THE FIELDS"); 
                return;
            }
            
            await fetch("http://localhost:5000/sectionwisewords", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            Swal.fire({
                title: 'Insertion Done!',
                text: "You have successfully inserted a new word",
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
                data-target="#addNewWordSectionModal"
            >
                Add New Word (As Admin)
            </button>

            <div
                className="modal fade"
                id="addNewWordSectionModal"
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
                                <div className="form-group d-flex">
                                    <label htmlFor="WORD_STRING">WORD/PHRASE:</label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        value={WORD_STRING}
                                        onChange={e => setWORD_STRING(e.target.value)}
                                        rows="1"
                                        required
                                    />
                                </div>
                                <div className="form-group d-flex">
                                    <label htmlFor="MEANING">MEANING:</label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        value={MEANING}
                                        onChange={e => setMEANING(e.target.value)}
                                        rows="2"
                                        required
                                    />
                                </div>
                                <div className="form-group d-flex">
                                    <label htmlFor="EXAMPLE_SENTENCE">EXAMPLE_SENTENCE:</label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        value={EXAMPLE_SENTENCE}
                                        rows="2"
                                        onChange={e => setEXAMPLE_SENTENCE(e.target.value)}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="submit"
                                        className="btn btn-light"
                                        data-dismiss="modal"
                                        onClick={e => onSubmitForm(e)}
                                        disabled={WORD_STRING == "" || MEANING == ""}
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

export default AddNewWordSectionModal;
