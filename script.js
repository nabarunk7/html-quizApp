const questions = [
    {
        question: "Thomas Cup is related to which among the following sports?",
        answers: [
            { text: "Table Tennis",correct: false},
            { text: "Badminton",correct: true},
            { text: "Football",correct: false},
            { text: "Tennis",correct: false},
        ]
    },
    {
        question: "In which among the following years, the Modern Olympic games were held for the first time?",
        answers: [
            { text: "1896",correct: true},
            { text: "1894",correct: false},
            { text: "1899",correct: false},
            { text: "1900",correct: false},
        ]
    },
    {
        question: "Who among the following is the first Indian to score a century in Indian Premier League (IPL)?",
        answers: [
            { text: "Sachin Tendulkar",correct: false},
            { text: "Virat Kohli",correct: false},
            { text: "Virender Sehwag",correct: false},
            { text: "Manish Pandey",correct: true},
        ]
    },
    {
        question: "When was the Olympic flag created?",
        answers: [
            { text: "1910",correct: false},
            { text: "1913",correct: true},
            { text: "1900",correct: false},
            { text: "1902",correct: false},
        ]
    },
    {
        question: "Where was the first Cricket World Cup held and when?",
        answers: [
            { text: "England,1975",correct: true},
            { text: "England,1973",correct: false},
            { text: "England,1976",correct: false},
            { text: "Australia,1975",correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct=="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();