/* eslint-disable */

import * as template from "./template.js"
import { useState } from 'react'

export function generic_main_content({ problem, solution, func }) {
    const [title, setTitle] = useState(problem.title)
    const [statement, setStatement] = useState(problem.statement)
    const [sandbox, setSandbox] = useState(problem.sandbox)
    const [hints, setHints] = useState(problem.hints)
    const [mcqs, setMCQs] = useState(problem.mcqs) // [{qn:"", options:["", "", "", "", ""]},...]
    const [mcqAns, setMCQAns] = useState(solution.mcqAns) // ["", ...]
    const [srqs, setSRQs] = useState(problem.srqs) // [{qn:""},...]
    const [srqAns, setSRQAns] = useState(solution.srqAns) //[{'an':"", autograded:bool}]
    const [triggerMissingMCQAns, setTriggerMissingMCQAns] = useState(false)
    const [triggerSuccessfullySaved, setTriggerSuccessfullySaved] = useState(false)
    const [triggerUnsuccessfullySaved, setTriggerUnsuccessfullySaved] = useState(false)

    return(
        <>
            <template.Popup name = "missing_answer" title = "Missing MCQ Answers" content = "One or more multiple choice questions does not have an answer yet. Please select an answer for all multiple choice questions." trigger={triggerMissingMCQAns} setTrigger = {setTriggerMissingMCQAns} />
            <template.Popup name = "successfully_saved" title = "Successfully Saved" content = "Problem Details saved successfully" trigger={triggerSuccessfullySaved} setTrigger = {setTriggerSuccessfullySaved} onClickAction={() => window.location.href = "./createassessprobems"} />
            <template.Popup name = "unsuccessfully_saved" title = "Unsuccessfully Saved" content = "Problem Details could not be saved. Please try again. If error persists please contact the developers" trigger={triggerUnsuccessfullySaved} setTrigger = {setTriggerUnsuccessfullySaved} />
            {title_statement_sandbox_builder(title, setTitle, statement, setStatement, sandbox, setSandbox)}
            {hints_builder(hints, setHints)}
            <div className='section'>
                <h2>Submission</h2>
                {mcq_builder(mcqs, setMCQs, mcqAns, setMCQAns)}
                {srq_builder(srqs, setSRQs, srqAns, setSRQAns)}
            </div>
            <button id='save_problem' className='action_button animated_button' onClick={() => {
                if (mcqAns.filter((ans) => ans == "").length > 0) {
                    setTriggerMissingMCQAns(true)
                } else {
                    setTriggerMissingMCQAns(false)
                    func(title, statement, sandbox, hints.filter((hint) => (hint!="")), mcqs, srqs, mcqAns, srqAns, setTriggerSuccessfullySaved, setTriggerUnsuccessfullySaved)
                }}}><span>Save Problem Details</span></button>
        </>
    )
}

export function title_statement_sandbox_builder(titleString, setTitleString, statementString, setStatementString, sandboxString, setSandboxString) {
    return(
        <>
            <div className='section'>
                <template.TextArea name="Title" value={titleString} setValue={setTitleString} placeholder={"Enter Title"} style={{fontSize:"var(--title)", fontWeight: 900, color:"var(--orange)"}} />
            </div>
            <div className='section'>
                <template.TextArea name="Statement" value={statementString} setValue={setStatementString} placeholder={"Enter Problem Statement"} />
            </div>
            <div id='sandbox_container' className='section'>
                <h2>Sandbox</h2>
                <template.TextArea name="Sandbox" value={sandboxString} setValue={setSandboxString} placeholder={"Describe the Sandbox"} />
            </div>
        </>
    )
}

export function hints_builder(hintsArray, setHintsArray) {
    return(
        <div className='section'>
            <h2>Hints</h2>
            <div className='hint_container'>
                {hintsArray.map((hint, index) => {
                    return(
                    <div className='form_input'>
                        <textarea 
                            style={{marginBottom:"1em"}} 
                            value={hint}
                            id={"Hint " + index} 
                            onInput= {(e) => template.ArrayTextAreaInputHandler(hintsArray, setHintsArray, index, "", e.target.value, "Hint " + index)} 
                            placeholder={"Enter Hint " + (index + 1)}/>
                    </div>
                )})}
            </div>
            <button id='create_hint' className='action_button animated_button' onClick = {() => setHintsArray([...hintsArray, ""])}><span>Add Hint</span></button>
        </div>
    )
}

export function mcq_builder(mcqArray, setMCQArray, mcqAnsArray, setMCQAnsArray) {
    function McqHandler (choice, num){
        // Saves ans
        template.select(document.getElementById(choice + num), document.getElementById(num))
        // TODOM Add a remove qn button or smt
        setMCQAnsArray(mcqAnsArray.map((value, index) => {
            if(index == num && value != choice){
                return choice
            } else if (index == num && value == choice){
                return ""
            } else {
                return value
        }}))
    }

    return(
        <>
            <div id='mcq_container' className='section '>
                {mcqArray.map((mcq, index) => {return(
                    <>
                        <b style={{marginBottom:"clamp(6px, 6vmin, 12px)"}}>Multiple Choice Question {index + 1 + " (Autograded)"}</b>
                        <div className='form_input section' id={index} style={{ display: "flex", flexDirection: "column" }}>
                            <div className='form_input section'>
                                <textarea
                                    id={"MCQ " + index}
                                    value={mcq.qn}
                                    onInput={(e) => template.ArrayTextAreaInputHandler(mcqArray, setMCQArray, index, "qn", e.target.value, "MCQ " + index)}
                                    placeholder={"Enter Multiple Choice Question " + (index + 1) + " (Autograded)"} />
                            </div>
                            <template.MCQInput
                                id={"A" + index}
                                name="A"
                                value="A"
                                content={
                                    <div className='create_mcq_options'>
                                        <textarea
                                            id={"A " + index}
                                            value={mcq.options[0]}
                                            onInput={(e) => {
                                                template.handler(e, (i) => {
                                                    const updatedMcqs = [...mcqArray];
                                                    updatedMcqs[index].options[0] = i;
                                                    setMCQArray(updatedMcqs);
                                                }, ("A " + index)
                                                )
                                            }}
                                            style={{ width: "clamp(10em, 50%, 80em)" }}
                                            placeholder={"Enter First Option"} />
                                        <b className="unselectable">Selected Answer</b>
                                    </div>}
                                preselected={mcqAnsArray[index] == "A " + index}
                                onClick={() => McqHandler("A", index)} />
                            <template.MCQInput
                                id={"B" + index}
                                name="B"
                                value="B"
                                content={
                                    <div className='create_mcq_options'>
                                        <textarea
                                            id={"B " + index}
                                            value={mcq.options[1]}
                                            onInput={(e) => {
                                                template.handler(e, (i) => {
                                                    const updatedMcqs = [...mcqArray];
                                                    updatedMcqs[index].options[1] = i;
                                                    setMCQArray(updatedMcqs);
                                                }, ("B " + index)
                                                )
                                            }}
                                            style={{ width: "clamp(10em, 50%, 80em)" }}
                                            placeholder={"Enter Second Option"} />
                                        <b className="unselectable">Selected Answer</b>
                                    </div>}
                                preselected={mcqAnsArray[index] == "B " + index}
                                onClick={() => McqHandler("B", index)} />
                            <template.MCQInput
                                id={"C" + index}
                                name="C"
                                value="C"
                                content={
                                    <div className='create_mcq_options'>
                                        <textarea
                                            id={"C " + index}
                                            value={mcq.options[2]}
                                            onInput={(e) => {
                                                template.handler(e, (i) => {
                                                    const updatedMcqs = [...mcqArray];
                                                    updatedMcqs[index].options[2] = i;
                                                    setMCQArray(updatedMcqs);
                                                }, ("C " + index)
                                                )
                                            }}
                                            style={{ width: "clamp(10em, 50%, 80em)" }}
                                            placeholder={"Enter Third Option"} />
                                        <b className="unselectable">Selected Answer</b>
                                    </div>}
                                preselected={mcqAnsArray[index] == "C " + index}
                                onClick={() => McqHandler("C", index)} />
                            <template.MCQInput
                                id={"D" + index}
                                name="D"
                                value="D"
                                content={
                                    <div className='create_mcq_options'>
                                        <textarea
                                            id={"D " + index}
                                            value={mcq.options[3]}
                                            onInput={(e) => {
                                                template.handler(e, (i) => {
                                                    const updatedMcqs = [...mcqArray];
                                                    updatedMcqs[index].options[3] = i;
                                                    setMCQArray(updatedMcqs);
                                                }, ("D " + index)
                                                )
                                            }}
                                            style={{ width: "clamp(10em, 50%, 80em)" }}
                                            placeholder={"Enter Fourth Option"} />
                                        <b className="unselectable">Selected Answer</b>
                                    </div>}
                                preselected={mcqAnsArray[index] == "D " + index}
                                onClick={() => McqHandler("D", index)} />
                            <template.MCQInput
                                id={"E" + index}
                                name="E"
                                value="E"
                                content={
                                    <div className='create_mcq_options'>
                                        <textarea
                                            id={"E " + index}
                                            value={mcq.options[4]}
                                            onInput={(e) => {
                                                template.handler(e, (i) => {
                                                    const updatedMcqs = [...mcqArray];
                                                    updatedMcqs[index].options[4] = i;
                                                    setMCQArray(updatedMcqs);
                                                }, ("E " + index)
                                                )
                                            }}
                                            style={{ width: "clamp(10em, 50%, 80em)" }}
                                            placeholder={"Enter Fifth Option"} />
                                        <b className="unselectable">Selected Answer</b>
                                    </div>}
                                preselected={mcqAnsArray[index] == "E " + index}
                                onClick={() => McqHandler("E", index)} />
                        </div>
                    </>
                )})}
            </div>
            <div className='form_input section' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                <button className='action_button animated_button' onClick={() => {
                    setMCQArray([...mcqArray, {"qn": "", "options":["", "", "", "", ""]}]);  
                    setMCQAnsArray([...mcqAnsArray, ""]);
                }}><span>Add New Multiple Choice Question</span></button>
            </div>
        </>
    )
}

export function srq_builder(srqArray, setSRQArray, srqAnsArray, setSRQAnsArray) {
    function toggle(id){
        let button = document.getElementById("Autograde " + id)
        button.classList.toggle('selected_button')
        let span = document.getElementById("Span Autograde " + id) 
        span.innerHTML = span.innerHTML == "Autograde Off" ? "Autograde On" : "Autograde Off"
    }
    return(
        <>
            <div id='srq_container' className='section '>
                {srqArray.map((srq, index) => {return(
                    <>
                        <b style={{marginBottom:"clamp(6px, 6vmin, 12px)"}}>Short Response Question {index + 1}</b>
                        <div className='form_input section' style={{display:"grid", gridTemplateColumns:"2fr 2fr 1fr", gap:"max(2vw, 40px)"}}>
                            <textarea 
                                id={"SRQ " + index} 
                                value={srq.qn}
                                onInput= {(e) => template.ArrayTextAreaInputHandler(srqArray, setSRQArray, index, "qn", e.target.value, "SRQ " + index)}
                                placeholder={"Enter Short Response Question " + (index + 1)}/>
                            <textarea 
                                id={"SRQAns " + index} 
                                value={srqAnsArray[index].an}
                                onInput= {(e) => template.ArrayTextAreaInputHandler(srqAnsArray, setSRQAnsArray, index, "an", e.target.value, "SRQAns " + index)}
                                placeholder={"Enter Answer " + (index + 1)}/>
                            {(srqAnsArray[index].autograded) ? (<button 
                                className='animated_button autograde_button selected_button' 
                                id = {"Autograde " + index}
                                onClick={() => {
                                    toggle(index)
                                    setSRQAnsArray(srqAnsArray.map((value, id) => {
                                        if(id == index){
                                            return {...value, autograded: false}
                                        } else {
                                            return value
                                    }}))
                            }}><span id={"Span Autograde "+ index}>Autograde On</span></button>) : 
                            (<button 
                                className='animated_button autograde_button' 
                                id = {"Autograde " + index}
                                onClick={() => {
                                    toggle(index)
                                    setSRQAnsArray(srqAnsArray.map((value, id) => {
                                        if(id == index){
                                            return {...value, autograded: true}
                                        } else {
                                            return value
                                    }}))
                            }}><span id={"Span Autograde "+ index}>Autograde Off</span></button>)}
                        </div>
                    </>
                )})}
            </div>
            <div className='form_input section' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                <button className='action_button animated_button' onClick={() => {
                    setSRQArray([...srqArray, {"qn":""}]); 
                    setSRQAnsArray([...srqAnsArray, {'an':"", "autograded":false}]); 
                    }}><span>Add New Short Response Question</span></button>
            </div>
        </>
    )
}