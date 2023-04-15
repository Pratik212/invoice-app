import React from 'react';
import ContactForm from "../component/contact/contact-form";
import Head from "next/head";

const ContactPage = () => {
    return (
        <>
            <Head>
                <title>Contact Me</title>
                <meta name="description" content='Send me your messages!'/>
            </Head>
        <ContactForm/>
        </>
    );
};

export default ContactPage;