import React from 'react';
import { Link } from 'react-router-dom';

export default function StartPage() {
    const styles = {
        container: {
            width: '100%',
            borderRadius: '10px',
        },
        'body-content': {
            display: 'flex',
        },
        'b-title': {
            marginLeft: '10%',
        },
        'b-title h1': {
            fontSize: '50px',  // increased from 45px to 50px
            marginTop: '150px',
        },
        'b-title span': {
            color: 'blue',
        },
        'b-title p': {
            fontSize: '30px',  // increased from 25px to 30px
        },
        'b-title button': {
            border: 'none',
            width: '100px',
            height: '50px',
            background: 'blue',
            borderRadius: '60px',
            outline: 'none',
            color: 'white',
        },
        'b-title .icons': {
            display: 'flex',
            marginTop: '80px',
        },
        'b-title .icons img': {
            width: '100px',
            height: '100px',
            padding: '20px',
        },
        'b-img': {
            marginLeft: '12%',
        },
        'b-img img': {
            width: 'auto',
            height: 'auto',
        },
        'b-title .get-started': {
            width: '200px',
            height: '50px',
            fontSize: '25px',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles['body-content']}>
                <div style={styles['b-title']}>
                    <h1>One platform<br />All the wallets, <span>UniWallet</span><br />your online paying pal</h1>
                    <p>Unlock the power of your cryptocurrency assets <br /> and explore the world of Web3 with Trust.</p>
                    <Link to="/login"><button style={styles['b-title button']} className="get-started">Get Started</button></Link>
                </div>
                <div style={styles['b-img']}>
                    <img src="Assets/hero-photo.svg" alt="Hero" />
                </div>
            </div>
        </div>
    );
}
