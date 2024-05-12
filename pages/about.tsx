import React from 'react';
import Header from '../components/Header';
import { useRouter } from 'next/router';


const AboutPage: React.FC = () => {
    const router = useRouter();
    const styles = {
        container: {
            fontFamily: "'Roboto', sans-serif",
            color: '#333',
            backgroundColor: 'white',
            padding: '20px',
        },
        title: {
            fontSize: '2em',
            fontWeight: 'bold',
            marginBottom: '20px',
        },
        text: {
            fontSize: '1em',
            lineHeight: '1.5',
            marginBottom: '20px',
        },
    };

    return (
        <div style={styles.container}>
            <Header />
            <h1 style={styles.title}>About Sovice malene</h1>
            <p style={styles.text}>
                Welcome to the world of "Sovice malene", where we believe in the power of laughter and good humor. We're not just a digital wallet provider, we're a digital wallet provider with a sense of humor! Our team, composed of dedicated professionals like Dmytro "The Jokester" Tupkalenko, Uros "The Pun Master" Babic, Vasilije "The Prankster" Bozaric, and Marko "The Comedian" Veskovic, is committed to delivering top-notch services and innovative solutions for our clients, all while cracking jokes and spreading smiles.
            </p>
            <p style={styles.text}>
                Our mission is to make online transactions as seamless, straightforward, and as fun as possible. We believe in the power of technology to transform the financial landscape, and we are at the forefront of this change, providing our users with a secure and convenient way to manage their digital assets. But we also believe in the power of a good laugh to transform your day, which is why our app comes with a daily joke feature!
            </p>
            <p style={styles.text}>
                At "Sovice malene", we take our work seriously, but we don't take ourselves too seriously. We know that finance can be a dry subject, so we do our best to liven it up. After all, who said finance had to be boring? With us, you'll be laughing all the way to the bank!
            </p>
            <p style={styles.text}>
                So, if you're looking for a digital wallet provider that's secure, reliable, innovative, and has a killer sense of humor, look no further than "Sovice malene". Join us today and let's put the 'fun' back in 'funds'!
            </p>
        </div>
    );
}
export default AboutPage;