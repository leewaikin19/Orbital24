import { useState, useRef } from 'react'
import * as API from './API.js'
import * as template from "./template.js"
import * as problems from "./problem_template.js"
/* eslint-disable */
export default function Nim() {
    const [isThisNeeded, setThis] = useState(true);
    const temp = useRef(null);
    
    const promise = API.getProblem(template.getCookie('token'), "05b9eed0-2d13-4b54-89f8-9e4db29785ee")
    promise.then((resp) => {
        console.log('Im doneee')
    })

    const sim= () => { return (
        <>
            <p>You can simulate what happens if you take different number of cards! Enter the number in the box below and press take card to simulate what happens when you take that amount of cards.</p>
            <div className='form_input' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                <input style={{flexGrow:"1", textAlign:"center"}} type="number" name="cards" min="1" max="52" placeholder='Enter how many cards you will take' required/>
                <button style={{flexGrow:"1", marginTop:"0px"}} className="action_button animated_button" onClick={() => {
                    cardSimulation(document.querySelector('input[name="cards"]').value
                )
                }}><span>Start New Game</span></button>
            </div>
            <div id='card_container' style={{display:"flex", flexDirection:"row", margin:"1vh 1vw", rowGap:"1vh", columnGap:"1vw", flexWrap:"wrap"}}></div>
            <div id='sucess_message' style={{textAlign:"center"}}></div>
            <button className="action_button animated_button" onClick={() => computer_move()}><span>End Turn</span></button>
        </>
    )}

    var num_cards = 0;
    var player_counter = 0;
    var computer_counter = 0;
    var current_card = 0;
    var turn = 1;

    function player_flip(card) {
        if (turn == 0) {}
        else if(card == 0 || (document.getElementById(card - 1).getAttribute("src") != "../../Assets/Cards/Misc/back_panel.svg" && player_counter < 3)) {
            document.getElementById(card).setAttribute("src", "../../Assets/Cards/Misc/joker_red.svg")
            player_counter++;
            current_card = card + 1;
            computer_counter = 0;
        }
        if(current_card == num_cards) {
            announce_winner(1);
        }
    }
    function computer_flip() {
        if (turn == 1) {}
        else if(current_card == 0 || (document.getElementById(current_card - 1).getAttribute("src") != "../../Assets/Cards/Misc/back_panel.svg" && computer_counter < 3)) {
            document.getElementById(current_card).setAttribute("src", "../../Assets/Cards/Misc/joker_black.svg")
            computer_counter++;
            current_card++;
            player_counter = 0;
        }
        if(current_card == num_cards) {
            announce_winner(0);
        }
    }
    function computer_move() {
        turn = 1 - turn;
        var num_flip = (num_cards - current_card) % 4;
        num_flip == 0 ? num_flip = Math.random() * 3 + 1 : null;
        for(let i = 0; i < num_flip; i++) {
            computer_flip();
        }
        turn = 1 - turn;
    }
    function announce_winner(i) {
        const success_message = document.getElementById('sucess_message');
        i == 1 ? success_message.innerHTML = "Player takes the last card so player wins!" : success_message.innerHTML = "Computer takes the last card so computer wins!";
    }

    function cardSimulation(cards) {
        num_cards = cards;
        player_counter = 0;
        computer_counter = 0;
        current_card = 0;
        const card_container = document.getElementById('card_container');
        card_container.innerHTML = '';
        function choose(){
            return(<>
                <p>Choose who goes first</p>
                <div style={{display:"flex", flexDirection:"row", rowGap:"2vw"}}>
                    <button className="action_button animated_button" onClick={() => {
                    }}><span>Player</span></button>
                    <button className="action_button animated_button" onClick={() => {
                    }}><span>Computer</span></button>
                </div>
            </>)
        }

        for(let i = 0; i < cards; i++) {
            var card = document.createElement("img");
            card.setAttribute("src", "../../Assets/Cards/Misc/back_panel.svg");
            card.setAttribute("width", "75vw");
            card.setAttribute("id", i);
            card.onclick = () => player_flip(i);
            card_container.appendChild(card);
        }
    }

    const sol = () => { 
        const [solution, setSolution] = useState("");
        return (
        <>
            <div className='form_input' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                <template.FormInput name='solution' value={solution} setValue={setSolution} placeholder='Enter how many cards you will take' required/>
            </div>
            <button className="action_button animated_button" onClick={() => API.submitProblem(template.getCookie('token'), "05b9eed0-2d13-4b54-89f8-9e4db29785ee", {solution})}><span>Submit Solution</span></button> 
        </>
    )}

    return (
        < template.Home MainContent={() => (<problems.MainContent title={""} description={""} sandbox={<problems.Simulation sim = {sim()}/>} hints={[]} solution={sol()} />)} MSelected={"Problems"} promise={promise} />
    ) 
}
