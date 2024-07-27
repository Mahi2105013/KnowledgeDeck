import React, { Fragment, useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import FlashcardsEasy from "./components/FlashcardsEasy.js";
import Register from "./components/Register.js"
import BackupFlashcards from "./components/BackupFlashcards.js";
import Quiz from "./components/Quiz.js";

const linkStyle = {
  color: 'blue',
  fontSize: '24px',
  fontWeight: 'bold',
  textDecoration: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  backgroundColor: '#f0f0f0',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  display: 'inline-block',
  transition: 'background-color 0.3s ease'
};

const hoverStyle = {
  backgroundColor: '#e0e0e0'
};

const boxStyle = {
  margin: '10px',
  padding: '15px',
  display: 'inline-block'
};

// Define page components directly within App.js
   //const HomePage = () => <div>  Hello! Home Page! </div>;
   const HomePage = () => {
    return (   
      <div className="text-center" style = {{backgroundImage: `url('/flashcards2.jpg')`}} >
        <h1 className="text-center"> KnowledgeDeck</h1>
        
        {/* <a href = '#admissionsmonthly'> COUNT OF ADMISSIONS (MONTHLY) </a> <br/> */}
        <p></p>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <div style={boxStyle}>
        <Link to="/difficulty" style={{ ...linkStyle, ...hoverStyle }} onMouseEnter={e => e.target.style.backgroundColor = '#e0e0e0'} onMouseLeave={e => e.target.style.backgroundColor = '#f0f0f0'}>
          &nbsp;&nbsp;Learn a deck of cards&nbsp;&nbsp;
        </Link>
      </div>
      <p></p>
      <div style={boxStyle}>
        <Link to="/quiz" style={{ ...linkStyle, ...hoverStyle }} onMouseEnter={e => e.target.style.backgroundColor = '#e0e0e0'} onMouseLeave={e => e.target.style.backgroundColor = '#f0f0f0'}>
          &nbsp;&nbsp;Quiz mode&nbsp;&nbsp;
        </Link>
      </div>
    </div>

      <div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div>
      <div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div>
      <div>.</div><div>.</div><div>.</div><div>.</div><div>.</div>
      </div>     
    );
  };
   const AboutPage = () => <div>This is the About Page.</div>;
   const ContactPage = () => <div>Contact us here!</div>;

   const ChoosingDifficulty = () => {
      const [difficulty, setDifficulty] = useState('')
    
      const handleEasy = () => {
        localStorage.setItem('difficulty', 'E');
        setDifficulty('E')
        
      }

      const handleDifficult = () => {
        localStorage.setItem('difficulty', 'D');
        setDifficulty('D')
        
      }

      return (
        <div className="text-center" style = {{backgroundImage: `url('/flashcards2.jpg')`}} >
        <h1 className="text-center"> KnowledgeDeck</h1>
        {/* <a href = '#admissionsmonthly'> COUNT OF ADMISSIONS (MONTHLY) </a> <br/> */}
        <p></p>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <div style={boxStyle}>
        <Link to="/flashcardseasy" onClick={handleEasy} 
        style={{ ...linkStyle, ...hoverStyle }} 
        onMouseEnter={e => e.target.style.backgroundColor = '#e0e0e0'} 
        onMouseLeave={e => e.target.style.backgroundColor = '#f0f0f0'}>
          &nbsp;&nbsp;EASY&nbsp;&nbsp;
        </Link>
      </div>
      <p></p>
      <div style={boxStyle}>
        <Link to="/flashcardseasy" onClick={handleDifficult} style={{ ...linkStyle, ...hoverStyle }} onMouseEnter={e => e.target.style.backgroundColor = '#e0e0e0'} onMouseLeave={e => e.target.style.backgroundColor = '#f0f0f0'}>
          &nbsp;&nbsp;DIFFICULT&nbsp;&nbsp;
        </Link>
      </div>
    </div>

    

      <div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div>
      <div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div>
      <div>.</div><div>.</div><div>.</div><div>.</div><div>.</div>
      </div>     
    );
   };
   


function App() {
  
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    useEffect(() => {
      const isAuthenticated2 =localStorage.getItem('isLoggedIn');
      if(isAuthenticated2)
      {
        setIsLoggedIn(true);
      }
    }, [])

    const renderp = () => {
      if('/')
      {
        return null;
      }

      return <p className="text-center"> YOU HAVEN'T LOGGED IN YET! </p>
    }

    return (
      <Router>
          <div style = {{backgroundImage: `url('/flashcards.jpg')`}}>
          {isLoggedIn ? <NavigationBar /> : <p></p>}
          {!isLoggedIn ? renderp() : <p></p>}
          {/* Route definitions */}
          <Routes>
            <Route path="/" element={<Login6 />} />
            {isLoggedIn && (
            <>
            {/* <Route
                path="/dashboard"
                element={
                  isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />
                }
              />
            */}
            <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/doctors" />} />
            {/* <Route path="/flashcards" element={<Flashcards />} /> */}
            <Route path="/difficulty" element={<ChoosingDifficulty />} />
            <Route path="/flashcardseasy" element={<FlashcardsEasy />} />
            <Route path="/backupflashcards" element={<BackupFlashcards />} />
            {/* <Route path="/doctors" element={<ListofDoctors />} />
            <Route path="/medicines" element={<ListofMedicines />} /> */}
            <Route path = "/registeraccount" element={<Register />}/>
            <Route path = "/quiz" element={<Quiz />}/>
            </>
            )}

          </Routes>
        </div>
      </Router>
    );

}

export default App;


const NavigationBar = () => {
  const location = useLocation();
  if(location.pathname === '/login')
  {
    return null;
  }

  if(location.pathname === '/')
  {
    return null;
  }

  const LoggingOut = () => {
    localStorage.removeItem('isLoggedIn');
  }

  return (
    <div style = {{backgroundColor: "white"}}>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container">
    <a href="#" class="navbar-brand"></a>
    <ul class="navbar-nav">
    <li class="nav-item">
    <Link to="/home" style={{color: 'white', fontSize: '24px', fontWeight: 'bold'}}> &nbsp;&nbsp;Home&nbsp;&nbsp; </Link>
    </li>
    {localStorage.getItem('useremail_currently_logged_in') === 'admin@gmail.com' && <li class="nav-item">
    <Link to="/backupflashcards" style={{color: 'white', fontSize: '24px', fontWeight: 'bold'}}> &nbsp;&nbsp;Deleted Words&nbsp;&nbsp; </Link>
    </li>}
    </ul>
    <div class="navbar-text"> <Link to="/"> <button className="btn btn-danger" onClick={LoggingOut}> Logout </button> </Link> </div>
    </div>
    </nav>
</div>
  );
}



const Login6 = ({ setLoginTrue }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const [isAdmin, setIsAdmin] = useState(false)
  const [isUser, setIsUser] = useState(false)

  const { email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/loggingin");

      const parseRes = await response.json();
      
      let x = false

      parseRes.forEach(element => {
        console.log(element.USER_EMAIL)
        console.log(email)

        console.log(element.USER_PASSWORD)
        console.log(password)

        if(element.USER_EMAIL === email && element.USER_PASSWORD === password)
        {
          if(isAdmin && email === 'admin@gmail.com') x = true;
          else if(!isAdmin && email !== 'admin@gmail.com') x = true;

          if (x) {
            localStorage.setItem('isLoggedIn', true);
            console.log("yep");
            window.location = "/home"
            localStorage.setItem('username_currently_logged_in', element.USER_NAME);
            localStorage.setItem('userid_currently_logged_in', element.USER_ID);
            localStorage.setItem('useremail_currently_logged_in', element.USER_EMAIL);
          }
          
          // to get the locally stored username: 
          /*
            // Get the value from localStorage
          const storedUsername = localStorage.getItem('username');
          console.log(storedUsername); // Output: 'JohnDoe'

          */
        }
        
        else
        {
          console.log('no! incorrect in this looP!')
        }
        //else {window.location = "/doctors";}
      });

      if (!x) {
        alert("Incorrect username and password")
        console.log("nope, doesnt match")
      }
        
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    //setIsAdmin(selectedValue === 'option1');
    //if(selectedValue === 'option2') setIsAdmin(false)
    if (selectedValue === 'option1') {
      setIsAdmin(true)
      setIsUser(false)
    }

    else if (selectedValue === 'option2') {
      setIsAdmin(false)
      setIsUser(true)
    }

    else {
      setIsAdmin(false)
      setIsUser(false)
    }

  };

  return (
    <Fragment>
      <div style = {{backgroundColor: "white"}}>
      <h1 className="mt-5 text-center">Login</h1>
      <form onSubmit={onSubmitForm}>
        <center>
        <div className="d-flex">
        <label>Email: </label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={e => onChange(e)}
          className="form-control my-1"
          style={{width: '700px'}}
          //className="form-control"
        />
        </div>
        <div className="d-flex">
          <p> </p> <p> </p> <p> </p> <p> </p>  <p> </p> <p> </p> 
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
          className="form-control my-1"
          style={{width: '700px'}}
          //className="form-control"
        />
        </div>
        <p> </p> <p> </p>
        
        <div>
          Login As: &nbsp;
          <select onChange={handleChange} defaultValue="">
            <option value="" disabled>Select role</option>
            <option value="option1">Admin</option>
            <option value="option2">User</option>
          </select>
        </div>
        <p> </p> <p></p>
        <button class="btn btn-success" disabled={!isAdmin && !isUser}>Submit</button>
        </center>
      </form>
      <center>
      <Link to="/registeraccount">Don't have an account? Register</Link>
      </center>
      </div>
    </Fragment>
  );
};
