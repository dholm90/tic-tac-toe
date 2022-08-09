const gameBoard = (() => {
    let _board = ["", "", "", "", "", "", "", "", ""];

    const getField = (index) => {
        if (index > _board.length) return;
        return _board[index];
    }

    const setField = (index, sign) => {
        if (index > _board.length) return;
        _board[index] = sign;
    }

    const resetBoard = () => {
        for (let i = 0; i < _board.length; i++) {
            _board[i] = "";
        }
    }

    return { getField, setField, resetBoard };
})();

const displayController = (() => {
    const _fields = document.querySelectorAll('.field');
    const _message = document.getElementById('message');
    const _restartButton = document.getElementById('restart-button');

    _fields.forEach((field) =>
        field.addEventListener('click', (e) => {
            if (gameController.getIsOver() || e.target.textContent !== "") return;
            gameController.playRound(parseInt(e.target.dataset.index));
            updateGameboard();

        }));

    _restartButton.addEventListener('click', (e) => {
        gameBoard.resetBoard();
        gameController.reset();
        updateGameboard();
        setMessageElement("Player X's turn");
    });

    const updateGameboard = () => {
        for (let i = 0; i < _fields.length; i++) {
            _fields[i].textContent = gameBoard.getField(i);
        }
    };

    const setResultMessage = (winner) => {
        if (winner === "Draw") {
            setMessageElement("It's a draw!");
        } else {
            setMessageElement(`Player ${winner} has won!`);
        }
    }

    const setMessageElement = (message) => {
        _message.textContent = message;
    }

    return { setResultMessage, setMessageElement }
})();

const Player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    };
    return { getSign };
};

const gameController = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let round = 1;
    let isOver = false;

    const playRound = (fieldIndex) => {
        gameBoard.setField(fieldIndex, getCurrentPlayerSign());
        if (checkWinner(fieldIndex)) {
            displayController.setResultMessage(getCurrentPlayerSign());
            isOver = true;
            return;
        }
        if (round === 9) {
            displayController.setResultMessage("Draw");
            isOver = true;
            return;
        }
        round++;
        displayController.setMessageElement(
            `Player ${getCurrentPlayerSign()}'s turn`
        );
    };
    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    };

    const checkWinner = (fieldIndex) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winConditions
            .filter((combination) => combination.includes(fieldIndex))
            .some((possibleCombination) =>
                possibleCombination.every(
                    (index) => gameBoard.getField(index) === getCurrentPlayerSign()
                )
            );
    };

    const getIsOver = () => {
        return isOver;
    };

    const reset = () => {
        round = 1;
        isOver = false;
    };

    return { playRound, getIsOver, reset };


})();

// console.table(gameBoard.getBoard())

console.log(displayController.board)
console.log(displayController.fields);