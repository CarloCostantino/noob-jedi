"use strict";

const DATA = [{
    question: 'What is the name of Luke Skywalkers mother?',
    options: ['Padmé Amidala',
    'Shmi Skywalker',
    'Aayla Secura',
    'Mon Mothma'],
    answer: 'Padmé Amidala'
  },
  {
    question: `What is the name of Bubba Fett's ship?`,
    options: ['Slave 1',
    'Rebel Blockade Runner', 
    'Naboo N-1 Starfighter', 
    'R60 T-wing interceptor'],
    answer: 'Slave 1'
  },
  {
    question: 'How did Han, Luke, Chewy and Leia escape the trash compacter on the Death Star?',
    options: ['Chewy took a metal pipe and pried open the doors',
    'Luke found an hatch under the pile of trash',
    'C-3PO came to the door and opened it from the outside',
    'R2D2 accessed the trash compacter and shut it down remotely'],
    answer: 'R2D2 accessed the trash compacter and shut it down remotely'
  },
  {
    question: 'What is the name of the planet that Luke met Yoda?',
    options: ['Coruscant',
    'Hoth',
    'Dagobah',
    'Naboo'],
    answer: 'Dagobah'
  },
  {
    question: 'What did Darth Vader say to Luke after being accused of killing his father?',
    options: ['No Luke, I am your father',
    "Who's your daddy? I'm your daddy",
    'No, I am your father',
    'I am your father'],
    answer: 'No, I am your father'
  },
  {
    question: 'What color is Lukes light saber',
    options: ['Green',
    'Purple',
    'White',
    'Blue'],
    answer: 'Blue'
  },
  {
    question: 'What is the home planet of the Wookies?',
    options: ['Endor',
    'Alderaan',
    'Kashyyyk',
    'Tatooine'],
    answer: 'Kashyyyk'
  },
  {
    question: 'What did Luke see in the cave on Dagobah?',
    options: ['All of his friends gathered around a table eating grilled Tauntaun',
    'Han Solo playing a flute with a flowers in his hair',
    "Himself, under Darth Vader's mask",
    'A wise old Jedi Master named Yoda'],
    answer: "Himself, under Darth Vader's mask"
  },
  {
    question: 'What did Luke need to pick up at Tosche Station on Tatooine?',
    options: ['Some milk for breakfast',
    'A part for C-3PO',
    'Power converters',
    'His friend Bob'],
    answer: 'Power converters'
  },
  {
    question: 'Who knew it was a trap?',
    options: ['Han Solo',
    'Jabba the Hutt',
    'Obi-Wan Kenobi',
    'Admiral Ackbar'],
    answer: 'Admiral Ackbar'
  }]
  
let questionNumber = 0
let score = 0

function handleNewQuestion() {
  // this will render the current question to the DOM
  $('.js-app').on('click', '.js-render-question', function() {
    $('div.js-form').replaceWith(renderNewQuestion(DATA[questionNumber]))
    renderQuizInfo(questionNumber, DATA.length, score);
  }) 
}

// this joins containers, question, answers, and submit button
function renderNewQuestion(questionObj) {
  const question = renderQuestionHTML(questionObj);
  const answers = renderOptionsHTML(questionObj);
  return `<div class="form-container js-form"><form>${question}
    <div class="input-container js-input">${answers}</div>
    <button type="submit">Check Answer</button></form></div>`
}

// this creates the HTML for the form question
function renderQuestionHTML(questionObj) {
  return `<legend>${questionObj.question}</legend>`
}

// this creates the HTML for the form options
function renderOptionsHTML(questionObj) {
  return questionObj.options.map((option, index) => 
    `<input type="radio" id="answer-${index}" value="${option}" name="answer">
    <label for="answer-${index}">${option}</label>`
  ).join('')
}

// this validates that an answer was selected and checks correctness then gives feedback
function handleSubmit() {
  $('body').on('submit', '.js-form', event => {
    event.preventDefault();
    const chosenAnswer = $('input:checked').val()
    const correctAnswer = DATA[questionNumber].answer
    let answerCheck = ''
    
    if ($('input:checked').val() === undefined ) {
      alert("Please select an answer")
    } else if (chosenAnswer === correctAnswer) {
        answerCheck = true
    } else if (chosenAnswer !== correctAnswer) {
        answerCheck = false
    }

    if (answerCheck === false) {
      $('.js-input').replaceWith(wrongAnswerFeedback(chosenAnswer, correctAnswer));
      questionNumber += 1
    } else if (answerCheck === true) {
        $('.js-input').replaceWith(rightAnswerFeedback());
        score += 10
        questionNumber += 1
        
    }

    renderNextQuestionButton(questionNumber, DATA.length);  
  });
}

// this decides what button will be desplayed after you check your answer
function renderNextQuestionButton(question, length) {
  if (question >= length) {
    $('button').replaceWith(`<button class="js-render-result" type="button">Results</button>`);
  } else {
    $('button').replaceWith(`<button class="js-render-question" type="button">Next Question</button>`);
  } 
}

// this creates feedback for wrong answer
function wrongAnswerFeedback(chosen, correct) {
  return `<img alt="luke skywalker screaming 'NO!'" src="photos/luke_skywalker_screaming_no.gif">
  <p>You said the answer was "${chosen}" when it was actually
  "${correct}"</p>`;
}

// this stores feedback for right answer
function rightAnswerFeedback() {
  return `<img alt="Han Solo telling Luke not to get cocky" src="photos/hanSolo.gif">
  <p>You got one!</p>`;
}

// this will create our score and question number
function renderQuizInfo(question, amount, score) {
  $('.quiz-info').replaceWith(`<div class="quiz-info"><p class="question-number">Question: ${question + 1} of ${amount}</p>
  <p class="score">Score: ${score}</p></div>`);
}

function renderResultPhoto(score) {
  // this will decide what photo and text renders to the results page
  if (score >= 100) {
    return `<p class="results-text">Your score was ${score}, you are the Jedi Grand Master himself!</p>
    <img alt="jedi master yoda turning on his lightsaber" src="photos/badassYoda.gif">`
  } else if (score >= 70) {
    return `<p class="results-text">Your score was ${score}, you are a skilled Jedi</p>
    <img alt="Jedi Luke Skywalker holding his lightsaber" src="photos/badassLuke2.gif">`
  } else if (score >= 50) {
    return `<p class="results-text">Your score was ${score}, you have a lot to learn</p>
    <img alt="Luke Skywalker practicing with his lightsaber" src="photos/lukePracticing.gif">`
  } else if (score >= 20) {
    return `<p class="results-text">Your score was ${score}, you are barely a Padawan</p>
    <img alt="Luke Skywalker holding his lightsaber for the first time" src="photos/lukesFirstLightsaber.gif">`
  } else {
    return `<p class="results-text">Your score was ${score}, you are Jar Jar Binks</p>
    <img alt="Jar Jar Binks giving a thumbs up" src="photos/jarjarThumbsUp.gif">`
  }
}

  
  // <section class="app-container js-app">
  //       <div class="quiz-info"></div>
  //       <div class="form-container js-form">
  //         <h2>Padawan to Jedi Master<br>How well do you know the galaxy far, far away?</h2>
  //         <button class='js-render-question' role="button">Prove it..</button>
  //       </div>
  //     </section>

function handleResultsButton() {
  $('.js-app').on('click', 'button.js-render-result', function() {
    console.log("handleResultsButton ran")
    $('.js-form').replaceWith(`${renderResultPhoto(score)}
    <button class='js-reset-app' role="button">Try Again</button>`
    )})
}

function handleReset() {
  // this should restart quiz to question 1 and reset .quiz-info
  $('.js-app').on('click', 'button.js-reset-app', function() {
    questionNumber = 0
    score = 0
    $('.js-app').replaceWith(`<div class="quiz-info"></div><div class="form-container js-form">
    ${renderNewQuestion(DATA[questionNumber])}</div>`)
    renderQuizInfo(questionNumber, DATA.length, score);
  })
  console.log(`handleResetButtonClick ready`);
}

// this will hold all the other functions and be called at the end of the js to ready the app
function startQuizApp() {
  handleNewQuestion();
  handleSubmit();
  handleResultsButton()
  handleReset();

}

// when the page loads, this will call "handleQuizApp"
$(startQuizApp);
