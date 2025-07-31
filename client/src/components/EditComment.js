import React, { Fragment, useState, useEffect } from "react";
import { HomeIcon, PencilSquareIcon } from '@heroicons/react/20/solid';
import Swal from 'sweetalert2';

const EditComment = ({ comment, body }) => {
  const [COMMENT_ID, setCOMMENT_ID] = useState(comment)
  const [COMMENT_BODY, setCOMMENT_BODY] = useState(body)

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const resetToEarlier = (todo) => {}

  const updateComment = async e => {
    e.preventDefault();
    try {
      const body = { COMMENT_BODY };
      const response = await fetch(
        `http://localhost:5000/comments/${COMMENT_ID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      
      console.log('response: ' + response)
      Swal.fire({
        title: 'Your comment has been successfully updated!',
        icon: 'info'
      }).then(async (result) => {
      if (result.isConfirmed) {
        window.location.reload()
      }})
      
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
  });

  return (
    <Fragment>
       <button className="btn btn-outline-primary"
        data-toggle="modal"
        data-target={`#editCommentModal${COMMENT_ID}`}
      >
        Edit Comment
      </button>

      <div
        class="modal fade"
        // id={`id${COMMENT_ID}`}
        id = {`editCommentModal${COMMENT_ID}`}
      >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content" style={{backgroundColor: "white"}}>
            <div class="modal-header"> {/*the header*/}
              <h3 class="modal-title"> Edit your comment </h3> <br />
              
              <button
                type="button"
                class="close"
                data-dismiss="modal"
              > CLOSE
                &times;
            </button>
            </div>

            <div class="modal-body"> {/*body of modal*/}
            <label for="COMMENT_BODY"> Your comment: </label>
            <textarea
              className="form-control"
              placeholder="Set new comment ..."
              value={COMMENT_BODY}
              onChange={e => {
              setCOMMENT_BODY(e.target.value)
              }}
              rows="3" // Adjust the number of rows as needed
            />
            </div>

            <div class="modal-footer">

              <button
                type="button"
                class="btn btn-outline-dark"
                data-dismiss="modal"
                onClick={e => updateComment(e)}
                // onClick={() => updateComment()}
                disabled={COMMENT_BODY == ""}
                title="Set a note first!"
              >
                Update Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditComment;
