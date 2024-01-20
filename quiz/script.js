var maxTimeLimit = 10


import questionList from "./questions.js";

const startButton = document.getElementById('start');
const questionScreen = document.querySelector('.question-screen');
const welcomeScreen = document.querySelector('.welcome-screen');
const endScreen = document.querySelector('.end-screen');
const timer = document.querySelector('.timer-container');
const optionsChoices = document.querySelector('.choices');
const optionButtons = optionsChoices.querySelectorAll('.options');
const clearButton = document.getElementById('clear');
const submitButton = document.getElementById('submit');
const option1 = document.getElementById('0');
const option2 = document.getElementById('1');
const option3 = document.getElementById('2');
const questionBox = document.getElementById('question-box');
const score = document.getElementById('score');
const points = document.getElementById('points');
const totalPoints = document.getElementById('total-points');

var currentScore = 0
var time
var maxQuestions = questionList.length
var questionNumber = 0
var correctAns = -1;

startButton.addEventListener('click', function(){
	welcomeScreen.style.display = 'none';
	questionScreen.style.display = 'flex';
	setTimeout(() => {
		startTimer();
	}, 100);
	changeQuestion();
});

optionsChoices.addEventListener('click', function(event) {
	if(event.target.tagName === 'BUTTON'){
		operationColor(event)
}});


clearButton.addEventListener('click', () => {
	optionButtons.forEach(i => i.classList.remove("changeColor"));
});

submitButton.addEventListener('click', () => {
	handleSubmitClick();
	optionButtons.forEach(i => i.classList.remove("changeColor"));
});
function startTimer(){
	if(questionScreen.style.display === 'flex'){
		timer.style.backgroundColor = '#fff'
		timer.style.color = "#000"
		var i = maxTimeLimit;
		time = setInterval(() => {
			if(i === -1){
				clearInterval(time)
				setTimeout(() => {
					timer.innerHTML = "Time's Up";
				},100);
				optionButtons.forEach(i => i.disabled = true)
				clearButton.disabled = true
			}
			else{
				if(i === 6){
					timer.style.backgroundColor = '#d8572a'
					timer.style.color = "#fff"
				}
				timer.innerHTML = i
				i--
			}
		},1000);
	}
	else{

	}
}

	


function handleTimeUp(){
	if(timer.innerHTML === "Time's Up"){
		submitButton.innerHTML = "Next";
	}
}

function operationColor(event){
	optionButtons.forEach(i => i.classList.remove("changeColor"));
	event.target.classList.add("changeColor");
}

function handleSubmitClick(){
	optionButtons.forEach(i => i.disabled = false)
	clearButton.disabled = false
	var classPresent = false;
	var selectedOption = -1;
	for (var i = 0; i < optionButtons.length; i++) {
		if (optionButtons[i].classList.contains('changeColor')) {
			classPresent = true;
			selectedOption = i;
			break;
		}
	}
	
	if(classPresent && selectedOption === correctAns){
		alert("You are Correct!!")
		handleScore();
		clearInterval(time);
		startTimer();
		questionNumber++;
		if(questionNumber === (maxQuestions)){
			handleEndGame();
		}
		else{
			changeQuestion();
		}
	}
	else if(classPresent){
		alert("Sorry, You are Incorrect")
		clearInterval(time);
		startTimer();
		questionNumber++;
		if(questionNumber === (maxQuestions)){
			handleEndGame();
		}
		else{
			changeQuestion();
		}
	}
	else{
		alert("Nothing was Selected!")
		clearInterval(time);
		startTimer();
		questionNumber++;
		if(questionNumber === (maxQuestions)){
			handleEndGame();
		}
		else{
			changeQuestion();
		}
	}
	
}

function handleScore(){
	currentScore++;
	score.innerHTML = currentScore;
}


function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

function generateShuffledRangeArray(min, max) {
	const rangeArray = [];
	
	for (let i = min-1; i <= max-1; i++) {
		rangeArray.push(i);
	}
	
	shuffleArray(rangeArray);  
	return rangeArray;
}  
const questionNumberArray = generateShuffledRangeArray(1, maxQuestions);

function changeQuestion(){
	questionBox.innerHTML = questionList[questionNumberArray[questionNumber]].question;
	option1.innerHTML = questionList[questionNumberArray[questionNumber]].options[0];
	option2.innerHTML = questionList[questionNumberArray[questionNumber]].options[1];
	option3.innerHTML = questionList[questionNumberArray[questionNumber]].options[2];
	correctAns = questionList[questionNumberArray[questionNumber]].answer - 1;
}

function handleEndGame(){
	questionScreen.style.display = 'none'
	endScreen.style.display = 'flex'
	points.innerHTML = currentScore
	totalPoints.innerHTML = maxQuestions
}




