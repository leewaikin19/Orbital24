// all functions return resp.success
// if resp.success is true, resp.reply is a JSON with all other data
// if resp.success is false, resp.msg will contain the error message 


/* eslint-disable */

async function post(payload) {
    // TODO oh yah we need a loader
    // Cloudflare workers
    //const url = "https://rojiku-server.lwk19-eab.workers.dev";
    const url = "http://127.0.0.1:8787";
    var req = await fetch(url, {
        method: "POST",
        headers: {
            "Access-Control-Request-Private-Network": "true",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(payload)
    })
    req = await req.json();
    return req;
}

async function login(username, password) {
    // resp.success=true returns reply.username, reply.token
    var resp = await post({ 'mode': 'auth', 'method':'login', 'username':username, 'password':password });
    return resp;
}

async function signup(firstName, lastName, email, username, password) {
    // resp.success=true returns reply.username, reply.token
    var resp = await post({ 'mode': 'auth', 'method':'signup', 'firstName':firstName, 'lastName':lastName, 
        'email':email, 'username':username, 'password':password });
    return resp;
}

async function resetPassword(email) {
    // resp.success=true returns reply=null
    var resp = await post({ 'mode': 'auth', 'method':'resetPassword', 'email':email });
    return resp;
}

async function dashboard(token) {
    // resp.success=true returns reply... username,password,email,firstName,lastName,
    //      account(user/admin),exp,problemsSolved,pendingSubmissions,achievments
    var resp = await post({ 'mode': 'auth', 'method':'dashboard', 'token':token });
    return resp;
}

async function getAllProblems(token) {
    // resp.success=true returns reply... Problem structure tbc
    var resp = await post({ 'mode': 'auth', 'method':'getAllProblems', 'token':token });
    return resp;
}

//maybe we dont need this
async function getProblem(token, questionID) {
    // resp.success=true returns reply
    var resp = await post({ 'mode': 'auth', 'method':'getProblem', 'token':token, 'id':questionID });
    return resp;
}

async function submitProblem(token, questionID, submission) {
    // resp.success=true returns reply.done=true:reply.correct / reply.done=false
    var resp = await post({ 'mode': 'auth', 'method':'submitProblem', 'token':token, 'questionID':questionID, 'submission':submission });
    return resp;
}

async function leaderboard(token) {
    // resp.success=true returns reply. xp,achievments,... tbc
    var resp = await post({ 'mode': 'auth', 'method':'leaderboard', 'token':token });
    return resp;
}

// HOW TO DO AH
async function createProblem(token) {
    // resp.success=true returns reply
    var resp = await post({ 'mode': 'auth', 'method':'createProblem', 'token':token });
    return resp;
}

async function getAllTournaments(token) {
    // resp.success=true returns reply tournament structure tbc
    var resp = await post({ 'mode': 'auth', 'method':'getAllTournaments', 'token':token });
    return resp;
}

//maybe no need
async function getTournament(token) {
    // resp.success=true returns reply
    var resp = await post({ 'mode': 'auth', 'method':'getTournament', 'token':token });
    return resp;
}

//TODO set admins to see assess problems only
async function getSubmissions(token) {
    // resp.success=true returns reply submission struct tbc
    var resp = await post({ 'mode': 'auth', 'method':'getSubmissions', 'token':token });
    return resp;
}

//maybe no need
async function getSubmission(token) {
    // resp.success=true returns reply
    var resp = await post({ 'mode': 'auth', 'method':'getSubmission','token':token });
    return resp;
}

async function gradeSubmission(token, submissionID, correct) {
    // resp.success=true returns null
    var resp = await post({ 'mode': 'auth', 'method':'gradeSubmission','token':token, 'submissionID':submissionID, 'correct':correct });
    return resp;
}
