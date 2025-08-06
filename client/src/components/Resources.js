import React from "react";
import { Navbar, Nav, Container, Row, Col, Card } from 'react-bootstrap';

const Resources = () => {
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
                    background: 'linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
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
                        GRE Resources
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'rgba(255,255,255,0.5)' }} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link 
                                href="#books" 
                                style={{
                                    color: 'white',
                                    fontWeight: '500',
                                    margin: '0 10px',
                                    padding: '8px 15px',
                                    borderRadius: '20px',
                                    transition: 'all 0.3s ease',
                                    ':hover': {
                                        backgroundColor: 'rgba(255,255,255,0.2)'
                                    }
                                }}
                            >
                                Books
                            </Nav.Link>
                            <Nav.Link 
                                href="#websites" 
                                style={{
                                    color: 'white',
                                    fontWeight: '500',
                                    margin: '0 10px',
                                    padding: '8px 15px',
                                    borderRadius: '20px',
                                    transition: 'all 0.3s ease',
                                    ':hover': {
                                        backgroundColor: 'rgba(255,255,255,0.2)'
                                    }
                                }}
                            >
                                Websites
                            </Nav.Link>
                            <Nav.Link 
                                href="#articles" 
                                style={{
                                    color: 'white',
                                    fontWeight: '500',
                                    margin: '0 10px',
                                    padding: '8px 15px',
                                    borderRadius: '20px',
                                    transition: 'all 0.3s ease',
                                    ':hover': {
                                        backgroundColor: 'rgba(255,255,255,0.2)'
                                    }
                                }}
                            >
                                Articles
                            </Nav.Link>
                            <Nav.Link 
                                href="#videos" 
                                style={{
                                    color: 'white',
                                    fontWeight: '500',
                                    margin: '0 10px',
                                    padding: '8px 15px',
                                    borderRadius: '20px',
                                    transition: 'all 0.3s ease',
                                    ':hover': {
                                        backgroundColor: 'rgba(255,255,255,0.2)'
                                    }
                                }}
                            >
                                Videos
                            </Nav.Link>
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
                            background: 'linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%)',
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
                        background: 'linear-gradient(90deg, #fff, #c9d6ff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '20px',
                        textShadow: '0 4px 8px rgba(0,0,0,0.2)'
                    }}>
                        GRE Resources
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        maxWidth: '700px',
                        margin: '0 auto',
                        color: 'rgba(255,255,255,0.9)',
                        lineHeight: '1.6'
                    }}>
                        Your comprehensive guide to the best GRE preparation materials, curated to help you achieve your dream score.
                    </p>
                </div>

                {/* Resources Cards */}
                <Row>
                    <Col md={12}>
                        {/* Books Card */}
                        <Card 
                            id="books" 
                            className="mb-5"
                            style={{
                                border: 'none',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                                transition: 'all 0.3s ease',
                                background: 'rgba(255,255,255,0.95)',
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
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: '15px',
                                        flexShrink: '0'
                                    }}>
                                        <span style={{ 
                                            color: 'white',
                                            fontSize: '1.5rem'
                                        }}>📚</span>
                                    </div>
                                    <Card.Title style={{
                                        color: '#2c3e50',
                                        fontSize: '1.8rem',
                                        fontWeight: '700',
                                        margin: '0'
                                    }}>
                                        GRE Prep Books
                                    </Card.Title>
                                </div>
                                <Card.Text style={{
                                    color: '#7f8c8d',
                                    fontSize: '1.1rem',
                                    lineHeight: '1.6',
                                    marginBottom: '25px'
                                }}>
                                    Explore the best GRE prep books to help you ace the test. These books cover all sections of the GRE and offer valuable practice and strategies.
                                </Card.Text>
                                <ul style={{
                                    listStyle: 'none',
                                    padding: '0',
                                    margin: '0'
                                }}>
                                    {[
                                        {
                                            title: "The Official Guide to the GRE General Test",
                                            url: "https://www.amazon.com/Official-GRE-Super-Prep-Tests/dp/1260011444"
                                        },
                                        {
                                            title: "Manhattan Prep GRE Set of 8 Strategy Guides",
                                            url: "https://www.amazon.com/Manhattan-Prep-GRE-Strategy-Guide/dp/1506248317"
                                        },
                                        {
                                            title: "PowerScore GRE Prep Books",
                                            url: "https://www.amazon.com/Power-GRE-Prep-Study-Guide/dp/1506228084"
                                        }
                                    ].map((book, index) => (
                                        <li 
                                            key={index}
                                            style={{
                                                marginBottom: '15px',
                                                padding: '15px',
                                                backgroundColor: index % 2 === 0 ? 'rgba(110, 72, 170, 0.05)' : 'transparent',
                                                borderRadius: '8px',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <a 
                                                href={book.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                style={{
                                                    color: '#6e48aa',
                                                    fontWeight: '500',
                                                    textDecoration: 'none',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    transition: 'all 0.2s ease',
                                                    ':hover': {
                                                        color: '#9d50bb',
                                                        transform: 'translateX(5px)'
                                                    }
                                                }}
                                            >
                                                <span style={{
                                                    marginRight: '10px',
                                                    fontSize: '1.2rem'
                                                }}>→</span>
                                                {book.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </Card.Body>
                        </Card>

                        {/* Websites Card */}
                        <Card 
                            id="websites" 
                            className="mb-5"
                            style={{
                                border: 'none',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                                transition: 'all 0.3s ease',
                                background: 'rgba(255,255,255,0.95)',
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
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: '15px',
                                        flexShrink: '0'
                                    }}>
                                        <span style={{ 
                                            color: 'white',
                                            fontSize: '1.5rem'
                                        }}>🌐</span>
                                    </div>
                                    <Card.Title style={{
                                        color: '#2c3e50',
                                        fontSize: '1.8rem',
                                        fontWeight: '700',
                                        margin: '0'
                                    }}>
                                        GRE Prep Websites
                                    </Card.Title>
                                </div>
                                <Card.Text style={{
                                    color: '#7f8c8d',
                                    fontSize: '1.1rem',
                                    lineHeight: '1.6',
                                    marginBottom: '25px'
                                }}>
                                    Visit these websites for additional practice, study guides, and test-taking strategies.
                                </Card.Text>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                    gap: '15px'
                                }}>
                                    {[
                                        {
                                            title: "Official GRE Website",
                                            url: "https://www.ets.org/gre",
                                            description: "The official GRE website with test information and practice materials"
                                        },
                                        {
                                            title: "Magoosh GRE Prep",
                                            url: "https://magoosh.com/gre/",
                                            description: "Comprehensive online GRE prep with video lessons and practice questions"
                                        },
                                        {
                                            title: "Kaplan GRE Prep",
                                            url: "https://www.kaptest.com/gre",
                                            description: "Test prep resources including free practice tests and study plans"
                                        },
                                        {
                                            title: "PowerScore GRE Prep",
                                            url: "https://www.powerscore.com/gre/",
                                            description: "GRE preparation with focus on logical reasoning and analytical writing"
                                        }
                                    ].map((site, index) => (
                                        <a 
                                            href={site.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            key={index}
                                            style={{
                                                backgroundColor: 'rgba(71, 118, 230, 0.05)',
                                                borderRadius: '10px',
                                                padding: '20px',
                                                textDecoration: 'none',
                                                transition: 'all 0.3s ease',
                                                border: '1px solid rgba(71, 118, 230, 0.1)',
                                                ':hover': {
                                                    transform: 'translateY(-3px)',
                                                    boxShadow: '0 5px 15px rgba(71, 118, 230, 0.2)',
                                                    borderColor: 'rgba(71, 118, 230, 0.3)'
                                                }
                                            }}
                                        >
                                            <h3 style={{
                                                color: '#4776E6',
                                                fontSize: '1.3rem',
                                                marginTop: '0',
                                                marginBottom: '10px'
                                            }}>
                                                {site.title}
                                            </h3>
                                            <p style={{
                                                color: '#7f8c8d',
                                                margin: '0',
                                                fontSize: '0.95rem',
                                                lineHeight: '1.5'
                                            }}>
                                                {site.description}
                                            </p>
                                        </a>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>

                        {/* Articles Card */}
                        <Card 
                            id="articles" 
                            className="mb-5"
                            style={{
                                border: 'none',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                                transition: 'all 0.3s ease',
                                background: 'rgba(255,255,255,0.95)',
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
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: '15px',
                                        flexShrink: '0'
                                    }}>
                                        <span style={{ 
                                            color: 'white',
                                            fontSize: '1.5rem'
                                        }}>📝</span>
                                    </div>
                                    <Card.Title style={{
                                        color: '#2c3e50',
                                        fontSize: '1.8rem',
                                        fontWeight: '700',
                                        margin: '0'
                                    }}>
                                        GRE Prep Articles
                                    </Card.Title>
                                </div>
                                <Card.Text style={{
                                    color: '#7f8c8d',
                                    fontSize: '1.1rem',
                                    lineHeight: '1.6',
                                    marginBottom: '25px'
                                }}>
                                    Read these articles to get tips and insights into preparing for the GRE exam.
                                </Card.Text>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                    gap: '20px'
                                }}>
                                    {[
                                        {
                                            title: "The Ultimate GRE Study Guide",
                                            url: "https://www.prepscholar.com/gre/blog/gre-studying-guide/",
                                            description: "Comprehensive guide covering all aspects of GRE preparation"
                                        },
                                        {
                                            title: "Top GRE Test Tips",
                                            url: "https://www.crackverbal.com/gre/blog/gre-test-tips/",
                                            description: "Expert tips for each section of the GRE exam"
                                        },
                                        {
                                            title: "GRE Tips and Strategies",
                                            url: "https://www.testprepreview.com/gre_tips.htm",
                                            description: "Effective strategies to maximize your GRE score"
                                        }
                                    ].map((article, index) => (
                                        <div 
                                            key={index}
                                            style={{
                                                backgroundColor: 'white',
                                                borderRadius: '10px',
                                                padding: '0',
                                                overflow: 'hidden',
                                                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                                                transition: 'all 0.3s ease',
                                                ':hover': {
                                                    transform: 'translateY(-5px)',
                                                    boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
                                                }
                                            }}
                                        >
                                            <div style={{
                                                height: '5px',
                                                background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
                                                width: '100%'
                                            }}></div>
                                            <div style={{ padding: '20px' }}>
                                                <h3 style={{
                                                    color: '#2c3e50',
                                                    fontSize: '1.3rem',
                                                    marginTop: '0',
                                                    marginBottom: '15px'
                                                }}>
                                                    {article.title}
                                                </h3>
                                                <p style={{
                                                    color: '#7f8c8d',
                                                    marginBottom: '20px',
                                                    fontSize: '0.95rem',
                                                    lineHeight: '1.5'
                                                }}>
                                                    {article.description}
                                                </p>
                                                <a 
                                                    href={article.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        display: 'inline-block',
                                                        padding: '8px 20px',
                                                        borderRadius: '20px',
                                                        background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
                                                        color: 'white',
                                                        textDecoration: 'none',
                                                        fontWeight: '500',
                                                        transition: 'all 0.3s ease',
                                                        ':hover': {
                                                            boxShadow: '0 5px 15px rgba(0, 198, 255, 0.4)'
                                                        }
                                                    }}
                                                >
                                                    Read Article
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>

                        {/* Videos Card */}
                        <Card 
                            id="videos" 
                            className="mb-5"
                            style={{
                                border: 'none',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                                transition: 'all 0.3s ease',
                                background: 'rgba(255,255,255,0.95)',
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
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: '15px',
                                        flexShrink: '0'
                                    }}>
                                        <span style={{ 
                                            color: 'white',
                                            fontSize: '1.5rem'
                                        }}>🎬</span>
                                    </div>
                                    <Card.Title style={{
                                        color: '#2c3e50',
                                        fontSize: '1.8rem',
                                        fontWeight: '700',
                                        margin: '0'
                                    }}>
                                        GRE Prep Videos
                                    </Card.Title>
                                </div>
                                <Card.Text style={{
                                    color: '#7f8c8d',
                                    fontSize: '1.1rem',
                                    lineHeight: '1.6',
                                    marginBottom: '25px'
                                }}>
                                    Watch these playlists for additional tips, strategies, and practice questions for the GRE.
                                </Card.Text>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',
                                    gap: '30px',
                                    '@media (max-width: 768px)': {
                                        gridTemplateColumns: '1fr'
                                    }
                                }}>
                                    <div style={{
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                                    }}>
                                        <iframe 
                                            width="100%" 
                                            height="315" 
                                            src="https://www.youtube.com/embed/videoseries?si=yHhUXobvOuYLhfX2&amp;list=PLMei7zYulSd-HWpmy9x0PJhMV7C8V8Wnz" 
                                            title="YouTube video player" 
                                            frameBorder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowFullScreen
                                            style={{
                                                border: 'none',
                                                display: 'block'
                                            }}
                                        ></iframe>
                                        <div style={{ padding: '15px' }}>
                                            <h4 style={{
                                                margin: '0',
                                                color: '#2c3e50'
                                            }}>
                                                GRE Complete Course
                                            </h4>
                                        </div>
                                    </div>
                                    <div style={{
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                                    }}>
                                        <iframe 
                                            width="100%" 
                                            height="315" 
                                            src="https://www.youtube.com/embed/videoseries?si=3iH-k-Nogr61f7vl&amp;list=PLYZACiD6j3VsFlDR68gbF9CK9gZedcPbY" 
                                            title="YouTube video player" 
                                            frameBorder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowFullScreen
                                            style={{
                                                border: 'none',
                                                display: 'block'
                                            }}
                                        ></iframe>
                                        <div style={{ padding: '15px' }}>
                                            <h4 style={{
                                                margin: '0',
                                                color: '#2c3e50'
                                            }}>
                                                GRE Verbal Mastery
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

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
                    }

                    .card {
                        animation: fadeIn 0.5s ease forwards;
                    }

                    .card:nth-child(1) {
                        animation-delay: 0.1s;
                    }
                    .card:nth-child(2) {
                        animation-delay: 0.2s;
                    }
                    .card:nth-child(3) {
                        animation-delay: 0.3s;
                    }
                    .card:nth-child(4) {
                        animation-delay: 0.4s;
                    }
                `}
            </style>
        </div>
    );
}

export default Resources;