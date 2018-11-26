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
        bombApp.getTrivia(categoryNumber, difficulty);
        bombApp.timer();
    })
}

bombApp.timer = function() {
    bombApp.seconds = 60;
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
        //forEach item in the array bombApp.triviaResults 
        //set these variables based on each item in the array
        bombApp.triviaResults.forEach(function(result, i) {
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