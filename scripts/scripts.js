const bombApp = {};

$(function() {
    bombApp.init();
});

bombApp.init = function() {
    bombApp.startModal();
};

bombApp.startModal = function() {
    $(".start-modal .button").on("click", function() {
        $(".start-modal").addClass("hidden");
        $(".modal-content-start").addClass("hidden");
        
        // on click of modal button, capture values of CATEGORY and DIFFICULTY into variables
        const categoryNumber = $("#category option:selected").val();
        const difficulty = $("#difficulty option:selected").val();
        // console.log(categoryNumber, difficulty);
        bombApp.getTrivia(categoryNumber, difficulty);
        bombApp.timer();
    })
}

bombApp.timer = function() {
    bombApp.seconds = 3000;
    bombApp.countdown = window.setInterval(function () {
        $(".seconds p").html(`${bombApp.seconds}`);
        bombApp.seconds = bombApp.seconds - 1;
        if (bombApp.seconds < 15) {
            $(".bomb").addClass("bomb-slow-shake");
        }
        if (bombApp.seconds < 9) {
            $(".bomb p").prepend("0");
        }
        if (bombApp.seconds < 0) {
            clearInterval(bombApp.countdown);
            $(".bomb").removeClass("bomb-slow-shake");
            $(".bomb").addClass("bomb-explode");
            setTimeout(function () {
                $(".bomb").removeClass("bomb-explode");
            }, 1000);
            
            setTimeout(function(){
                $(".modal").removeClass("hidden").append(`
                    <div class="modal-content modal-content-losing">
                        <h2>Time ran out... you lost!</h2>
                        <p>Maybe you should watch some more Jeopardy?</p>
                        <button class="play-again-button button">Play again?</button>
                    </div>          
                `);
            }, 600);
        }
    }, 1000);
}

bombApp.getTrivia = function(categoryNumber, difficulty) {
    $.ajax({
        url: `https://opentdb.com/api.php?amount=25&category=${categoryNumber}&difficulty=${difficulty}&type=multiple`,
        method: "GET"
    }).then(res => {
        bombApp.triviaResults = res.results;
        bombApp.shuffle(bombApp.triviaResults);
        console.log(bombApp.triviaResults);

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
                        <input type="radio" name="Q${i}Answer" id="${questionID}" class="visuallyhidden" value="${bombApp.answerArray[index].correct}"></input>
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

bombApp.questionCount = 0;
$(".answers-container").on("click", "input", function() {
    const userAnswer = $(`input[name=Q${bombApp.questionCount}Answer]:checked`).val();
    console.log(userAnswer);
    if (userAnswer === "true") {
        $(`.progress-${bombApp.questionCount}`).removeClass("active-q");
        bombApp.questionCount++;
        $(`#qa${bombApp.questionCount}`).removeClass("hidden");
        $("html, body").animate(
            {
                scrollTop: $(`#qa${bombApp.questionCount}`).offset().top
            },
            1000);
        setTimeout(function() {
            $(`.progress-${bombApp.questionCount}`).addClass("active-q");
        }, 650);
    } else {
        console.log("minus 4");
        bombApp.seconds = bombApp.seconds - 4;
        $(".seconds").addClass("lilshake");
        setTimeout(function () {
            $(".seconds").removeClass("lilshake");
        }, 300);
    }
    const userAnswer6 = $("input[name=Q5Answer]:checked").val();
    bombApp.userAnswer6 = userAnswer6;
});
    

// when user clicks "defuse bomb"j, store all their answers into variables
$(".defuse-button").on("click", function(event) {
    event.preventDefault();
    // const userAnswer6 = $("input[name=Q5Answer]:checked").val();
    if (bombApp.userAnswer6 === "true")
    {
        bombApp.winning();
        $(".modal").append(
            `<div class="modal-content modal-content-winning">
                <h2>Bomb defused!</h2>
                <p class="time-left">You defused the bomb with ${bombApp.seconds + 1} seconds remaining. You go Glen Coco!</p>
                <button class="play-again-button button">Play again?</button>
            </div>`
        );
    }
});

$(".explosion-button").on("click", function (event) {
    console.log("you pressed me");
    event.preventDefault();
    const userAnswer6 = $("input[name=Q5Answer]:checked").val();
    if (userAnswer6 === "true") {
        setTimeout(function () {
            bombApp.winning();
        }, 600);
        $(".modal").append(
            `<div class="modal-content modal-content-winning">
                <h2>Congrats, you destroyed the world.</h2>
                <p class="time-left">with ${bombApp.seconds + 1} seconds remaining... even though you won. Maybe next time think about your fellow humans before you blow something up.</p>
                <button class="play-again-button button">Play again?</button>
            </div>`
        );
    }
});


bombApp.winning = function(){
    console.log("Im working");
    $(".modal").removeClass("hidden");
    clearInterval(bombApp.countdown);
    $(".bomb").removeClass("bomb-slow-shake");
}

$(".explosion-button").on("click", function() {
    $(".bomb").addClass("bomb-explode")
    setTimeout(function() {
        $(".bomb").removeClass("bomb-explode");
    }, 1000);
});
    
$(".modal").on("click", ".play-again-button", function(){
    console.log("working");
    // $(".game-end-modal").addClass("hidden");
    $(".modal-content-losing, .modal-content-winning").addClass("hidden");
    $(".start-modal").removeClass("hidden");
    $(".modal-content-start").removeClass("hidden");
    $(".defuse").addClass("hidden");
    $(".next-q").addClass("hidden");
    $(`.question p`).empty();
    $(`.answers-container`).empty();
    $(`.seconds p`).empty();
    bombApp.questionCount = 0;
});



// TO DO
// WES BOS STUFF




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
// start of game modal
// what happens when someone wins / loses
// seconds capture is not accurate DONE DONE
// EXPLOSIONNNNNNNNNN done done done DONE
// MAKE LABELS ACCESSIBLE DONE DONE DONE DONE
// defuse bomb only show up after last Q. DONE DONE
// REORG MODAL CODE DONE DONE DONE DONE DONE
// 5 SECONDS OFF TIMER IF U choose wrong answer DONE DONE
// WRITE GAME INSTRUCTIONS AND MODAL INSTRUCTIONS




// NO
// // figure out lock thing -- is there a lock? is there a place where A/B/C/D shows up? NO
// 2 attempts
// represented by 2 heart halves.
// if you fail 1, 1 heart half breaks off or disappears
// try again stuff, incomplete stuff 




// start game
// start-game modal shows
// play game
// timer runs out / lose game
// show modal
// show "play again" for losing contents
// when play again: 
// - clear contents 
// - hide contents-container
// - show start contents

// timer does not run out / win game
// show modal "play again" for winning


