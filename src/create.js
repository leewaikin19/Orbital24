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
        < template.Home MainContent={() => (<MainContent assessableProblems={[]} createdProblems={[]} />)} SSelected={'createassessprobems'} promise={promise} />
    ) 
}

function MainContent() {
    const [title, setTitle] = useState("")
    const [statement, setStatement] = useState("")
    const [hints, setHints] = useState([])
    const [hint_content, setHint] = useState("")
    const [mcqs, setMCQs] = useState([])
    const [mcq_content, setMCQ] = useState("")
    const [srqs, setSRQs] = useState([])
    const [srq_content, setSRQ] = useState("")
    const [A, setA] = useState([])
    const [B, setB] = useState([])
    const [C, setC] = useState([])
    const [D, setD] = useState([])
    const [E, setE] = useState(null)

    return (
        <>
            <template.TextArea name="Title" value={title} setValue={setTitle} placeholder={"Enter Title"} style={{fontSize:"var(--title)", fontWeight: 900, color:"var(--orange)"}} />
            <template.TextArea name="Statement" value={statement} setValue={setStatement} placeholder={"Enter Problem Statement"} />
            <div id='sandbox_container' className='section'>
                <h2>Sandbox</h2>
                <button id='create_sandbox' className='action_button animated_button' onClick = {() => alert("Feature under construction! Coming soon!")}><span>Create Sandbox</span></button>
            </div>
            <div className='section'>
                <h2>Hints</h2>
                <div className='hint_container'>
                    {hints.map((i) => {return(
                        <>
                            <template.TextArea name={"Hint " + {i}} value={hint_content} setValue={setHint} placeholder={"Enter Hint " + i}/>
                        </>
                    )})}
                </div>
                <button id='create_hint' className='action_button animated_button' onClick = {() => setHints(hints => [...hints, (hints.length + 1)])}><span>Add Hint</span></button>
            </div>
            <div className='section'>
                <h2>Submission</h2>
                <div id='mcq_container'>
                    {mcqs.map((i) => {return(
                        <>
                            <template.TextArea name={"Hint " + {i}} value={srq_content} setValue={setSRQ} placeholder={"Enter Multiple Choice Question " + i}/>

                            <div id={i} style={{display:"flex", flexDirection:"column"}}>
                                <template.MCQInput id={"A" + i} name='A' value='A' content={<template.FormInput name={"Option A"} value={A} setValue={setA} placeholder={"Enter First Choice"}/>} onClick={() => template.select(document.getElementById("A" + i), document.getElementById(i))}/>
                                <template.MCQInput id={"B" + i} name='B' value='B' content={<template.FormInput name={"Option B"} value={B} setValue={setB} placeholder={"Enter Second Choice"}/>} onClick={() => template.select(document.getElementById("B" + i), document.getElementById(i))}/>
                                <template.MCQInput id={"C" + i} name='C' value='C' content={<template.FormInput name={"Option C"} value={C} setValue={setC} placeholder={"Enter Third Choice"}/>} onClick={() => template.select(document.getElementById("C" + i), document.getElementById(i))}/>
                                <template.MCQInput id={"D" + i} name='D' value='D' content={<template.FormInput name={"Option D"} value={D} setValue={setD} placeholder={"Enter Fourth Choice"}/>} onClick={() => template.select(document.getElementById("D" + i), document.getElementById(i))}/>
                                <template.MCQInput id={"E" + i} name='E' value='E' content={<template.FormInput name={"Option E"} value={E} setValue={setE} placeholder={"Enter Final Choice"}/>} onClick={() => template.select(document.getElementById("E" + i), document.getElementById(i))}/>
                            </div>
                        </>
                    )})}
                </div>
                <div className='form_input' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}} onClick={() => setMCQs(mcqs => [...mcqs, (mcqs.length + 1)])}>
                    <button className='action_button animated_button'><span>Add New Multiple Choice Question</span></button>
                </div>
                <div id='srq_container'>
                    {srqs.map((i) => {return(
                        <>
                            <template.TextArea name={"Hint " + {i}} value={srq_content} setValue={setSRQ} placeholder={"Enter Short Response Question " + i}/>
                        </>
                    )})}
                </div>
                <div className='form_input' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                    <button className='action_button animated_button' onClick={() => setSRQs(sqrs => [...sqrs, (sqrs.length + 1)])}><span>Add New Short Response Question</span></button>
                </div>
            </div>
            <button id='create_hint' className='action_button animated_button' onClick={{}}><span>Save Problem</span></button>
        </>
    )
}