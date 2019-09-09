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
let scoreCounter = 0

function handleNextQuestion() {
  // this will render the current question to the DOM
  $('.js-app').on('click', '.js-render-question', function() {
    renderNewQuestion(DATA[questionNumber]);
    renderQuestionInfo(questionNumber, DATA.length);
    renderScoreInfo(scoreCounter);
    renderOptions(DATA[questionNumber]);
    $('.js-quiz-info').show();
    $('.js-form').show();
    $('.js-start-page').hide();
    $('.js-feedback').hide();
  }) 
}

function renderNewQuestion(questionObj) {
  $('.js-question-text').text(questionObj.question)
}

function renderQuestionInfo(question, amount) {
  $('.js-question-number').text(`Question: ${question + 1} of ${amount}`);
}

function renderScoreInfo(score) {
  $('.js-score').text(`Score: ${score}`);
}

function renderOptions(questionObj) {
  $('.js-input').html(questionObj.options.map((option, index) => 
    `<div class="input-option"><input type="radio" id="answer-${index}" value="${option}" name="answer">
    <label for="answer-${index}">${option}</label></div>`
  ).join(''))
}

// this validates that an answer was selected and checks correctness then gives feedback
function handleSubmit() {
  $('.js-submit-button').click(function(event) {
    event.preventDefault();
    const chosenAnswer = $('input:checked').val()
    const correctAnswer = DATA[questionNumber].answer
    let answerCheck = ''

    $('.js-start-page').hide();
    $('.js-feedback-photo').html('');
    $('.js-feedback-text').html('');

    if ($('input:checked').val() === undefined ) {
      alert("Please select an answer")
    } else if (chosenAnswer === correctAnswer) {
        $('.js-form').hide();
        $('.js-feedback').show();
        answerCheck = true
    } else if (chosenAnswer !== correctAnswer) {
        $('.js-form').hide();
        $('.js-feedback').show();
        answerCheck = false
    }



      if (answerCheck === false) {
        $('.js-feedback-photo').html(wrongAnswerPhoto());
        $('.js-feedback-text').text(wrongAnswerText(chosenAnswer, correctAnswer))
        questionNumber += 1
      } else if (answerCheck === true) {
          $('.js-feedback-photo').html(rightAnswerPhoto());
          $('.js-feedback-text').text(rightAnswerText());
          scoreCounter += 10
          questionNumber += 1
          renderScoreInfo(scoreCounter);
      }
    renderResultsButton(questionNumber, DATA.length);
  });
}



function wrongAnswerPhoto() {
  return `<img alt="luke skywalker screaming 'NO!'" src="photos/luke_skywalker_screaming_no.gif">`
}

function rightAnswerPhoto() {
  return `<img alt="Han Solo telling Luke not to get cocky" src="photos/hanSolo.gif">`
}

function wrongAnswerText(chosen, correct) {
  return `You said the answer was "${chosen}" when it was actually
  "${correct}"`;
}

function rightAnswerText() {
  return `You got one!`;
}


function renderResults(score) {
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

function handleResults() {
  $('div.js-feedback').on('click', '.js-render-results', function() {
    $('.js-feedback').hide();
    $('.js-results').show();
    $('.js-results-feedback').html(`${renderResults(scoreCounter)}`)
  })
}

function renderResultsButton(question, length) {
  if (question >= length) {
    $('.js-render-question').hide();
    $('.js-render-results').show();
  }
}

function handleReset() {
  // this should restart quiz to question 1 and reset .quiz-info
  $('.js-app').on('click', '.js-reset-app', function() {
    $('.js-results').hide();
    $('.js-quiz-info').hide();
    $('.js-start-page').show();
    $('.js-render-question').show();
    $('.js-render-results').hide();

    questionNumber = 0
    scoreCounter = 0
  })
}

// this will hold all the other functions and be called at the end of the js to ready the app
function startQuizApp() {
  handleNextQuestion();
  handleSubmit();
  handleResults()
  handleReset();

}

// when the page loads, this will call "handleQuizApp"
$(startQuizApp);
