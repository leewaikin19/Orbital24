import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './main';
import Home from './home';
import p404 from './404';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/">
            <Route index element={<Main />} />
            <Route path="home" element={<Home />} />
            <Route path="*" element={<p404 />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <App />
  </React.StrictMode>
);
