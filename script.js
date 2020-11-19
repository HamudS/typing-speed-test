const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const testText = document.querySelector("#origin-text p")


var timer = [0,0,0,0];
var interval;
var timerRunning = false;
var texts = ["The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.",
"The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.",
"Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with.",
"So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book."]
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
    if (time <= 9){
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer(){
    let currentTime =leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":"+ leadingZero(timer[2]) ;
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - timer[0] * 600);
}

// Match the text entered with the provided text on the page:
function spellCheck(){
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);

    if (textEntered == originText){
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890"
    }
    else{
        if(textEntered == originTextMatch){
            testWrapper.style.borderColor = "#65CCf3"
        }else{
            testWrapper.style.borderColor = "#E95D0F"
        }
    }
}

// Start the timer:
function start(){
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning){
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    console.log(textEnteredLength);
}

// Reset everything:
function reset(){
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00"
    testWrapper.style.borderColor = "grey";

    testText.innerHTML = texts[Math.floor(Math.random() * 4)]
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start , false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);