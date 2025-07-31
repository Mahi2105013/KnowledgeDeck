// src/EmailForm.js
import React, { useState } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
//import './EmailForm.css'; // Custom CSS file for additional styling

const EmailForm = () => {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setTo('tasnimulislam1320@gmail.com')
            const res = await fetch("http://localhost:5000/send-email", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ to, subject, message }),
            });
            const data = await res.text();
            setResponse('Email sent successfully!');
        } catch (error) {
            console.error('Error:', error);
            setResponse('Error sending email.');
        }
    };

    return (
        <>
        <Container className="my-5" style={{
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            padding: '2rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
            <Card className="shadow-lg border-light rounded p-4" style={{
                borderRadius: '12px',
                padding: '2rem',
                backgroundColor: '#ffffff'
            }}>
                <Card.Body>
                    <h1 className="text-center mb-4">Contact Us</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formSubject">
                            <Form.Label className="font-weight-bold text-secondary">Subject</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter subject of your mail"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                                className="mb-3"
                            />
                        </Form.Group>
                        <Form.Group controlId="formMessage">
                            <Form.Label className="font-weight-bold text-secondary">Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                placeholder="Enter your message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                className="mb-3"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100"
                        style = {{
                            backgroundColor: '#007bff',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.75rem',
                            fontSize: '1rem',    
                            fontWeight: '500',
                            transition: 'background-color 0.2s ease-in-out'
                        }}
                        >
                            Send Email
                        </Button>
                    </Form>
                    {response && (
                        <Alert variant={response.startsWith('Error') ? 'danger' : 'success'} className="mt-4"
                        style={{ borderRadius: '8px', padding: '1rem' }}
                        >
                            {response}
                        </Alert>
                    )}
                </Card.Body>
            </Card>
        </Container>
        <p>.</p><p>.</p><p>.</p>
        </>
    );
};

export default EmailForm;
