import logo from './logo.svg';
import './App.css';
import PaymentForm from './PaymentForm/PaymentForm';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
 
  <Router>
    
      <Routes>
        <Route exact path="/" element={<PaymentForm/>} />
        
       
       
      </Routes>
    </Router>
  );
}

export default App;
