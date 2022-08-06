const gameBoard = (() => {
    let _board = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];

    const getBoard = () => {
        return _board;
    }
    return { getBoard };
})();

const displayController = (() => {


})();

const Player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    };
    return { getSign };
}

console.table(gameBoard.getBoard())