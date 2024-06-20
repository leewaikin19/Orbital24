/* eslint-disable */
import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"

export default function Homepage() {
    return (
        < template.Home MainContent={MainContent} Sselected={'Home'} />
    ) 
}

function MainContent() {
    return (
        <>
        <div className='table_container'>
            <h1>Current Problems</h1>
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