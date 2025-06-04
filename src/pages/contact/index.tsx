import React, { useState } from "react";
import HomeNavbar from "../../components/HomeNavbar";
import { LuPhone } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import "./contact.css";

const ContactPage = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        alert("Message sent! (not really, this is just a demo)");
        // Add logic to handle actual form submission
    };

    return (
        <>
            <HomeNavbar />
            <div className="contact-container">
                <div className="contact-container-item">
                    <h1 className="page-title">CONTACT</h1>
                    <p className="description">
                        We’d love to hear from you! Whether you have questions, feedback, or
                        suggestions, don’t hesitate to reach out.
                    </p>
                    <span><LuPhone style={{display:"inline-block", color:"#4F46E5"}} /> <p style={{display:"inline-block", marginLeft:"20px",marginTop:"8px", }}>484-324-2400</p></span>
                    <br/>
                    <span><MdOutlineMailOutline style={{display:"inline-block", color:"#4F46E5"}} /> <p style={{display:"inline-block", marginLeft:"20px",marginTop:"8px"}}>info@contactyourtilzz.com</p></span>

                </div>
                <div className="contact-container-item">
                    <form onSubmit={handleSubmit} className="contact-form">
                        <label>Name</label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Your Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                        <label> Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="example@email.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <label>Subject</label>
                        <input
                            name="subject"
                            type="text"
                            placeholder="Message Subject"
                            value={form.subject}
                            onChange={handleChange}
                        />
                        <label>Message</label>
                        <textarea
                            name="message"
                            placeholder="Type your message..."
                            rows={5}
                            value={form.message}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ContactPage;
