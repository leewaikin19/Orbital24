/* eslint-disable */

import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
/* eslint-disable */
export default function Edit() {
    const [loading, setLoading] = useState(true);
    const problem = useRef();
    const solution = useRef();
    const id = window.location.href.split('/').at(-1);

    const promise1 = API.getUserCreatedProblem(template.getCookie('token'), id).then((resp) => {
        if (resp.success === false || resp.reply.status === 'approved') {
            window.location.href = '/createassessprobems'
        }
        problem.current = resp.reply;
    })
    const promise2 = API.getUserCreatedProblemSolution(template.getCookie('token'), id).then((resp) => {
        solution.current = resp.reply;
    })

    const promise = Promise.all([promise1, promise2]).then(() => setLoading(false))
    return (
        < template.Home MainContent={() => (
            <MainContent problem={problem.current} solution={solution.current} />)} SSelected={'createassessprobems'} promise={promise} />
    )
}

function MainContent({ problem, solution }) {
    const [title, setTitle] = useState(problem.title)
    const [statement, setStatement] = useState(problem.statement)
    const [sandbox, setSandbox] = useState(problem.sandbox)
    const [hints, setHints] = useState(problem.hints)
    const [mcqs, setMCQs] = useState(problem.mcqs) // [{qn:"", options:["", "", "", "", ""]},...]
    const [mcqAns, setMCQAns] = useState(solution.mcqAns) // ["", ...]
    const [srqs, setSRQs] = useState(problem.srqs) // [{qn:""},...]
    const [srqAns, setSRQAns] = useState(solution.srqAns) //[{'an':"", autograded:bool}]


    
    // TODOM highlight mcqAns[].an, srqAns[].autograded on load
    function McqHandler(choice, num, option) {
        template.select(document.getElementById(choice + num), document.getElementById(num))
        // TODOM there are behaviour issues with the MCQ ans selection. i added temp solution
        // TODOM also filter empty questions beforehand. add a remove qn button or smt
        setMCQAns(mcqAns.map((a,i)=>i===num?choice + " "+num:a))
        //template.ArrayTextAreaInputHandler(mcqAns, setMCQAns, num, "an", mcqs[num].options[option])
    }

    function toggle(id) {
        let button = document.getElementById("Autograde " + id)
        button.classList.toggle('selected_button')
        let span = document.getElementById("Span Autograde " + id)
        span.innerHTML = span.innerHTML == "Autograde Off" ? "Autograde On" : "Autograde Off"
        console.log(srqs)
    }

    function saveProblem() {
        const TEMPORARY_XP_VALUE = 50;
        const TEMPORARY_DIFFICULTY_VALUE = -1;
        API.updateProblem(template.getCookie('token'), problem.id, 
        {'title':title, 'statement':statement, 'sandbox':sandbox, 'hints':hints.filter((hint) => (hint!="")), 
            'xp':TEMPORARY_XP_VALUE, 'difficulty':TEMPORARY_DIFFICULTY_VALUE, 'mcqs':mcqs, 'srqs':srqs, 
            'autograded':srqAns.find(x => x.autograded===false).length > 0, 'status':'pending'}, 
        {'mcqAns':mcqAns.map(id => document.getElementById(id).value), 'srqAns':srqAns})
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
                <template.TextArea name="Title" value={title} setValue={setTitle} placeholder={"Enter Title"} style={{ fontSize: "var(--title)", fontWeight: 900, color: "var(--orange)" }} />
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
                        return (
                            <div className='form_input'>
                                <textarea
                                    style={{ marginBottom: "1em" }}
                                    id={"Hint " + index}
                                    value={hints[index]}
                                    onInput={(e) => template.ArrayTextAreaInputHandler(hints, setHints, index, "", e.target.value)}
                                    placeholder={"Enter Hint " + (index + 1)} />
                            </div>
                        )
                    })}
                </div>
                <button id='create_hint' className='action_button animated_button' onClick={() => setHints(hints => [...hints, ""])}><span>Add Hint</span></button>
            </div>
            <div className='section'>
                <h2>Submission</h2>
                <div id='mcq_container' className='section'>
                    {mcqs.map((i, index) => (
                        <>
                            <div className='form_input section'>
                                <textarea id={"MCQ " + index} value={i.qn} onInput={(e) => {
                                    template.handler(e, (i) => {
                                        const updatedMcqs = [...mcqs];
                                        updatedMcqs[index].qn = i;
                                        setMCQs(updatedMcqs);
                                    }, ("MCQ " + index)
                                    )
                                }} placeholder={"Enter Multiple Choice Question " + (index + 1)} />
                            </div>
                            <div className='form_input section' id={index} style={{ display: "flex", flexDirection: "column" }}>
                                <template.MCQInput
                                    id={"A" + index}
                                    name='A'
                                    value='A'
                                    content={
                                        <div className='create_mcq_options'>
                                            <textarea
                                                id={"A " + index}
                                                value={mcqs[index].options[0]}
                                                onInput={(e) => {
                                                    template.handler(e, (i) => {
                                                        const updatedMcqs = [...mcqs];
                                                        updatedMcqs[index].options[0] = i;
                                                        setMCQs(updatedMcqs);
                                                    }, ("A " + index)
                                                    )
                                                }}
                                                style={{ width: "clamp(10em, 50%, 80em)" }}
                                                placeholder={"Enter First Option"} />
                                            <b className='unselectable'>Selected Answer</b>
                                        </div>}
                                    onClick={() => McqHandler("A", index, 0)}
                                    preselected={mcqAns[index].an == "A"} />
                                <template.MCQInput
                                    id={"B" + index}
                                    name='B'
                                    value='B'
                                    content={
                                        <div className='create_mcq_options'>
                                            <textarea
                                                id={"B " + index}
                                                value={mcqs[index].options[1]}
                                                onInput={(e) => {
                                                    template.handler(e, (i) => {
                                                        const updatedMcqs = [...mcqs];
                                                        updatedMcqs[index].options[1] = i;
                                                        setMCQs(updatedMcqs);
                                                    }, ("B " + index)
                                                    )
                                                }}
                                                style={{ width: "clamp(10em, 50%, 80em)" }}
                                                placeholder={"Enter Second Option"} />
                                            <b className='unselectable'>Selected Answer</b>
                                        </div>}
                                    onClick={() => McqHandler("B", index, 1)}
                                    preselected={mcqAns[index].an == "B"} />
                                <template.MCQInput
                                    id={"C" + index}
                                    name='C'
                                    value='C'
                                    content={
                                        <div className='create_mcq_options'>
                                            <textarea
                                                id={"C " + index}
                                                value={mcqs[index].options[2]}
                                                onInput={(e) => {
                                                    template.handler(e, (i) => {
                                                        const updatedMcqs = [...mcqs];
                                                        updatedMcqs[index].options[2] = i;
                                                        setMCQs(updatedMcqs);
                                                    }, ("C " + index)
                                                    )
                                                }}
                                                style={{ width: "clamp(10em, 50%, 80em)" }}
                                                placeholder={"Enter Third Option"} />
                                            <b className='unselectable'>Selected Answer</b>
                                        </div>}
                                    onClick={() => McqHandler("C", index, 2)}
                                    preselected={mcqAns[index].an == "C"} />
                                <template.MCQInput
                                    id={"D" + index}
                                    name='D'
                                    value='D'
                                    content={
                                        <div className='create_mcq_options'>
                                            <textarea
                                                id={"D " + index}
                                                value={mcqs[index].options[3]}
                                                onInput={(e) => {
                                                    template.handler(e, (i) => {
                                                        const updatedMcqs = [...mcqs];
                                                        updatedMcqs[index].options[3] = i;
                                                        setMCQs(updatedMcqs);
                                                    }, ("D " + index)
                                                    )
                                                }}
                                                style={{ width: "clamp(10em, 50%, 80em)" }}
                                                placeholder={"Enter Fourth Option"} />
                                            <b className='unselectable'>Selected Answer</b>
                                        </div>}
                                    onClick={() => McqHandler("D", index, 3)}
                                    preselected={mcqAns[index].an == "D"} />
                                <template.MCQInput
                                    id={"E" + index}
                                    name='E'
                                    value='E'
                                    content={
                                        <div className='create_mcq_options'>
                                            <textarea
                                                id={"E " + index}
                                                value={mcqs[index].options[4]}
                                                onInput={(e) => {
                                                    template.handler(e, (i) => {
                                                        const updatedMcqs = [...mcqs];
                                                        updatedMcqs[index].options[4] = i;
                                                        setMCQs(updatedMcqs);
                                                    }, ("E " + index)
                                                    )
                                                }}
                                                style={{ width: "clamp(10em, 50%, 80em)" }}
                                                placeholder={"Enter Last Option"} />
                                            <b className='unselectable'>Selected Answer</b>
                                        </div>}
                                    onClick={() => McqHandler("E", index, 4)}
                                    preselected={mcqAns[index].an == "E"} />

                            </div>
                        </>
                    ))}
                </div>
                <div className='form_input section' style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <button className='action_button animated_button' onClick={() => {
                        setMCQs(mcqs => [...mcqs, {"qn": "", "options":["", "", "", "", ""]}]); 
                        setMCQAns(mcqAns => [...mcqAns, ""]);
                        }}><span>Add New Multiple Choice Question</span></button>
                </div>
                <div id='srq_container' className='section '>
                    {srqs.map((i, index) => {
                        return (
                            <>
                                <b style={{ marginBottom: "clamp(6px, 6vmin, 12px)" }}>Short Response Question {index + 1}</b>
                                <div className='form_input section' style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr", gap: "max(2vw, 40px)" }}>
                                    <textarea
                                        id={"SRQ " + index}
                                        value={i.qn}
                                        onInput={(e) => template.ArrayTextAreaInputHandler(srqs, setSRQs, index, "qn", e.target.value, "SRQ " + index)}
                                        placeholder={"Enter Short Response Question " + (index + 1)} />
                                    <textarea
                                        id={"SRQAns " + index}
                                        value={srqAns[index].an}
                                        onInput={(e) => template.ArrayTextAreaInputHandler(srqAns, setSRQAns, index, "an", e.target.value, "SRQAns " + index)}
                                        placeholder={"Enter Answer " + (index + 1)} />
                                    <button
                                        className='animated_button autograde_button'
                                        id={"Autograde " + index}
                                        onClick={() => {
                                            toggle(index)
                                            setSRQAns(srqAns.map((value, id) => {
                                                if (id == index) {
                                                    return { ...value, autograded: !value.autograded }
                                                } else {
                                                    return value
                                                }
                                            }))
                                        }}><span id={"Span Autograde " + index}>Autograde Off</span></button>
                                </div>
                            </>
                        )
                    })}
                </div>
                <div className='form_input section' style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <button className='action_button animated_button' onClick={() => {
                        setSRQs(sqrs => [...sqrs, {"qn":""}]);
                        setSRQAns(srqAns => [...srqAns, {'an':"", "autograded":false}]);
                        }}><span>Add New Short Response Question</span></button>
                </div>
            </div>
            <button id='save_problem' className='action_button animated_button' onClick={saveProblem}><span>Save Problem</span></button>
        </>
    )
}