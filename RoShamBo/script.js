images = ['images/Rock.PNG', 'images/Paper.PNG', 'images/Scissors.PNG'];
var div = document.createElement('div');
var playerImage = document.createElement('img');
playerImage.id = 'playerImage';
var comImage = document.createElement('img');
comImage.id = 'comImage';
var h1 = document.createElement('h1');
function randomChoice()
{
    return Math.floor(Math.random() * 3);
}

function determineWinner(player)
{
    let rand = randomChoice();
    playerImage.src = images[player];
    comImage.src = images[rand];
    if(player > rand){
        printResults('You Won!');
    } 
    if(player == rand){
        printResults('It\'s a Tie!');
    }
    if(player < rand) {
        printResults('You Lost!');
    }
}

function printResults(text)
{
    h1.appendChild(document.createTextNode(text));
    h1.append(div);
    div.append(playerImage);
    div.append(comImage);
    document.getElementById('choiceImages').remove();
    document.getElementById('results').append(h1);
}
