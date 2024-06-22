/* eslint-disable */
import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"

export default function Homepage() {
    const promise = API.dashboard(template.getCookie('token'))
    promise.then((resp) => {
        console.log('Im doneee')
    })
    return (
        < template.Home MainContent={() => (<MainContent solvedProblems={promise.resp.problemsSolved} />)} SSelected={'dashboard'} promise={promise} />
    ) 
}

function MainContent({solvedProblems}) {
    return (
        <>
        <div className='table_container'>
            <h1>Current Problems</h1>
            <table>
                <tr>
                    <th>Problem Title</th>
                    <th>Difficulty</th>
                </tr>
                {solvedProblems.map((problem) => (
                    // TODO @LWK19: I'm not sure if this is the correct way to link to the problem
                    <tr>
                        <td><a href={problem.id}>{problem.title}</a></td>
                        <td>{problem.difficulty}</td>
                    </tr>
                ))}
            </table>
        </div>
        {/*  TODO @LWK19: Are we still doing recoms?*/}
        <div className='table_container'>
            <h1>Recommended Problems</h1>
            <table>
                <tr>
                    <th>Problem Title</th>
                    <th>Difficulty</th>
                </tr>
                <tr>
                    <td><a href='home'>Sample Title</a></td>
                    <td>4.5</td>
                </tr>
            </table>
        </div>
        </>
    )
}