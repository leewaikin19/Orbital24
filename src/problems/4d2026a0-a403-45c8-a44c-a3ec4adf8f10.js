import { useState, useRef } from 'react'
import * as API from '../API.js'
import * as template from "../template.js"
import * as problems from "../problem_template.js"
/* eslint-disable */
export default function Nim() {
    const problem = useRef(null);
    
    const promise = API.getProblem(template.getCookie('token'), "4d2026a0-a403-45c8-a44c-a3ec4adf8f10")
    promise.then((resp) => {
        problem.current = resp.reply;
    })

    const sim= () => { return (
        <>
            <p>You can simulate what happens if you take different number of cards! Enter the number in the box below and press take card to simulate what happens when you take that amount of cards.</p>
            <div className='form_input' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                <input style={{flexGrow:"1", textAlign:"center"}} type="number" name="cards" min="1" max="52" placeholder='Enter how many cards you will take' required/>
                <button style={{flexGrow:"1", marginTop:"0px"}} className="action_button animated_button" onClick={() => {
                    setup(document.querySelector('input[name="cards"]').value
                )
                }}><span>Start New Game</span></button>
            </div>
            <div id='card_container' style={{display:"flex", flexDirection:"row", margin:"1vh 1vw", rowGap:"1vh", columnGap:"1vw", flexWrap:"wrap", justifyContent:"center"}}></div>
            <p id='sucess_message' style={{textAlign:"center"}}></p>
            <button id='end_player_turn' className="action_button animated_button" style={{display:"none"}}><span id='end_turn'>Let Computer Go First</span></button>
        </>
    )}

    var num_cards = 0;
    var player_counter = 0;
    var computer_counter = 0;
    var current_card = 0;
    var turn = 1;

    function player_flip(card) {
        if (turn == 0) {}
        else if (document.getElementById(card).getAttribute("src") != "../../Assets/Cards/Misc/back_panel.svg") {}
        else if(card == 0 || (document.getElementById(card - 1).getAttribute("src") != "../../Assets/Cards/Misc/back_panel.svg" && player_counter < 3)) {
            const end_turn = document.getElementById('end_turn');
            end_turn.innerHTML = "End Your Turn";
            document.getElementById(card).setAttribute("src", "../../Assets/Cards/Misc/user.svg")
            player_counter++;
            current_card = card + 1;
            computer_counter = 0;
            enable_disable();
        }
        if(current_card == num_cards) {
            announce_winner(1);
        }
    }
    
    function end_player_move() {
        if(current_card > 0 && player_counter == 0) {}
        else {
            turn = 0;
            computer_move();
        }
    }

    function computer_flip() {
        if (turn == 1) {}
        else if(current_card == 0 || (document.getElementById(current_card - 1).getAttribute("src") != "../../Assets/Cards/Misc/back_panel.svg" && computer_counter < 3)) {
            document.getElementById(current_card).setAttribute("src", "../../Assets/Cards/Misc/comp.svg")
            computer_counter++;
            current_card++;
            player_counter = 0;
            enable_disable();
        }
        if(current_card == num_cards) {
            announce_winner(0);
        }
    }
    function computer_move() {
        if(current_card == num_cards) {}
        else {
            const end_turn = document.getElementById('end_turn');
            end_turn.innerHTML = "End Your Turn";
            var num_flip = (num_cards - current_card) % 4;
            num_flip == 0 ? num_flip = Math.floor(Math.random() * 3 + 1) : num_flip;
            for(let i = 0; i < num_flip; i++) {
                computer_flip();
            }
            turn = 1;
        }
    }
    function announce_winner(i) {
        const success_message = document.getElementById('sucess_message');
        i == 1 ? success_message.innerHTML = "Player takes the last card so Player wins!" : success_message.innerHTML = "Computer takes the last card so Computer wins!";
        const end_turn = document.getElementById('end_turn');
        end_turn.innerHTML = 'Start New Game';
        const end_player_turn = document.getElementById('end_player_turn');
        end_player_turn.disabled = false;
        end_player_turn.onclick = () => {setup(document.querySelector('input[name="cards"]').value)}
    }

    function enable_disable() {
        const end_player_turn = document.getElementById('end_player_turn');
        const end_turn = document.getElementById('end_turn');
        if (player_counter == 0) {
            end_player_turn.disabled = true;
            end_turn.innerHTML = 'Flip at least one card';
        } else {
            end_player_turn.disabled = false;
            end_turn.innerHTML = 'End Your Turn';
        }
    }

    function setup(cards) {
        cards < 1 ? cards = 21 : cards;
        num_cards = cards;
        player_counter = 0;
        computer_counter = 0;
        current_card = 0;
        turn = 1;
        const card_container = document.getElementById('card_container');
        card_container.innerHTML = '';
        const sucess_message = document.getElementById('sucess_message');
        sucess_message.innerHTML = '';
        const end_turn = document.getElementById('end_turn');
        end_turn.innerHTML = 'Let Computer Go First';
        const end_player_turn = document.getElementById('end_player_turn');

        for(let i = 0; i < cards; i++) {
            var card = document.createElement("img");
            card.setAttribute("src", "../../Assets/Cards/Misc/back_panel.svg");
            card.setAttribute("width", "75vw");
            card.setAttribute("id", i);
            card.onclick = () => player_flip(i);
            card_container.appendChild(card);
        }
        end_player_turn.style.display = 'block';
        end_player_turn.disabled = false;
        end_player_turn.onclick = () => {end_player_move()}
    }

    const sol = () => { 
        const [solution, setSolution] = useState("");
        return (
        <>
            <div className='form_input section' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"left"}}>
                <p>Which player is guaranteed a win?</p> <br/>
                <div id='mcq' className='mcq_input' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"left"}}>
                    <template.MCQInput id="first" name='first' value='First' onClick={() => template.select(document.getElementById("first"), document.getElementById("mcq"))}/>
                    <template.MCQInput id="second" name='second' value='Second' onClick={() => template.select(document.getElementById("second"), document.getElementById("mcq"))}/>
                </div>
            </div>
            <div className='form_input section' style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"left"}}>
                <p>What strategy should the player use to always guarantee a win?</p> <br/>
                <template.TextArea name='solution' value={solution} setValue={setSolution} placeholder='Describe Your Strategy' required/>
            </div>
            <button className="action_button animated_button" onClick={() => API.submitProblem(template.getCookie('token'), "4d2026a0-a403-45c8-a44c-a3ec4adf8f10", solution)}><span>Submit Solution</span></button> 
        </>
    )}

    return (
        < template.Home MainContent={() => (<problems.MainContent title={problem.current.title} description={problem.current.statement} sandbox={<problems.Simulation sim = {sim()}/>} hints={problem.current.hints} solution={sol()} />)} MSelected={"Problems"} promise={promise} isProblem={true} />
    ) 
}
