import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"

export default function Posts() {
    const [, setLoading] = useState(true);
    const comments = useRef(null);
    const problems = useRef(null);

    const promise = API.getUserComments(template.getCookie('token')).then((resp) => {
        comments.current = resp.reply;
        return API.getAllProblems(template.getCookie('token')).then((resp2) => {
            comments.current = comments.current.map(comment => resp2.reply.find(prob => comment.questionID === prob.id) === undefined ? undefined : comment).filter(x => x !== undefined)
            problems.current = resp.reply.map(comment => resp2.reply.find(prob => comment.questionID === prob.id)).filter(x => x !== undefined);
            setLoading(false)
        })
    })

    return (
        < template.Home MainContent={() => (<MainContent comments={comments.current} problems={problems.current} />)} SSelected={'posts'} promise={promise} />
    )
}

export function MainContent({ comments, problems }) {
    return (
        <>
            <h1>Your Past Forum Posts</h1>
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