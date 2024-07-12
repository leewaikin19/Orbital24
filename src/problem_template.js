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
            {/*TODOM add message diaogue fail or success*/}
            <button className="action_button animated_button" onClick={() => API.submitProblem(template.getCookie('token'), id, {'mcqs':mcqAnswer, 'srqs':srqAnswer}).then((resp) => {/* TODO @LWK19 Go to the submission page of this problem to see the result of the autograding*/})}><span>Submit Solution</span></button> 
            <Forum comments={[{author: "John", date: 1720751177, content: "This problem is challenging!", replies: [{author: "Jane", content: "I agree!", date:1730771177}]}]} />
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


    // TODOM add problem statistics
    function Forum({comments}) {
        //TODO @LWK19 Comment = {id, author, date, content, replies = [{author, date, content}, ...]}
        const chevronRef= createRef();
        const contentRef = createRef();
        const [showForum, setShowForum] = useState(false);
        const [comment, setComment] = useState("");
        const [replies, setReplies] = useState({}); // {comment_id:reply}
        function Reveal() {
            setShowForum((showForum) => !showForum)
        }
        function Hover() {
            chevronRef.current.style.transform = "rotate(90deg)"
            chevronRef.current.style.transition = "0.4s ease"
        }

        function Unhover() {
            showForum ? chevronRef.current.style.transform = "rotate(90deg)" : chevronRef.current.style.transform = "rotate(0deg)"
            chevronRef.current.style.transition = "0.4s ease"
        }

        function publishComment(comment) {
            // TODO @LWK19
            console.log(comment)
        }

        function saveReply(replies) {
            // TODO @LWK19
            console.log(replies)
        }

        // TODOM Debug this.
        // document.addEventListener('keydown', function(event) {
        //     if (event.key === 'Enter' && document.activeElement.id === 'post_comment') {
        //         publishComment(comment)
        //     }
        // })

        return(
            <div className="hint">
                <div onClick={Reveal} onMouseEnter={Hover} onMouseLeave={Unhover} className='forum_title' style={{cursor:"default"}}>
                    Discussion <i className="fa-solid fa-chevron-right" ref={chevronRef}></i>
                </div>
                {(showForum) ? (
                    <div style={{color:"var(--lightgray)", paddingTop:"2vh"}} ref={contentRef}>
                        <div style={{display:"grid", gridTemplateColumns:"7fr 1fr", columnGap:"clamp(6px, 4vw, 24px)"}}>
                            <template.FormInput name='comment' id='post_comment' placeholder="Enter your comment here." value = {comment} onChange = {(e) => setComment(e.target.value)} />
                            <button className="action_button animated_button" onClick={() => publishComment(comment)}><span>Post</span></button>
                        </div>
                        {comments.map((comment) => {
                            return(
                                <div className='thread'>
                                    <div className='comment'> {/* TODO @LWK19 Sort by date*/}
                                        <div>
                                            <div className='comment_metadata'>
                                                <b className='comment_author'>{comment.author}</b>
                                                &bull;
                                                <div className='comment_date'>{new Date(comment.date).toLocaleString()}</div>
                                            </div>
                                            <div className='comment_content'>
                                                {comment.content}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='replies'>
                                        {comment.replies.map((reply) => {
                                            return(
                                                <div className='reply'>
                                                    <div>
                                                        <div className='reply_metadata'>
                                                            <b className='reply_author'>{reply.author}</b>
                                                            &bull;
                                                            <div className='reply_date'>{new Date(reply.date).toLocaleString()}</div>
                                                        </div>
                                                        <div className='reply_content'>
                                                            {reply.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div style={{display:"grid", gridTemplateColumns:"7fr 1fr", columnGap:"clamp(6px, 4vw, 24px)"}}>
                                        <template.FormInput name='comment' id='post_reply' style={{marginLeft:"1vw"}} placeholder="Enter your reply here." onChange = {(e) => setReplies(() => {
                                            const updatedReplies = replies;
                                            if (comment.id in updatedReplies) {
                                                updatedReplies[comment.id] += e.target.value
                                            } else {
                                                updatedReplies[comment.id] = e.target.value
                                            }
                                            return updatedReplies
                                        })} />
                                        <button className="action_button animated_button" onClick={() => saveReply(replies)}><span>Post</span></button>
                                    </div>
                                </div>
                            )})}
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