/* eslint-disable */

import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function Assess() {
    const [loading, setLoading] = useState(true);
    const problem = useRef({'title': '',
        'statement': '',
        'sandbox': '',
        'hints': [],
        'mcqs': [],
        'srqs': []});
    const id = window.location.href.split('/').at(-1);
    
    const promise = API.getProblem(template.getCookie('token'), id).then((resp) => {
        if(resp.success === false || resp.reply.pending === false) {
            window.location.href = '/createassessprobems'
        }
        problem.current = resp.reply;
        setLoading(false)
    })

    return (
        < template.Home MainContent={() => (
            <MainContent problem={problem.current} />)} SSelected={'createassessprobems'} promise={promise} />
    ) 
}

function MainContent({problem}) {
    const [title, setTitle] = useState(problem.title)
    const [statement, setStatement] = useState(problem.statement)
    const [sandbox, setSandbox] = useState(problem.sandbox)
    const [hints, setHints] = useState(problem.hints)
    const [proposed_exp, setProposedExp] = useState(problem.xp)
    const [proposed_diff, setProposedDiff] = useState(problem.difficulty)
    const [mcqs, setMCQs] = useState(problem.mcqs) // [{qn:"", options:["", "", "", "", ""], an:""},...]
    const [srqs, setSRQs] = useState(problem.srqs) // [{qn:"", an:""},...]

    function McqHandler (choice, num){
        template.select(document.getElementById(choice + num), document.getElementById(num))
        mcqs[num].an = choice
    }

    function approve() {
        // TODOM we have to discuss about the customJS feature, and what happens when reject
        API.updateProblem(template.getCookie('token'), problem.id, {'pending': false, 'xp':proposed_exp, 'difficulty':proposed_diff})
        .then((resp)=>{
            if(resp.success){
                alert('Sucessfully published problem')
                window.location.href = '/createassessprobems'
            } else {
                template.handleErrors(resp.msg);
            }
        })
    }

    function reject() {
        API.deleteProblem(template.getCookie('token'), problem.id)
        .then((resp)=>{
            if(resp.success){
                alert('Sucessfully removed problem')
                window.location.href = '/createassessprobems'
            } else {
                template.handleErrors(resp.msg);
            }
        })
    }

    return (
        <>
            <div className='section'>
                <template.TextArea name="Title" value={title} setValue={setTitle} placeholder={"Enter Title"} style={{fontSize:"var(--title)", fontWeight: 900, color:"var(--orange)"}} />
            </div>
            <div className='section'>
                <template.TextArea name="Statement" value={statement} setValue={setStatement} placeholder={"Enter Problem Statement"} />
            </div>
            <div id='sandbox_container' className='section'>
                <h2>Sandbox</h2>
                <template.TextArea name="Sandbox" value={sandbox} setValue={setSandbox} placeholder={"Describe the Sandbox"} />
            </div>
            <div className='section'>
                <h2>Hints</h2>
                <div className='hint_container'>
                    {hints.map((i, index) => {
                        return(
                        <div className='form_input'>
                            <textarea style={{marginBottom:"1em"}} id={"Hint " + index} value={hints[index]} onInput= {(e) => template.handler(e, (i) => {hints[index] = i}, "Hint " + index)} placeholder={"Enter Hint " + (index + 1)}/>
                        </div>
                    )})}
                </div>
                <button id='create_hint' className='action_button animated_button' onClick = {() => setHints(hints => [...hints, ""])}><span>Add Hint</span></button>
            </div>
            <div className='section'>
                <h2>Submission</h2>
                <div id='mcq_container' className='section'>
                    {mcqs.map((i, index) => (
                        <>
                            <div className='form_input section'>
                                <textarea id={"MCQ " + index} value={i.qn} onInput={(e) => template.handler(e, (i) => {mcqs[index].qn = i}, "MCQ " + index)} placeholder={"Enter Multiple Choice Question " + (index + 1)}/>
                            </div>
                            {/* TODOM Figure out how to do these better*/}
                            <div className='form_input section' id={index} style={{display:"flex", flexDirection:"column"}}>
                                <template.MCQInput 
                                    id={"A" + index} 
                                    name='A' 
                                    value='A' 
                                    content={
                                        <div className='create_mcq_options'>
                                            <textarea 
                                                id={"A " + index} 
                                                value={mcqs[index].options[0]} 
                                                onInput={(e) => {template.handler(e, (i) => 
                                                    // Array updating mechanism adapted from https://stackoverflow.com/questions/65393641/how-to-update-an-array-by-index-using-the-usestate-hook. 
                                                    // It is then wrapped in the handler function.
                                                    {const updatedMcqs = [...mcqs];
                                                    updatedMcqs[index].options[0] = i;
                                                    setMCQs(updatedMcqs);}, ("A " + index)
                                                )}} 
                                                style={{width: "clamp(10em, 50%, 80em)"}} 
                                                placeholder={"Enter First Option"}/>
                                            <b className='unselectable'>Selected Answer</b>
                                        </div>} 
                                    onClick={() => McqHandler("A", index)} 
                                    preselected = {mcqs[index].an == "A"}/>
                                <template.MCQInput 
                                    id={"B" + index} 
                                    name='B' 
                                    value='B' 
                                    content={
                                        <div className='create_mcq_options'>
                                            <textarea 
                                                id={"B " + index} 
                                                value={mcqs[index].options[1]} 
                                                onInput={(e) => {template.handler(e, (i) => 
                                                    {const updatedMcqs = [...mcqs];
                                                    updatedMcqs[index].options[1] = i;
                                                    setMCQs(updatedMcqs);}, ("B " + index)
                                                )}} 
                                                style={{width: "clamp(10em, 50%, 80em)"}} 
                                                placeholder={"Enter Second Option"}/>
                                            <b className='unselectable'>Selected Answer</b>
                                        </div>} 
                                    onClick={() => McqHandler("B", index)} 
                                    preselected = {mcqs[index].an == "B"}/>
                                <template.MCQInput 
                                    id={"C" + index} 
                                    name='C' 
                                    value='C' 
                                    content={
                                        <div className='create_mcq_options'>
                                            <textarea 
                                                id={"C " + index} 
                                                value={mcqs[index].options[2]} 
                                                onInput={(e) => {template.handler(e, (i) => 
                                                    {const updatedMcqs = [...mcqs];
                                                    updatedMcqs[index].options[2] = i;
                                                    setMCQs(updatedMcqs);}, ("C " + index)
                                                )}} 
                                                style={{width: "clamp(10em, 50%, 80em)"}} 
                                                placeholder={"Enter Third Option"}/>
                                            <b className='unselectable'>Selected Answer</b>
                                        </div>} 
                                    onClick={() => McqHandler("C", index)} 
                                    preselected = {mcqs[index].an == "C"}/>
                                <template.MCQInput 
                                    id={"D" + index} 
                                    name='D' 
                                    value='D' 
                                    content={
                                        <div className='create_mcq_options'>
                                            <textarea 
                                                id={"D " + index} 
                                                value={mcqs[index].options[3]} 
                                                onInput={(e) => {template.handler(e, (i) => 
                                                    {const updatedMcqs = [...mcqs];
                                                    updatedMcqs[index].options[3] = i;
                                                    setMCQs(updatedMcqs);}, ("D " + index)
                                                )}} 
                                                style={{width: "clamp(10em, 50%, 80em)"}} 
                                                placeholder={"Enter Fourth Option"}/>
                                            <b className='unselectable'>Selected Answer</b>
                                        </div>} 
                                    onClick={() => McqHandler("D", index)} 
                                    preselected = {mcqs[index].an == "D"}/>
                                <template.MCQInput 
                                    id={"E" + index} 
                                    name='E' 
                                    value='E' 
                                    content={
                                        <div className='create_mcq_options'>
                                            <textarea 
                                                id={"E " + index} 
                                                value={mcqs[index].options[4]} 
                                                onInput={(e) => {template.handler(e, (i) => 
                                                    {const updatedMcqs = [...mcqs];
                                                    updatedMcqs[index].options[4] = i;
                                                    setMCQs(updatedMcqs);}, ("E " + index)
                                                )}} 
                                                style={{width: "clamp(10em, 50%, 80em)"}} 
                                                placeholder={"Enter Last Option"}/>
                                            <b className='unselectable'>Selected Answer</b>
                                        </div>} 
                                    onClick={() => McqHandler("E", index)} 
                                    preselected = {mcqs[index].an == "E"}/>
                                
                            </div>
                        </>
                    ))}
                </div>
                <div className='form_input section' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                    <button className='action_button animated_button' onClick={() => setMCQs(mcqs => [...mcqs, {"qn": "", "options":["", "", "", "", ""], "an": ""}])}><span>Add New Multiple Choice Question</span></button>
                </div>
                <div id='srq_container' className='section'>
                    {srqs.map((i, index) => {return(
                        <div className='form_input section'>
                            <textarea 
                                id={"SRQ " + index} 
                                value={i.qn} 
                                onInput= {(e) => 
                                    template.handler(e, (i) => 
                                        {const updatedSrqs = [...srqs];
                                        updatedSrqs[index].qn = i;
                                        setSRQs(updatedSrqs);},
                                    "SRQ " + index)} 
                                placeholder={"Enter Short Response Question " + (index + 1)}/>
                            <textarea 
                                id={"SRQAns " + index}
                                value={i.an} 
                                onInput= {(e) => 
                                    template.handler(e, (i) => 
                                        {const updatedSrqs = [...srqs];
                                        updatedSrqs[index].an = i;
                                        setSRQs(updatedSrqs);}, 
                                    "SRQAns " + index)} 
                                placeholder={"Enter Answer " + (index + 1)}/>
                        </div>
                    )})}
                </div>
                <div className='form_input section' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                    <button className='action_button animated_button' onClick={() => (setSRQs(sqrs => [...sqrs, {"qn": "", "an": ""}]))}><span>Add New Short Response Question</span></button>
                </div>
            </div>
            <div>
                <h2>Approve/Reject Problem</h2>
                <div style={{display:"flex", flexDirection:"column", rowGap:"1em", marginBottom:"clamp(6px, 6vh, 24px)"}}>
                    <template.FormInput name = "proposed_exp" value={proposed_exp} onChange={e => setProposedExp(e.target.value)} placeholder="Propose an Exp value for this problem"/>
                    <template.FormInput type='number' name = "proposed_exp" value={proposed_diff} onChange={e => setProposedDiff(e.target.value)} placeholder="Propose a Difficulty level (1-5) for this problem"/>
                </div>

                <div style={{display:"flex", flexDirection:"row", columnGap:"1em"}}>
                    <button id='approve_button' className='action_button animated_button' onClick={approve}><i class="fa-solid fa-thumbs-up"></i> <span>Approve Problem</span></button>
                    <button id='reject_button' className='action_button animated_button' onClick={reject}><i class="fa-solid fa-thumbs-down"></i> <span>Reject Problem</span></button>
                </div>
            </div>
        </>
    )
}