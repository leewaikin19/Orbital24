/* eslint-disable */

import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"

/* eslint-disable */
export default function Posts() {
    const [loading, setLoading] = useState(true);
    const comments = useRef(null);
    const problems = useRef(null);

    const promise = API.getUserComments(template.getCookie('token')).then((resp) => {
        comments.current = resp.reply;
        return API.getAllProblems(template.getCookie('token')).then((resp2) => {
            problems.current = resp.reply.map(comment => resp2.reply.find(prob => comment.questionID === prob.id));
            setLoading(false)
        })
    })

    return (
        < template.Home MainContent={() => (<MainContent comments={comments.current
            /*[
            {
                id: 1,
                author: "Test",
                datetime: 546543213275,
                content: "This is the first comment",
                replies: [
                    {
                        id: 1,
                        author: "Test2",
                        datetime: 553572486456,
                        content: "Reply to the first comment"
                    }
                ]
            }
        ]*/
        } problems={problems.current} />)} SSelected={'posts'} promise={promise} />
    )
}

export function MainContent({ comments, problems }) {
    return (
        <>
            <h1>Past Forum Posts</h1>
            {comments.map((comment, i) => {
                return (
                    <div className='thread'>
                        <div className='comment'>
                            <div>
                                <a href={'./problems/' + problems[i].id}><b style={{ color: "var(--orange)" }}>{problems[i].title}</b></a>
                                <div className='comment_metadata'>
                                    <b className='comment_author'>{comment.author}</b>
                                    &bull;
                                    <div className='comment_date'>{new Date(comment.datetime).toLocaleString()}</div>
                                </div>
                                <div className='comment_content'>
                                    {comment.content}
                                </div>
                            </div>
                        </div>
                        <div className='replies'>
                            {comment.replies.map((reply) => {
                                return (
                                    <div className='reply'>
                                        <div>
                                            <div className='reply_metadata'>
                                                <b className='reply_author'>{reply.author}</b>
                                                &bull;
                                                <div className='reply_date'>{new Date(reply.datetime).toLocaleString()}</div>
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
                )
            })}
        </>
    )
}