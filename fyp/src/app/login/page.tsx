// app/login/page.tsx
"use client"; // Mark this as a client component

import { useState } from 'react';
import logo from '../images/logo.png'; // Import the image

type Styles = {
  container: React.CSSProperties;
  leftContainer: React.CSSProperties;
  imageContainer: React.CSSProperties;
  imageText: React.CSSProperties;
  title: React.CSSProperties;
  form: React.CSSProperties;
  inputGroup: React.CSSProperties;
  label: React.CSSProperties;
  input: React.CSSProperties;
  showPasswordButton: React.CSSProperties;
  loginButton: React.CSSProperties;
  passwordHint: React.CSSProperties;
  loginText: React.CSSProperties;
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const styles: Styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#F27121',
      fontFamily: 'Arial, sans-serif',
      padding: '0 10%', // Padding to center the content
    },
    leftContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40%', // Width of the left container
      marginRight: '5%', // Space between left container and form
    },
    imageContainer: {
      width: '100%',
      height: 'auto',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    imageText: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      marginBottom: '20px',
      letterSpacing: '1px', // Added letter spacing
    },
    title: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#333',
      letterSpacing: '1px', // Added letter spacing
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '500px',
      height: '600px',
      backgroundColor: '#fff',
      padding: '50px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    inputGroup: {
      marginBottom: '15px',
    },
    label: {
      marginBottom: '5px',
      fontSize: '14px',
      color: '#555',
      letterSpacing: '1px', // Added letter spacing
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '14px',
      color: '#808080',
      borderRadius: '5px',
      border: '1px solid #ccc',
      outline: 'none',
      letterSpacing: '1px', // Added letter spacing
    },
    showPasswordButton: {
      marginTop: '5px',
      padding: '5px 10px',
      fontSize: '12px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      backgroundColor: '#fff',
      cursor: 'pointer',
      outline: 'none',
      letterSpacing: '1px', // Added letter spacing
    },
    loginButton: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#F27121',
      color: '#fff',
      cursor: 'pointer',
      outline: 'none',
      letterSpacing: '1px', // Added letter spacing
    },
    passwordHint: {
      marginTop: '10px',
      fontSize: '12px',
      color: '#666',
      textAlign: 'center',
      letterSpacing: '1px', // Added letter spacing
    },
    loginText: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#333',
      letterSpacing: '1px', // Added letter spacing
    },
  };

  return (
    <div style={styles.container}>
      {/* Left Container with Image and Text */}
      <div style={styles.leftContainer}>
        <div style={styles.imageText}>Admin Login</div>
        <h1>Dzongkha Letters and Numbers Tracing</h1>
        <div style={styles.imageContainer}>
          <img
            src={logo.src} // Use the imported image
            alt="App icon"
            style={{ width: '100%', height: 'auto' }}
            onError={(e) => {
              console.error('Image failed to load:', e);
              e.currentTarget.style.display = 'none'; // Hide the image if it fails to load
            }}
          />
        </div>
      </div>

      {/* Login Form */}
      <div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.loginText}>Login</div>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email address or phone number</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.showPasswordButton}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button type="submit" style={styles.loginButton}>Login</button>
          <p style={styles.passwordHint}>Use 8 or more characters with a mix of letters, numbers & symbols</p>
        </form>
      </div>
    </div>
  );
}