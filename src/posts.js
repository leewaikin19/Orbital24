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
        < template.Home MainContent={() => (<MainContent comments={[
            {
                id: 1,
                author: "Test",
                date: 546543213275,
                content: "This is the first comment",
                replies: [
                    {
                        id: 1,
                        author: "Test2",
                        date: 553572486456,
                        content: "Reply to the first comment"
                    }
                ]
            }
        ]}/>)} SSelected={'posts'} promise={promise} />
    ) 
}

function MainContent({comments}) { // TODO @LWK19 filter for just current user
    return (
        <>
            <h1>Past Forum Posts</h1>
            {comments.map((comment) => {
                            return(
                                <div className='thread'>
                                    <div className='comment'> {/* TODO @LWK19 Sort by date*/}
                                        <div>
                                            {/* TODO @LWK19 link to the problems <a href={'./problems/'}><b style={{color:"var(--orange)"}}>problemtitle</b></a> */}
                                            <div className='comment_metadata'>
                                                <b className='comment_author'>{comment.author}</b>
                                                &bull;
                                                <div className='comment_date'>{new Date(comment.date).toLocaleString()}</div>
                                            </div>
                                            <div className='comment_content'>
                                                {comment.content}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='replies'>
                                        {comment.replies.map((reply) => {
                                            return(
                                                <div className='reply'>
                                                    <div>
                                                        <div className='reply_metadata'>
                                                            <b className='reply_author'>{reply.author}</b>
                                                            &bull;
                                                            <div className='reply_date'>{new Date(reply.date).toLocaleString()}</div>
                                                        </div>
                                                        <div className='reply_content'>
                                                            {reply.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )})}
        </>
    )
}