/* eslint-disable */
import { useState, useId } from 'react'

export function impt_note({note}) {
    return(
        <div className="impt_note">
            <div className='impt_note_title'>
                Important Note!
                <div className='content'>
                {note}
                </div>
            </div>
        </div>
    )
}
// Code adapted from https://stackoverflow.com/questions/24502898/show-or-hide-element-in-react 
export function Hints({title, desc}) {
    const chevronID = useId();
    const titleID = useId();
    const [showHint, setShowHint] = useState(false);
    function Reveal() {
        setShowHint((showHint) => !showHint)
    }
    function Hover() {
        document.querySelector("#"+CSS.escape(chevronID)).style.transform = "rotate(90deg)"
        document.querySelector("#"+CSS.escape(titleID)).style.background = "linear-gradient(currentColor 0 0) 0 100% /var(--d, 0) 4px no-repeat;"
        document.querySelector("#"+CSS.escape(chevronID)).style.transition = "0.4s ease"
    }

    function Unhover() {
        document.querySelector("#"+CSS.escape(chevronID)).style.transform = "rotate(0deg)"
        document.querySelector("#"+CSS.escape(titleID)).style.transition = "0.4s ease"
    }

    return(
        <div className="hint">
            <div onClick={Reveal} onMouseEnter={Hover} onMouseLeave={Unhover} className='hint_title unselectable' style={{cursor:"default"}}>
                <a id={titleID}>{title} {" "}</a> <i class="fa-solid fa-chevron-right" id={chevronID} style={{float:"right", verticalAlign:"middle"}}></i>
                {(showHint) ? (
                <div className='content'>
                    {desc}
                </div>) : null}
            </div>
        </div>
    )
}