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
        console.log(bombApp.triviaResults);
        
        //forEach item in the array bombApp.triviaResults 
        //set these variables based on each item in the array


        bombApp.triviaResults.forEach(function(result, i) {
            console.log(i, 'hello');
            //creating variable to store the question, correct answer and incorrect answers from the bombApp.triviaResults object
            bombApp.question = result.question;
                console.log(bombApp.question);
            bombApp.correctAnswer = result.correct_answer;
                console.log(bombApp.correctAnswer);
            bombApp.incorrectAnswers = result.incorrect_answers;
                console.log(bombApp.incorrectAnswers);
        
            //mapping through the inccorect answers to create a new array that has each answer with an object (that includes the answer options and whether they are correct or not)
            bombApp.answerArray = bombApp.incorrectAnswers.map(function (answer) {
                return {
                    "answerOption": answer,
                    "Correct": false
                }
            })

            //we are pushing the correct answer to the answer array so we have one complete answer array.
            bombApp.answerArray.push(
                {
                    "answerOption": bombApp.correctAnswer,
                    "Correct": true
                }
            )      

            $(`#qa${i} .question p`).html(bombApp.question);

            //randomize array
            shuffleArray(bombApp.answerArray);


            // bombApp.answerArray.forEach(function(answerObject, b) {
            //     $(`#qa${i} .answer`).append(
            //     `<div class="answerContainer">
            //         <input type="radio" name="answer" id="answer"></input>
            //         <label for="answer"> ${answerObject.answerOption}</label>
            //     </div>`);
            // });

            // go through each input and label in each answer container and append a number onto the end
            bombApp.answerArray.forEach(function (answerObject, index) {
                console.log(answerObject);
                $(`#qa${i} .answerContainer`).append(`
                    <input type="radio" name="answer" id="answer${index}"></input>
                    <label for="answer${index}"> ${answerObject.answerOption}</label>`);
            });

            // bombApp.answerArray.forEach(function (answer, i) {
            //     $("input").attr('id', `answer${i}`);
            //     $("label").attr('for', `answer${i}`);
            // })


            // for (let i = 0; i < 4; i++) {
            //     $("input").attr('id', `answer${i}`);
            // }

        })
    });
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


//timer script
bombApp.seconds = 0;

bombApp.countdown = window.setInterval(function () {
    $('.seconds p').html(`${bombApp.seconds}`);
    bombApp.seconds = bombApp.seconds - 1;

    if (bombApp.seconds < 0) {
        clearInterval(bombApp.countdown);
    }
}, 1000);


// WEDNESDAY
// -- IMPORTANT: Make sure we can keep track of "correct" answer
// -- On submit of all answers, capture userValues & compare w/ true/false?






// PSEUDO CODE DONT DELETE
// on page load, instructions appear w/ "START" button
// On START, user presented w/ 3-4 random multiple choice (A-D) trivia questions
// User must select all 3-4 correct answers to stop the bomb 
// if user does not select all correct answers, timer will continue but they can attempt again.
// if answers are all correct, bomb defused -- user is presented with play again.
// upon "play again" new quiz new random questions appear.
// -- Add timer DONE DONE DONE





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