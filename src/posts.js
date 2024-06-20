/* eslint-disable */

import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"

/* eslint-disable */
export default function Posts() {
    const [isThisNeeded, setThis] = useState(true);
    const temp = useRef(null);
    
    const promise = API.dashboard(template.getCookie('token'))
    promise.then((resp) => {
        console.log('Im doneee')
    })
    return (
        < template.Home MainContent={() => (<MainContent problemset={[]} />)} SSelected={'posts'} promise={promise} />
    ) 
}

function MainContent({problemset}) { 
    return (
        <>
                <h1>Past Forum Posts</h1>
                {/* TODOm @LWK19 help gimme ideas :)) */}

                </>
    )
}