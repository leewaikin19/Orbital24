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
        < template.Home MainContent={() => (<MainContent forumLinks = {[]} forumPosts={[]} />)} SSelected={'posts'} promise={promise} />
    ) 
}

function MainContent({forumLinks, forumPosts}) {
    function arrayiser() {
        var arr = [];
        for(let i = 0; i < forumLinks.length; i++) {
            arr.push({"link": forumLinks[i], "content": forumPosts[i]});
        }
        return arr;
    } 
    return (
        <>
                <h1>Past Forum Posts</h1>
                {arrayiser().map((post) => { return(
                    <div style={{borderBottom:"2px var(--gray) solid", padding:"2vw 2vh"}}>
                        <a href={post.link}>{post.content}</a>
                    </div>
                )})}
        </>
    )
}