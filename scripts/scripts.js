$(function() {
    // console.log("Doc Ready");
    bombApp.getTrivia();
});

const bombApp = {};

bombApp.getTrivia = function () {
    $.ajax({
        url: 'https://opentdb.com/api.php?amount=25&difficulty=easy&type=multiple',
        method: 'GET'
    }).then(res => {
        // console.log(res);
        // console.log(res.results);
        bombApp.triviaResults = res.results;
        // console.log(bombApp.triviaResults);
        
        //forEach item in the array bombApp.triviaResults 
        //set these variables based on each item in the array


        bombApp.triviaResults.forEach(function(result, i) {
            // console.log(i, 'hello');
            //creating variable to store the question, correct answer and incorrect answers from the bombApp.triviaResults object
            bombApp.question = result.question;
                // console.log(bombApp.question);
            bombApp.correctAnswer = result.correct_answer;
                // console.log(bombApp.correctAnswer);
            bombApp.incorrectAnswers = result.incorrect_answers;
                // console.log(bombApp.incorrectAnswers);
        
            //mapping through the inccorect answers to create a new array that has each answer with an object (that includes the answer options and whether they are correct or not)
            bombApp.answerArray = bombApp.incorrectAnswers.map(function (answer) {
                return {
                    "answerOption": answer,
                    "correct": false
                }
            })

            //we are pushing the correct answer to the answer array so we have one complete answer array.
            bombApp.answerArray.push(
                {
                    "answerOption": bombApp.correctAnswer,
                    "correct": true
                }
            )      

            $(`#qa${i} .question p`).html(bombApp.question);

            //randomize array
            bombApp.shuffle(bombApp.answerArray);

            // appending answers in inputs/labels, under each question. Answers are specific to each question due to questionID.

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
                // console.log(bombApp.answerArray[3].correct);
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

$("form").on("submit", function(event) {
    event.preventDefault();
    const userAnswer1 = $("input[name=Q0Answer]:checked").val();
    const userAnswer2 = $("input[name=Q1Answer]:checked").val();
    const userAnswer3 = $("input[name=Q2Answer]:checked").val();
    const userAnswer4 = $("input[name=Q3Answer]:checked").val();
    const userAnswer5 = $("input[name=Q4Answer]:checked").val();
    const userAnswer6 = $("input[name=Q5Answer]:checked").val();

    console.log(userAnswer1, userAnswer2, userAnswer3, userAnswer4, userAnswer5);

    if (userAnswer1 === "true" &&
        userAnswer2 === "true" &&
        userAnswer3 === "true" &&
        userAnswer4 === "true" &&
        userAnswer5 === "true" &&
        userAnswer6 === "true") 
        {
            console.log("YOU WIN");
        } else {
            console.log("YOU LOSE");
        }
})




// (double check that all answers are selected)
// display choice in lock???







//timer script
bombApp.seconds = 60;

bombApp.countdown = window.setInterval(function () {
    $('.seconds p').html(`${bombApp.seconds}`);
    bombApp.seconds = bombApp.seconds - 1;

    if (bombApp.seconds < 0) {
        clearInterval(bombApp.countdown);
    }
}, 1000);


// WEDNESDAY
// -- On submit of all answers, capture userValues & compare w/ true/false? PUT IN DIV
// -- Style form to look like form, hide radios




// THURSDAY
// --- Compare all correct answers to see if u win game
// --- 
// ---
// ---
// ---




// PSEUDO CODE DONT DELETE
// on page load, instructions appear w/ "START" button
// On START, user presented w/ 3-4 random multiple choice (A-D) trivia questions
// User must select all 3-4 correct answers to stop the bomb 
// if user does not select all correct answers, timer will continue but they can attempt again.
// if answers are all correct, bomb defused -- user is presented with play again.
// upon "play again" new quiz new random questions appear.





//  WE ARE AWESOME
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


//when the user submits the form with all of their answers  DONE
//prevent form default DONE

//store the value of the checked input and store these into a variable DONE

// compare variables of the checked inputs with the correct answers (if all inputs are true, then the user wins the game) DONE



// 2 attempts
// represented by 2 heart halves.
// if you fail 1, 1 heart half breaks off or disappears

// // RULES:
// you get 2-3 attempts
// answer everything
// get everything right
// do it all before timer runs out

// modal on page load with instructions, rules, start-game button