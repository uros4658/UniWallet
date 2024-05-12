import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    const styles = {
        navbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 30px',
        },
        label: {
            margin: '0 0 0 12%',
        },
        'label a': {
            color: 'blue',
            fontSize: '40px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
        },
        ul: {
            listStyle: 'none',
            display: 'flex',
        },
        li: {
            padding: '15px',  // Adjusted the padding to vertically center the items
        },
        a: {
            color: 'black',
            fontSize: '25px',
            fontWeight: '600',
        },
        btn: {
            width: '100px',
            height: '50px',
            fontSize: '25px',
            background: 'purple',
            color: 'white',
            borderRadius: '30px',
            outline: 'none',
            border: 'none',
            cursor: 'pointer',
            marginTop: '0',  // Adjusted the top margin to 0
        },
    };

    return (
        <div style={styles.navbar}>
            <div className="label" style={styles.label}>
                <Link to="#" style={styles['label a']}>UniWallet</Link>
            </div>
            <ul style={styles.ul}>
                <li style={styles.li}><Link to="/" style={styles.a}>Home</Link></li>
                <li style={styles.li}><Link to="/features" style={styles.a}>Features</Link></li>
                <li style={styles.li}><Link to="/about" style={styles.a}>About</Link></li>
                <li style={styles.li}><Link to="/contact" style={styles.a}>Contact Us</Link></li>
                <li style={styles.li}>
                    <Link to="/login">
                        <button style={styles.btn}>Log in</button>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
