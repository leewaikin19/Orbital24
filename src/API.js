// all functions return resp.success
// if resp.success is true, resp.reply is a JSON with all other data
// if resp.success is false, resp.msg will contain the error message 

// Cloudflare workers
const url = "https://rojiku-server.lwk19-eab.workers.dev";
//const url = "http://127.0.0.1:8787";

async function post(payload) {
    
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

export async function login(username, password) {
    // resp.success=true returns reply.username, reply.token
    var resp = await post({ 'mode': 'auth', 'method':'login', 'username':username, 'password':password });
    console.log(resp)
    return resp;
}

export async function signup(firstName, lastName, email, username, password) {
    // resp.success=true returns reply.username, reply.token
    var resp = await post({ 'mode': 'auth', 'method':'signup', 'firstName':firstName, 'lastName':lastName, 
        'email':email, 'username':username, 'password':password });
    return resp;
}

export async function resetPassword(email) {
    // resp.success=true returns reply=null
    var resp = await post({ 'mode': 'auth', 'method':'resetPassword', 'email':email });
    return resp;
}

export async function dashboard(token) {
    // resp.success=true returns reply... username,password,email,firstName,lastName,
    //      account(user/admin),exp,problemsSolved,pendingSubmissions,badges
    var resp = await post({ 'mode': 'main', 'method':'dashboard', 'token':token });
    return resp;
}

export async function updateUser(token, updates) {
    // updates should take the form { 'field' : 'new_value', ... }
    // List of available fields to update: password, email, firstName, lastName, badges, xp, problemsSolved
    var resp = await post({ 'mode': 'main', 'method':'updateUser', 'token':token, 'updates':updates });
    return resp;
}

export async function getAllProblems(token) {
    // resp.success=true returns reply[problems]
    var resp = await post({ 'mode': 'main', 'method':'getAllProblems', 'token':token });
    return resp;
}

//maybe we dont need this
export async function getProblem(token, questionID) {
    // resp.success=true returns reply.title,statement,hints["string1","string2"], difficulty
    var resp = await post({ 'mode': 'main', 'method':'getProblem', 'token':token, 'questionID':questionID });
    return resp;
}

export async function submitProblem(token, questionID, submission) {
    // resp.success=true returns reply.done=true:reply.correct / reply.done=false
    var resp = await post({ 'mode': 'main', 'method':'submitProblem', 'token':token, 'questionID':questionID, 'submission':submission });
    return resp;
}

export async function leaderboard(token) {
    // resp.success=true returns reply.xp,badges
    // reply.xp contains the following fields: xp, username, firstName, lastName
    // reply.badges contains the following fields: badges, badges_count, username, firstName, lastName
    var resp = await post({ 'mode': 'main', 'method':'leaderboard', 'token':token });
    return resp;
}

// TODO @LWK19 - export async function createProblem(token, title, statement, sandbox = "",  = [""], hints, difficulty, mcqs = [{qn: "", options: ["","","","",""], an: ""}], srqs = [{qn: "", an: ""}]) {
export async function createProblem(token, title, statement, sandbox = "", hints, difficulty, xp, mcqs = [{qn: "", options: ["","","","",""], an: ""}], srqs = [{qn: "", an: ""}], autograded) {
    // resp.success=true returns reply
    var resp = await post({ 'mode': 'main', 'method':'createProblem', 'token':token, 'statement':statement, 'title':title, 'sandbox':sandbox, 'hints':hints, 'xp':xp, 'difficulty':difficulty, 'mcqs':mcqs, 'srqs':srqs, 'autograded':autograded});
    return resp;
}

// TODOM done updateProblem(token, title, statement, sandbox = "", hints, difficulty, mcqs = [{qn: "", options: ["","","","",""], an: ""}], srqs = [{qn: "", an: ""}]) {
// TODOM updateProblem implies that the ID is known. Need ID included
export async function updateProblem(token, questionID, title, statement, sandbox, hints, difficulty, mcqs, srqs, pending, autograded) {
    // resp.success=true returns reply
    var resp = await post({ 'mode': 'main', 'method':'createProblem', 'token':token, 'questionID':questionID, 'statement':statement, 'title':title, 'sandbox':sandbox, 'hints':hints, 'difficulty':difficulty, 'mcqs':mcqs, 'srqs':srqs, 'autograded':autograded, 'pending':pending});
    return resp;
}


export async function getAllTournaments(token) {
    // resp.success=true returns reply.title,problems["UUIDforProblem"],dateStart,dateEnd
    var resp = await post({ 'mode': 'main', 'method':'getAllTournaments', 'token':token });
    return resp;
}

//maybe no need
export async function getTournament(token) {
    // resp.success=true returns reply
    var resp = await post({ 'mode': 'main', 'method':'getTournament', 'token':token });
    return resp;
}

export async function getSubmissions(token, problemID) {
    // resp.success=true returns reply submission struct tbc reply.submissionID = []
    var resp = await post({ 'mode': 'main', 'method':'getSubmissions', 'token':token, 'problemID':problemID });
    return resp;
}

export async function getSubmission(token, submissionID) {
    // resp.success=true returns reply
    // TODOM done reply.datetime, reply.mcqs = [], reply.srqs = []
    // TODOM reply.datetime, reply.submission
    // whatever the submission object is you can define, its not touched in the backend
    var resp = await post({ 'mode': 'main', 'method':'getSubmission','token':token, 'submissionID':submissionID });
    return resp;
}

export async function gradeSubmission(token, submissionID, correct) {
    // resp.success=true returns null
    var resp = await post({ 'mode': 'main', 'method':'gradeSubmission','token':token, 'submissionID':submissionID, 'correct':correct });
    return resp;
}

export async function getUserCreatedProblems(token) {
    // resp.success=true returns reply = []
    var resp = await post({ 'mode': 'main', 'method':'getUserCreatedProblems','token':token });
    return resp;
}

export async function getOwnPendingSubmissions(token) {
    // resp.success=true returns reply = []
    var resp = await post({ 'mode': 'main', 'method':'getOwnPendingSubmissions','token':token });
    return resp;
}

export async function getAssessableProblems(token) {
    // resp.success=true returns reply[problems]
    var resp = await post({ 'mode': 'main', 'method':'getAssessableProblems', 'token':token });
    return resp;
}
