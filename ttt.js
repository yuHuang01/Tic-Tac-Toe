

const boardFunc = (() => {
    let turnCount = 1;
    const markCell = (e) => {
        if(turnCount === 1){
            e.target.textContent = "O";
            arrForO.push(e.target.id)
            e.target.removeEventListener("click", boardFunc.markCell);
            turnCount--;
        }else{
            e.target.textContent = "X";
            arrForX.push(e.target.id)
            e.target.removeEventListener("click", boardFunc.markCell);
            turnCount++;
        }
    };
    const winningPattens = [
        ["zero", "one", "two"],
        ["three", "four", "five"],
        ["six", "seven", "eight"],
        ["zero", "three", "six"],
        ["one", "four", "seven"],
        ["two", "five", "eight"],
        ["zero", "four", "eight"],
        ["two", "four", "six"],
        ];
    let arrForO = [];
    let arrForX = [];
    let finalResult = "";

    const check = (e) => {
        if(turnCount === 0){ //Check O
            checkO();
        }else if(turnCount === 1){ //Check X
            checkX();
        }
        if(arrForO.length > 3 && arrForX.length > 3 && finalResult !== "O" && finalResult !== "X"){//Check draw
            if(arrForO.length + arrForX.length === 9){
                finalResult = "draw"
            }
        }
        switch(finalResult){
            case "O":
                resultMes("O won!");
                break;

            case "X":
                resultMes("X won!");
                break;

            case "draw":
                resultMes("Draw!")
                break;
        }
        e.target.removeEventListener("click", boardFunc.check);
    };

    const checkO = () => {
        winningPattens.forEach(pattern => {
            let matchO = 0;
            if(finalResult !== "O"){
                pattern.forEach(patternPart => {
                    if(arrForO.includes(patternPart)){
                        matchO++
                    }
                })
            }
            if(matchO === 3){
                finalResult = "O";
            }
        })
    }
    const checkX = () => {
        winningPattens.forEach(pattern => {
            let matchX = 0;
            if(finalResult !== "X"){
                pattern.forEach(patternPart => {
                    if(arrForX.includes(patternPart)){
                        matchX++
                    }
                })
            }
            if(matchX === 3){
                finalResult = "X";
            }
        })
    }

    const restart = () =>{
        const startBtn = document.getElementById("startBtn").textContent = "Start";
        document.getElementById("startBtn").addEventListener("click", startGame);
        turnCount = 1;
        arrForO = [];
        arrForX = [];
        finalResult = "";
        const cells = document.getElementsByClassName("cell");
        for(let i = 0; i < cells.length; i++){
            cells[i].removeEventListener("click", boardFunc.markCell);
            cells[i].removeEventListener("click", boardFunc.check);
            cells[i].textContent = "";
        }
    }
    const resultMes = (message) => {
        const cells = document.getElementsByClassName("cell");
        for(let i = 0; i < cells.length; i++){
            cells[i].removeEventListener("click", boardFunc.markCell);
            cells[i].removeEventListener("click", boardFunc.check);
        };
        let resultDisp = document.createElement("div");
        resultDisp.id = "finalResultDisp";
        resultDisp.addEventListener("click", (e) => {
            document.querySelector("#body").removeChild(resultDisp)
        })
        let resMes = document.createElement("h1");
        resMes.textContent = message;
        resultDisp.appendChild(resMes);
        document.querySelector("#body").insertBefore(resultDisp, document.getElementById("playersDiv"));
    }
    return{markCell, check, restart}
})();



const startGame = () => {
    const startBtn = document.getElementById("startBtn");
    startBtn.textContent = "Restart";
    startBtn.removeEventListener("click", startGame);
    startBtn.addEventListener("click", boardFunc.restart);
    const cells = document.getElementsByClassName("cell");
    for(let i = 0; i < cells.length; i++){
        cells[i].addEventListener("click", boardFunc.markCell)
        cells[i].addEventListener("click", boardFunc.check)
    };
};

document.getElementById("startBtn").addEventListener("click", startGame);

