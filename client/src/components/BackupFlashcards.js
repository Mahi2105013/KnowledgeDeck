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
    <div style={{
      // backgroundImage: `url('/flashcards.jpg')`,
      backgroundImage: `url('https://th.bing.com/th/id/R.de849f4c948af44d4a0524ea314f6041?rik=%2f8%2fb9Gr4iXG5gA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fd%2fb%2f0%2f572445.jpg&ehk=QWUD1TpQMYhugRwjTX1p039nNHjoKaefwdo4kQQsmvA%3d&risl=&pid=ImgRaw&r=0')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      padding: '20px',
      color: '#fff',
      minHeight: '100vh' // Ensures that the div is at least the height of the viewport

    }}>
                <center><h1 className="mt-5">BACKUP SECTION</h1></center>
                <div className="row">
                    {flashcards.map((todo) => (
                        <div key={todo.WORD_ID} className="col-md-4">
                            <div className="card mb-4" style={{ backgroundColor: 'white', color: '#343a40'}}>
                                <div className="card-body">
                                    <h3 className="card-title">{todo.WORD_STRING}</h3>
                                    <p className="card-text"><strong>Meaning/Significance:</strong> {todo.MEANING}</p>
                                    <p className="card-text"><strong>Category:</strong> {todo.CATEGORY}</p>
                                    <p className="card-text"><strong>Difficulty:</strong> {todo.DIFFICULTY === 'E' ? 'Easy' : 'Difficult'}</p>
                                    <p className="card-text"><strong>Parts of Speech:</strong> {todo.PARTS_OF_SPEECH}</p>
                                    <p className="card-text"><strong>Example Sentence:</strong> {todo.EXAMPLE_SENTENCE}</p>
                                    <p className="card-text"><strong>Date of Deletion:</strong> {formatDateToDDMonYYYY(todo.DATE_OF_DELETION)}</p>
                                    <p className="card-text"><strong> <button className="btn btn-warning"> Restore Word </button> <button className="btn btn-danger"> Delete Word Permanently </button> </strong></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    </Fragment>
    )
}

export default BackupFlashcards;