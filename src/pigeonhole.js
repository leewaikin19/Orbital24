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
    var outer_card_array = []
    function cardSimulation(cards) {
        const card_container = document.getElementById('card_container');
        card_container.innerHTML = '';
        for (let i = 0; i < cards.length; i++) {
            var card = document.createElement('img');
            card.setAttribute("src", "../../Assets/Cards/" + cards[i] + ".svg");
            card_container.appendChild(card);
        }

    }
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
                    <p>You can simulate what happens if you take different number of cards! Enter the number in the box below and press take card to simulate what happens when you take that amount of cards.</p>
                    <div className='form_input' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                        <input style={{flexGrow:"1", textAlign:"center"}} type="number" name="cards" min="1" max="52" placeholder='Enter how many cards you will take' required/>
                        <button style={{flexGrow:"1", marginTop:"0px"}} className="action_button animated_button" onClick={() => {
                            const cards = document.querySelector('input[name="cards"]').value;
                            var card_array = [];
                            if(cards >= 1 && cards <= 52) {
                                const suits = ['clubs', 'hearts', 'diamonds', 'spades'];
                                for(let i = 0; i < cards; i++) {
                                    const s = String(Math.floor(Math.random() * 12 + 1)) + "_" + String(suits[Math.floor(Math.random() * 4)])
                                    card_array.includes(s) ? i-- : card_array.push(s);
                                }
                                console.log(card_array)
                                cardSimulation(card_array);
                            }
                        }}><span>Take Cards</span></button>
                    </div>
                    <div id='card_container' style={{display:"flex", flexWrap:"wrap", justifyContent:"space-around", margin:"1vh 1vw"}}>
                    </div>
                </>
            }/>
            < problems.Hints title= "Hint 1: Extremely Unlucky :(" desc= "Think about the extreme case. What is the highest number of cards you can take that does not contain one card from each suit?" />
            < problems.Hints title= "Hint 2: Can't Be Unlucky Forever :)" desc= "Take 13 Clubs, 13 Hearts and 13 Diamonds. Then the remaining cards are all Spades." />
            <h2>Solution</h2>
            <div className='form_input' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                <input style={{flexGrow:"1", textAlign:"center"}} type="number" name="cards" min="1" max="52" placeholder='Enter how many cards you will take' required/>
            </div>
            <button className="action_button animated_button" onClick={() => window.location.href = 'home'}><span>Submit Solution</span></button> 
            {/* TODO @LWK19 need to add submit solution */}
            {/* < problems.Forum  /> */}
        </div>
    )
}
