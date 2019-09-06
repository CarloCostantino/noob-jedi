const DATA = [{
    question: 'What is the name of Luke Skywalkers mother?',
    options: ['Padmé Amidala',
    'Shmi Skywalker',
    'Aayla Secura',
    'Mon Mothma'],
    answer: 'Padmé Amidala'
  },
  {
    question: 'What is the name of the ship in the photo above?',
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
  
const correct = `Nice job kid, don't get cocky!`
const incorrect = `Wrong, it was actually "correct answer here"`
const questionNumber = 0
const score = 0
// Question should be rendered to the page

// You should be able to select an answer and submit it

// You should get feedback on your answer

// You should be able to move to the next question

// You should be able to reset the quiz


// When you click on the "Prove it..." button 
// it should take you to the quiz

// When you select an option (a, b, c, or d) and submit
// if correct, it should take you to the next question
// and update the .quiz-info and .score-info

// if incorrect, it should desplay Luke gif 
// and tell you the correct answer

// then after pressing "next" button
// it should take you do the next question
// and update the .quiz-info and .score-info


function handleNewQuestion() {
  // this will render the current question to the DOM
  $('.js-render-question').click(function() {
    removeOldQuestion();
    $('.js-app').append(renderNewQuestion(DATA[questionNumber]))
    console.log(`renderQuestion ran`);
  })
  
}
  
function removeOldQuestion() {
  $('.js-form').remove()
  console.log('removeOldQuestion ran')
}

function renderNewQuestion(questionObj) {
  const question = renderQuestionHTML(questionObj);
  const answers = renderOptionsHTML(questionObj);
  console.log('renderNewQuestion ran');
  return `<form class="form-container js-form">${question}
    <div class="input-container">${answers}</div>
    <button type="submit">Check Answer</button></form>`
}

function renderQuestionHTML(questionObj) {
  return `<legend>${questionObj.question}</legend>`
}

function renderOptionsHTML(questionObj) {
  return questionObj.options.map((option, index) => 
    `<input type="radio" id="answer-${index}" name="answer">
    <label for="answer-${index}">${option}</label>`
  ).join('')
}

function handleSubmit() {
  // this will check if submit was clicked and check if it is correct
  $('body').on('submit', '.js-form', event => {
    event.preventDefault();
    if ($('input:checked').val() !== "on") {
      alert("Please select an answer")
      return false;
    } else {return true;} 
  });
  console.log(`handleSubmit ready`);

}

function answerSelected() {
  if ($('input:checked').val() !== "on") {
    alert("Please select an answer");
    return false;
  } else {return true;}
}

function renderFeedback() {
  // this should tell the user if they got the answer right and update .quiz-info

  console.log(`renderFeedback ready`);
}


function handleReset() {
  // this should restart quiz to question 1 and reset .quiz-info
  console.log(`handleResetButtonClick ready`);
}

// this will hold all the other functions and be called at the end of the js to ready the app
function startQuizApp() {
  handleNewQuestion();
  handleSubmit();
  handleReset();

}

// when the page loads, this will call "handleQuizApp"
$(startQuizApp);
