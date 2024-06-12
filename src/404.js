import * as React from 'react'
import * as template from "./template.js"

export default function P404() {
    document.title = "Error 404";

    return (
        <div className='outside_root root'>
            {template.left_bar()}
            <div className="main_container" 
                style={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                }}>
                <h1 style={{textAlign: 'center'}}>Error 404</h1>
                <h2>Page Not Found.</h2>
            </div>
            {template.right_bar()}
        </div>
    )
}