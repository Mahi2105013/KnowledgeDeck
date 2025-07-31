import React from "react";
import { Navbar, Nav, Container, Row, Col, Card } from 'react-bootstrap';

const Resources = () => {
    return (
        // <div style={{ backgroundImage: `url('/resources-bg.jpg')`, zIndex: -1, backgroundSize: 'cover', paddingBottom: '50px' }}>
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
        
            <Container className="mt-2 pt-5">
                <center>
                    <a href="/home"> <button className="btn btn-light"> Go to Home Page </button></a>
                    <p> </p>
                    <h1 className="mb-4">GRE Resources</h1>
                </center>

                <Navbar bg="light" expand="lg" fixed="top">
                <Navbar.Brand href="#">GRE Resources</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#books">Books</Nav.Link>
                        <Nav.Link href="#websites">Websites</Nav.Link>
                        <Nav.Link href="#articles">Articles</Nav.Link>
                        <Nav.Link href="#videos">Videos</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

                <Row>
                    <Col md={12}>
                        <Card id="books" className="mb-4">
                            <Card.Body>
                                <Card.Title>GRE Prep Books</Card.Title>
                                <Card.Text>Explore the best GRE prep books to help you ace the test. These books cover all sections of the GRE and offer valuable practice and strategies.</Card.Text>
                                <ul>
                                    <li><a href="https://www.amazon.com/Official-GRE-Super-Prep-Tests/dp/1260011444" target="_blank" rel="noopener noreferrer">The Official Guide to the GRE General Test</a></li>
                                    <li><a href="https://www.amazon.com/Manhattan-Prep-GRE-Strategy-Guide/dp/1506248317" target="_blank" rel="noopener noreferrer">Manhattan Prep GRE Set of 8 Strategy Guides</a></li>
                                    <li><a href="https://www.amazon.com/Power-GRE-Prep-Study-Guide/dp/1506228084" target="_blank" rel="noopener noreferrer">PowerScore GRE Prep Books</a></li>
                                </ul>
                            </Card.Body>
                        </Card>

                        <Card id="websites" className="mb-4">
                            <Card.Body>
                                <Card.Title>GRE Prep Websites</Card.Title>
                                <Card.Text>Visit these websites for additional practice, study guides, and test-taking strategies.</Card.Text>
                                <ul>
                                    <li><a href="https://www.ets.org/gre" target="_blank" rel="noopener noreferrer">Official GRE Website</a></li>
                                    <li><a href="https://magoosh.com/gre/" target="_blank" rel="noopener noreferrer">Magoosh GRE Prep</a></li>
                                    <li><a href="https://www.kaptest.com/gre" target="_blank" rel="noopener noreferrer">Kaplan GRE Prep</a></li>
                                    <li><a href="https://www.powerscore.com/gre/" target="_blank" rel="noopener noreferrer">PowerScore GRE Prep</a></li>
                                </ul>
                            </Card.Body>
                        </Card>

                        <Card id="articles" className="mb-4">
                            <Card.Body>
                                <Card.Title>GRE Prep Articles</Card.Title>
                                <Card.Text>Read these articles to get tips and insights into preparing for the GRE exam.</Card.Text>
                                <ul>
                                    <li><a href="https://www.prepscholar.com/gre/blog/gre-studying-guide/" target="_blank" rel="noopener noreferrer">The Ultimate GRE Study Guide</a></li>
                                    <li><a href="https://www.crackverbal.com/gre/blog/gre-test-tips/" target="_blank" rel="noopener noreferrer">Top GRE Test Tips</a></li>
                                    <li><a href="https://www.testprepreview.com/gre_tips.htm" target="_blank" rel="noopener noreferrer">GRE Tips and Strategies</a></li>
                                </ul>
                            </Card.Body>
                        </Card>

                        <Card id="videos" className="mb-4">
                            <Card.Body>
                                <Card.Title>GRE Prep Videos (Playlists)</Card.Title>
                                <Card.Text>Watch these playlists for additional tips, strategies, and practice questions for the GRE.</Card.Text>
                                <center>
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=yHhUXobvOuYLhfX2&amp;list=PLMei7zYulSd-HWpmy9x0PJhMV7C8V8Wnz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                <p></p>
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=3iH-k-Nogr61f7vl&amp;list=PLYZACiD6j3VsFlDR68gbF9CK9gZedcPbY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                </center>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Resources;
