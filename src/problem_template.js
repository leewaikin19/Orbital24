import { useState, useRef, createRef } from 'react'
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
    const user = useRef(null)
    const forum = useRef(null)
    import('./problems/'+id).then((r) => {
      page.current = <r.default />
      setLoading(false);
    }).catch(() => {
        const promise1 = API.getProblem(template.getCookie('token'), id).then((resp) => {
            if (resp.success === false) {
                window.location.href = '../problems'
            }
            problem.current = resp.reply;
        })
        const promise2 = API.dashboard(template.getCookie('token')).then((resp) => {
            user.current = resp.reply;
        })
        const promise3 = API.getComments(template.getCookie('token'), id).then(resp => {
            forum.current = resp.reply;
        })
        const promise = Promise.all([promise1, promise2, promise3]).then(() => setLoading(false))

        async function refreshComments() {
            return await API.getComments(template.getCookie('token'), id).then(resp => {
                forum.current = resp.reply;
                return(resp.reply);
            })
        }
        page.current =  < template.Home MainContent={({popup}) => <MainContent problem={problem.current} sandbox={problem.sandbox} user={user.current} forum={forum.current} refreshComments={refreshComments} popup={popup}/>} MSelected={"Problems"} promise={promise} isProblem={true} />
    })

    return (
        <>{loading ? <template.Loader/> : page.current}</>
    )  
}



export function MainContent({problem, sandbox, user, forum, refreshComments, popup}) { 
    const id = problem.id;
    const title = problem.title;
    const description = problem.statement;
    const hints = problem.hints;
    const mcqs = problem.mcqs;
    const srqs = problem.srqs;
    const rating = problem.rating[1] <= 0 ? 0 : problem.rating[0]/problem.rating[1];
    const [mcqAnswer, ] = useState([])
    const [srqAnswer, ] = useState([])
    
    forum = forum === null ? [] : forum;
    const solved = user.problemsSolved.includes(id)
    const rated = user.ratedProblems.includes(id)
    const num_attempts = problem.stats.usersCorrect.length + problem.stats.usersIncorrect.length;
    const completion_rate = num_attempts === 0 ? 0 : Math.round(100*problem.stats.usersCorrect.length/num_attempts);
    console.log(popup)
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
            <template.ActionButton content="Submit Solution" onClickAction={() => {
                API.submitProblem(template.getCookie('token'), id, {'mcqs':mcqAnswer, 'srqs':srqAnswer}).then((resp) => {
                    if (resp.success) {
                        popup.setMsg("Your submission has been captured. Click 'View Submissions' to view your submissions.")
                        popup.setTitle("Submission Received")
                        popup.setOnClickAction(()=>() => window.location.href = '/submission/' + resp.reply.id)
                        popup.trigger(true)
                        
                    } else {
                        template.handleErrors(resp.msg, popup)
                    }
                })}}/>

            <Statistics num_attempts={num_attempts} completion_rate={completion_rate} />
            <Forum comm={forum} />
            <h2>Rate This Problem</h2>
            <Rate hasSolved={solved} hasRated = {rated} /> 
        </div>
    )

    // function impt_note({note}) {
    //     return(
    //         <div className="impt_note">
    //             <div className='impt_note_title'>
    //                 Important Note!
    //                 <div className='content'>
    //                 {note}
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

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
                        <p style={{color:"var(--grayest)"}}>{desc}</p>
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
        mcqAnswer[index] = (mcqAnswer[index] === option) ? null : option
    }

    function Mcq({index, question, options}) {
        return(
            <div className='form_input section' style={{display:"flex", flexDirection:"column", alignItems:"left", justifyContent:"left"}}>
                <b>Multiple Choice Question {index + 1}</b> 
                <h3 style={{margin:"0px 0px 0.5em 0px"}}>{question}</h3>
                <div id={'mcq' + index} className='mcq_input' style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"left"}}>
                    {options.filter(option => option!== '').map((option) => {
                        return(
                            <template.MCQInput id={index + " " + option} name={option} value={option} content={<span>{option}</span>} onClick={() => (McqHandler(option, index))}/>
                        )
                    })}
                </div>
            </div>
        )
    }

    function Statistics({num_attempts, completion_rate}) {
        const [showStats, setShowStats] = useState(true);
        const chevronRef= createRef();
        const contentRef = createRef();
        function Reveal() {
            setShowStats((showStats) => !showStats)
        }
        function Hover() {
            chevronRef.current.style.transform = "rotate(90deg)"
            chevronRef.current.style.transition = "0.4s ease"
        }

        function Unhover() {
            showStats ? chevronRef.current.style.transform = "rotate(90deg)" : chevronRef.current.style.transform = "rotate(0deg)"
            chevronRef.current.style.transition = "0.4s ease"
        }

        return(
            <div className="hint">
                <div onClick={Reveal} onMouseEnter={Hover} onMouseLeave={Unhover} className='forum_title' style={{cursor:"default"}}>
                    Statistics <i className="fa-solid fa-chevron-right" style={(showStats ? {transform:"rotate(90deg)"} : {})} ref={chevronRef}></i>
                </div>
                {(showStats) ? (
                    <div style={{color:"var(--lightgray)", paddingTop:"2vh", textAlign:"center"}} ref={contentRef}>
                        <p>Out of <b style={{color:"var(--orange)"}}>{num_attempts}</b> users made a submission, <b style={{color:"var(--orange)"}}>{completion_rate}%</b> of users have successfully solved this problem.</p>
                        <p>The average rating given by users for this problem is <b style={{color:"var(--orange)"}}>{rating}</b></p>
                    </div>) : null}
                </div>
        )
    }

    function Forum({comm}) {
        
        //Comment = {questionID, id, author, username, datetime, content, replies = [{author, username, datetime, content}, ...]}
        const [comments, setComments] = useState(comm.toReversed());
        const chevronRef= createRef();
        const contentRef = createRef();
        const [showForum, setShowForum] = useState(false);
        const [comment, setComment] = useState("");
        const [replies, setReplies] = useState(""); // {comment_id:reply}

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
            if(comment === "") {
                popup.setMsg("Comment cannot be empty.")
                popup.setTitle("Error")
                popup.setOnClickAction(()=>() => null)
                popup.trigger(true)
            } else {
                const commentObj = {'questionID':id, 'author':user.firstName + ' ' + user.lastName, 'username':user.username, 'content':comment, replies:[]}
                API.postComment(template.getCookie('token'), commentObj).then(resp =>{
                    if(resp.success){
                        refreshComments().then((resp) => {
                            setComments(resp.toReversed());
                            setComment("");
                            setReplies("");
                            document.getElementsByName('comment').forEach(x=>x.value="")
                        })
                    }else{
                        template.handleErrors(resp.msg, popup)
                    }
                })
            }
            
        }
        
        function saveReply(replies, commentID) {
            if (replies===""){
                popup.setMsg("Reply cannot be empty.")
                popup.setTitle("Error")
                popup.setOnClickAction(()=>() => null)
                popup.trigger(true)
                return
            }
            const replyObj = {'author':user.firstName + ' ' + user.lastName, 'username':user.username, 'content':replies}
            API.postReply(template.getCookie('token'), commentID, replyObj).then(resp =>{
                if(resp.success){
                    refreshComments().then((resp) => {
                        setComments(resp.toReversed());
                        setComment("");
                        setReplies("");
                        document.getElementsByName('comment').forEach(x=>x.value="")
                    })
                }else{
                    template.handleErrors(resp.msg, popup)
                }
            })
        }

        return (
            <div className="forum" id="forum">
                <div onClick={Reveal} onMouseEnter={Hover} onMouseLeave={Unhover} className='forum_title' style={{cursor:"default"}}>
                    Discussion <i className="fa-solid fa-chevron-right" ref={chevronRef}></i>
                </div>
                {(showForum) ? (
                    <div style={{color:"var(--lightgray)", paddingTop:"2vh"}} ref={contentRef}>
                        <div style={{display:"grid", gridTemplateColumns:"7fr 1fr", columnGap:"clamp(6px, 4vw, 24px)", width:"80%"}}>
                            <template.FormInput name='comment' id='post_comment' placeholder="Enter your comment here." value = {comment} onChange = {(e) => setComment(e.target.value)} />
                            <button className="action_button animated_button" onClick={() => publishComment(comment)}><span>Post</span></button>
                        </div>
                        {comments.map((comment) => {
                            return(
                                <div className='thread'>
                                    <div className='comment'> 
                                        <div>
                                            <div className='comment_metadata'>
                                                <b className='comment_author'>{comment.author}</b>
                                                &bull;
                                                <div className='comment_date'>{new Date(comment.datetime).toLocaleString()}</div>
                                            </div>
                                            <div className='comment_content'>
                                                {comment.content}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='replies' style={{marginBottom:"2vh"}}>
                                        {comment.replies.map((reply) => {
                                            return(
                                                <div className='reply'>
                                                    <div>
                                                        <div className='reply_metadata'>
                                                            <b className='reply_author'>{reply.author}</b>
                                                            &bull;
                                                            <div className='reply_date'>{new Date(reply.datetime).toLocaleString()}</div>
                                                        </div>
                                                        <div className='reply_content'>
                                                            {reply.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div style={{display:"grid", gridTemplateColumns:"7fr 1fr", columnGap:"clamp(6px, 4vw, 24px)", width:"80%"}}>
                                        <template.FormInput name='comment' id='post_reply' style={{marginLeft:"1vw"}} placeholder="Enter your reply here." onChange = {(e) => setReplies(() => e.target.value)} />
                                        <button className="action_button animated_button" onClick={() => saveReply(replies, comment.id)}><span>Post</span></button>
                                    </div>
                                </div>
                            )})}
                        </div>) : null}
                </div>
        )
    }

    function Simulation(sim) {
        return(
            <div className='simulation'>
                <div className='simulation_title'>
                    <h2>Sandbox</h2>
                </div>
                {sim}
            </div>
        )
    }

    function Rate({hasSolved = false, hasRated = true}){
        const [ratingTrigger, setRatingTrigger] = useState(false)
        var currentRating = 0
        function RatingHandler (id){
            currentRating = parseInt(id)
            template.select(document.getElementById(id), document.getElementById("rate_container"));
        }
        if (!hasSolved) {
            return (
                <div style={{textAlign:"center"}}>
                    <em>You have not solved this problem. Only users who have solved this problem can rate it.</em>
                </div>
            )
        } else if (hasRated) {
            return (
                <div style={{textAlign:"center"}}>
                    <em>You have already rated this problem.</em>
                </div>
            )
        }
        
        return(
            <>
                <template.Popup id="rate_popup" title="Successful" content="Your rating is successfully captured." trigger={ratingTrigger} setTrigger={setRatingTrigger} onClickAction={() => window.location.href = "/home"} />
                <div id='rate_container' style={{display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:"0px clamp(6px, 3vw, 18px)"}}>
                    <template.MCQInput id="1" name="rate" value="1" content={<span>1</span>} onClick={() => {RatingHandler("1")}}/>
                    <template.MCQInput id="2" name="rate" value="2" content={<span>2</span>} onClick={() => {RatingHandler("2")}}/>
                    <template.MCQInput id="3" name="rate" value="3" content={<span>3</span>} onClick={() => {RatingHandler("3")}}/>
                    <template.MCQInput id="4" name="rate" value="4" content={<span>4</span>} onClick={() => {RatingHandler("4")}}/>
                    <template.MCQInput id="5" name="rate" value="5" content={<span>5</span>} onClick={() => {RatingHandler("5")}}/>
                </div>
                <button className='action_button animated_button' onClick={() => {
                    API.submitRating(template.getCookie('token'), id, currentRating).then(resp => {
                        if(resp.success){
                            setRatingTrigger(true)
                        }
                    })
                }}><span>Submit Rating</span></button> 
            </>
        )
    }
}