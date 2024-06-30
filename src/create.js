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
    const [title, setTitle] = useState("")
    const [statement, setStatement] = useState("")
    const [sandbox, setSandbox] = useState("")
    const [hints, setHints] = useState([])
    const [mcqs, setMCQs] = useState([])
    const [srqs, setSRQs] = useState([])

    function McqHandler (choice, num){
        template.select(document.getElementById(choice + num), document.getElementById(num))
        mcqs[num].an = choice
    }

    return (
        <>
            <template.TextArea name="Title" value={title} setValue={setTitle} placeholder={"Enter Title"} style={{fontSize:"var(--title)", fontWeight: 900, color:"var(--orange)"}} />
            <template.TextArea name="Statement" value={statement} setValue={setStatement} placeholder={"Enter Problem Statement"} />
            <div id='sandbox_container' className='section'>
                <h2>Sandbox</h2>
                <template.TextArea name="Statement" value={statement} setValue={setStatement} placeholder={"Describe the Sandbox"} />
            </div>
            <div className='section'>
                <h2>Hints</h2>
                <div className='hint_container'>
                    {hints.map((i, index) => {
                        return(
                        <div className='form_input'>
                            <textarea id={"Hint " + index} onInput= {(e) => template.handler(e, (i) => {hints[index] = i}, "Hint " + index)} placeholder={"Enter Hint " + (index + 1)}/>
                        </div>
                    )})}
                </div>
                <button id='create_hint' className='action_button animated_button' onClick = {() => setHints(hints => [...hints, ""])}><span>Add Hint</span></button>
            </div>
            <div className='section'>
                <h2>Submission</h2>
                <div id='mcq_container'>
                    {mcqs.map((i, index) => {return(
                        <>
                            <div className='form_input'>
                                <textarea id={"MCQ " + index} onInput= {(e) => template.handler(e, (i) => {mcqs[index].qn = i}, "MCQ " + index)} placeholder={"Enter Multiple Choice Question " + (index + 1)}/>
                            </div>
                            {/* TODOM Figure out how to do these better*/}
                            <div className='form_input' id={index} style={{display:"flex", flexDirection:"column"}}>
                                <template.MCQInput id={"A" + index} name='A' value='A' content={<textarea id={"A " + index} onInput= {(e) => template.handler(e, (i) => {mcqs[index].options[0] = i}, "A " + index)} style={{width:"80%"}} placeholder={"Enter First Option"}/>} onClick={() => McqHandler("A", index)}/>
                                <template.MCQInput id={"B" + index} name='B' value='B' content={<textarea id={"B " + index} onInput= {(e) => template.handler(e, (i) => {mcqs[index].options[1] = i}, "B " + index)} style={{width:"80%"}} placeholder={"Enter Second Option"}/>} onClick={() => McqHandler("B", index)}/>
                                <template.MCQInput id={"C" + index} name='C' value='C' content={<textarea id={"C " + index} onInput= {(e) => template.handler(e, (i) => {mcqs[index].options[2] = i}, "C " + index)} style={{width:"80%"}} placeholder={"Enter Third Option"}/>} onClick={() => McqHandler("C", index)}/>
                                <template.MCQInput id={"D" + index} name='D' value='D' content={<textarea id={"D " + index} onInput= {(e) => template.handler(e, (i) => {mcqs[index].options[3] = i}, "D " + index)} style={{width:"80%"}} placeholder={"Enter Fourth Option"}/>} onClick={() => McqHandler("D", index)}/>
                                <template.MCQInput id={"E" + index} name='E' value='E' content={<textarea id={"E " + index} onInput= {(e) => template.handler(e, (i) => {mcqs[index].options[4] = i}, "E " + index)} style={{width:"80%"}} placeholder={"Enter Fifth Option"}/>} onClick={() => McqHandler("E", index)}/>
                            </div>
                        </>
                    )})}
                </div>
                <div className='form_input' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                    <button className='action_button animated_button' onClick={() => setMCQs(mcqs => [...mcqs, {"qn": "", "options":["", "", "", "", ""], "an": ""}])}><span>Add New Multiple Choice Question</span></button>
                </div>
                <div id='srq_container'>
                    {srqs.map((i, index) => {return(
                        <div className='form_input'>
                            <textarea id={"SRQ " + index} onInput= {(e) => template.handler(e, (i) => {srqs[index].qn = i}, "SRQ " + index)} placeholder={"Enter Short Response Question " + (index + 1)}/>
                            <textarea id={"SRQAns " + index} onInput= {(e) => template.handler(e, (i) => {srqs[index].an = i}, "SRQAns " + index)} placeholder={"Enter Answer " + (index + 1)}/>
                        </div>
                    )})}
                </div>
                <div className='form_input' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                    <button className='action_button animated_button' onClick={() => (setSRQs(sqrs => [...sqrs, {"qn": "", "an": ""}]))}><span>Add New Short Response Question</span></button>
                </div>
            </div>
            <button id='create_hint' className='action_button animated_button' onClick={() => {API.createProblem(template.getCookie('token'), title, statement, hints.filter((hint) => (hint!="")), -1)}}><span>Save Problem</span></button>
            {/* TODOM update API call after it's been fully implemented */}
        </>
    )
}