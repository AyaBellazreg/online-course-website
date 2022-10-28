import React, { useRef, useState } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import '../css/emailUs.css'
import emailjs from 'emailjs-com'; 


function EmaiUs() {

    const emailRef = useRef()
    const fullNameRef = useRef()
    const messageRef = useRef()
    const [error, setError] = useState("")
    const [successMsg, setSuccessMsg] = useState("")

    async function sendEmail(e) {
        e.preventDefault();
        emailjs.sendForm('eya', 'template_h61v91m', e.target, 'user_9QOtcdJhqKep0aTGO3nX7')
        .then((result) => {
            setSuccessMsg("Email has been sent successfully!")
        }, (error) => {
            setError("An error has occured. Please try again.")
        });
        e.target.reset();
    }
    return (
        <div>
            <form onSubmit={sendEmail}>
                {error && <Alert variant="danger">{error}</Alert>}
                {successMsg && <Alert variant="succes">{successMsg}</Alert>}
                <input type="text" ref={fullNameRef} placeholder="Full Name" name="name" />
                <input type="email" ref={emailRef} placeholder="Email" name="email" />
                <div>
                    <textarea name="message" ref={messageRef} rows="4" cols="50" placeholder="Your Message..."></textarea>
                </div>
                <button type="submit" className="btn btn-main">Send</button>
            </form>
        </div>
    )
}

export default EmaiUs
