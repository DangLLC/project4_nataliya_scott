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

            bombApp.answerArray.forEach(function(answerObject) {
                $(`#qa${i} .answer ul`).append(`<li> ${answerObject.answerOption} </li>`);

            if (`bombApp.answerArray${i}.correct` === true) {
                $('.answer li').addClass('correctColor');
            }
            });
        })
    });
};


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

// -- Randomize answer array so last answer is not always the "correct" answer
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

    
