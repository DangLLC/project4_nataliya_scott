const bombApp = {};

$(function() {
    bombApp.init();
});

bombApp.init = function() {
    bombApp.modal();
};

bombApp.modal = function() {
    $(".modal .start-button").on("click", function() {
        $(".modal").addClass("hide");
        // on click of modal button, capture values of CATEGORY and DIFFICULTY into variables
        const categoryNumber = $("#category option:selected").val();
        const difficulty = $("#difficulty option:selected").val();
        // console.log(categoryNumber, difficulty);
        bombApp.getTrivia(categoryNumber, difficulty);
        bombApp.timer();
    })
}

bombApp.timer = function() {
    bombApp.seconds = 1;
    bombApp.countdown = window.setInterval(function () {
        $(".seconds p").html(`${bombApp.seconds}`);
        bombApp.seconds = bombApp.seconds - 1;
        if (bombApp.seconds < 15) {
            $(".bomb").addClass("bomb-slow-shake");
        }
        if (bombApp.seconds < 0) {
            clearInterval(bombApp.countdown);
            $(".bomb").removeClass("bomb-slow-shake");
            $(".losing-modal").removeClass("hide");
            // $(".input-container").empty();
        }
    }, 1000);
}

bombApp.getTrivia = function(categoryNumber, difficulty) {
    $.ajax({
        url: `https://opentdb.com/api.php?amount=25&category=${categoryNumber}&difficulty=${difficulty}&type=multiple`,
        method: "GET"
    }).then(res => {
        bombApp.triviaResults = res.results;
        //forEach item in the array bombApp.triviaResults 
        //set these variables based on each item in the array
        bombApp.triviaResults.forEach(function(result, i) {
            // console.log(i, 'hello');
            //creating variable to store the question, correct answer and incorrect answers from the bombApp.triviaResults object
            bombApp.question = result.question;
            bombApp.correctAnswer = result.correct_answer;
            bombApp.incorrectAnswers = result.incorrect_answers;
            //mapping through the inccorect answers to create a new array that has each answer with an object (that includes the answer options and whether they are correct or not)
            bombApp.answerArray = bombApp.incorrectAnswers.map(function (answer) {
                return {
                    "answerOption": answer,
                    "correct": false
                }
            })
            //pushing the correct answer to the answer array so we have one complete answer array.
            bombApp.answerArray.push(
                {
                    "answerOption": bombApp.correctAnswer,
                    "correct": true
                }
            )      
            // populate dom with question
            $(`#qa${i} .question p`).html(bombApp.question);
            //randomize array
            bombApp.shuffle(bombApp.answerArray);
            // append answers in inputs/labels, under each question. Answers are specific to each question due to questionID.

            //  Each time forEach loops through, INDEX is increased by 1.
            // " i " = index of the question / ANSWER OBJECT
            // " index " = index of the answer in answer array / FOREACH LOOP
            bombApp.answerArray.forEach(function (answerObject, index) {
                // console.log(bombApp.answerArray[i].correct);
                let questionID = `Q${i}A${index}`;
                $(`#qa${i} .answers-container`).append(
                    `
                    <div class="input-container">
                        <input type="radio" name="Q${i}Answer" id="${questionID}" value="${bombApp.answerArray[index].correct}"></input>
                        <label for="${questionID}"> ${answerObject.answerOption}</label>
                    </div>
                    `
                );
            }); // end answerArray forEach 
        }) // end triviaResults forEach
    }); // END THEN
}; // END GETTRIVIA (AJAX)

bombApp.shuffle = function(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// when user clicks "defuse bomb"j, store all their answers into variables
$("form").on("submit", function(event) {
    event.preventDefault();
    const userAnswer1 = $("input[name=Q0Answer]:checked").val();
    const userAnswer2 = $("input[name=Q1Answer]:checked").val();
    const userAnswer3 = $("input[name=Q2Answer]:checked").val();
    const userAnswer4 = $("input[name=Q3Answer]:checked").val();
    const userAnswer5 = $("input[name=Q4Answer]:checked").val();
    const userAnswer6 = $("input[name=Q5Answer]:checked").val();

    console.log(userAnswer1, userAnswer2, userAnswer3, userAnswer4, userAnswer5, userAnswer6);
    // check if answers are correct / if they won
    if (userAnswer1 === "true" &&
        userAnswer2 === "true" &&
        userAnswer3 === "true" &&
        userAnswer4 === "true" &&
        userAnswer5 === "true" &&
        userAnswer6 === "true") 
        {
            $(".winning-modal").removeClass("hide");
            clearInterval(bombApp.countdown);
            // $(".input-container").empty();
        } else {
            $(".try-again-modal").removeClass("hide");
        }
});
    
$(".try-again-button").on("click", function(){
    $(".try-again-modal").addClass("hide");
});

$(".play-again-button").on("click", function(){
    $(".losing-modal").addClass("hide");
    $(`.question p`).empty();
    $(`.answers-container`).empty();
    $(".start-modal").removeClass("hide");
});



// (double check that all answers are selected)
// display choice in lock???



// THURSDAY
// start of game modal
// // figure out lock thing -- is there a lock? is there a place where A/B/C/D shows up?
// what happens when someone wins / loses
// design decisions 

// 2 attempts
// represented by 2 heart halves.
// if you fail 1, 1 heart half breaks off or disappears

// // RULES:
// you get 2-3 attempts
// answer everything
// get everything right
// do it all before timer runs out

// modal on page load with instructions, rules, start-game button









// *********** WE ARE AWESOME *********** //
// sayCorrectAnswer(bombApp.correctAnswer);
//map through the incorrect array DONE DONE DONE
//for each incorrect option, turn it into an object with the key value answer option DONE DONE DONE
//give each of those options correct: false DONE DONE DONE
//push the correct answer to this array DONE DONE DONE
//give that one correct: true DONE DONE DONE 
// PUT QUESTIONS AND ANSWERS ON DOM DONE DONE DONE DONE DONE
// -- For each RESULT in triviaResults object, return all question / answer sets. (SHOULD BE MORE THAN 1) DONE DONE DONE DONE
// -- Present all questions/answers sets on diff divs on dom DONE DONE DONE
// -- Randomize answer array so last answer is not always the "correct" answer DONE DONE DONE
// -- Add timer DONE DONE DONE
// -- IMPORTANT: Make sure we can keep track of "correct" answer DONE DONE DONE
// Make all answers relate to specific question DONE DONE
//when the user submits the form with all of their answers  DONE DONE
//prevent form default DONE DONE
//store the value of the checked input and store these into a variable DONE DONE
// compare variables of the checked inputs with the correct answers (if all inputs are true, then the user wins the game) DONE DONE
// -- Style form to look like form, hide radios DONE DONE
// --- Compare all correct answers to see if u win game DONE DONE
