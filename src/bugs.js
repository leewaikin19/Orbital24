/* eslint-disable */

import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"

export default function Bugs() {
    return (
        < template.Home MainContent={() => (<MainContent/>)} SSelected={'bugs'} />
    ) 
}

function MainContent() { 
    return (
        <>
                <h1>Contact Support</h1>
                {/* Mailto code adapted from https://www.w3docs.com/snippets/html/how-to-create-mailto-links.html and https://www.freecodecamp.org/news/how-to-use-html-to-open-link-in-new-tab/ */}
                <p>Please report bugs to <a href="mailto:lwk19@comp.nus.edu.sg?cc=dominic_bryan@u.nus.edu&subject=ROJIKU Bug Report" target="_blank" rel="noreferrer noopener" style={{color:"var(--orange)"}}>lwk19@comp.nus.edu.sg</a> and attach a screenshot of the problem.</p>
        </>
    )
}