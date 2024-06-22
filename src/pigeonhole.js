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
        < template.Home MainContent={() => (<MainContent title={"Bad Luck Doesn't Last Forever"} description={"There are 52 cards (a standard deck) on the table. Unluckily, you are trapped in a dark room and cannot see which side the cards are facing. You can take as many cards as you want, and you win if there is at least one card from each suit. How many cards should you take to always guarantee a win?"} />)} promise={promise} />
    ) 
}

function MainContent({title, description, id}) { 
    function cardSimulation(cards) {
        cards >=1 && cards <= 52 ? null : cards = 1;
        const suits = ['clubs', 'hearts', 'diamonds', 'spades'];
        const clubs = document.getElementById('clubs');
        clubs.innerHTML = '';
        const hearts = document.getElementById('hearts');
        hearts.innerHTML = '';
        const spades = document.getElementById('spades');
        spades.innerHTML = '';
        const diamonds = document.getElementById('diamonds');
        diamonds.innerHTML = '';
        var clubs_count = 0;
        var hearts_count = 0;
        var spades_count = 0;
        var diamonds_count = 0;
        var card_array = new Uint8Array(cards);

        for(let i = 0; i < cards; i++) {
            var n = Math.floor(Math.random() * 52);
            if(card_array.includes(n)) { 
                i--;
                continue;
            } else{
                card_array[i] = n;
            }
        }
        card_array.sort();
        for(let i = 0; i < cards; i++) {
            var n = card_array[i];
            var suit = suits[Math.floor(n/13)];
            var value = n % 13 + 1;
            var s = String(value) + "_" + suit;
            var card = document.createElement('img');
            card.setAttribute("src", "../../Assets/Cards/" + s + ".svg");
            card.setAttribute("width", "75vw");
            switch (suit) {
                case 'clubs':
                    clubs.appendChild(card);
                    clubs_count++;
                    console.log(clubs_count);
                    break;
                case 'hearts':
                    hearts.appendChild(card);
                    hearts_count++;
                    break;
                case 'spades':
                    spades.appendChild(card);
                    spades_count++;
                    break;
                case 'diamonds':
                    diamonds.appendChild(card);
                    diamonds_count++;
                    break;
            }
        }
        if(clubs_count * hearts_count * spades_count * diamonds_count == 0) {
            document.getElementById('sucess_message').innerHTML = 'Sadly there is one or more missing suit. Try again!';
        } else {
            document.getElementById('sucess_message').innerHTML = 'You succeeded. Congratulations! But do you really need to take this many cards? Or is this not enough to guarantee a win?';
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
                            const cards = document.querySelector('input[name="cards"]').value
                            cardSimulation(cards)
                        }}><span>Take Cards</span></button>
                    </div>
                    <div id='card_container' style={{display:"flex", flexDirection:"column", margin:"1vh 1vw", rowGap:"0.5vh"}}>
                        <div id='clubs' style={{display:"flex", flexDirection:"row", columnGap:"0.5vw"}}></div>
                        <div id='hearts' style={{display:"flex", flexDirection:"row", columnGap:"0.5vw"}}></div>
                        <div id='spades' style={{display:"flex", flexDirection:"row", columnGap:"0.5vw"}}></div>
                        <div id='diamonds' style={{display:"flex", flexDirection:"row", columnGap:"0.5vw"}}></div>
                    </div>
                    <div id='sucess_message' style={{textAlign:"center"}}>
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
