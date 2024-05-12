import React from 'react';
import Header from '../components/Header';

export default function Contact() {
    const contacts = [
        { name: 'Dmytro Tupkalenko', email: '89221329@student.upr.si' },
        { name: 'Uros Babic', email: 'urosbabex03@gmail.com' },
        { name: 'Vasilije Bozaric', email: 'vasilijevanja@gmail.com' },
        { name: 'Marko Veskovic', email: 'marko.vesko.veskovic@gmail.com' },
    ];

    const styles = {
        container: {
            fontFamily: "'Roboto', sans-serif",  // Modern, clean font
            color: '#333',  // Dark grey for a softer contrast
            backgroundColor: 'white',
            padding: '20px',
        },
        title: {
            fontSize: '2em',  // Larger, more modern heading size
            fontWeight: 'bold',
            marginBottom: '20px',
        },
        text: {
            fontSize: '1em',  // Standard text size
            lineHeight: '1.5',  // More readable line spacing
            marginBottom: '20px',
        },
        contact: {
            fontSize: '1.2em',  // Slightly larger text for contact info
            fontWeight: 'bold',
        },
    };

    return (
        <div style={styles.container}>
            <Header />
            <h1 style={styles.title}>Contact Us</h1>
            {contacts.map((contact, index) => (
                <div key={index}>
                    <p style={styles.contact}>{contact.name}<br /><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                </div>
            ))}
            <h1 style={styles.title}>About Us</h1>
            <p style={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
            </p>
            <p style={styles.text}>
                Cras ornare tristique elit. Vivamus vestibulum ntulla nec ante. Praesent placerat risus quis eros. Fusce pellentesque suscipit nibh. Ut accumsan, neque id varius semper, tellus nunc malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.
            </p>
        </div>
    );
}
