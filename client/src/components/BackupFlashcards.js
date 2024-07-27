import React, {Fragment, useEffect, useState} from "react";

const BackupFlashcards = () => {

    const [flashcards, setflashcards] = useState([]);

    // DELETE FUNCTION to delete backup words permanently
    const deleteBackup = async (DOCTOR_ID) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete?");
            if(!confirmed) return;
            const response = await fetch(`http://localhost:5000/doctors/${DOCTOR_ID}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                setflashcards(prevTodos => prevTodos.filter(todo => todo.DOCTOR_ID !== DOCTOR_ID));
            } else {
                console.log(`Error deleting todo with ID ${DOCTOR_ID}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const formatDateToDDMonYYYY = (dateString) => {
        const date = new Date(dateString);
        
        const day = String(date.getDate()).padStart(2, '0');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        
        return `${day}-${month}-${year}`;
    }

    const getFlashcards = async() => {
        try {
            const response = await fetch("http://localhost:5000/backupflashcards"); // by default, fetch makes a get request
            // we will get json data back
            const jsonData = await response.json();

            setflashcards(jsonData); // changing the data
            console.log(jsonData)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getFlashcards();
    }, []); // the empty array makes it make only one request

    return (
    <Fragment>
    <div style = {{backgroundImage: `url('/flashcards.jpg')`, textAlign: 'center'}}>
    <center><h1 class = "mt-5"> BACKUP TABLE </h1></center>
    
    <table class="table table-bordered mt-5 table-dark table-striped table-sm">

    <thead>
      <tr>
        <th>WORD</th>
        <th> MEANING / SIGNIFICANCE </th>
        <th>CATEGORY</th>
        <th> DIFFICULTY </th>
        {/* <th> DELETED BY (USER_NAME) </th> */}
        <th> PARTS OF SPEECH </th>
        <th> EXAMPLE_SENTENCE </th>
        <th> DATE OF DELETION </th>
      </tr>
    </thead>

    <tbody>
    {flashcards.map(todo => (
        <tr key = {todo.WORD_ID}>
            <td> {todo.WORD_STRING}  </td>
            <td> {todo.MEANING}  </td>
            <td> {todo.CATEGORY}  </td>
            <td> {todo.DIFFICULTY === 'E' ? 'Easy' : 'Difficult'}  </td>
            <td> {todo.PARTS_OF_SPEECH} </td>
            <td> {todo.EXAMPLE_SENTENCE} </td>
            {/* <td> {todo.USER_NAME} </td> */}
            <td> {formatDateToDDMonYYYY(todo.DATE_OF_DELETION)} </td>
            {/* <td> 
            <button className="btn btn-warning"> Restore Word </button>
            </td>
            <td>                 
                <button className="btn btn-danger">  Delete Word Permanently </button>
                 </button>
            </td> */}
        </tr>
    ))}

    </tbody>
    </table>
    <div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div>
    </div>
    </Fragment>
    )
}

export default BackupFlashcards;