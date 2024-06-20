import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
import * as problems from "./problem_template.js"
/* eslint-disable */
export default function PigeonHole() {
    const [isThisNeeded, setThis] = useState(true);
    const temp = useRef(null);
    
    const promise = API.getProblem(template.getCookie('token'), "")//TODO @LWK19 need questionID here
    promise.then((resp) => {
        console.log('Im doneee')
    })
    return (
        < template.Home MainContent={() => (<MainContent title={"No Bad Luck Lasts Forever"} description={"There are 52 cards (a standard deck) on the table. Unluckily, you are trapped in a dark room and cannot see which side the cards are facing. You can take as many cards as you want, and you win if there is at least one card from each suit. How many cards should you take to guarantee a win?"} />)} promise={promise} />
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
            < problems.Hints title= "Hint 1: Extremely Unlucky :(" desc= "Think about the extreme case. What is the highest number of cards you can take that does not contain one card from each suit?" />
            < problems.Hints title= "Hint 2: Can't Be Unlucky Forever :)" desc= "Take 13 Clubs, 13 Hearts and 13 Diamonds. Then the remaining cards are all Spades." />
        </div>
    )
}
