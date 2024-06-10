import * as React from 'react'
import * as template from "./template.js"

export default function P418() {
    document.title = 'Error 418';

    return (
        <div className='root'>
            {template.left_bar()}
            <div className="main_container" 
                style={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                }}>
                <h1 style={{textAlign: 'center'}}>Error 404</h1>
                <h2>I'm a Teapot.</h2>
            </div>
            {template.right_bar()}
        </div>
    )
}