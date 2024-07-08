/* eslint-disable */

import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function AssessEdit() {
    const [isThisNeeded, setThis] = useState(true);
    const temp = useRef(null);
    
    const promise = API.dashboard(template.getCookie('token'))
    promise.then((resp) => {
        console.log('Im doneee')
    })
    return (
        // TODO @LWK19 idk how to get the details of the selected problem
        < template.Home MainContent={() => (<MainContent iTitle = "" iStatement = "" iSandbox = "" iHints = {["Test", "One", "two"]} iMcqs = {[{qn:"Test", options:["", "", "", "", ""], an:"C"}]} iSrqs = {[{qn:"1", an:"2"}]} />)} SSelected={'createassessprobems'} promise={promise} />
    ) 
}

function MainContent({iTitle, iStatement, iSandbox, iHints, iMcqs, iSrqs}) {
    const [title, setTitle] = useState(iTitle)
    const [statement, setStatement] = useState(iStatement)
    const [sandbox, setSandbox] = useState(iSandbox)
    const [hints, setHints] = useState(iHints)
    const [mcqs, setMCQs] = useState(iMcqs) // [{qn:"", options:["", "", "", "", ""], an:""},...]
    const [srqs, setSRQs] = useState(iSrqs) // [{qn:"", an:""},...]
    const [proposed_exp, setProposedExp] = useState()
    const [propsoed_diff, setProposedDiff] = useState()
    console.log(iHints)

    function McqHandler (choice, num){
        template.select(document.getElementById(choice + num), document.getElementById(num))
        mcqs[num].an = choice
    }

    function saveProblem() {
        API.createProblem(template.getCookie('token'), title, statement, sandbox, hints.filter((hint) => (hint!="")), proposed_exp, propsoed_diff, mcqs, srqs, true)
        .then((resp) => {
            if(resp.success){
                alert("Successfully saved")
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
                            <textarea style={{marginBottom:"1em"}} id={"Hint " + index} value={i} onInput= {(e) => template.handler(e, (i) => {hints[index] = i}, "Hint " + index)} placeholder={"Enter Hint " + (index + 1)}/>
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
                            <div className='form_input section'>
                                <textarea id={"MCQ " + index} onInput= {(e) => template.handler(e, (i) => {mcqs[index].qn = i}, "MCQ " + index)} placeholder={"Enter Multiple Choice Question " + (index + 1)}/>
                            </div>
                            {/* TODOM Figure out how to do these better*/}
                            <div className='form_input section' id={index} style={{display:"flex", flexDirection:"column"}}>
                                <template.MCQInput id={"A" + index} name='A' value='A' content={<div className='create_mcq_options'><textarea id={"A " + index} value={mcqs[index].options[0]} onInput= {(e) => template.handler(e, (i) => {mcqs[index].options[0] = i}, "A " + index)} style={{width: "clamp(10em, 50%, 80em)"}} placeholder={"Enter First Option"}/><b className='unselectable'>Selected Answer</b></div>} onClick={() => McqHandler("A", index)} preselected = {mcqs[index].an == "A"}/>
                                <template.MCQInput id={"B" + index} name='B' value='B' content={<div className='create_mcq_options'><textarea id={"B " + index} value={mcqs[index].options[1]} onInput= {(e) => template.handler(e, (i) => {mcqs[index].options[1] = i}, "B " + index)} style={{width: "clamp(10em, 50%, 80em)"}} placeholder={"Enter Second Option"}/><b className='unselectable'>Selected Answer</b></div>} onClick={() => McqHandler("B", index)} preselected = {mcqs[index].an == "B"}/>
                                <template.MCQInput id={"C" + index} name='C' value='C' content={<div className='create_mcq_options'><textarea id={"C " + index} value={mcqs[index].options[2]} onInput= {(e) => template.handler(e, (i) => {mcqs[index].options[2] = i}, "C " + index)} style={{width: "clamp(10em, 50%, 80em)"}} placeholder={"Enter Third Option"}/><b className='unselectable'>Selected Answer</b></div>} onClick={() => McqHandler("C", index)} preselected = {mcqs[index].an == "C"}/>
                                <template.MCQInput id={"D" + index} name='D' value='D' content={<div className='create_mcq_options'><textarea id={"D " + index} value={mcqs[index].options[3]} onInput= {(e) => template.handler(e, (i) => {mcqs[index].options[3] = i}, "D " + index)} style={{width: "clamp(10em, 50%, 80em)"}} placeholder={"Enter Fourth Option"}/><b className='unselectable'>Selected Answer</b></div>} onClick={() => McqHandler("D", index)} preselected = {mcqs[index].an == "D"}/>
                                <template.MCQInput id={"E" + index} name='E' value='E' content={<div className='create_mcq_options'><textarea id={"E " + index} value={mcqs[index].options[4]} onInput= {(e) => template.handler(e, (i) => {mcqs[index].options[4] = i}, "E " + index)} style={{width: "clamp(10em, 50%, 80em)"}} placeholder={"Enter Fifth Option"}/><b className='unselectable'>Selected Answer</b></div>} onClick={() => McqHandler("E", index)} preselected = {mcqs[index].an == "E"}/>
                            </div>
                        </>
                    )})}
                </div>
                <div className='form_input section' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                    <button className='action_button animated_button' onClick={() => setMCQs(mcqs => [...mcqs, {"qn": "", "options":["", "", "", "", ""], "an": ""}])}><span>Add New Multiple Choice Question</span></button>
                </div>
                <div id='srq_container' className='section'>
                    {srqs.map((i, index) => {return(
                        <div className='form_input section'>
                            <textarea id={"SRQ " + index} value={i.qn} onInput= {(e) => template.handler(e, (i) => {srqs[index].qn = i}, "SRQ " + index)} placeholder={"Enter Short Response Question " + (index + 1)}/>
                            <textarea id={"SRQAns " + index} value={i.an} onInput= {(e) => template.handler(e, (i) => {srqs[index].an = i}, "SRQAns " + index)} placeholder={"Enter Answer " + (index + 1)}/>
                        </div>
                    )})}
                </div>
                <div className='form_input section' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                    <button className='action_button animated_button' onClick={() => (setSRQs(sqrs => [...sqrs, {"qn": "", "an": ""}]))}><span>Add New Short Response Question</span></button>
                </div>
            </div>
            <div className='section'>
                <button id='create_hint' className='action_button animated_button' onClick={saveProblem}><span>Save Problem</span></button>
            </div>
            <div>
                <h2>Approve/Reject Problem</h2>
                <div style={{display:"flex", flexDirection:"column", rowGap:"1em", marginBottom:"clamp(6px, 6vh, 24px)"}}>
                    <template.FormInput name = "proposed_exp" value={proposed_exp} setValue={setProposedExp} placeholder="Propose an Exp value for this problem"/>
                    <template.FormInput type='number' name = "proposed_exp" value={propsoed_diff} setValue={setProposedDiff} placeholder="Propose a Difficulty level (1-5) for this problem"/>
                </div>

                {/* TODO @LWK19 Help with the onclicks. I leave them up to you where they lead to */}
                <div style={{display:"flex", flexDirection:"row", columnGap:"1em"}}>
                    <button id='approve_button' className='action_button animated_button'><i class="fa-solid fa-thumbs-up"></i> <span>Approve Problem</span></button>
                    <button id='reject_button' className='action_button animated_button'><i class="fa-solid fa-thumbs-down"></i> <span>Reject Problem</span></button>
                </div>
            </div>
        </>
    )
}