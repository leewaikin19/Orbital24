/* eslint-disable */
import { useState, useId, useRef, createRef } from 'react'
import * as template from "./template.js"
import * as API from './API.js'

export default function Problem(){
    const [loading, setLoading] = useState(true);
    const page = useRef(null);
    const id = window.location.href.split('/').at(-1);
    const problem = useRef({
        'title': '',
        'statement': '',
        'sandbox': '',
        'hints': [],
        'mcqs': [],
        'srqs': []
    });
    const k = import('./problems/'+id).then((r) => {
      page.current = <r.default />
      setLoading(false);
    }).catch((e) => {
        const promise = API.getProblem(template.getCookie('token'), id).then((resp) => {
            if (resp.success === false) {
                window.location.href = '../problems'
            }
            problem.current = resp.reply;
        })
        page.current =  < template.Home MainContent={() => (<MainContent id={id} title={problem.current.title} description={problem.current.statement} sandbox={problem.current.sandbox} hints={problem.current.hints} mcqs={problem.current.mcqs} srqs={problem.current.srqs} />)} MSelected={"Problems"} promise={promise} isProblem={true} />
        setLoading(false);
    })
  
    return (
        <>{loading ? <template.Loader/> : page.current}</>
    )  
  }

export function MainContent({id, title, description, sandbox = "", hints, mcqs, srqs}) { 
    console.log(title)
    const [mcqAnswer, setMcqAnswer] = useState([])
    const [srqAnswer, setSrqAnswer] = useState([])

    return (
        <div className='problems'>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                <h1 style={{flexGrow:7}}>{title}</h1>
                <button className="action_button animated_button" onClick={() => window.location.href = "/submissions/" + id} style={{width:"auto", padding:"0.3em 1em"}}><span>View Submissions</span></button>
            </div>
            <p>{description}</p>
            {Simulation(sandbox)}
            {hints.map((hint, index) => {
                return(
                    <Hints title={"Hint " + (index + 1)} desc={hint} />
                )
            })}
            <h2 style={{marginBottom:"0.3em"}}>Submission</h2>
            {mcqs.map((mcq, i) => {
                return(
                    <Mcq index = {i} question={mcq.qn} options={mcq.options} />
                )
            })}
            {srqs.map((srq, i) => {
                return(
                    <Srq index = {i} question={srq.qn} placeholder="Enter your answer here" />
                )
            })}
            <button className="action_button animated_button" onClick={() => API.submitProblem(template.getCookie('token'), id, {'mcqs':mcqAnswer, 'srqs':srqAnswer}).then((resp) => {/* TODO @LWK19 Go to the submission page of this problem to see the result of the autograding*/})}><span>Submit Solution</span></button> 
            {/* TODOM @LWK19 we need to discuss the struct of forum so we're on the same page < problems.Forum  /> */}
        </div>
    )

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

    function Srq({index, question, placeholder = "Enter your answer here"}) {
        return(
            <div className='form_input section' style={{display:"flex", flexDirection:"column", alignItems:"left", justifyContent:"left"}}>
                <b>Short Response Question {index + 1}</b> 
                <h3 style={{margin:"0px 0px 0.5em 0px"}}>{question}</h3>
                <template.FormInput name='solution' id = {"srq" + index} value={srqAnswer[index]} onChange={e => srqAnswer[index] = e.target.value} placeholder={placeholder} required/>
            </div>
        )
    }

    function McqHandler (option, index){
        template.select(document.getElementById(index + " " + option), document.getElementById("mcq" + index))
        mcqAnswer[index] == option ? mcqAnswer[index] = null : mcqAnswer[index] = option
        console.log(mcqAnswer)
    }

    function Mcq({index, question, options}) {
        return(
            <div className='form_input section' style={{display:"flex", flexDirection:"column", alignItems:"left", justifyContent:"left"}}>
                <b>Multiple Choice Question {index + 1}</b> 
                <h3 style={{margin:"0px 0px 0.5em 0px"}}>{question}</h3>
                <div id={'mcq' + index} className='mcq_input' style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"left"}}>
                    {options.filter(option => option!= '').map((option) => {
                        return(
                            <template.MCQInput id={index + " " + option} name={option} value={option} content={<span>{option}</span>} onClick={() => (McqHandler(option, index))}/>
                        )
                    })}
                </div>
            </div>
        )
    }

    function Forum({comments}) {
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
                <div onClick={Reveal} onMouseEnter={Hover} onMouseLeave={Unhover} className='forum_title unselectable' style={{cursor:"default"}}>
                    Discussion <i className="fa-solid fa-chevron-right" ref={chevronRef}></i>
                </div>
                {(showHint) ? (
                    <div className='content' ref={contentRef}>
                        {comments.map((comment) => {
                            return(
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

    function Simulation(sim) {
        console.log(sim)
        return(
            <div className='simulation'>
                <div className='simulation_title'>
                    <h2>Sandbox</h2>
                </div>
                {sim}
            </div>
        )
    }
}