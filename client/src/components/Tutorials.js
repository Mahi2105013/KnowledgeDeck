import React from "react";
import { Navbar, Nav, Container, Row, Col, Card } from 'react-bootstrap';

const Tutorials = () => {
    return (
        <div style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/words.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            padding: '20px',
            color: '#fff',
            minHeight: '100vh',
            fontFamily: "'Poppins', sans-serif"
        }}>
            {/* Animated Navigation Bar */}
            <Navbar 
                expand="lg" 
                fixed="top"
                style={{
                    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    padding: '15px 0'
                }}
            >
                <Container>
                    <Navbar.Brand 
                        href="#" 
                        style={{
                            color: 'white',
                            fontWeight: '700',
                            fontSize: '1.5rem',
                            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                    >
                        GRE Tutorials
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'rgba(255,255,255,0.5)' }} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto" style={{ flexWrap: 'wrap' }}>
                            {[
                                { name: 'Introduction', id: 'introduction' },
                                { name: 'Strategies', id: 'strategies' },
                                { name: 'Math Tricks', id: 'math-tricks' },
                                { name: 'Practice Questions', id: 'practice-questions' },
                                { name: 'Vocabulary Tips', id: 'vocabulary' },
                                { name: 'High Frequency Words', id: 'high-frequency-words' },
                                { name: 'Analytical Writing', id: 'analytical-writing' },
                                { name: 'Study Plan', id: 'study-plan' },
                                { name: 'Test Day Tips', id: 'test-day' },
                                { name: 'Interviews', id: 'interviews' }
                            ].map((item, index) => (
                                <Nav.Link 
                                    key={index}
                                    href={`#${item.id}`}
                                    style={{
                                        color: 'white',
                                        fontWeight: '500',
                                        margin: '5px',
                                        padding: '8px 15px',
                                        borderRadius: '20px',
                                        transition: 'all 0.3s ease',
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        ':hover': {
                                            backgroundColor: 'rgba(255,255,255,0.2)',
                                            transform: 'translateY(-2px)'
                                        }
                                    }}
                                >
                                    {item.name}
                                </Nav.Link>
                            ))}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-5 pt-5">
                {/* Hero Section */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '50px',
                    animation: 'fadeIn 1s ease'
                }}>
                    <button 
                        className="btn"
                        onClick={() => window.location.href = "/home"}
                        style={{
                            padding: '12px 30px',
                            borderRadius: '30px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                            marginBottom: '30px',
                            ':hover': {
                                transform: 'translateY(-3px)',
                                boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
                            }
                        }}
                    >
                        ← Go to Home Page
                    </button>
                    
                    <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: '800',
                        background: 'linear-gradient(90deg, #fff, #a1c4fd)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '20px',
                        textShadow: '0 4px 8px rgba(0,0,0,0.2)'
                    }}>
                        GRE Video Tutorials
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        maxWidth: '700px',
                        margin: '0 auto',
                        color: 'rgba(255,255,255,0.9)',
                        lineHeight: '1.6'
                    }}>
                        Master the GRE with our comprehensive collection of video tutorials covering all aspects of the exam.
                    </p>
                </div>

                {/* Tutorial Cards */}
                <Row>
                    <Col md={12}>
                        {[
                            {
                                id: 'introduction',
                                title: 'AN INTRODUCTION',
                                description: 'This video provides a comprehensive introduction to the GRE exam, covering the basics of what the test is about, the different sections it comprises, and the overall format.',
                                videoId: 'ggSuRcmiaxY'
                            },
                            {
                                id: 'strategies',
                                title: 'STRATEGIES FOR GRE EXAM',
                                description: 'In this video, you\'ll learn effective strategies for tackling each section of the GRE exam. The tips shared can help you improve your time management and answer questions more accurately.',
                                videoId: '2585Hzowa7g'
                            },
                            {
                                id: 'math-tricks',
                                title: 'MATH TRICKS',
                                description: 'This video covers useful math tricks and shortcuts that can save you time and make solving GRE quantitative questions easier. It\'s particularly helpful for those who find the math section challenging.',
                                videoId: '_3wBwKJV8ic'
                            },
                            {
                                id: 'practice-questions',
                                title: 'PRACTICE QUESTIONS',
                                description: 'Watch this video to see a variety of practice questions for the GRE exam. The explanations provided can help you understand how to approach and solve different types of questions.',
                                videoId: 'z6lbrzaCbdk'
                            },
                            {
                                id: 'vocabulary',
                                title: 'VOCABULARY BUILDING TIPS',
                                description: 'Learn tips and techniques for building a strong vocabulary, which is crucial for the verbal section of the GRE. This video offers practical advice on how to effectively memorize and use new words.',
                                videoId: 'M1X3rJ6X0o4'
                            },
                            {
                                id: 'high-frequency-words',
                                title: 'HIGH FREQUENCY GRE WORDS',
                                description: 'This video lists and explains high-frequency GRE words that often appear on the exam. Knowing these words can significantly boost your verbal score.',
                                videoId: 'vRj2u60J6mY'
                            },
                            {
                                id: 'analytical-writing',
                                title: 'ANALYTICAL WRITING ASSESSMENT TIPS',
                                description: 'This video offers tips and strategies for the GRE Analytical Writing Assessment. Learn how to structure your essays, develop your arguments, and manage your time effectively.',
                                videoId: '2KNAINOu3f0'
                            },
                            {
                                id: 'study-plan',
                                title: 'STUDY PLAN',
                                description: 'Watch this video to get a comprehensive study plan for the GRE. It covers how to organize your study schedule, what resources to use, and how to track your progress.',
                                videoId: '9JWaFOQ5azU'
                            },
                            {
                                id: 'test-day',
                                title: 'TEST DAY TIPS',
                                description: 'Get useful tips and advice for the day of your GRE exam. This video will help you prepare for what to expect and how to manage your time and stress effectively on test day.',
                                videoId: 'KR-CpCEkJUA'
                            },
                            {
                                id: 'interviews',
                                title: 'INTERVIEWS WITH GRE TOPPERS',
                                description: 'Listen to successful GRE test takers share their experiences, strategies, and tips for achieving a high score. These interviews provide valuable insights and motivation for your own preparation.',
                                videoId: '_CYF4LLUJS8'
                            }
                        ].map((tutorial, index) => (
                            <Card 
                                key={index}
                                id={tutorial.id}
                                className="mb-5"
                                style={{
                                    border: 'none',
                                    borderRadius: '15px',
                                    overflow: 'hidden',
                                    boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                                    transition: 'all 0.3s ease',
                                    background: 'rgba(255,255,255,0.95)',
                                    animation: `fadeIn ${0.3 + (index * 0.1)}s ease forwards`,
                                    ':hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                                    }
                                }}
                            >
                                <Card.Body style={{ padding: '30px' }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '20px'
                                    }}>
                                        <div style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '20px',
                                            flexShrink: '0',
                                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                                        }}>
                                            <span style={{ 
                                                color: 'white',
                                                fontSize: '1.8rem'
                                            }}>
                                                {index + 1}
                                            </span>
                                        </div>
                                        <Card.Title style={{
                                            color: '#2c3e50',
                                            fontSize: '1.8rem',
                                            fontWeight: '700',
                                            margin: '0'
                                        }}>
                                            {tutorial.title}
                                        </Card.Title>
                                    </div>
                                    <Card.Text style={{
                                        color: '#7f8c8d',
                                        fontSize: '1.1rem',
                                        lineHeight: '1.6',
                                        marginBottom: '25px'
                                    }}>
                                        {tutorial.description}
                                    </Card.Text>
                                    <div style={{
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                                        position: 'relative',
                                        paddingBottom: '56.25%', // 16:9 aspect ratio
                                        height: '0'
                                    }}>
                                        <iframe 
                                            width="100%" 
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${tutorial.videoId}`}
                                            title={`YouTube video player ${tutorial.title}`}
                                            frameBorder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowFullScreen
                                            style={{
                                                position: 'absolute',
                                                top: '0',
                                                left: '0',
                                                width: '100%',
                                                height: '100%',
                                                border: 'none'
                                            }}
                                        ></iframe>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        marginTop: '15px'
                                    }}>
                                        <a 
                                            href={`https://www.youtube.com/watch?v=${tutorial.videoId}`}
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                padding: '8px 20px',
                                                borderRadius: '20px',
                                                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                                                color: 'white',
                                                textDecoration: 'none',
                                                fontWeight: '500',
                                                transition: 'all 0.3s ease',
                                                ':hover': {
                                                    boxShadow: '0 5px 15px rgba(30, 60, 114, 0.4)',
                                                    transform: 'translateY(-2px)'
                                                }
                                            }}
                                        >
                                            Watch on YouTube
                                            <span style={{ marginLeft: '8px', fontSize: '1.2rem' }}>↗</span>
                                        </a>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                </Row>
            </Container>

            {/* Floating Scroll-to-Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    transition: 'all 0.3s ease',
                    zIndex: '1000',
                    ':hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
                    }
                }}
            >
                ↑
            </button>

            {/* Global Styles */}
            <style>
                {`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    body {
                        font-family: 'Poppins', sans-serif;
                        scroll-behavior: smooth;
                    }
                `}
            </style>
        </div>
    );
}

export default Tutorials;