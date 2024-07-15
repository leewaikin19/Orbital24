/* eslint-disable */
import { useRef,useState } from 'react'
import * as API from '../API.js'
import * as template from "../template.js"
import * as problems from "../problem_template.js"

export default function PigeonHole() {
    const problem = useRef(null);
    const user = useRef(null);
    const forum = useRef(null);
    const id = window.location.href.split('/').at(-1);
    const [triggerPopup, setTriggerPopup] = useState(false);
    
    const promise1 = API.getProblem(template.getCookie('token'), id)
    promise1.then((resp) => {
        problem.current = resp.reply;
    })

    const promise2 = API.dashboard(template.getCookie('token')).then((resp) => {
        user.current = resp.reply;
    })
    const promise3 = API.getComments(template.getCookie('token'), id).then(resp => {
        forum.current = resp.reply;
    })
    const promise = Promise.all([promise1, promise2, promise3])

    const sim= () => { return (
        <>
            <template.Popup name = "invalid_input" title = "Invalid Input" content = "Please enter a number between 1 and 52 (inclusive)." trigger = {triggerPopup} setTrigger = {setTriggerPopup} /> {/* TODOM (and @LWK19) Untested */}
            <p>You can simulate what happens if you take different number of cards! Enter the number in the box below and press take card to simulate what happens when you take that amount of cards.</p>
            <div className='form_input' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                <input id='cards' style={{flexGrow:"1", textAlign:"center"}} type="number" name="cards" min="1" max="52" placeholder='Enter how many cards you will take' required/>
                <button style={{flexGrow:"1", marginTop:"0px"}} className="action_button animated_button" onClick={() => {
                    cardSimulation(document.querySelector('#cards').value)
                }}><span>Take Cards</span></button>
            </div>
            <div id='card_container' style={{display:"flex", height:"min-content", flexDirection:"column", margin:"1vh 1vw", rowGap:"2vh"}}>
                <div id='clubs' style={{display:"flex", height:"fit-content", flexDirection:"row", columnGap:"0.5vw", rowGap:"0.5vh", flexWrap:"wrap"}}></div>
                <div id='hearts' style={{display:"flex", height:"fit-content", flexDirection:"row", columnGap:"0.5vw", rowGap:"0.5vh", flexWrap:"wrap"}}></div>
                <div id='spades' style={{display:"flex", height:"fit-content", flexDirection:"row", columnGap:"0.5vw", rowGap:"0.5vh", flexWrap:"wrap"}}></div>
                <div id='diamonds' style={{display:"flex", height:"fit-content", flexDirection:"row", columnGap:"0.5vw", rowGap:"0.5vh", flexWrap:"wrap"}}></div>
            </div>
            <p id='sucess_message' style={{textAlign:"center"}}></p>
        </>
    )}


    function cardSimulation(cards) {
        try {
            cards = parseInt(cards);
        } catch (e) {
            setTriggerPopup(true);
            return;
        }
        if(cards < 1 || cards > 52) {
            setTriggerPopup(true);
            return;
        }
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
        < template.Home MainContent={() => (<problems.MainContent problem={problem.current} sandbox={sim()} user={user.current} forum={forum.current} />)} MSelected={"Problems"} promise={promise} isProblem={true} />
    ) 
}
