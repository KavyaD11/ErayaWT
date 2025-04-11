import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Home from './pages/Home';
import CustomizeBag from './pages/CustomizeBag';
import Shop from './pages/Shop';
import AboutUs from './pages/AboutUs';
import Blogs from './pages/Blogs';
import ContactUs from './pages/ContactUs';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customize" element={<CustomizeBag />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;