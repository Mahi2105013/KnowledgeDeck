import React, { Fragment, useState } from 'react';

// add new comments!
const InputComment = (  ) => {
    const [USER_ID, setUSER_ID] = useState(-1);
    const [DIFFICULTY, setDIFFICULTY] = useState("");
    const [COMMENT_BODY, setCOMMENT_BODY] = useState("");

    const resetForm = () => {
        setUSER_ID(-1)
        setDIFFICULTY("")
        setCOMMENT_BODY("")
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUSER_ID(localStorage.getItem('userid_currently_logged_in'))
        setDIFFICULTY(localStorage.getItem('difficulty'))

        let id = localStorage.getItem('userid_currently_logged_in')
        let d = localStorage.getItem('difficulty')

        onSubmitForm({ id, d, COMMENT_BODY });
    };

    // inputting a new word / flashcard
    const onSubmitForm = async (e) => {
        try {
            
            setUSER_ID(localStorage.getItem('userid_currently_logged_in'))
            setDIFFICULTY(localStorage.getItem('difficulty'))

            console.log('id! : ' + localStorage.getItem('userid_currently_logged_in'))
            console.log('diff! : ' + localStorage.getItem('difficulty'))

            let id = localStorage.getItem('userid_currently_logged_in')
            let d = localStorage.getItem('difficulty')

            const body = { id, d, COMMENT_BODY };
            
            if(!COMMENT_BODY.trim()) {
                    alert("CANNOT ADD A BLANK COMMENT!"); 
                    return;
            }
                
            await fetch("http://localhost:5000/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            //window.location = "/flashcards" + (DIFFICULTY == 'E' ? 'easy' : 'easy');
            console.log('Submitted body:', body);
            resetForm()
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <div
                //type="button"
                //className="btn btn-light"
                style={{  
                    // borderRadius: '5px', padding: '10px', 
                    // color: 'black',
                    // marginBottom: '20px', marginLeft: '400px', 
                    // marginRight: '400px', backgroundColor: 'white'
                    border: '2px solid #ccc',
                    borderRadius: '10px',
                    padding: '20px',
                    margin: '20px auto',
                    color: 'black',
                    width: '80%',
                    backgroundColor: '#fff'
                }}

                
                    data-toggle="modal"
                    data-target="#addNewCommentModal"
            >
                Click here to add a comment ...
            </div>

            <div
                className="modal fade"
                id="addNewCommentModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="addNewWordModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content" style={{ backgroundColor: 'rgba(40,167,69,1)' }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="addNewWordModalLabel">Add New Comment</h5>
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
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={COMMENT_BODY}
                                        onChange={e => setCOMMENT_BODY(e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div className="modal-footer">
                                    <p><h5 style={{float: 'left'}}> You're currenly logged in as {localStorage.getItem('useremail_currently_logged_in') === 'admin@gmail.com' ? 'Admin' : 'User' } ({localStorage.getItem('username_currently_logged_in')}) </h5></p>
                                    <p></p>
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
                                    >
                                        Add Comment
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

// add new comments!
export default InputComment;
