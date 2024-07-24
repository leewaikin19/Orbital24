// disable to allow non-revertible actions, changes will be made to database
const safeMode = false;
var exp = 0;


describe('Site Connection', () => {
  it('Visits Rojiku', () => {
    cy.visit('https://end-to-end-testing.rojiku.pages.dev')
    auth()
    createNonAutogradedProblem()
    assessNonAutogradedProblem()
    submitNonAutograded()
    viewSubmissionNonAutograded1()
    gradeNonAutograded()
    viewSubmissionNonAutograded2()
    verifyNonAutograded()
    rateProblem()
    postForum()

    createAutogradedProblem()
    assessAutogradedProblem()
    submitAutograded()
    viewAutograded()
    verifyAutograded()
  })

})


// login
function auth() {
  cy.get('input[id="username"]').type("robots")
  cy.get('input[id="username"]').should('have.value', "robots")
  cy.get('input[id="password"]').type("robots")
  cy.get('input[id="password"]').should('have.value', "robots")
  cy.contains('Click to Log In').click()
  cy.url().should('include', '/home')

  cy.get('div[id="profile"]').find('p').then(val => {exp=val.text().split(' ')[0]})
}

// create non-autograded problem
function createNonAutogradedProblem() {
  // /home
  cy.contains('Create Problems').click()
  cy.url().should('include', '/createassessproblems')
  cy.contains('Create New Problem').click()
  cy.url().should('include', '/create')
  cy.get('textarea[id="Title"]').type("Automatically-created-nonautograded-problem")
  cy.get('textarea[id="Title"]').should('have.value', "Automatically-created-nonautograded-problem")
  cy.get('textarea[id="Statement"]').type("Automatically-created-statement")
  cy.get('textarea[id="Statement"]').should('have.value', "Automatically-created-statement")
  cy.get('textarea[id="Sandbox"]').type("Automatically-created-sandbox")
  cy.get('textarea[id="Sandbox"]').should('have.value', "Automatically-created-sandbox")
  cy.contains('Add Hint').click()
  cy.get('textarea[id="Hint 0"]').type("Automatically-created-hint-0")
  cy.get('textarea[id="Hint 0"]').should('have.value', "Automatically-created-hint-0")
  cy.contains('Add New Multiple Choice Question').click()
  cy.get('textarea[id="MCQ 0"]').type("Automatically-created-mcq-0")
  cy.get('textarea[id="MCQ 0"]').should('have.value', "Automatically-created-mcq-0")
  cy.get('textarea[id="A 0"]').type("Automatically-created-a-0")
  cy.get('textarea[id="A 0"]').should('have.value', "Automatically-created-a-0")
  cy.get('textarea[id="B 0"]').type("Automatically-created-b-0")
  cy.get('textarea[id="B 0"]').should('have.value', "Automatically-created-b-0")
  cy.get('textarea[id="C 0"]').type("Automatically-created-c-0")
  cy.get('textarea[id="C 0"]').should('have.value', "Automatically-created-c-0")
  cy.get('textarea[id="D 0"]').type("Automatically-created-d-0")
  cy.get('textarea[id="D 0"]').should('have.value', "Automatically-created-d-0")
  cy.get('textarea[id="E 0"]').type("Automatically-created-e-0")
  cy.get('textarea[id="E 0"]').should('have.value', "Automatically-created-e-0")
  cy.get('button[id="C0"]').click()
  cy.contains('Add New Short Response Question').click()
  cy.get('textarea[id="SRQ 0"]').type("Automatically-created-srq-0")
  cy.get('textarea[id="SRQ 0"]').should('have.value', "Automatically-created-srq-0")
  cy.get('textarea[id="SRQAns 0"]').type("Automatically-created-srqAns-0")
  cy.get('textarea[id="SRQAns 0"]').should('have.value', "Automatically-created-srqAns-0")
  cy.contains('Add New Short Response Question').click()
  cy.get('textarea[id="SRQ 1"]').type("Automatically-created-srq-1")
  cy.get('textarea[id="SRQ 1"]').should('have.value', "Automatically-created-srq-1")
  cy.get('textarea[id="SRQAns 1"]').type("Automatically-created-srqAns-1")
  cy.get('textarea[id="SRQAns 1"]').should('have.value', "Automatically-created-srqAns-1")
  cy.get('button[id="Autograde 1"]').click()

  if (!safeMode) {
    cy.contains('Save Problem Details').click()
    cy.contains('Successfully Saved')
    cy.contains('Problem Details saved successfully')
    cy.contains('Close').click()
  }
}

// assess non-autograded problem
function assessNonAutogradedProblem() {
  cy.contains('Create Problems').click()
  cy.url().should('include', '/createassessproblems')
  cy.contains('Automatically-created-nonautograded-problem').click()
  cy.url().should('include', '/assess')
  cy.get('textarea[id="Title"]').should('have.value', "Automatically-created-nonautograded-problem")
  cy.get('textarea[id="Statement"]').should('have.value', "Automatically-created-statement")
  cy.get('textarea[id="Sandbox"]').should('have.value', "Automatically-created-sandbox")
  cy.get('textarea[id="Hint 0"]').should('have.value', "Automatically-created-hint-0")
  cy.get('textarea[id="MCQ 0"]').should('have.value', "Automatically-created-mcq-0")
  cy.get('textarea[id="A 0"]').should('have.value', "Automatically-created-a-0")
  cy.get('textarea[id="B 0"]').should('have.value', "Automatically-created-b-0")
  cy.get('textarea[id="C 0"]').should('have.value', "Automatically-created-c-0")
  cy.get('textarea[id="D 0"]').should('have.value', "Automatically-created-d-0")
  cy.get('textarea[id="E 0"]').should('have.value', "Automatically-created-e-0")
  cy.get('textarea[id="SRQ 0"]').should('have.value', "Automatically-created-srq-0")
  cy.get('textarea[id="SRQAns 0"]').should('have.value', "Automatically-created-srqAns-0")
  cy.get('textarea[id="SRQ 1"]').should('have.value', "Automatically-created-srq-1")
  cy.get('textarea[id="SRQAns 1"]').should('have.value', "Automatically-created-srqAns-1")
  if(!safeMode){
    cy.contains('Approve Problem').click()
    cy.contains('Problem Approved')
    cy.contains('Successfully published problem')
    cy.contains('Close').click()
    cy.get('[class=nav_bar]').contains('Problems').click()
    cy.contains('Automatically-created-nonautograded-problem')
  }
}

// submit problem non autograded
function submitNonAutograded() {
  cy.get('[class=nav_bar]').contains('Problems').click()
  cy.contains('Automatically-created-nonautograded-problem').click()
  cy.url().should('include', '/problems/')

  cy.contains('Automatically-created-c-0').click()
  cy.get('input[id="srq0"]').type("Automatically-created-srqAns-0")
  cy.get('input[id="srq1"]').type("Automatically-created-srqAns-1")
  if(!safeMode){
    cy.contains('Submit Solution').click()
    cy.contains('Submission Received')
    cy.contains("Your submission has been captured. Click 'View Submissions' to view your submissions.")
    cy.contains('Close').click()
    cy.url().should('include', '/submission/')
  }
}

// view submission non autograded
function viewSubmissionNonAutograded1() {
  cy.get('[class=nav_bar]').contains('Problems').click()
  cy.contains('Automatically-created-nonautograded-problem').click()
  cy.contains('View Submissions').click()
  cy.get('div[id="solved_problems"]').find('a').click()
  cy.url().should('include', '/submission/')

  cy.get('button[id="C 0"]').should('have.class', "selected_mcq_button")
  cy.get('button[id="C 0"]').should('not.have.class', "green_button")
  cy.get('button[id="C 0"]').should('not.have.class', "red_button")

  cy.get('button').should('not.have.class', "red_button")
  cy.get('input[id="solution"]').should('not.have.class', "green_button")
  cy.get('input[id="solution"]').should('not.have.class', "red_button")
}

// grade submission
function gradeNonAutograded() {
  cy.contains('Grade Submissions').click()
  cy.url().should('include', '/grade')
  cy.contains('robots').siblings().contains("/").click()
  cy.get('button[id="Automatically-created-c-0"]').contains('(Correct Answer) (User Answer)')
  cy.get('button[id="Automatically-created-c-0"]').should('have.class', "selected_mcq_button")
  cy.get('button[id="Automatically-created-c-0"]').should('have.class', "green_button")

  cy.get('input[value="Automatically-created-srqAns-0"]')
  cy.contains('Approve Answer').click()
  cy.contains('Approve Answer').should('have.class', "green_button")

  cy.get('input[value="Automatically-created-srqAns-1"]').should('have.class', "green_button")

  cy.get('button').should('not.have.class', "red_button")
  cy.get('input[value="Automatically-created-srqAns-1"]').should('not.have.class', "red_button")

  if(!safeMode){
    cy.contains('Finalise Grades').click()
    cy.contains('Grades Submitted')
    cy.contains('Grades have been submitted successfully.')
    cy.contains('Close').click()
  }
}

// view submission non autograded
function viewSubmissionNonAutograded2() {
  cy.get('[class=nav_bar]').contains('Problems').click()
  cy.contains('Automatically-created-nonautograded-problem').click()
  cy.contains('View Submissions').click()
  cy.get('div[id="solved_problems"]').find('a').click()
  cy.url().should('include', '/submission/')

  cy.get('button[id="C 0"]').should('have.class', "selected_mcq_button")
  cy.get('button[id="C 0"]').should('have.class', "green_button")
  cy.get('button[id="C 0"]').should('not.have.class', "red_button")

  cy.get('button').should('not.have.class', "red_button")
  cy.get('input[id="solution"]').should('have.class', "green_button")
  cy.get('input[id="solution"]').should('not.have.class', "red_button")
}

// verify XP, badges obtained
function verifyNonAutograded() {
  cy.contains('Account Dashboard').click()
  cy.url().should('include', '/dashboard')
  var new_exp = 0;
  cy.get('div[id="profile"]').find('p').then(val => {
    new_exp=val.text().split(' ')[0];
    expect(exp + 50).to.equal(new_exp)
    exp = new_exp
  })

  cy.get('div[class="badges_container"]').children().should('have.length.greaterThan', 1)
}

// Rate problem
function rateProblem() {
  cy.get('[class=nav_bar]').contains('Problems').click()
  cy.contains('Automatically-created-nonautograded-problem').click()
  cy.url().should('include', '/problems/')

  cy.get('div[id="rate_container"]').contains('3').click()
  cy.contains('Submit Rating').click()
  cy.contains('Successful')
  cy.contains('Your rating is successfully captured.')
  cy.contains('Close').click()
  cy.contains('You have already rated this problem.')
}

// post comment, reply
function postForum() {
  cy.get('[class=nav_bar]').contains('Problems').click()
  cy.contains('Automatically-created-nonautograded-problem').click()
  cy.url().should('include', '/problems/')

  cy.contains('Discussion').click()

  cy.get('input[id="post_comment"]').type("Automated-comment")
  cy.get('input[id="post_comment"]').parent().siblings().click()

  cy.contains('Automated-comment').parent().parent().parent().find('[id="post_reply"]').type('Automated-reply')
  cy.contains('Automated-comment').parent().parent().parent().find('[id="post_reply"]').parent().siblings().click()
}

// create autograded problem
function createAutogradedProblem() {
  // /home
  cy.contains('Create Problems').click()
  cy.url().should('include', '/createassessproblems')
  cy.contains('Create New Problem').click()
  cy.url().should('include', '/create')

  cy.get('textarea[id="Title"]').type("Automatically-created-autograded-problem")
  cy.get('textarea[id="Title"]').should('have.value', "Automatically-created-autograded-problem")
  cy.get('textarea[id="Statement"]').type("Automatically-created-statement")
  cy.get('textarea[id="Statement"]').should('have.value', "Automatically-created-statement")
  cy.get('textarea[id="Sandbox"]').type("Automatically-created-sandbox")
  cy.get('textarea[id="Sandbox"]').should('have.value', "Automatically-created-sandbox")
  cy.contains('Add Hint').click()
  cy.get('textarea[id="Hint 0"]').type("Automatically-created-hint-0")
  cy.get('textarea[id="Hint 0"]').should('have.value', "Automatically-created-hint-0")
  cy.contains('Add New Multiple Choice Question').click()
  cy.get('textarea[id="MCQ 0"]').type("Automatically-created-mcq-0")
  cy.get('textarea[id="MCQ 0"]').should('have.value', "Automatically-created-mcq-0")
  cy.get('textarea[id="A 0"]').type("Automatically-created-a-0")
  cy.get('textarea[id="A 0"]').should('have.value', "Automatically-created-a-0")
  cy.get('textarea[id="B 0"]').type("Automatically-created-b-0")
  cy.get('textarea[id="B 0"]').should('have.value', "Automatically-created-b-0")
  cy.get('textarea[id="C 0"]').type("Automatically-created-c-0")
  cy.get('textarea[id="C 0"]').should('have.value', "Automatically-created-c-0")
  cy.get('textarea[id="D 0"]').type("Automatically-created-d-0")
  cy.get('textarea[id="D 0"]').should('have.value', "Automatically-created-d-0")
  cy.get('textarea[id="E 0"]').type("Automatically-created-e-0")
  cy.get('textarea[id="E 0"]').should('have.value', "Automatically-created-e-0")
  cy.get('button[id="C0"]').click()

  cy.contains('Add New Short Response Question').click()
  cy.get('textarea[id="SRQ 0"]').type("Automatically-created-srq-0")
  cy.get('textarea[id="SRQ 0"]').should('have.value', "Automatically-created-srq-0")
  cy.get('textarea[id="SRQAns 0"]').type("Automatically-created-srqAns-0")
  cy.get('textarea[id="SRQAns 0"]').should('have.value', "Automatically-created-srqAns-0")
  cy.get('button[id="Autograde 0"]').click()

  cy.contains('Add New Short Response Question').click()
  cy.get('textarea[id="SRQ 1"]').type("Automatically-created-srq-1")
  cy.get('textarea[id="SRQ 1"]').should('have.value', "Automatically-created-srq-1")
  cy.get('textarea[id="SRQAns 1"]').type("Automatically-created-srqAns-1")
  cy.get('textarea[id="SRQAns 1"]').should('have.value', "Automatically-created-srqAns-1")
  cy.get('button[id="Autograde 1"]').click()

  if (!safeMode) {
    cy.contains('Save Problem Details').click()
    cy.contains('Successfully Saved')
    cy.contains('Problem Details saved successfully')
    cy.contains('Close').click()
  }
}

// assess autograded problem
function assessAutogradedProblem() {
  cy.contains('Create Problems').click()
  cy.url().should('include', '/createassessproblems')
  cy.contains('Automatically-created-autograded-problem').click()
  cy.url().should('include', '/assess')
  cy.get('textarea[id="Title"]').should('have.value', "Automatically-created-autograded-problem")
  cy.get('textarea[id="Statement"]').should('have.value', "Automatically-created-statement")
  cy.get('textarea[id="Sandbox"]').should('have.value', "Automatically-created-sandbox")
  cy.get('textarea[id="Hint 0"]').should('have.value', "Automatically-created-hint-0")
  cy.get('textarea[id="MCQ 0"]').should('have.value', "Automatically-created-mcq-0")
  cy.get('textarea[id="A 0"]').should('have.value', "Automatically-created-a-0")
  cy.get('textarea[id="B 0"]').should('have.value', "Automatically-created-b-0")
  cy.get('textarea[id="C 0"]').should('have.value', "Automatically-created-c-0")
  cy.get('textarea[id="D 0"]').should('have.value', "Automatically-created-d-0")
  cy.get('textarea[id="E 0"]').should('have.value', "Automatically-created-e-0")
  cy.get('textarea[id="SRQ 0"]').should('have.value', "Automatically-created-srq-0")
  cy.get('textarea[id="SRQAns 0"]').should('have.value', "Automatically-created-srqAns-0")
  cy.get('textarea[id="SRQ 1"]').should('have.value', "Automatically-created-srq-1")
  cy.get('textarea[id="SRQAns 1"]').should('have.value', "Automatically-created-srqAns-1")
  if(!safeMode){
    cy.contains('Approve Problem').click()
    cy.contains('Problem Approved')
    cy.contains('Successfully published problem')
    cy.get('[class=nav_bar]').contains('Problems').click()
    cy.contains('Automatically-created-nonautograded-problem')
  }
}

// submit problem non autograded
function submitAutograded() {
  cy.get('[class=nav_bar]').contains('Problems').click()
  cy.contains('Automatically-created-autograded-problem').click()
  cy.url().should('include', '/problems/')

  cy.contains('Automatically-created-c-0').click()
  cy.get('input[id="srq0"]').type("Automatically-created-srqAns-0")
  cy.get('input[id="srq1"]').type("Automatically-created-srqAns-1")
  if(!safeMode){
    cy.contains('Submit Solution').click()
    cy.contains('Submission Received')
    cy.contains("Your submission has been captured. Click 'View Submissions' to view your submissions.")
    cy.contains('Close').click()
    cy.url().should('include', '/submission/')
  }
}

// view submission autograded
function viewAutograded() {
  cy.get('[class=nav_bar]').contains('Problems').click()
  cy.contains('Automatically-created-autograded-problem').click()
  cy.contains('View Submissions').click()
  cy.get('div[id="solved_problems"]').find('a').click()
  cy.url().should('include', '/submission/')

  cy.get('button[id="C 0"]').should('have.class', "selected_mcq_button")
  cy.get('button[id="C 0"]').should('have.class', "green_button")
  cy.get('button[id="C 0"]').should('not.have.class', "red_button")

  cy.get('button').should('not.have.class', "red_button")
  cy.get('input[id="solution"]').should('have.class', "green_button")
  cy.get('input[id="solution"]').should('not.have.class', "red_button")
}

// verify XP, badges obtained
function verifyAutograded() {
  cy.contains('Account Dashboard').click()
  cy.url().should('include', '/dashboard')
  var new_exp = 0;
  cy.get('div[id="profile"]').find('p').then(val => {
    new_exp=val.text().split(' ')[0]
    expect(exp + 50).to.equal(new_exp)
    exp = new_exp
  })
  
  cy.get('div[class="badges_container"]').children().should('have.length.greaterThan', 1)
}