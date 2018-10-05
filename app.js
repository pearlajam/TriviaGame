var questionOne = {
    question: "Who was the most successful recording artist of the decade?",
    answersArray: ["Eminem", "Mariah Carey", "Fiona Apple", "2pac"],
    answer: 1,
    finalQuestion: false,
    animation: "mariahcarey.gif"
}
var questionTwo = {
    question: "Who was Zach Morris' love interest in the hit TV show 'Saved By The Bell'",
    answersArray: ["Lisa Turtle", "Jessie Spano", "AC Slater", "Kelly Kapowski"],
    answer: 3,
    finalQuestion: false,
    animation: "kapowski.gif"
}
var questionThree = {
    question: "Which year did the Chicago Bulls win the championship?",
    answersArray: ["1990", "1991", "1997", "1999"],
    answer: 1,
    finalQuestion: false,
    animation: "michaeljordan.gif"
}
var questionFour = {
    question: "Which legendary hip hop group introduced Tupac to the world?",
    answersArray: ["N.W.A.", "*Nsync", "Digital Underground", "The Fugees"],
    answer: 2,
    finalQuestion: false,
    animation: "tupac.gif"
}
var questionFive = {
    question: "How many members were in Wu Tang Clan?",
    answersArray: ["6", "10", "12", "9"],
    answer: 2,
    finalQuestion: false,
    animation: "wutang.gif"
}
var questionSix = {
    question: "Who acted alongside Jim Carrey in Dumb and Dumber",
    answersArray: ["Tom Cruise", "Notorious B.I.G.", "Jeff Daniels", "David Schwimmer"],
    answer: 3,
    finalQuestion: true,
    animation: "dumbanddumber.gif"
}

var questionObjArr = [questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix];
var currentQuestion = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var question = questionObjArr[currentQuestion];
var noAnswers = 0;
var time = 10;
var timeRunning = false;
var intervalId;

var gameNavigation = {
    actionClick: function (question) {
        $(".answerButtons").on("click", function () {
            gameNavigation.stopTimer();
            gameNavigation.clearTimer();
            if ($(this).val() === question.answersArray[question.answer]) {
                correctAnswers++;
                $(".answerAnimation").html("<img src='assets/images/" + question.animation + "'/>").append(
                    "<p>You're Correct! The correct answer is: " + question.answersArray[question.answer]);
            } else {
                incorrectAnswers++;
                $(".answerAnimation").html("<img src='assets/images/" + question.animation + "'/>").append(
                    "<p>Incorrect! The correct answer is: " + question.answersArray[question.answer]);
            }
            $(".answerButtons").remove();
            setTimeout(function () {
                $(".answerAnimation").empty();
                $(".contentSection").append("<div class='timerSection'></div>")
            }, 5000)
            setTimeout(function () {
                if (question.finalQuestion === true) {
                    gameNavigation.showResult();
                } else {
                    currentQuestion++;
                    gameNavigation.generateQuestion();
                    gameNavigation.setTimer();
                    gameNavigation.beginTimer();
                }
            }, 5000);
            
        })
    },
    generateQuestion: function () {
        $(".questionContainer").html(questionObjArr[currentQuestion].question);
        $(".answerButtons").remove();
        for (var i = 0; i < questionObjArr[currentQuestion].answersArray.length; i++) {
            var button = $('<input type="button" class= "answerButtons" value="'
                + questionObjArr[currentQuestion].answersArray[i] + '"/>')
            $(".contentSection").append(button);
        }
        this.actionClick(questionObjArr[currentQuestion]);
        time = 10;
        gameNavigation.setTimer();
    },
    showResult: function () {
        $(".contentSection").empty();
        clearInterval(intervalId);
        var results = $("<div>");
        results.html("Correct Answers: " + correctAnswers + ", Incorrect Answers: " + incorrectAnswers
            + ", Incomplete Answers: " + noAnswers);
        $(".contentSection").append(results);
        this.restart()
    },
    restart: function () {
        $(".contentSection").append("<button type='button' class='btn btn-info restart'>Restart</button>")
        $(".restart").on("click", function () {
            $(".contentSection").empty();
            clearInterval(intervalId);
            $(".contentSection").append("<button type='button' class='btn btn-info start'>Start</button>")
            gameNavigation.start();
        })
    },
    start: function () {
        $(".start").on("click", function () {
            $(".contentSection").html("<div class='questionContainer'></div>");
            $(".contentSection").append("<div class='timerSection'></div>");
            $(".contentSection").append("<div class='answerAnimation'></div>");
            currentQuestion = 0;
            correctAnswers = 0;
            incorrectAnswers = 0;
            noAnswers = 0;
            gameNavigation.generateQuestion();
            gameNavigation.setTimer();
            gameNavigation.beginTimer();
        })
    },
    beginTimer: function () {
        intervalId = setInterval(gameNavigation.countDown, 1000);
    },
    stopTimer: function () {
        clearInterval(intervalId);
    },
    setTimer: function () {
        if (time < 10) {
            $(".timerSection").html("00:0" + time);
        } else {
            $(".timerSection").html("00:" + time);
        }
    },
    clearTimer: function () {
        $(".timerSection").remove();
    },
    countDown: function () {
        time--;
        gameNavigation.setTimer();
        if (time === 0) {
            console.log(currentQuestion);
            gameNavigation.stopTimer();
            time = 10;
            console.log("You didn't answer...");
            noAnswers++;
            console.log(noAnswers);
            question = questionObjArr[currentQuestion];
            gameNavigation.clearTimer();
            $(".answerAnimation").html("<img src='assets/images/" + question.animation + "'/>").append(
                "<p>You didn't answer! The correct answer is: " + question.answersArray[question.answer]);

            $(".answerButtons").remove();
            setTimeout(function () {
                $(".answerAnimation").empty();
                $(".contentSection").append("<div class='timerSection'></div>")
            }, 5000)

            setTimeout(function () {
                console.log(currentQuestion);
                if (questionObjArr[currentQuestion].finalQuestion === true) {
                    gameNavigation.showResult();
                } else {
                    currentQuestion++
                    gameNavigation.generateQuestion();
                    gameNavigation.beginTimer();
                    gameNavigation.setTimer();
                }
                
            }, 5000);
        }
    }
}

$(document).ready(function () {
    gameNavigation.start();
})