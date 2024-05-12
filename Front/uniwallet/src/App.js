import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './index.css';
import Header from './components/Header';
import StartPage from './components/StartPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <StartPage />
            </>
          } index />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login/*" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}



const root = document.getElementById('root');
ReactDOM.createRoot(root).render(<App />);
export default App;
