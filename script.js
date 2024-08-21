let currentQuiz = 0;
let score = 0;
const maxQuestions = 10; // 每次测验的题目数量
let selectedQuizData = []; // 存储当前随机选择的题目

const questionElement = document.getElementById('question');
const answerElements = document.querySelectorAll('.answer');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitButton = document.getElementById('submit');
const quiz = document.getElementById('quiz');
const result = document.getElementById('result');
const scoreElement = document.getElementById('score');
const reloadButton = document.getElementById('reload');

// 初始化测验
function initializeQuiz() {
    // 每次重新开始测验时随机选择题目
    selectedQuizData = generateRandomQuizData(quizData, maxQuestions);
    currentQuiz = 0;
    score = 0;
    loadQuiz();
}

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = selectedQuizData[currentQuiz];
    questionElement.innerText = `請選擇「${currentQuizData.word}」的正確翻譯:`;
    const shuffledOptions = shuffleArray(currentQuizData.options.slice());
    a_text.innerText = shuffledOptions[0];
    b_text.innerText = shuffledOptions[1];
    c_text.innerText = shuffledOptions[2];
    d_text.innerText = shuffledOptions[3];
}

function deselectAnswers() {
    answerElements.forEach(answerEl => {
        answerEl.checked = false;
        answerEl.nextElementSibling.style.backgroundColor = ""; // 重置背景颜色
    });
}

function getSelected() {
    let answer;
    answerElements.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.nextElementSibling.innerText;
        }
    });
    return answer;
}

submitButton.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        let correctAnswer = selectedQuizData[currentQuiz].correct;
        if (answer === correctAnswer) {
            score++;
            markCorrectAnswer(answer);
        } else {
            markWrongAnswer(answer, correctAnswer);
        }
        
        currentQuiz++;
        submitButton.disabled = true; // 禁用提交按钮，防止多次提交
        
        setTimeout(() => {
            if (currentQuiz < maxQuestions && currentQuiz < selectedQuizData.length) {
                loadQuiz();
                submitButton.disabled = false; // 重新启用提交按钮
            } else {
                quiz.classList.add('hidden');
                result.classList.remove('hidden');
                scoreElement.innerText = `${score}/${maxQuestions}`;
                if (confirm('你已完成測驗，得分是 ' + score + '/' + maxQuestions + '。要繼續測驗嗎？')) {
                    resetQuiz();
                }
            }
        }, 2000); // 2秒后加载下一个问题
    }
});

function markCorrectAnswer(correctAnswer) {
    answerElements.forEach(answerEl => {
        if (answerEl.nextElementSibling.innerText === correctAnswer) {
            answerEl.nextElementSibling.style.backgroundColor = "lightgreen";
        }
    });
}

function markWrongAnswer(selectedAnswer, correctAnswer) {
    answerElements.forEach(answerEl => {
        if (answerEl.nextElementSibling.innerText === selectedAnswer) {
            answerEl.nextElementSibling.style.backgroundColor = "lightcoral";
        }
        if (answerEl.nextElementSibling.innerText === correctAnswer) {
            answerEl.nextElementSibling.style.backgroundColor = "lightgreen";
        }
    });
}

reloadButton.addEventListener('click', () => {
    resetQuiz();
});

function resetQuiz() {
    initializeQuiz(); // 初始化并重新选择题目
    quiz.classList.remove('hidden');
    result.classList.add('hidden');
}

// 从完整的题库中生成随机题库
function generateRandomQuizData(quizData, numQuestions) {
    const selectedData = shuffleArray(quizData).slice(0, numQuestions).map(item => {
        const incorrectOptions = shuffleArray(quizData.filter(q => q.correct !== item.correct).map(q => q.correct)).slice(0, 3);
        const options = shuffleArray([...incorrectOptions, item.correct]);
        return {
            word: item.word,
            correct: item.correct,
            options: options
        };
    });
    return selectedData;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 初始化测验
initializeQuiz();
