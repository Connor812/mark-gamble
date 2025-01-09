import React from 'react';
import Header from '../components/Header';
import '../assets/css/thankyou.css';

function Thankyou() {
    return (
        <main className='thankyou-wrapper'>
            <Header />
            <div className='center-thankyou-text'>
                <center className='thankyou-container'>
                    <img src="/assets/images/thankyou.png" alt="mark gamble name" className='thankyou-img' />
                    <p className='mb-1'>Thank you for your purchase
                        We will contact you in the next few days
                        to verify your purchase</p>
                    <p className='mb-1'>If you have any questions please contact me</p>
                    21 Briarlea Crescent <br />
                    Port Dover Ontario <br />
                    NOA1N4 <br />
                    Mark: <a href="tel:519-429-0629">519-429-0629</a> <br />
                    Email: <a href="mailto:mark@markgamble.ca">mark@markgamble.ca</a>
                </center>
            </div>
        </main>
    )
}

export default Thankyou
