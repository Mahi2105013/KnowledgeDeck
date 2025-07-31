import React from "react";
import { Navbar, Nav, Container, Row, Col, Card } from 'react-bootstrap';

const Tutorials = () => {
    return (
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
                    <h1 className="mb-4">GRE Video Tutorials</h1>
                </center>

                <Navbar bg="light" expand="lg" fixed="top">
                <Navbar.Brand href="#">GRE Tutorials</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#introduction">Introduction</Nav.Link>
                        <Nav.Link href="#strategies">Strategies</Nav.Link>
                        <Nav.Link href="#math-tricks">Math Tricks</Nav.Link>
                        <Nav.Link href="#practice-questions">Practice Questions</Nav.Link>
                        <Nav.Link href="#vocabulary">Vocabulary Tips</Nav.Link>
                        <Nav.Link href="#high-frequency-words">High Frequency Words</Nav.Link>
                        <Nav.Link href="#analytical-writing">Analytical Writing</Nav.Link>
                        <Nav.Link href="#study-plan">Study Plan</Nav.Link>
                        <Nav.Link href="#test-day">Test Day Tips</Nav.Link>
                        <Nav.Link href="#interviews">Interviews</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>


                <Row>
                    <Col md={12}>
                        <Card id="introduction" className="mb-4">
                            <Card.Body>
                                <Card.Title>AN INTRODUCTION</Card.Title>
                                <Card.Text>This video provides a comprehensive introduction to the GRE exam, covering the basics of what the test is about, the different sections it comprises, and the overall format. It's a great starting point for anyone new to the GRE.</Card.Text>
                                <iframe width="100%" height="315" src="https://www.youtube.com/embed/ggSuRcmiaxY?si=4Py8GjQ-QelyYtca" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </Card.Body>
                        </Card>

                        <Card id="strategies" className="mb-4">
                            <Card.Body>
                                <Card.Title>STRATEGIES FOR GRE EXAM</Card.Title>
                                <Card.Text>In this video, you'll learn effective strategies for tackling each section of the GRE exam. The tips shared can help you improve your time management and answer questions more accurately.</Card.Text>
                                <iframe width="100%" height="315" src="https://www.youtube.com/embed/2585Hzowa7g?si=Khxwsqzb15F-iNFo" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </Card.Body>
                        </Card>

                        <Card id="math-tricks" className="mb-4">
                            <Card.Body>
                                <Card.Title>MATH TRICKS</Card.Title>
                                <Card.Text>This video covers useful math tricks and shortcuts that can save you time and make solving GRE quantitative questions easier. It's particularly helpful for those who find the math section challenging.</Card.Text>
                                <iframe width="100%" height="315" src="https://www.youtube.com/embed/_3wBwKJV8ic?si=Opdedaor0BEAMK_M" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </Card.Body>
                        </Card>

                        <Card id="practice-questions" className="mb-4">
                            <Card.Body>
                                <Card.Title>PRACTICE QUESTIONS</Card.Title>
                                <Card.Text>Watch this video to see a variety of practice questions for the GRE exam. The explanations provided can help you understand how to approach and solve different types of questions.</Card.Text>
                                <iframe width="100%" height="315" src="https://www.youtube.com/embed/z6lbrzaCbdk?si=ADZOA89V6K9xA-kD" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </Card.Body>
                        </Card>

                        <Card id="vocabulary" className="mb-4">
                            <Card.Body>
                                <Card.Title>VOCABULARY BUILDING TIPS</Card.Title>
                                <Card.Text>Learn tips and techniques for building a strong vocabulary, which is crucial for the verbal section of the GRE. This video offers practical advice on how to effectively memorize and use new words.</Card.Text>
                                <iframe width="100%" height="315" src="https://www.youtube.com/embed/M1X3rJ6X0o4?si=qeDv7WlANW8PF7m1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </Card.Body>
                        </Card>

                        <Card id="high-frequency-words" className="mb-4">
                            <Card.Body>
                                <Card.Title>HIGH FREQUENCY GRE WORDS</Card.Title>
                                <Card.Text>This video lists and explains high-frequency GRE words that often appear on the exam. Knowing these words can significantly boost your verbal score.</Card.Text>
                                <iframe width="100%" height="315" src="https://www.youtube.com/embed/vRj2u60J6mY?si=gbFY9Yd5YDDgA5JZ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </Card.Body>
                        </Card>

                        <Card id="analytical-writing" className="mb-4">
                            <Card.Body>
                                <Card.Title>ANALYTICAL WRITING ASSESSMENT TIPS</Card.Title>
                                <Card.Text>This video offers tips and strategies for the GRE Analytical Writing Assessment. Learn how to structure your essays, develop your arguments, and manage your time effectively.</Card.Text>
                                <iframe width="100%" height="315" src="https://www.youtube.com/embed/2KNAINOu3f0?si=3c6LikHAltP1WAae" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </Card.Body>
                        </Card>

                        <Card id="study-plan" className="mb-4">
                            <Card.Body>
                                <Card.Title>STUDY PLAN</Card.Title>
                                <Card.Text>Watch this video to get a comprehensive study plan for the GRE. It covers how to organize your study schedule, what resources to use, and how to track your progress.</Card.Text>
                                <iframe width="100%" height="315" src="https://www.youtube.com/embed/9JWaFOQ5azU?si=sWour8eflZm8J3B9" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </Card.Body>
                        </Card>

                        <Card id="test-day" className="mb-4">
                            <Card.Body>
                                <Card.Title>TEST DAY TIPS</Card.Title>
                                <Card.Text>Get useful tips and advice for the day of your GRE exam. This video will help you prepare for what to expect and how to manage your time and stress effectively on test day.</Card.Text>
                                <iframe width="100%" height="315" src="https://www.youtube.com/embed/KR-CpCEkJUA?si=12uJ94Ccnz8px0hD" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </Card.Body>
                        </Card>

                        <Card id="interviews" className="mb-4">
                            <Card.Body>
                                <Card.Title>INTERVIEWS WITH GRE TOPPERS</Card.Title>
                                <Card.Text>Listen to successful GRE test takers share their experiences, strategies, and tips for achieving a high score. These interviews provide valuable insights and motivation for your own preparation.</Card.Text>
                                <iframe width="100%" height="315" src="https://www.youtube.com/embed/_CYF4LLUJS8?si=TxVSpetdF_aXl7Bt" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Tutorials;
