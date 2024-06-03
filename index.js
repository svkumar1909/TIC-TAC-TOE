const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],,
    [2,4,6]
];


// let's create a function to initialise the game
function initGame () {

    //staring mein current Playeer X  hoga
    currentPlayer = "X";

    // staring mein saara 9 grids empty hoga
    gameGrid = ["","","","","","","","",""];

    //UI pr empty bhi karna padega boxex ko 
    boxes.forEach ((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        //one more thing is missing , initialise box with css property again
        box.classList = `box box${index+1}`; 

    });

    // staring mein new game button hidden hoga
    newGameBtn.classList.remove("active");

    //game Info k andar X daalna hoga
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}

initGame();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }

    else {
        currentPlayer= "X";
    }

    // UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver () {
    
    let answer = "";
    
    winningPositions.forEach ( (postion) => {

        //all 3 boxes should be non empty and exactly same in value
        if( (gameGrid[postion[0]] !== "" || gameGrid[postion[1]] !== "" || gameGrid[postion[2]] !== "")
        
        && (gameGrid[postion[0]] === gameGrid[postion[1]] ) && (gameGrid[postion[1]] === gameGrid[postion[2]])) {

            //check if winner is X
            if(gameGrid[postion[0]] == "X") {
                answer = "X";
            }

            else {
                answer = "O";
            }

            // disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // now we know X/O is winner 
            boxes[postion[0]].classList.add("win");
            boxes[postion[1]].classList.add("win");
            boxes[postion[2]].classList.add("win");
        }
    });

    //it means we have a winner
    if(answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // when there is no winner TIE
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" ) {
            fillCount++;
        }
    });


    // board is filled ,  game tie
    if ( fillCount === 9 ) {

        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active"); 

    }

    

}

function handleClick (index) {

    if(gameGrid[index] === "" ) {

        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;

        // X or O aa jaane k baad cursor pointer fir se arrow ban jaata tha usko change kiya
        boxes[index].style.pointerEvents = "none";

        //swap karo turn ko
        swapTurn();

        // koii jeet to nhii gaya
        checkGameOver();
        
    }
    
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})


newGameBtn.addEventListener("click", initGame);
