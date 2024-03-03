const questions = [
    {
        question: 'Which is larget animal in the world?',
        answer: [
            {text: 'Shark', correct: false},
            {text: 'Blue whale', correct: true},
            {text: 'Elephant', correct: false},
            {text: 'Giraffe', correct: false}
        ]
    },
    {
        question: 'Which is smallest country in the world?',
        answer: [
            {text: 'Vatican City', correct: true},
            {text: 'Bhutan', correct: false},
            {text: 'Nepal', correct: false},
            {text: 'shri Lanka', correct: false}
        ]
    },
    {
        question: 'Which is larget desert in the world?',
        answer: [
            {text: 'Kalahari', correct: false},
            {text: 'Gobo', correct: false},
            {text: 'Sahara', correct: false},
            {text: 'Antarctica', correct: true}
        ]
    },
    {
        question: 'Which is smallest continent in the world?',
        answer: [
            {text: 'Asia', correct: false},
            {text: 'Australia', correct: true},
            {text: 'Arctic', correct: false},
            {text: 'Africa', correct: false}
        ]
    }
]

const questionElement = document.getElementById('question')
const answerBtns = document.getElementById('answer-buttons')
const nextBtn = document.getElementById('next-btn')

let score = 0
let curQuesIdx = 0

const startQuiz= ()=>{
    score = 0
    curQuesIdx = 0
    showQues()
}

const showQues = ()=>{
    resetState()
    let curQues = questions[curQuesIdx]
    let quesNo = curQuesIdx + 1
    questionElement.innerText = quesNo + '. ' + curQues.question
    
    curQues.answer.forEach(answer => {
        let button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add('btn')
        answerBtns.appendChild(button)

        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    });
}

const selectAnswer = (e)=>{
    let selectBtn = e.target
    let isCorrect = selectBtn.dataset.correct === 'true'
    if (isCorrect){
        selectBtn.classList.add('correct')
        score++
    }else{
        selectBtn.classList.add('incorrect')
    }

    Array.from(answerBtns.children).forEach(btn =>{
        if (btn.dataset.correct === 'true'){
            btn.classList.add('correct')
        }
        btn.disabled = true
    })

    nextBtn.style.display = 'block'
}

const resetState = ()=>{
    while(answerBtns.firstChild){
        answerBtns.removeChild(answerBtns.firstChild)
    }
}

const handleNextBtn = ()=>{
    curQuesIdx++;
    if (curQuesIdx < questions.length){
        showQues()
    }else{
        showScore()
    }
}

const showScore = ()=>{
    resetState()
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextBtn.innerText = 'Play Again'
    nextBtn.addEventListener('click',startQuiz)
}

nextBtn.addEventListener('click', handleNextBtn)

startQuiz()