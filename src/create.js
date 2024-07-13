/* eslint-disable */

import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function Create() {
    const [isThisNeeded, setThis] = useState(true);
    const temp = useRef(null);
    
    const promise = API.dashboard(template.getCookie('token'))
    promise.then((resp) => {
        console.log('Im doneee')
    })
    return (
        < template.Home MainContent={() => (<MainContent />)} SSelected={'createassessprobems'} promise={promise} />
    ) 
}

function MainContent() {
    const [title, setTitle] = useState("Untitled Problem")
    const [statement, setStatement] = useState("")
    const [sandbox, setSandbox] = useState("")
    const [hints, setHints] = useState([])
    const [mcqs, setMCQs] = useState([]) // [{qn:"", options:["", "", "", "", ""], an:""},...]
    const [srqs, setSRQs] = useState([]) // [{qn:"", an:"", autograded: ""},...]

    function McqHandler (choice, num, option){
        template.select(document.getElementById(choice + num), document.getElementById(num))
        template.ArrayTextAreaInputHandler(mcqs, setMCQs, num, "an", mcqs[num].options[option])
    }

    function toggle(id){
        let button = document.getElementById("Autograde " + id)
        button.classList.toggle('selected_button')
        let span = document.getElementById("Span Autograde " + id) 
        span.innerHTML = span.innerHTML == "Autograde Off" ? "Autograde On" : "Autograde Off"
        console.log(srqs)
    }

    function saveProblem() {
        const TEMPORARY_XP_VALUE = 50;
        const TEMPORARY_DIFFICULTY_VALUE = -1;
        const TEMPORARY_AUTOGRADED_VALUE = true;
        title == "" ? setTitle("Untitled Problem") : title
        API.createProblem(template.getCookie('token'), title, statement, sandbox, hints.filter((hint) => (hint!="")), TEMPORARY_DIFFICULTY_VALUE, TEMPORARY_XP_VALUE, mcqs.filter((mcq) => (mcq.qn!="")), srqs.filter((srq) => (srq.qn!="")), TEMPORARY_AUTOGRADED_VALUE)
        .then((resp) => {
            if(resp.success){
                alert("Successfully saved")
                window.location.href = "/createassessprobems"
        }else {
            alert("Error: " + resp.msg)
        }})
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
                            <textarea 
                                style={{marginBottom:"1em"}} 
                                id={"Hint " + index} 
                                onInput= {(e) => template.ArrayTextAreaInputHandler(hints, setHints, index, "", e.target.value, "Hint " + index)} 
                                placeholder={"Enter Hint " + (index + 1)}/>
                        </div>
                    )})}
                </div>
                <button id='create_hint' className='action_button animated_button' onClick = {() => setHints(hints => [...hints, ""])}><span>Add Hint</span></button>
            </div>
            <div className='section'>
                <h2>Submission</h2>
                <div id='mcq_container' className='section'>
                    {mcqs.map((i, index) => {return(
                        <>
                            <b style={{marginBottom:"clamp(6px, 6vmin, 12px)"}}>Multiple Choice Question {index + 1} (Autograded)</b>
                            <div className='form_input' style={{marginBottom:"0.5em"}}>
                                <textarea 
                                    id={"MCQ " + index} 
                                    onInput= {(e) => template.handler(e, (i) => {mcqs[index].qn = i}, "MCQ " + index)} 
                                    placeholder={"Enter Multiple Choice Question " + (index + 1)}/>
                            </div>
                            <div className='form_input section' id={index} style={{display:"flex", flexDirection:"column"}}>
                                <template.MCQInput 
                                    id={"A" + index} 
                                    name='A' 
                                    value='A' 
                                    content={
                                        <div className='create_mcq_options'>
                                            <textarea 
                                                    id={"A " + index} 
                                                    onInput= {(e) => template.ArrayTextAreaInputHandler(mcqs, setMCQs, index, "options", e.target.value, "A " + index)} 
                                                    style={{width: "clamp(10em, 50%, 80em)"}} placeholder={"Enter First Option"}/>
                                            <b className='unselectable'>Correct Answer</b>
                                        </div>} 
                                    onClick={() => McqHandler("A", index, 0)}/>
                                <template.MCQInput
                                    id={"B" + index} 
                                    name='B' 
                                    value='B' 
                                    content={
                                        <div className='create_mcq_options'>
                                            <textarea 
                                                    id={"B " + index} 
                                                    onInput= {(e) => template.ArrayTextAreaInputHandler(mcqs, setMCQs, index, "options", e.target.value, "B " + index)} 
                                                    style={{width: "clamp(10em, 50%, 80em)"}} placeholder={"Enter Second Option"}/>
                                            <b className='unselectable'>Correct Answer</b>
                                        </div>} 
                                    onClick={() => McqHandler("B", index, 1)}/>
                                <template.MCQInput
                                    id={"C" + index} 
                                    name='C' 
                                    value='C' 
                                    content={
                                        <div className='create_mcq_options'>
                                            <textarea 
                                                    id={"C " + index} 
                                                    onInput= {(e) => template.ArrayTextAreaInputHandler(mcqs, setMCQs, index, "options", e.target.value, "C " + index)} 
                                                    style={{width: "clamp(10em, 50%, 80em)"}} placeholder={"Enter Third Option"}/>
                                            <b className='unselectable'>Correct Answer</b>
                                        </div>} 
                                    onClick={() => McqHandler("C", index, 2)}/>
                                <template.MCQInput
                                    id={"D" + index} 
                                    name='D' 
                                    value='D' 
                                    content={
                                        <div className='create_mcq_options'>
                                            <textarea 
                                                    id={"D " + index} 
                                                    onInput= {(e) => template.ArrayTextAreaInputHandler(mcqs, setMCQs, index, "options", e.target.value, "D " + index)} 
                                                    style={{width: "clamp(10em, 50%, 80em)"}} placeholder={"Enter Fourth Option"}/>
                                            <b className='unselectable'>Correct Answer</b>
                                        </div>} 
                                    onClick={() => McqHandler("D", index, 3)}/>
                                <template.MCQInput
                                    id={"E" + index} 
                                    name='E' 
                                    value='E' 
                                    content={
                                        <div className='create_mcq_options'>
                                            <textarea 
                                                    id={"E " + index} 
                                                    onInput= {(e) => template.ArrayTextAreaInputHandler(mcqs, setMCQs, index, "options", e.target.value, "E " + index)} 
                                                    style={{width: "clamp(10em, 50%, 80em)"}} placeholder={"Enter Fifth Option"}/>
                                            <b className='unselectable'>Correct Answer</b>
                                        </div>} 
                                    onClick={() => McqHandler("E", index, 4)}/>
                            </div>
                        </>
                    )})}
                </div>
                <div className='form_input section' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                    <button className='action_button animated_button' onClick={() => setMCQs(mcqs => [...mcqs, {"qn": "", "options":["", "", "", "", ""], "an": ""}])}><span>Add New Multiple Choice Question</span></button>
                </div>
                <div id='srq_container' className='section '>
                    {srqs.map((i, index) => {return(
                        <>
                            <b style={{marginBottom:"clamp(6px, 6vmin, 12px)"}}>Short Response Question {index + 1}</b>
                            <div className='form_input section' style={{display:"grid", gridTemplateColumns:"2fr 2fr 1fr", gap:"max(2vw, 40px)"}}>
                                <textarea 
                                    id={"SRQ " + index} 
                                    onInput= {(e) => template.ArrayTextAreaInputHandler(srqs, setSRQs, index, "qn", e.target.value, "SRQ " + index)}
                                    placeholder={"Enter Short Response Question " + (index + 1)}/>
                                <textarea 
                                    id={"SRQAns " + index} 
                                    onInput= {(e) => template.ArrayTextAreaInputHandler(srqs, setSRQs, index, "an", e.target.value, "SRQAns " + index)}
                                    placeholder={"Enter Answer " + (index + 1)}/>
                                <button 
                                    className='animated_button autograde_button' 
                                    id = {"Autograde " + index}
                                    onClick={() => {
                                    toggle(index)
                                    setSRQs(srqs.map((value, id) => {
                                        if(id == index){
                                            return {...value, autograded: !value.autograded}
                                        } else {
                                            return value
                                    }}))
                                }}><span id={"Span Autograde "+ index}>Autograde Off</span></button>
                            </div>
                        </>
                    )})}
                </div>
                <div className='form_input section' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                    <button className='action_button animated_button' onClick={() => setSRQs(sqrs => [...sqrs, {"qn": "", "an": "", "autograded":false}])}><span>Add New Short Response Question</span></button>
                </div>
            </div>
            <button id='create_hint' className='action_button animated_button' onClick={saveProblem}><span>Submit Problem For Approval</span></button>
        </>
    )
}