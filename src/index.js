import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './main';
import Home from './home';
import Otp from './otp';
import P418 from './418';
import P404 from './404';
import Dashboard from './dashboard';

// TODO dev note: use useID() to generate unique IDs for elements

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/">
            <Route index element={<Main />} />
            <Route path="index" element={<Main />} />
            <Route path="home" element={<Home />} />
            <Route path="otp" element={<Otp />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="418" element={<P418 />} />
            <Route path="*" element={<P404 />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);
