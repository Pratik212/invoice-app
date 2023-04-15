import React, {useEffect, useState} from 'react';
import classes from './contact-form.module.css';
import Notification from "../ui/notification";

async function sendContactData(contactDetails) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactDetails),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!')
    }
}

const ContactForm = () => {
        const [enteredName, setEnteredName] = useState('');
        const [enteredBillNumber, setEnteredBillNumber] = useState('');
        const [enteredKg, setEnteredKg] = useState('');
        const [enteredRate, setEnteredRate] = useState('');
        const [enteredMessage, setEnteredMessage] = useState('');
        const [enteredDate, setEnteredDate] = useState('');
        const [requestStatus, setRequestStatus] = useState('') // 'pending', 'success', 'error'
        const [requestError, setRequestError] = useState();
        const totalAmount =  enteredKg * enteredRate;
        const GST_RATE = 0.12;
    const GSTAmount = totalAmount * GST_RATE;
    const totalAmountWithGST = totalAmount + GSTAmount;

        useEffect(() => {

            if (requestStatus === 'success' || requestStatus === 'error') {
                const timer = setTimeout(() => {
                    setRequestStatus(null);
                    setRequestError(null);
                }, 3000)

                return () => clearTimeout(timer);
            }

        }, [requestStatus])


        async function sendMessageHandler(event) {
            event.preventDefault();

            setRequestStatus('pending');
            // add client side validation
            try {
                await sendContactData({
                    email: enteredEmail,
                    name: enteredName,
                    message: enteredMessage,
                })
                setRequestStatus('success');
                setEnteredName('')
                setEnteredEmail('')
                setEnteredMessage('')
            } catch (e) {
                setRequestError(e.message)
                setRequestStatus('error');
            }
        }

        let notification;

        if (requestStatus === 'pending') {
            notification = {
                status: 'pending',
                title: 'Sending message...',
                message: 'Your message is on its way!'
            }
        }

        if (requestStatus === "success") {
            notification = {
                status: 'success',
                title: 'Success!',
                message: 'Message sent successfully!'
            }
        }

        if (requestStatus === "error") {
            notification = {
                status: 'error',
                title: 'Error!',
                message: requestError
            }
        }


        return (
            <section className={classes.contact}>
                {/*<h1>How can I help you?</h1>*/}
                <form className={classes.form} onSubmit={sendMessageHandler}>
                    <div className={classes.controls}>
                        <div className={classes.control}>
                            <label htmlFor="">Name</label>
                            <input type="text" id="name" required value={enteredName}
                                   onChange={e => setEnteredName(e.target.value)}/>
                        </div>
                        <div className={classes.control}>
                            <label htmlFor="">Bill Number</label>
                            <input type="number" id="billNumber" required value={enteredBillNumber}
                                   onChange={e => setEnteredBillNumber(e.target.value)}/>

                        </div>
                    </div>

                    <div className={classes.controls}>
                        <div className={classes.control}>
                            <label htmlFor="">K.G.</label>
                            <input type="number" id="enteredKg" required value={enteredKg}
                                   onChange={e => setEnteredKg(e.target.value)}/>
                        </div>
                        <div className={classes.control}>
                            <label htmlFor="">Rate</label>
                            <input type="number" id="enteredRate" required value={enteredRate}
                                   onChange={e => setEnteredRate(e.target.value)}/>
                        </div>
                    </div>
                    <div className={classes.controls}>
                        <div className={classes.control}>
                            <label htmlFor="">Amount</label>
                            <input type="number" id="enteredKg" required value={totalAmount}
                                   disabled/>
                        </div>
                        <div className={classes.control}>
                            <label htmlFor="">G.S.T Amount</label>
                            <input type="number" id="enteredRate" required value={GSTAmount}
                                   disabled/>
                        </div>
                    </div>
                    <div className={classes.controls}>
                        <div className={classes.control}>
                            <label htmlFor="">Amount</label>
                            <input type="number" id="enteredKg" required value={totalAmountWithGST}
                                   disabled/>
                        </div>
                        <div className={classes.control}>
                            <label htmlFor="">Date</label>
                            <input type="text" id="enteredRate" required value={enteredDate}
                                   onChange={e => setEnteredDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className={classes.actions}>
                        <button>Submit</button>
                    </div>
                </form>
                {notification && (
                    <Notification status={notification.status} title={notification.title} message={notification.message}/>
                )}
            </section>
        );
    }
;

export default ContactForm;