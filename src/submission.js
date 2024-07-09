// This is the page for users to view one of their submissions

/* eslint-disable */
import { useState, useId, useRef, createRef } from 'react'
import * as template from "./template.js"
import * as API from './API.js'

export default function Submission() {
    const [loading, setLoading] = useState(true);
    const submission = useRef({
        'id': '',
        'username': '',
        'questionID': '',
        'submission': '',
        'done': false,
        'correct': false,
        'datetime': ''
    });
    const problem = useRef({
        'title': '',
        'statement': '',
        'sandbox': '',
        'hints': [],
        'mcqs': [],
        'srqs': []
    });
    const id = window.location.href.split('/').at(-1);

    const promise = API.getOwnSubmission(template.getCookie('token'), id).then(async (resp) => {
        if (resp.success === false) {
            window.location.href = '/home'
        }
        submission.current = resp.reply;
        await API.getProblem(template.getCookie('token'), submission.current.questionID).then((resp2) => {
            problem.current = resp2.reply;
            setLoading(false);
        })
    })

    return (
        < template.Home MainContent={() => (
            <MainContent submission={submission.current} problem={problem.current} MSelected={"Problems"} promise={promise} />)} />
    )
}
// TODOM idk how you did the submissions for the problems, but theres only one field submision.submission that contains the answer
function MainContent({ submission, problem }) {
    
    return (
        <div className='submission'>
            <h1>{problem.title}</h1>
            <p>{problem.statement}</p>
            {problem.sandbox}
            {problem.hints.map((hint, index) => {
                return (
                    <Hints title={"Hint " + (index + 1)} desc={hint} />
                )
            })}
            <h2 style={{ marginBottom: "0.3em" }}>Submission</h2>
            {problem.mcqs.map((mcq, i) => {
                return (
                    <Mcq index={i + 1} question={mcq.qn} options={mcq.options} userAnswer={mcqUserAnswer[i]} />
                )
            })}
            {problem.srqs.map((srq, i) => {
                return (
                    <Srq index={i + 1} question={srq.qn} placeholder="Enter your answer here" userAnswer={srqUserAnswer[i]} />
                )
            })}
        </div>
    )
}

function impt_note({ note }) {
    return (
        <div className="impt_note">
            <div className='impt_note_title'>
                Important Note!
                <div className='content'>
                    {note}
                </div>
            </div>
        </div>
    )
}

// Code adapted from https://stackoverflow.com/questions/24502898/show-or-hide-element-in-react 
function Hints({ title, desc }) {
    const chevronRef = createRef();
    const contentRef = createRef();
    const [showHint, setShowHint] = useState(false);
    function Reveal() {
        setShowHint((showHint) => !showHint)
    }
    function Hover() {
        chevronRef.current.style.transform = "rotate(90deg)"
        chevronRef.current.style.transition = "0.4s ease"
    }

    function Unhover() {
        showHint ? chevronRef.current.style.transform = "rotate(90deg)" : chevronRef.current.style.transform = "rotate(0deg)"
        chevronRef.current.style.transition = "0.4s ease"
    }

    return (
        <div className="hint">
            <div onClick={Reveal} onMouseEnter={Hover} onMouseLeave={Unhover} className='hint_title unselectable' style={{ cursor: "default" }}>
                <a>{title} {" "}</a> <i className="fa-solid fa-chevron-right" ref={chevronRef}></i>
                {(showHint) ? (
                    <div className='content' ref={contentRef}>
                        {desc}
                    </div>) : null}
            </div>
        </div>
    )
}

function Srq({ index, question, placeholder = "Enter your answer here", userAnswer = "" }) {
    const [solution, setSolution] = useState(userAnswer);
    return (
        <div className='form_input section' style={{ display: "flex", flexDirection: "column", alignItems: "left", justifyContent: "left" }}>
            <b>Short Response Question {index}</b>
            <h3 style={{ margin: "0px 0px 0.5em 0px" }}>{question}</h3>
            <template.FormInput name='solution' value={solution} onChange={e => setSolution(e.target.value)} placeholder={placeholder} disabled={true} />
        </div>
    )
}

function Mcq({ index, question, options, userAnswer = "" }) {
    return (
        <div className='form_input section' style={{ display: "flex", flexDirection: "column", alignItems: "left", justifyContent: "left" }}>
            <b>Multiple Choice Question {index}</b>
            <h3 style={{ margin: "0px 0px 0.5em 0px" }}>{question}</h3>
            <div id='mcq' className='mcq_input' style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "left" }}>
                {options.filter(option => option != '').map((option) => {
                    return (
                        <template.MCQInput id={option} name={option} value={option} content={<span>{option}</span>} onClick={() => template.select(document.getElementById(option), document.getElementById("mcq"))} preselected={option === userAnswer} disabled={true} />
                    )
                })}
            </div>
        </div>
    )
}

function Forum({ comments }) {
    const chevronRef = createRef();
    const contentRef = createRef();
    const [showHint, setShowHint] = useState(false);
    function Reveal() {
        setShowHint((showHint) => !showHint)
    }
    function Hover() {
        chevronRef.current.style.transform = "rotate(90deg)"
        chevronRef.current.style.transition = "0.4s ease"
    }

    function Unhover() {
        showHint ? chevronRef.current.style.transform = "rotate(90deg)" : chevronRef.current.style.transform = "rotate(0deg)"
        chevronRef.current.style.transition = "0.4s ease"
    }

    return (
        <div className="hint">
            <div onClick={Reveal} onMouseEnter={Hover} onMouseLeave={Unhover} className='forum_title unselectable' style={{ cursor: "default" }}>
                Discussion <i className="fa-solid fa-chevron-right" ref={chevronRef}></i>
            </div>
            {(showHint) ? (
                <div className='content' ref={contentRef}>
                    {comments.map((comment) => {
                        return (
                            <div className='comment'>
                                <div className='comment_content'>
                                    {comment.content}
                                </div>
                            </div>
                        )
                    })}
                </div>) : null}
        </div>
    )
}

function Simulation({ sim }) {
    return (
        <div className='simulation'>
            <div className='simulation_title'>
                <h2>Sandbox</h2>
            </div>
            {sim}
        </div>
    )
}