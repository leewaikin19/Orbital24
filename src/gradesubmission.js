// This is the page for users to grade one of their submissions

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
    const solution = useRef(null);
    const id = window.location.href.split('/').at(-1);

    const promise = API.getGradableSubmission(template.getCookie('token'), id).then((resp) => {
        
        if (resp.success === false) {
            window.location.href = '/home'
        }
        submission.current = resp.reply;

        const promise1 = API.getProblem(template.getCookie('token'), submission.current.questionID).then((resp2) => {
            problem.current = resp2.reply;
        })

        const promise2 = API.getProblemSolution(template.getCookie('token'), submission.current.questionID).then((resp2) => {
            solution.current = resp2.reply;
        })
        return Promise.all([promise1, promise2]).then(() => setLoading(false))
    })

    return (
        < template.Home MainContent={() => (
            <MainContent submission={submission.current} problem={problem.current} solution={solution.current} id={id}/>)}  SSelected={'grade'} promise={promise} />
    )
}

function MainContent({submission, problem, solution, id}) { 
    const mcqUserAnswer = submission.submission.mcqs;
    const srqUserAnswer = submission.submission.srqs;
    const mcqAns = solution.mcqAns;
    const srqAns = solution.srqAns;
    const mcqPregrade = mcqUserAnswer.map((x,i)=>x===mcqAns[i])
    const [approved, setApproved] = useState(srqUserAnswer.map((x,i)=>srqAns[i].autograded ? x===srqAns[i].an : false)); 
    const [triggerGrade, setTriggerGrade] = useState(false);
    const [triggerError, setTriggerError] = useState(false);
    return (
        <>
            <template.Popup id="grades_submitted" trigger={triggerGrade} setTrigger={setTriggerGrade} title="Grades Submitted" content="Grades have been submitted successfully." />
            <template.Popup id="error_occured" trigger={triggerError} setTrigger={setTriggerError} title="Grades Not Submitted" content="An error occured. Please retry submitting the grades. If issue persists, please report it to the developers." onClickAction={() => window.location.href = "/grade"} />
            <em style={{marginBottom:'1em'}}>(Submitted on {new Date(submission.datetime).toLocaleString()})</em>
            <h1>{problem.title}</h1>
            <p>{problem.statement}</p>
            {problem.hints.map((hint, index) => {
                return(
                    <Hints title={"Hint " + (index + 1)} desc={hint} />
                )
            })}
            <h2 style={{marginBottom:"0.3em"}}>Submission</h2>
            {problem.mcqs.map((mcq, i) => {
                return(
                    <Mcq index = {i + 1} question={mcq.qn} options={mcq.options} iUserAnswer = {mcqUserAnswer[i]} iCorrectAnswer = {mcqAns[i]}/>
                )
            })}
            {problem.srqs.map((srq, i) => {
                return(
                    <Srq index = {i} question={srq.qn} placeholder="Enter your answer here" iUserAnswer = {srqUserAnswer[i]}  iCorrectAnswer = {srqAns[i].an} autograded = {srqAns[i].autograded}/>
                )
            })}
             <button className="action_button animated_button" onClick={finaliseGrades}><span>Finalise Grades</span></button> 
        </>
    )

    async function finaliseGrades() {
        const correct = mcqPregrade.reduce((x, y) => x && y, true) && approved.reduce((x, y) => x && y, true)
        const resp = await API.gradeSubmission(template.getCookie('token'), id, problem.id, correct, {'mcqs':mcqPregrade, 'srqs':approved})
        console.log(approved)
        if(resp.success){
            setTriggerGrade(true)
        }else{
            alert('An Error Occured')
        }
    }

    function impt_note({note}) {
        return(
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
    function Hints({title, desc}) {
        const chevronRef= createRef();
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

        return(
            <div className="hint">
                <div onClick={Reveal} onMouseEnter={Hover} onMouseLeave={Unhover} className='hint_title' style={{cursor:"default"}}>
                    <b>{title}</b> <i className="fa-solid fa-chevron-right" ref={chevronRef}></i>
                    {(showHint) ? (
                    <div className='content' ref={contentRef}>
                        {desc}
                    </div>) : null}
                </div>
            </div>
        )
    }

    function Srq({index, question, iUserAnswer = "", iCorrectAnswer = "", autograded = false}) {
        const [solution, setSolution] = useState(iUserAnswer);
        function toggleApproveReject(approve_value = false) {
            const button = approve_value ? document.getElementById("approve_button " + index) : document.getElementById("reject_button " + index)
            const other_button = approve_value ? document.getElementById("reject_button " + index) : document.getElementById("approve_button " + index)
            if (button.classList.contains('green_button')) {
                button.classList.remove('green_button');
            } else if (button.classList.contains('red_button')) {
                button.classList.remove('red_button');
            } else if (approve_value) {
                button.classList.add('green_button');
                other_button.classList.remove('red_button');

            } else {
                button.classList.add('red_button');
                other_button.classList.remove('green_button');
            }
            const new_approved = approved;
            new_approved[index] = approve_value;
            setApproved(new_approved);
        }

        return(
            <div className='form_input section' style={{display:"flex", flexDirection:"column", alignItems:"left", justifyContent:"left"}}>
                <b>Short Response Question {(index + 1) + (autograded ? " (Autograded)" : " (Manual grading)")}</b> 
                <h3 style={{margin:"0px 0px 0.5em 0px"}}>{question}</h3>
                <template.FormInput name='solution' id='solution' className={autograded ? (iUserAnswer === iCorrectAnswer && iUserAnswer != "" ? "green_button" : "red_button") : ""} style={{margin:"0px 0px 0.5em 0px"}} value={solution} onChange={e => setSolution(e.target.value)} required disabled = {true}/>
                <p style={{margin:"0px 0px 0.5em 0px"}}>Correct Answer: {iCorrectAnswer}</p>
                {autograded ? null : (
                    <div id = {"approve_reject " + index} style={{display:"flex", flexDirection:"row", columnGap:"1em"}}>
                        <button 
                            id={'approve_button ' + index}
                            className='action_button animated_button approve_button ' 
                            onClick={() => toggleApproveReject(true)}>
                            <i className="fa-solid fa-thumbs-up"></i> <span>Approve Answer</span>
                        </button>
                        <button 
                            id={'reject_button ' + index}
                            className='action_button animated_button reject_button ' 
                            onClick={() => {toggleApproveReject(false)}}>
                            <i className="fa-solid fa-thumbs-down"></i> <span>Reject Answer</span>
                        </button>
                    </div>
                )}
            </div>
        )
    }

    function Mcq({index, question, options, iUserAnswer = "", iCorrectAnswer = ""}) {
        
        return(
            <div className='form_input section' style={{display:"flex", flexDirection:"column", alignItems:"left", justifyContent:"left"}}>
                <b>Multiple Choice Question {index}</b> 
                <h3 style={{margin:"0px 0px 0.5em 0px"}}>{question}</h3>
                <div id='mcq' className='mcq_input' style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"left"}}>
                    {options.filter(option => option!= '').map((option, i) => {
                        return (
                            <template.GradeMCQInput id={option} name={option} value={option} 
                            content={<span>{option + (mcqPregrade[i] ? " (Correct Answer) " : "") + (iUserAnswer.charCodeAt(0)-65 === i ? " (User Answer) " : "")}</span>} 
                            userAnswer={iUserAnswer.charCodeAt(0)-65 === i} 
                            correctAnswer={mcqPregrade[i]}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}