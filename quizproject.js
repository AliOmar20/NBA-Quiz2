let currentQuestion = 0;
let score = 0;
let hints = 0; // counts for hints shown
let maxHints = 3; // max hints to show
let questions = [{
      "question": "Which of these lower seeded teams defeated their higher seed opponent in 2011?",
      "a": "Portland Trail Blazers",
      "b": "Memphis Grizzlies",
      "c": "New Orleans Hornets",
      "d": "Denver Nuggets",
      "image": "quizimages/q1.jpg",
      "hint": "Bears",
      "answer": "b"
   },
   {
      "question": "The Milwaukee Bucks went to their first Finals in franchise history in the 1970-71 season. They skunked the Baltimore Bullets four games to none. Who was the MVP of the series?",
      "a": "Michael Jordan",
      "b": "Greg Smith",
      "c": "Kareem Abdul-Jabbar",
      "d": "wilt chamberlain",
      "image": "quizimages/q2.jpg",
      "hint": "Sky hook",
      "answer": "c"
   },
   {
      "question": "What All-Star from the Cavaliers suffered a knee injury late in Game 1 of the 2015 NBA Finals that caused him to miss the rest of the series?",
      "a": "Lebron James",
      "b": "JR Smith",
      "c": "Kyrie Irving",
      "d": "Shawn Marion",
      "image": "quizimages/q3.jpg",
      "hint": "Best handles",
      "answer": "c"
   },
   {
      "question": "Which NBA player was the first winner of the NBA Finals MVP despite being on the losing team?",
      "a": "Bill Russell",
      "b": "Isaiah Thomas",
      "c": "George Mikan",
      "d": "Jerry West",
      "image": "quizimages/q4.jpg",
      "hint": "He played in the 60s",
      "answer": "d"
   },
   {
      "question": "Which NBA player got the most votes for the 2016 NBA All Star Game?",
      "a": "Kobe Bryant",
      "b": "Lebron James",
      "c": "James Harden",
      "d": "Steph Curry",
      "image": "quizimages/q5.jpg",
      "hint": "Mamba",
      "answer": "a"
   },
   {
      "question": "Which country was Steve Nash born in?",
      "a": "UK",
      "b": "South Africa",
      "c": "Canada",
      "d": "Australia",
      "image": "quizimages/q6.jpg",
      "hint": "It's really hot there",
      "answer": "b"
   },
   {
      "question": "What is the distance between ground and basket?",
      "a": "10 ft",
      "b": "11 ft",
      "c": "9.5 ft",
      "d": "10.5",
      "image": "quizimages/q7.jpg",
      "hint": "305 cm",
      "answer": "a"
   },
   {
      "question": "Who knocked the Celtics out of the 2018 NBA Playoffs?",
      "a": "Lebron",
      "b": "Cleveland Cavs",
      "c": "Boston",
      "d": "LA Lakers",
      "image": "quizimages/q8.jpg",
      "hint": "It's a team",
      "answer": "b"
   },
   {
      "question": "Who is the player that won 3 consecutive seasons MVP?",
      "a": "Ali Omar",
      "b": "Alex Caruso",
      "c": "Muhammad Ali",
      "d": "Michael Jordan",
      "image": "quizimages/q9.jpg",
      "hint": "He didn't make his high school basketball team",
      "answer": "d"
   },
   {
      "question": "How many Candian players have gotten in the NBA",
      "a": "24",
      "b": "57",
      "c": "102",
      "d": "589",
      "image": "quizimages/q10.jpg",
      "hint": "There has only been 4,374 players and not many were canadian",
      "answer": "b"
   }
];

window.onload = function () {
   document.getElementById("hintButton").onclick = null;

   loadQuestion();

};

//show hint for current question if max not reached
let getHintF = function () {
   console.log("hint button clicker");
   // if max hints not reahed
   if (hints < maxHints) {

      // get hint for current quesrion 
      let currentHint = questions[currentQuestion].hint;
      // show in page
      document.getElementById("hint").innerHTML = currentHint;

      document.getElementById("hintButton").disabled = true;

      // increment hints shown
      hints++;
   } else {
      //show a message that there are no hints left
   }
};
//load a new question
function loadQuestion() {
	clearInterval(downloadTimer);
	timeleft = 10;
	downloadTimer = setInterval(actualTimer, 1000);

   document.getElementById("hintButton").onclick = getHintF;
   // close light box for first question
   if (currentQuestion == 0) {
      closeLightBox();
   }

   // load the image
   let img = document.getElementById("image");
   img.src = questions[currentQuestion].image;
   img.style.maxWidth = "70vh";
   img.style.maxHeight = "80vh";

   // load the question and answers
   document.getElementById("question").innerHTML = questions[currentQuestion].question;
   document.getElementById("a").innerHTML = "A. " + questions[currentQuestion].a;
   document.getElementById("b").innerHTML = "B. " + questions[currentQuestion].b;
   document.getElementById("c").innerHTML = "C. " + questions[currentQuestion].c;
   document.getElementById("d").innerHTML = "D. " + questions[currentQuestion].d;

   //reset the hint box
   document.getElementById("hint").innerHTML = "You have " + (maxHints - hints) + " hints left.";
} // loadQuestion

let downloadTimer;

let actualTimer = function() {

	// update display
	document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
	timeleft -= 1; // decrement time left


	// if time runs out, end timer
	if (timeleft <= 0) {
		clearInterval(downloadTimer);

		//first: display light box with message in it
		document.getElementById("lightbox").style.display = "block";
		document.getElementById("message").innerHTML = "You took too much time!";

		//second: load next question with loadQuestion()

		loadQuestion();
	}
};


function markIt(ans) {

   let message = "";

   if (ans == questions[currentQuestion].answer) {

      // add 1 to score
      score++;

      // display score 
      document.getElementById("score").innerHTML = score + " / " + questions.length;

      message = "Correct!!!! Your score is " + score + " / " + questions.length;
   } else {
      message = "Incorrect :< Your score is " + score + " / " + questions.length;
   } // else


   // move to the next question
   currentQuestion++;

   	document.getElementById("hintButton").disabled = false;
	
    if (currentQuestion >= questions.length) {
       // create a special message
		if (score <= 7) { 
		message = "You don't watch the NBA, your missing out.";
		} else {
		message = "You got over 7 :)";
		} // else
	   
	   // ability to restart quiz
	   message += "<div id='restart' onclick='restartQuiz()'>Restart Quiz</div>";
    } else {
       loadQuestion();
    } // else
	
    // show the lightbox
    document.getElementById("lightbox").style.display = "block";
    document.getElementById("message").innerHTML = message;
  
 }  // markIt
 
 function restartQuiz() {
	 location.reload();
 } // restartQuiz

function closeLightBox() {
   document.getElementById("lightbox").style.display = "none";
} // closeLightbox

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}