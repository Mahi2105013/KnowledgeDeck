import React, { Fragment, useState, useEffect } from "react";
import Swal from "sweetalert2";

const BookmarkSection = ({ todo, text }) => {
  //const [DESCRIPTIONN, setDESCRIPTIONN] = useState(todo.DESCRIPTIONN);
  const [totalRows, settotalRows] = useState(-1);
  const [IS_BOOKMARKED, setIS_BOOKMARKED] = useState(false)

  const resetToEarlier = (todo) => {};

  const getBookmarked = async() => {
    try {
        setIS_BOOKMARKED(false)
        const userid = localStorage.getItem('userid_currently_logged_in');
        const wordid = todo.WORD_ID

        console.log("client side: " + userid + ' ' + wordid)
        
       let response = await fetch(`http://localhost:5000/bookmarkedboolsec?userid=${encodeURIComponent(userid)}&wordid=${encodeURIComponent(wordid)}`);
       const jsonData = await response.json();
       settotalRows(jsonData.length)
       if(totalRows) setIS_BOOKMARKED(true)

       console.log(jsonData)
       console.log(jsonData[0].USER_ID + " " + jsonData[0].WORD_ID) 
        // setNOTE_BODY(jsonData[0].NOTE_BODY)
       console.log('number of rows:' + totalRows)
    } catch (error) {
        console.log(error.message)
    }
  }

  const addOrRemoveBookmark = async (string, WORD_ID) => {
    try {
        let w = todo.WORD_ID, u = localStorage.getItem('userid_currently_logged_in')
        
        // post request; insert into BOOKMARKS table
        const body = { u, w };
 
        await fetch(`http://localhost:5000/bookmarksec`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
        //window.location.reload()
        Swal.fire({
          title: 'Done!',
          icon: 'success'
          // info , success, warning, error, question
        }).then(async (result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }})
    }

    catch (error) {
        console.error(error.message)
    }
  }

  useEffect(() => {
    getBookmarked()
  }, [todo]);

  return (
    <Fragment>
       <button
        type="button"
        class= {text === 'Remove Bookmark' ? "btn btn-outline-danger" : "btn btn-outline-dark"}
        data-toggle="modal"
        // data-target={`#id${todo.WORD_ID}`}
        data-target={`#bookmarksec${todo.WORD_ID}`}
        onClick={() => getBookmarked()}
      >
        { text === 'Remove Bookmark' ? text : "Bookmark 🔖" }
      </button>

      <div
        class="modal fade"
        // id={`id${todo.WORD_ID}`}
        id={`bookmarksec${todo.WORD_ID}`}
      >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header"> {/*the header*/}
              <h3 class="modal-title">{todo.WORD_STRING}</h3> <br />
              <br/>
              {/* <div>{MEANING}</div> */}
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => resetToEarlier(todo)}
              > CLOSE
                &times;
            </button>
            </div>

            <div class="modal-body"> {/*body of modal*/}
              <div class="d-flex">
              <textarea
                className="form-control"

                value={"MEANING: " + todo.MEANING}
                disabled
              rows="3" // Adjust the number of rows as needed
              style={{ fontStyle: 'italic', fontSize: '17px' }}
              title="Meaning cannot be edited in this modal"
              />
              </div>
              <div>
              <p></p>
              <h5 style={{color: 'red'}}> {IS_BOOKMARKED ? 
              "You have already bookmarked this word!" 
              : "This word has not been bookmarked yet."} </h5>
              </div>
              <p></p>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-dark"
                data-dismiss="modal"
                onClick={e => addOrRemoveBookmark(e)}
              >
                {IS_BOOKMARKED ? "Remove from bookmarks" : "Add to bookmark"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BookmarkSection;
