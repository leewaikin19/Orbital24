import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
import * as problems from "./problem_template.js"
/* eslint-disable */
export default function Nim() {
    const [isThisNeeded, setThis] = useState(true);
    const temp = useRef(null);
    
    const promise = API.getProblem(template.getCookie('token'), "")//TODO @LWK19 need questionID here
    promise.then((resp) => {
        console.log('Im doneee')
    })
    return (
        < template.Home MainContent={() => (<MainContent title={"No Bad Luck Lasts Forever"} description={"We start with 21 cards. The player and the computer alternate turns, starting with the player. Each turn, the player and the computer can remove 1, 2, or 3 cards. The player or computer that removes the last card wins. What strategy should the player use to always guarantee a win?"} />)} promise={promise} />
    ) 
}

function MainContent({title, description, id}) { 

    return (
        <div className='problems'>
            <>
                <h1>{title}</h1>
            </>
            <div className='description'>
                <p>{description}</p>
            </div>
            < problems.Simulation title="Simulation" sim={
                <>
                    <div className='form_input' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                        <input style={{flexGrow:"1", textAlign:"center"}} type="number" name="cards" min="1" max="52" placeholder='How many cards do you want to play with?' defaultValue={21} required/>
                        <button style={{flexGrow:"1", marginTop:"0px"}} className="action_button animated_button" onClick={() => {
                            const cards = document.querySelector('input[name="cards"]').value;
                            if(cards >= 1 && cards <= 52) {
                                //TODO @LWK19 need to add simulation
                            }
                        }}><span>Take Cards</span></button>
                    </div>
                </>
            }/>
            < problems.Hints title= "Hint 1: A Smaller Game" desc= "Let’s try with a smaller game of 4 cards where each turn you can take 1, 2, or 3 cards. Which player would you rather be?" />
            < problems.Hints title= "Hint 2: A Slightly Less Small Game" desc= "What about 5 cards where each turn you can take 1, 2, or 3 cards. Which player would you rather be? Try it with more and more cards." />
            < problems.Hints title= "Hint 3: A Pattern" desc= "Just by looking at the number of cards, it is possible to determine whether the first mover wins/loses. There is a pattern to this. For which number of cards does the first player wins?" />
            <button className="action_button animated_button" onClick={() => window.location.href = 'home'}><span>Submit Solution</span></button> 
            {/* TODO @LWK19 need to add submit solution */}
            {/* < problems.Forum  /> */}
        </div>
    )
}
