/* eslint-disable */
import { React } from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './main';
import Homepage from './homepage';
import Otp from './otp';
import P418 from './418';
import P404 from './404';
import Dashboard from './dashboard';
import Tournaments from './tournaments';
import CreateAssess from './createassess';
import Leaderboards from './leaderboard';
import Bugs from './bugs';
import Posts from './posts';
import Problem from './problem_template';
import Explore from './explore';
import Create from './create'
import Grade from './grade'
import GradeSubmission from './gradesubmission'
import Assess from './assess';
import Edit from './edit';
import Submissions from './submissions';
import Submission from './submission';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/">
            <Route index element={<Main />} />
            <Route path="index" element={<Main />} />
            <Route path='problems'> 
              <Route path='/problems' element={<Explore />}/>
              <Route path='*' element={<Problem/>}/>
            </Route>
            <Route path='submissions'> 
              <Route path='*' element={<Submissions/>}/>
            </Route>
            <Route path='submission'> 
              <Route path='*' element={<Submission />}/>
            </Route>
            <Route path='assess'> 
              <Route path='*' element={<Assess/>}/>
            </Route>
            <Route path='edit'> 
              <Route path='*' element={<Edit/>}/>
            </Route>
            <Route path="home" element={<Homepage />} />
            <Route path="otp" element={<Otp />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="418" element={<P418 />} />
            <Route path="tournaments" element={<Tournaments />} />
            <Route path="createassessprobems" element={<CreateAssess />} />
            <Route path="leaderboards" element={<Leaderboards />} />
            <Route path="bugs" element={<Bugs />} />
            <Route path="posts" element={<Posts />} />
            <Route path="create" element={<Create />} />
            <Route path='grade'> 
              <Route path="/grade" element={<Grade />} />
              <Route path='*' element={<GradeSubmission/>}/>
            </Route>
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
