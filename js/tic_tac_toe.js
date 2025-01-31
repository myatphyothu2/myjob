"use strict";

let flag = "pen-flag";
let counter = 9;

const squares = document.getElementsByClassName("square");
const squaresArray = Array.from(squares);
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");

function JudgeLine(targetArray, idArray) {
    return targetArray.filter(e => idArray.includes(e.id));
}

const line1 = JudgeLine(squaresArray, ["a_1", "a_2", "a_3"]);
const line2 = JudgeLine(squaresArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgeLine(squaresArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgeLine(squaresArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgeLine(squaresArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgeLine(squaresArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgeLine(squaresArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgeLine(squaresArray, ["a_3", "b_2", "c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];
let winningLine = null;

const msgtxt1 = '<p class="image"><img src="img/penguins.jpg" width="61px" height="61px"></p><p class="text">Penguins Attack!</p>';
const msgtxt2 = '<p class="image"><img src="img/whitebear.jpg" width="61px" height="61px"></p><p class="text">Whitebear Attack!</p>';
const msgtxt3 = '<p class="image"><img src="img/penguins.jpg" width="61px" height="61px"></p><p class="text animate__animated animate__lightSpeedInRight">Penguins Win!!</p>';
const msgtxt4 = '<p class="image"><img src="img/whitebear.jpg" width="61px" height="61px"></p><p class="text animate__animated animate__lightSpeedInLeft">Whitebear Win!!</p>';
const msgtxt5 = '<p class="image"><img src="img/penguins.jpg" width="61px" height="61px"><img src="img/whitebear.jpg" width="61px" height="61px"></p><p class="text animate__animated animate__bounceIn">Draw!!</p>';

let gamesound = ["sound/click_sound1.mp3", "sound/click_sound2.mp3", "sound/penwin_sound.mp3", "sound/bearwin_sound.mp3", "sound/draw_sound.mp3"];

function isWinner(symbol) {
    return lineArray.some(line => {
        const subResult = line.every(square => square.classList.contains(symbol === "penguins" ? "js-pen-checked" : "js-bear-checked"));
        if (subResult) winningLine = line;
        return subResult;
    });
}

function setMessage(id) {
    const msgText = document.getElementById("msgtext");
    switch (id) {
        case "pen-turn":
            msgText.innerHTML = msgtxt1;
            break;
        case "bear-turn":
            msgText.innerHTML = msgtxt2;
            break;
        case "pen-win":
            msgText.innerHTML = msgtxt3;
            break;
        case "bear-win":
            msgText.innerHTML = msgtxt4;
            break;
        case "draw":
            msgText.innerHTML = msgtxt5;
            break;
    }
}

window.addEventListener("DOMContentLoaded", () => setMessage("pen-turn"));

squaresArray.forEach(square => {
    square.addEventListener("click", () => isSelect(square), false);
});

function isSelect(selectSquare) {
    if (selectSquare.classList.contains("js-unclickable")) return;

    let music;
    if (flag === "pen-flag") {
        music = new Audio(gamesound[0]);
        selectSquare.classList.add("js-pen-checked", "js-unclickable");
        if (isWinner("penguins")) {
            setMessage("pen-win");
            gameOver("penguins");
            return;
        }
        flag = "bear-flag";
        setMessage("bear-turn");
    } else {
        music = new Audio(gamesound[1]);
        selectSquare.classList.add("js-bear-checked", "js-unclickable");
        if (isWinner("bear")) {
            setMessage("bear-win");
            gameOver("bear");
            return;
        }
        flag = "pen-flag";
        setMessage("pen-turn");
    }
    music.currentTime = 0;
    music.play();

    counter--;
    if (counter === 0) {
        setMessage("draw");
        gameOver("draw");
    }
}

function gameOver(status) {
    let w_sound;
    switch (status) {
        case "penguins":
            w_sound = gamesound[2];
            break;
        case "bear":
            w_sound = gamesound[3];
            break;
        case "draw":
            w_sound = gamesound[4];
            break;
    }

    const music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();

    squaresArray.forEach(square => square.classList.add("js-unclickable"));

    if (status === "penguins") {
        if (winningLine) {
            winningLine.forEach(square => square.classList.add("js-pen_lightLight"));
        }
        $(document).snowfall({
            flakeColor: "rgb(255,240,245)",
            maxSpeed: 3,
            minSpeed: 1,
            maxSize: 20,
            minSize: 10,
            round: true
        });
    } else if (status === "bear") {
        if (winningLine) {
            winningLine.forEach(square => square.classList.add("js-bear_lightLight"));
        }
        $(document).snowfall({
            flakeColor: "rgb(175,238,238)",
            maxSpeed: 3,
            minSpeed: 1,
            maxSize: 20,
            minSize: 10,
            round: true
        });
    }

    newgamebtn_display.classList.remove("js-hidden"); // Show the New Game button
}

newgamebtn.addEventListener("click", () => {
    flag = "pen-flag";
    counter = 9;
    winningLine = null;

    squaresArray.forEach(square => {
        square.classList.remove(
            "js-pen-checked",
            "js-bear-checked",
            "js-unclickable",
            "js-pen_lightLight",
            "js-bear_lightLight"
        );
    });
    setMessage("pen-turn");
    newgamebtn_display.classList.add("js-hidden"); // Hide the New Game button
    $(document).snowfall("clear");
});
