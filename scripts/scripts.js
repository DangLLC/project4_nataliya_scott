$(function() {
    // console.log("Doc Ready");
    bombApp.getTrivia();

});

const bombApp = {};

bombApp.getTrivia = function () {
    $.ajax({
        url: 'https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple',
        method: 'GET'
    }).then(res => {
        // console.log(res);
        // console.log(res.results);
        bombApp.triviaResults = res.results;
        
        //forEach item in the array bombApp.triviaResults 
        //set these variables based on each item in the array


        bombApp.triviaResults.forEach(function(result, i) {
            
            bombApp.question = result.question;
                console.log(bombApp.question);
            bombApp.correctAnswer = result.correct_answer;
                console.log(bombApp.correctAnswer);
            bombApp.incorrectAnswers = result.incorrect_answers;
                console.log(bombApp.incorrectAnswers);
        
            bombApp.answerArray = bombApp.incorrectAnswers.map(function (answer) {
                return {
                    "answerOption": answer,
                    "Correct": false
                }
            })

            bombApp.answerArray.push(
                {
                    "answerOption": bombApp.correctAnswer,
                    "Correct": true
                }
            )      

            $("#qa${} .question p").html(bombApp.question);

            //randomize array

            bombApp.answerArray.forEach(function(answerObject) {
                $(`#qa${i} answer p`).append(`<li> ${answerObject.answerOption} </li>`);
            });
        })
    });
};


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

// -- Randomize answer array so last answer is not always the "correct" answer
// -- IMPORTANT: Make sure we can keep track of "correct" answer
// -- On submit of all answers, capture userValues & compare w/ true/false?
// -- For each RESULT in triviaResults object, return all question / answer sets. (SHOULD BE MORE THAN 1)
// -- Present all questions/answers sets on diff divs on dom
// -- Add timer






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

    
