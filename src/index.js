import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router-dom";
import Main from './main';
import Home from './home';
import P404 from './404';

export default function App() {
  console.log("appp")
  return (
    <HashRouter>
      <Routes>
          <Route path="/">
            <Route index element={<Main />} />
            <Route path="home" element={<Home />} />
            <Route path="*" element={<P404 />} />
          </Route>
        </Routes>
    </HashRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <App />
  </React.StrictMode>
);
