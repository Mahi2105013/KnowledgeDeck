import React, { Fragment, useState, useEffect } from "react";
import { HomeIcon, PencilSquareIcon } from '@heroicons/react/20/solid';
import Swal from 'sweetalert2';

const EditNote = ({ todo }) => {
  //const [DESCRIPTIONN, setDESCRIPTIONN] = useState(todo.DESCRIPTIONN);
  const [totalRows, settotalRows] = useState(-1);

  const [WORD_STRING, setWORD_STRING] = useState(todo.WORD_STRING);
  const [MEANING, setMEANING] = useState(todo.MEANING);
  const [DIFFICULTY, setDIFFICULTY] = useState('E');
  const [CATEGORY, setCATEGORY] = useState('');
  const [PARTS_OF_SPEECH, setPARTS_OF_SPEECH] = useState('');
  const [EXAMPLE_SENTENCE, setEXAMPLE_SENTENCE] = useState(todo.EXAMPLE_SENTENCE);
  const [NOTE_BODY, setNOTE_BODY] = useState('')

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const resetToEarlier = (todo) => {
    //setWORD_STRING(todo.WORD_STRING);
    //setMEANING(todo.MEANING);
    //setCATEGORY(todo.CATEGRY);
    //setDIFFICULTY(todo.DIFFICULTY);
  };

  const formatDateToDDMonYYYY = (dateString) => {
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  }

  const getNote = async() => {
    try {
        setNOTE_BODY("")
        const userid = localStorage.getItem('userid_currently_logged_in');
        const wordid = todo.WORD_ID

        console.log(userid + ' ' + wordid)
        
       let response = await fetch(`http://localhost:5000/notes?userid=${encodeURIComponent(userid)}&wordid=${encodeURIComponent(wordid)}`);
       const jsonData = await response.json();
       settotalRows(jsonData.length)

//        setFlashCards(jsonData); // changing the data
        console.log(jsonData)
        console.log(jsonData[0].NOTE_BODY) // -> UNDEFINED!!
        setNOTE_BODY(jsonData[0].NOTE_BODY)
        console.log('number of rows:' + totalRows)
    } catch (error) {
        console.log(error.message)
    }
}

  const updateNote = async e => {
    e.preventDefault();
    try {
      let USER_ID = localStorage.getItem('userid_currently_logged_in')
      const body = { NOTE_BODY };
      const response = await fetch(
        `http://localhost:5000/notes/${todo.WORD_ID}?USER_ID=${USER_ID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      
      console.log('response: ' + response)

      // alert("Editing note was successful")
      Swal.fire({
        title: 'Your note has been updated!',
        icon: 'info'
        // info , success, warning, error, question
      }).then(async (result) => {
      if (result.isConfirmed) {
        window.location.reload()
      }})
      
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteNote = async e => {
    e.preventDefault();
    try {
      let USER_ID = localStorage.getItem('userid_currently_logged_in')
      const response = await fetch(
        `http://localhost:5000/notes/${todo.WORD_ID}?USER_ID=${USER_ID}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        }
      );
      
      console.log('response: ' + response)

      Swal.fire({
        title: 'Your note has been deleted!',
        icon: 'warning'
      }).then(async (result) => {
      if (result.isConfirmed) {
        window.location.reload()
      }})

    } catch (err) {
      console.error(err.message);
    }
  };


  useEffect(() => {
    getNote();
  }, [todo]);

  return (
    <Fragment>
       <button className="btn btn-dark"
        data-toggle="modal"
        data-target={`#editNodeModal${todo.WORD_ID}`}
        onClick={() => getNote()}
      >
        {/* <PencilSquareIcon className="h-6 w-6 text-gray-500" /> */}
        Edit Note
      </button>

      <div
        class="modal fade"
        // id={`id${todo.WORD_ID}`}
        id = {`editNodeModal${todo.WORD_ID}`}
        onClick={() => resetToEarlier(todo)}
      >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content" style={{backgroundColor: "white"}}>
            <div class="modal-header"> {/*the header*/}
              <h3 class="modal-title"> {todo.WORD_STRING} </h3> <br />
              
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
            {/* <label for="MEANING"> {"MEANING: "} </label> */}
            <textarea
              className="form-control"

              value={"MEANING: " + todo.MEANING}
              disabled
            rows="4" // Adjust the number of rows as needed
            style={{ fontStyle: 'italic', fontSize: '17px' }}
            title="Meaning cannot be edited in this modal"
            />
            </div>
            <br/>
            
            <label for="NOTE_BODY"> {"YOUR NOTE: "} </label>
            <textarea
              className="form-control"
              placeholder="Set new note ..."
              value={NOTE_BODY}
              onChange={e => {
              setNOTE_BODY(e.target.value)
              }}
              rows="4" // Adjust the number of rows as needed
            />
            
            
            <p></p>
            {todo.LAST_EDITED && <p> <b> Last Edited: { formatDateToDDMonYYYY(todo.LAST_EDITED)} </b> </p>}
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-dark"
                data-dismiss="modal"
                onClick={e => deleteNote(e)}
                disabled={NOTE_BODY == ""}
                title="Set a note first!"
              >
                Delete Note
              </button>
              <button
                type="button"
                class="btn btn-outline-dark"
                data-dismiss="modal"
                onClick={e => updateNote(e)}
                disabled={NOTE_BODY == ""}
                title="Set a note first!"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditNote;
