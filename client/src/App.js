import React, { Fragment, useState, useEffect } from "react";
import './App.css';
import {motion, AnimatePresence} from 'framer-motion'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import Flashcards from "./components/Flashcards.js";
import Register from "./components/Register.js"
import BackupFlashcards from "./components/BackupFlashcards.js";
import Quiz from "./components/Quiz.js";
import BookmarkedList from "./components/BookmarkedList.js";
import Tutorials from "./components/Tutorials.js";
import DailyWord from "./components/DailyWord.js";
import Resources from "./components/Resources.js";
import NotesList from "./components/NotesList.js";
import EmailForm from "./EmailForm.js";
//import SectionWiseWords from "./components/SectionWiseWords.js";
import SectionWiseWords from "./components/SectionWiseWords/SectionWiseWords.js";
import Loading from "./components/animations/Loading.js";

const HomePage = () => {
  return (
    // <div style={containerStyle} 
    <div style={{
      backgroundImage: `url('/words.jpeg')`,
      // backgroundImage: `url('/flashcards.jpg')`,
      // backgroundImage: `url('https://th.bing.com/th/id/R.de849f4c948af44d4a0524ea314f6041?rik=%2f8%2fb9Gr4iXG5gA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fd%2fb%2f0%2f572445.jpg&ehk=QWUD1TpQMYhugRwjTX1p039nNHjoKaefwdo4kQQsmvA%3d&risl=&pid=ImgRaw&r=0')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      padding: '20px',
      color: '#fff',
      minHeight: '100vh' // Ensures that the div is at least the height of the viewport
      ,display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      
      <h1 style={titleStyle}>KnowledgeDeck</h1>

      <Link 
        to="/difficulty" 
        style={{ ...linkStyle, ...hoverStyle }}
        onMouseEnter={e => e.target.style.backgroundColor = '#e0e0e0'} 
        onMouseLeave={e => e.target.style.backgroundColor = '#ffffff'}
      >
        Learn a deck of cards
      </Link>

      <Link 
        to="/quiz" 
        style={{ ...linkStyle, ...hoverStyle }} 
        onMouseEnter={e => e.target.style.backgroundColor = '#e0e0e0'} 
        onMouseLeave={e => e.target.style.backgroundColor = '#ffffff'}
      >
        Quiz mode
      </Link>

      <Link 
        to="/section" 
        style={{ ...linkStyle, ...hoverStyle }} 
        onMouseEnter={e => e.target.style.backgroundColor = '#e0e0e0'} 
        onMouseLeave={e => e.target.style.backgroundColor = '#ffffff'}
      >
        Explore words by topic
      </Link>

      <Link 
        to="/tutorials" 
        style={{ ...linkStyle, ...hoverStyle }} 
        onMouseEnter={e => e.target.style.backgroundColor = '#e0e0e0'} 
        onMouseLeave={e => e.target.style.backgroundColor = '#ffffff'}
      >
        Watch tutorials
      </Link>

      <Link 
        to="/dailyword" 
        style={{ ...linkStyle, ...hoverStyle }} 
        onMouseEnter={e => e.target.style.backgroundColor = '#e0e0e0'} 
        onMouseLeave={e => e.target.style.backgroundColor = '#ffffff'}
      >
        Daily Word
      </Link>

      <Link 
        to="/resources" 
        style={{ ...linkStyle, ...hoverStyle }} 
        onMouseEnter={e => e.target.style.backgroundColor = '#e0e0e0'} 
        onMouseLeave={e => e.target.style.backgroundColor = '#ffffff'}
      >
        Resources
      </Link>

      <Link 
        to="/sendemail" 
        style={{ ...linkStyle, ...hoverStyle }} 
        onMouseEnter={e => e.target.style.backgroundColor = '#e0e0e0'} 
        onMouseLeave={e => e.target.style.backgroundColor = '#ffffff'}
      >
        Contact Us
      </Link>
    
    </div>
  );
}; 

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(false); // State to manage loading animation
    //const location = useLocation(); // To get the current route
    
    useEffect(() => {
      const isAuthenticated2 =localStorage.getItem('isLoggedIn');
      if(isAuthenticated2)
      {
        setIsLoggedIn(true);
      }
    }, [])

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
          setLoading(false);
        }, 2000); // 2 seconds delay for loading
  
        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [window.location.pathname]);

    const renderp = () => {
      if('/')
      {
        return null;
      }

      return <p className="text-center"> YOU HAVEN'T LOGGED IN YET! </p>
    }

    return (
      <Router>
          <motion.div 
          key = {window.location.pathname}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ duration: 1.5 }}
          style= {{
            // backgroundImage: `url('/flashcards.jpg')`,
            // backgroundImage: `url('https://th.bing.com/th/id/R.de849f4c948af44d4a0524ea314f6041?rik=%2f8%2fb9Gr4iXG5gA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fd%2fb%2f0%2f572445.jpg&ehk=QWUD1TpQMYhugRwjTX1p039nNHjoKaefwdo4kQQsmvA%3d&risl=&pid=ImgRaw&r=0')`,
            backgroundImage: `url('/words.jpeg')`,
            
          }}>
          {isLoggedIn ? <NavigationBar /> : <p></p>}
          {!isLoggedIn ? renderp() : <p></p>}
          {/* Route definitions */}
          <AnimatePresence>
          {loading ? ( 
            <Loading /> // Show loading animation
          ) : (
          <Routes>
            <Route path="/" element={<Login6 />} />
            {isLoggedIn && (
            <>
            <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/doctors" />} />
            <Route path="/difficulty" element={<ChoosingDifficulty />} />
            <Route path="/section" element={<ChoosingSection />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/dailyword" element={<DailyWord />} />
            <Route path="/backupflashcards" element={<BackupFlashcards />} />
            <Route path="/bookmarks" element={<BookmarkedList />} />
            <Route path="/notes" element={<NotesList />} />
            <Route path = "/registeraccount" element={<Register />}/>
            <Route path = "/quiz" element={<Quiz />}/>
            <Route path = "/tutorials" element={<Tutorials />}/>
            <Route path = "/resources" element={<Resources />}/>
            <Route path = "/sendemail" element={<EmailForm />}/>
            <Route path = "/sectionwisewords" element={<SectionWiseWords />}/>
            </>
            )}

          </Routes>
          )}
        </AnimatePresence>
        </motion.div>
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
    <nav class="navbar navbar-expand navbar-dark">
    <div class="container">
    <a href="#" class="navbar-brand"></a>
    <ul class="navbar-nav">
    <li class="nav-item">
    <Link to="/home" style={{color: 'black', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none'}}> &nbsp;&nbsp;Home&nbsp;&nbsp; </Link>
    </li>
    <li class="nav-item">
    <Link to="/bookmarks" style={{color: 'black', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none'}}> &nbsp;&nbsp;Bookmarks&nbsp;&nbsp; </Link>
    </li>
    <li class="nav-item">
    <Link to="/notes" style={{color: 'black', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none'}}> &nbsp;&nbsp;Notes&nbsp;&nbsp; </Link>
    </li>
    {localStorage.getItem('useremail_currently_logged_in') === 'admin@gmail.com' && <li class="nav-item">
    <Link to="/backupflashcards" style={{color: 'black', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none'}}> &nbsp;&nbsp;Deleted Words&nbsp;&nbsp; </Link>
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

const ChoosingDifficultyHelper = ({ difficulty, text }) => {
  return (
    <Link 
      to="/flashcards" 
      style={{ ...linkStyleDiffChooser, ...hoverStyle }} 
      onMouseEnter={e => e.target.style.backgroundColor = '#e0e0e0'} 
      onMouseLeave={e => e.target.style.backgroundColor = '#ffffff'}
      onClick={() => {
        localStorage.setItem('difficulty', difficulty)
      }}
    >
      {text}
    </Link>
  );
};

const ChoosingDifficulty = () => {
  const [difficulty, setDifficulty] = useState('')

  return (
    <div style={{
      // backgroundImage: `url('https://th.bing.com/th/id/R.de849f4c948af44d4a0524ea314f6041?rik=%2f8%2fb9Gr4iXG5gA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fd%2fb%2f0%2f572445.jpg&ehk=QWUD1TpQMYhugRwjTX1p039nNHjoKaefwdo4kQQsmvA%3d&risl=&pid=ImgRaw&r=0')`,
      backgroundImage: `url('/words.jpeg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      padding: '20px',
      color: '#fff',
      minHeight: '100vh' // Ensures that the div is at least the height of the viewport

    }}>

    {/* <Link 
      to="/flashcards" 
      style={{ ...linkStyle, ...hoverStyle }} 
      onMouseEnter={e => e.target.style.backgroundColor = '#e0e0e0'} 
      onMouseLeave={e => e.target.style.backgroundColor = '#ffffff'}
      onClick={() => handleEasy()}
    >
      EASY-1
    </Link>
     */}

    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1px' }}>
    <ChoosingDifficultyHelper difficulty={"E"} text={'EASY-1'} style={{ flex: '1 1 calc(33.33% - 16px)' }}/>
    <ChoosingDifficultyHelper difficulty={"E2"} text={'EASY-2'} style={{ flex: '1 1 calc(33.33% - 16px)' }}/>
    <ChoosingDifficultyHelper difficulty={"E3"} text={'EASY-3'} style={{ flex: '1 1 calc(33.33% - 16px)' }}/>    
    <ChoosingDifficultyHelper difficulty={"E4"} text={'EASY-4'} style={{ flex: '1 1 calc(33.33% - 16px)' }}/>
    <ChoosingDifficultyHelper difficulty={"E5"} text={'EASY-5'} style={{ flex: '1 1 calc(33.33% - 16px)' }}/>
    <ChoosingDifficultyHelper difficulty={"I"} text={'INTERMEDIATE-1'} style={{ flex: '1 1 calc(33.33% - 16px)' }}/>
    <ChoosingDifficultyHelper difficulty={"I2"} text={'INTERMEDIATE-2'} style={{ flex: '1 1 calc(33.33% - 16px)' }}/>
    <ChoosingDifficultyHelper difficulty={"I3"} text={'INTERMEDIATE-3'} style={{ flex: '1 1 calc(33.33% - 16px)' }}/>
    <ChoosingDifficultyHelper difficulty={"I4"} text={'INTERMEDIATE-4'} style={{ flex: '1 1 calc(33.33% - 16px)' }}/>
    <ChoosingDifficultyHelper difficulty={"I5"} text={'INTERMEDIATE-5'} style={{ flex: '1 1 calc(33.33% - 16px)' }}/>
    <ChoosingDifficultyHelper difficulty={"D"} text={'DIFFICULT-1'} style={{ flex: '1 1 calc(33.33% - 16px)' }}/>
    <ChoosingDifficultyHelper difficulty={"D2"} text={'DIFFICULT-2'} style={{ flex: '1 1 calc(33.33% - 16px)' }}/>
    <ChoosingDifficultyHelper difficulty={"D3"} text={'DIFFICULT-3'} style={{ flex: '1 1 calc(33.33% - 16px)' }}/>
    <ChoosingDifficultyHelper difficulty={"D4"} text={'DIFFICULT-4'} style={{ flex: '1 1 calc(33.33% - 16px)' }}/>
    <ChoosingDifficultyHelper difficulty={"D5"} text={'DIFFICULT-5'} style={{ flex: '1 1 calc(33.33% - 16px)' }}/>
    </div>

  <div style={{textAlign: 'right', color: 'black'}}>
  <div>.</div><div>.</div><div>.</div><div>.</div><div>.</div><div>.</div>
  </div>
  </div>
);
};

const ChoosingSectionHelper = ({ imgSrc, title }) => {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mt-4">
      <div className="card text-dark bg-white">
        <div
          className="card-body"
          onClick={() => {
            window.location = '/sectionwisewords';
            localStorage.setItem('section_image', imgSrc)
            localStorage.setItem('section_category', title)
          }}
        >
          <img src={imgSrc} alt={`${title} Illustration`} className="card-img" />
          <h3 className="card-title" style={{ textAlign: 'center', color: 'black' }}>{title}</h3>
        </div>
      </div>
    </div>
  );
};

const ChoosingSection = () => {
  const [difficulty, setDifficulty] = useState('')

  return (
    <div style={{
      // backgroundImage: `url('https://th.bing.com/th/id/R.de849f4c948af44d4a0524ea314f6041?rik=%2f8%2fb9Gr4iXG5gA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fd%2fb%2f0%2f572445.jpg&ehk=QWUD1TpQMYhugRwjTX1p039nNHjoKaefwdo4kQQsmvA%3d&risl=&pid=ImgRaw&r=0')`,
      backgroundImage: `url('/words.jpeg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      padding: '20px',
      color: '#fff',
      minHeight: '100vh' // Ensures that the div is at least the height of the viewport
    }}>

    <div className="row">
        <ChoosingSectionHelper title={"ARTS"} imgSrc={"https://cdn5.vectorstock.com/i/1000x1000/56/79/cartoon-artist-painting-vector-2595679.jpg"}/>
        <ChoosingSectionHelper title={"BUSINESS"} imgSrc={"https://www.villagetalkies.com/wp-content/uploads/2020/09/Webp.net-resizeimage-8.jpg"}/>
        <ChoosingSectionHelper title={"ECONOMICS"} imgSrc={"https://th.bing.com/th/id/OIP.4gCfIuYGPSl8Z1QguZVNEAHaEC?rs=1&pid=ImgDetMain"}/>
        <ChoosingSectionHelper title={"EDUCATION"} imgSrc={"https://th.bing.com/th/id/OIP.LKJQJFUH0dxjLJiQSJaE_AHaEK?rs=1&pid=ImgDetMain"}/>
        <ChoosingSectionHelper title={"ENVIRONMENT"} imgSrc={"https://th.bing.com/th/id/OIP.CL2wpfXLEFNyQupCCk4EgwAAAA?rs=1&pid=ImgDetMain"}/>
        <ChoosingSectionHelper title={"FOOD"} imgSrc={"https://www.pngitem.com/pimgs/m/536-5366176_healthy-food-animated-hd-png-download.png"}/>
        <ChoosingSectionHelper title={"GEOGRAPHY"} imgSrc={"https://th.bing.com/th/id/R.e827f88571a08cf30a8c82f48048e67d?rik=RnBAOhHp%2fMy8Aw&riu=http%3a%2f%2fchurchfieldsjunior.com%2fwp-content%2fuploads%2f2020%2f05%2fillustration-geography.jpg&ehk=sq7yqBm4H27HFo5zb2J0RjXamn7RIMx%2f7N7hn%2fvgdbw%3d&risl=&pid=ImgRaw&r=0"}/>
        <ChoosingSectionHelper title={"HEALTHCARE"} imgSrc={"https://static.vecteezy.com/system/resources/previews/000/412/323/original/people-with-healthy-lifestyles-illustration-vector.jpg"}/>
        <ChoosingSectionHelper title={"HISTORY"} imgSrc={"https://th.bing.com/th/id/R.fac3f3cded9f0456c454687a77317cff?rik=STKrxZnbZ8LZ5Q&pid=ImgRaw&r=0"}/>
        <ChoosingSectionHelper title={"LAW"} imgSrc={"https://static.vecteezy.com/system/resources/previews/007/630/238/original/court-there-is-justice-decision-and-law-with-laws-scales-buildings-wooden-judge-hammer-in-flat-cartoon-design-illustration-vector.jpg"}/>
        <ChoosingSectionHelper title={"PHILOSOPHY"} imgSrc={"https://i.ytimg.com/vi/gaXCXVXrYzo/maxresdefault.jpg"}/>
        <ChoosingSectionHelper title={"POLITICS"} imgSrc={"https://static.vecteezy.com/system/resources/previews/009/951/832/original/politician-cartoon-hand-drawn-illustration-with-election-and-democratic-governance-ideas-participate-in-political-debates-in-front-of-audience-vector.jpg"}/>
        <ChoosingSectionHelper title={"PSYCHOLOGY"} imgSrc={"https://static.vecteezy.com/system/resources/previews/022/997/890/original/psychology-psychotherapy-practice-psychological-help-psychiatrist-consulting-patient-psychologist-online-modern-flat-cartoon-style-illustration-on-white-background-vector.jpg"}/>
        <ChoosingSectionHelper title={"SPORTS"} imgSrc={"https://th.bing.com/th/id/R.ffd61fffa23dab62eb3afdc0acd87b0d?rik=6JIMEm4s3hhUXg&riu=http%3a%2f%2fwikiclipart.com%2fwp-content%2fuploads%2f2016%2f10%2fVector-soccer-ball-clip-art-free-vector-for-download.png&ehk=KoXogYwjbYJj1H%2b9wduUgvn%2bHry3CVX1vzjkgcYeXiE%3d&risl=&pid=ImgRaw&r=0"}/>
        <ChoosingSectionHelper title={"TECHNOLOGY"} imgSrc={"https://th.bing.com/th/id/OIP.8s8hCdSZ8lKtOQY4M2D7RwHaEK?rs=1&pid=ImgDetMain"}/>
        <ChoosingSectionHelper title={"RELIGION"} imgSrc={"https://static.vecteezy.com/system/resources/previews/023/670/341/original/islamic-mosque-cartoon-illustration-design-vector.jpg"}/>
    </div>
    
  <div style={{textAlign: 'right', color: 'black'}}>
  <div>.</div><div>.</div><div>.</div>
  </div>
  </div>
);
};

const linkStyle = {
  color: '#333',
  fontSize: '20px',
  fontWeight: '600',
  textDecoration: 'none',
  padding: '15px 30px',
  borderRadius: '10px',
  backgroundColor: '#ffffff',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'block',
  textAlign: 'center',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  margin: '10px auto',
  width: '70%'
};

const linkStyleDiffChooser = {
  color: '#333',
  fontSize: '20px',
  fontWeight: '600',
  textDecoration: 'none',
  padding: '15px 30px',
  borderRadius: '10px',
  backgroundColor: '#ffffff',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'block',
  textAlign: 'center',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  margin: '10px auto',
  width: '30%'
};

const hoverStyle = {
  backgroundColor: '#f0f0f0',
  transform: 'scale(1.05)'
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  // backgroundImage: `url('https://th.bing.com/th/id/R.de849f4c948af44d4a0524ea314f6041?rik=%2f8%2fb9Gr4iXG5gA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fd%2fb%2f0%2f572445.jpg&ehk=QWUD1TpQMYhugRwjTX1p039nNHjoKaefwdo4kQQsmvA%3d&risl=&pid=ImgRaw&r=0')`,
  backgroundImage: `url('/words.jpeg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#fff'
};

const titleStyle = {
  fontSize: '3rem',
  fontWeight: 'bold',
  color: 'black',
  marginBottom: '40px'
};

const boxStyle = {
  margin: '10px',
  padding: '15px',
  display: 'inline-block'
};