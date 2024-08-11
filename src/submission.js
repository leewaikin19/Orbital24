// This is the page for users to view one of their submissions

import { useState, useRef, createRef } from 'react'
import * as template from "./template.js"
import * as API from './API.js'

export default function Submission() {
    const [, setLoading] = useState(true);
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

    const promise = API.getOwnSubmission(template.getCookie('token'), id).then((resp) => {
        if (resp.success === false) {
            window.location.href = '/home'
        }
        submission.current = resp.reply;
        return API.getProblem(template.getCookie('token'), submission.current.questionID).then((resp2) => {
            problem.current = resp2.reply;
            setLoading(false);
        })
    })

    return (
        < template.Home MainContent={() => (
            <MainContent submission={submission.current} problem={problem.current} />)} MSelected={"Problems"} promise={promise} />
    )
}

function MainContent({ submission, problem }) {
    const mcqUserAnswer = submission.submission.mcqs;
    const srqUserAnswer = submission.submission.srqs;

    return (
        <>
            <em style={{ marginBottom: '1em' }}>(Submitted on {new Date(submission.datetime).toLocaleString()})</em>
            <h1>{problem.title}</h1>
            <p>{problem.statement}</p>
            {problem.hints.map((hint, index) => {
                return (
                    <Hints title={"Hint " + (index + 1)} desc={hint} />
                )
            })}
            <h2 style={{ marginBottom: "0.3em" }}>Submission</h2>
            {problem.mcqs.map((mcq, i) => {
                return (
                    <Mcq index={i} question={mcq.qn} options={mcq.options} iUserAnswer={mcqUserAnswer[i]} />
                )
            })}
            {problem.srqs.map((srq, i) => {
                return (
                    <Srq index={i} question={srq.qn} placeholder="Enter your answer here" iUserAnswer={srqUserAnswer[i]} />
                )
            })}
        </>
    )


    // function impt_note({ note }) {
    //     return (
    //         <div className="impt_note">
    //             <div className='impt_note_title'>
    //                 Important Note!
    //                 <div className='content'>
    //                     {note}
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

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
                <div onClick={Reveal} onMouseEnter={Hover} onMouseLeave={Unhover} className='hint_title' style={{ cursor: "default" }}>
                    <b>{title} {" "}</b> <i className="fa-solid fa-chevron-right" ref={chevronRef}></i>
                    {(showHint) ? (
                        <div className='content' ref={contentRef}>
                            <p style={{color:"var(--grayest)"}}>{desc}</p>
                        </div>) : null}
                </div>
            </div>
        )
    }

    function Srq({ index, question, placeholder = "Enter your answer here", iUserAnswer = "" }) {
        const [solution, setSolution] = useState(iUserAnswer);
        return (
            <div className='form_input section' style={{ display: "flex", flexDirection: "column", alignItems: "left", justifyContent: "left" }}>
                <b>Short Response Question {index + 1}</b>
                <h3 style={{ margin: "0px 0px 0.5em 0px" }}>{question}</h3>
                <template.GradeSRQInput name='solution' value={solution} setValue={e => setSolution(e.target.value)} placeholder={placeholder} correctAnswer={submission.done ? submission.correct_array.srqs[index]: null} />
            </div>
        )
    }

    function Mcq({ index, question, options, iUserAnswer = "" }) {
        return (
            <div className='form_input section' style={{ display: "flex", flexDirection: "column", alignItems: "left", justifyContent: "left" }}>
                <b>Multiple Choice Question {index + 1} (Autograded)</b>
                <h3 style={{ margin: "0px 0px 0.5em 0px" }}>{question}</h3>
                <div id='mcq' className='mcq_input' style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "left" }}>
                    {options.filter(option => option !== '').map((option, position) => {
                        return (
                            <template.GradeMCQInput id={String.fromCharCode(position + 65) + " " + index} name={option} value={option}
                                content={<span>{option + (option === iUserAnswer ? " (Your Answer)" : "")}</span>}
                                onClick={() => template.select(document.getElementById(option),
                                    document.getElementById("mcq"))} 
                                userAnswer={iUserAnswer === option}
                                correctAnswer={option === iUserAnswer ? submission.done ? submission.correct_array.mcqs[index]: null : null}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}