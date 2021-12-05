let gameObjects = 
{
    'player': {'scoreSpan': '#player-score', 'div': '#player-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-score', 'div': '#dealer-box', 'score': 0},
};

const CARDS = 
{'2': ['images/cards/2_of_clubs.png', 'images/cards/2_of_diamonds.png',
    'images/cards/2_of_hearts.png','images/cards/2_of_spades.png'],
'3': ['images/cards/3_of_clubs.png', 'images/cards/3_of_diamonds.png',
    'images/cards/3_of_hearts.png','images/cards/3_of_spades.png'],
'4': ['images/cards/4_of_clubs.png', 'images/cards/4_of_diamonds.png',
    'images/cards/4_of_hearts.png','images/cards/4_of_spades.png'],
'5': ['images/cards/5_of_clubs.png', 'images/cards/5_of_diamonds.png',
    'images/cards/5_of_hearts.png','images/cards/5_of_spades.png'],
'6': ['images/cards/6_of_clubs.png', 'images/cards/6_of_diamonds.png',
    'images/cards/6_of_hearts.png','images/cards/6_of_spades.png'],
'7': ['images/cards/7_of_clubs.png', 'images/cards/7_of_diamonds.png',
    'images/cards/7_of_hearts.png','images/cards/7_of_spades.png'],
'8': ['images/cards/8_of_clubs.png', 'images/cards/8_of_diamonds.png',
    'images/cards/8_of_hearts.png','images/cards/8_of_spades.png'],
'9': ['images/cards/9_of_clubs.png', 'images/cards/9_of_diamonds.png',
    'images/cards/9_of_hearts.png','images/cards/9_of_spades.png'],
'10': ['images/cards/10_of_clubs.png', 'images/cards/10_of_diamonds.png',
    'images/cards/10_of_hearts.png','images/cards/10_of_spades.png'],
'jack': ['images/cards/jack_of_clubs.png', 'images/cards/jack_of_diamonds.png',
    'images/cards/jack_of_hearts.png','images/cards/jack_of_spades.png'],
'queen': ['images/cards/queen_of_clubs.png', 'images/cards/queen_of_diamonds.png',
    'images/cards/queen_of_hearts.png','images/cards/queen_of_spades.png'],
'king': ['images/cards/king_of_clubs.png', 'images/cards/king_of_diamonds.png',
    'images/cards/king_of_hearts.png','images/cards/king_of_spades.png'],
'ace': ['images/cards/ace_of_clubs.png', 'images/cards/ace_of_diamonds.png',
    'images/cards/ace_of_hearts.png','images/cards/ace_of_spades.png'],};

const NAMES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];

var availableCards = CARDS;

const PLAYER = gameObjects['player'];
const DEALER = gameObjects['dealer'];

const HITSOUND = new Audio('sounds/swish.m4a');
const WINSOUND = new Audio('sounds/cash.mp3');
const LOSESOUND = new Audio('sounds/aww.mp3');

var cardsUsed = [];

var cardsLeft = 52;

var currentPlayer = PLAYER;

var canHit = true;
var canStand = true;

var wins = 0;
var losses = 0;
var draws = 0;

document.querySelector('#blackjack-hit-button').addEventListener('click', hit);
document.querySelector('#blackjack-stand-button').addEventListener('click', stand);
document.querySelector('#blackjack-deal-button').addEventListener('click', deal);

function hit()
{
    if(cardsLeft > 0 && canHit)
    {
        showCard(currentPlayer);
        showScore(currentPlayer);
        
    }
    
}

function showCard(activePlayer)
{
    let newCard = randomCard();
    let cardImage = document.createElement('img');
    cardImage.src = newCard['cardImage'];
    cardImage.height = 75;
    cardImage.width = 50;
    console.log(newCard['cardNum']);
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    HITSOUND.play();

    updateScore(newCard['cardNum'], activePlayer);
}

function stand()
{
    if(canStand)
    {
        currentPlayer = DEALER;
        canHit = false;
        computerTurn();
        canStand = false;
    }
}

function deal()
{
    let playerImages = document.querySelector('#player-box').querySelectorAll('img');
    for(let i = 0; i < playerImages.length; i++)
    {
        playerImages[i].remove();
    }

    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    for(let i = 0; i < dealerImages.length; i++)
    {
        dealerImages[i].remove();
    }

        cardsUsed = [];

    clearScores();

    currentPlayer = PLAYER;

    availableCards = CARDS;

    canStand = true;
    canHit = true;
}

function randomCard()
{
    let isNewCard = true;
    let randNum = Math.floor(Math.random() * Object.keys(availableCards).length);
    let kind = NAMES[randNum];
    let randSuit = Math.floor(Math.random() * availableCards[kind].length);
    let card = { 'cardNum': kind, 'cardImage': availableCards[kind][randSuit] };

    for (let i = 0; i < cardsUsed.length; i++) {
        if (cardsUsed[i]['cardNum'] == card['cardNum'] && cardsUsed[i]['cardImage'] == card['cardImage']) {
            isNewCard = false;
        }
    }
    if (isNewCard) 
    { 
        cardsUsed[cardsUsed.length] = card; 
        cardsLeft = cardsLeft - 1; 
        if(cardsUsed.length < 2) hit();
        return card; 
    }
    else { return randomCard(); }
}

function updateScore(card, activePlayer)
{
    switch(card)
    {
        case 'jack': activePlayer['score'] += 10; break;
        case 'queen': activePlayer['score'] += 10; break;
        case 'king': activePlayer['score'] += 10; break;
        case 'ace': if(activePlayer['score'] < 10) {activePlayer['score'] += 11; break;}
                        else {activePlayer['score'] += 1; break;}
        default: activePlayer['score'] += parseInt(card);
    }
}

function checkScore(card)
{
    switch(card)
    {
        case 'jack': return 10;
        case 'queen': return 10;
        case 'king': return 10;
        case 'ace': if(activePlayer['score'] < 10) {return 11;}
                        else {return 1;}
        default: return parseInt(card);
    }
}

function showScore(activePlayer)
{
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    if(activePlayer == PLAYER)
        {
            determineBust(activePlayer);
        }
}

function determineBust(activePlayer)
{
    if(activePlayer == PLAYER)
    {
        if(activePlayer['score'] > 21)
        {
            playerLost();
        }
    
        if(activePlayer['score'] == 21)
        {
            playerWon();
        }
    }
    else{
        if(activePlayer['score'] > 21)
        {
            playerWon();

        }
    
        if(activePlayer['score'] == 21)
        {
            playerLost();
        }
    }
    
}

function playerLost()
{
    LOSESOUND.play();
    losses = losses + 1;

    if(PLAYER['score'] > 21) 
    {
        document.querySelector(PLAYER['scoreSpan']).textContent = 'BUST';
        document.querySelector(PLAYER['scoreSpan']).style.color = 'red';
    }

    document.querySelector('#losses').textContent = losses.toString();
    document.querySelector('#blackjack-result').textContent = 'You Lost!';
    document.querySelector('#blackjack-result').style.color = 'red';

    canHit = false;
    canStand = false;

}

function playerWon()
{
    WINSOUND.play();
    wins = wins + 1;

    document.querySelector('#wins').textContent = wins.toString();
    document.querySelector('#blackjack-result').textContent = 'You Won!';
    document.querySelector('#blackjack-result').style.color = 'green';
    document.querySelector(PLAYER['scoreSpan']).style.color = 'green';

    canHit = false;
    canStand = false;

}

function playerDraw()
{
    LOSESOUND.play();
    draws = draws + 1;

    document.querySelector('#wins').textContent = wins.toString();
    document.querySelector('#blackjack-result').textContent = 'It\'s a Tie!';
    document.querySelector('#blackjack-result').style.color = 'blue';

    canHit = false;
    canStand = false;
}

function clearScores()
{
    PLAYER['score'] = 0;
    DEALER['score'] = 0;
    document.querySelector(PLAYER['scoreSpan']).textContent = PLAYER['score'];
    document.querySelector(DEALER['scoreSpan']).textContent = DEALER['score'];

    document.querySelector('#blackjack-result').textContent = 'Let\'s Play';
    document.querySelector('#blackjack-result').style.color = 'black';
    document.querySelector(PLAYER['scoreSpan']).style.color = 'white';
}

function comHit()
{
    showCard(currentPlayer);
        showScore(currentPlayer);
}

function computerTurn()
{
    let card = randomCard();
    
    if(checkScore(card['cardNum']) + currentPlayer['score'] < 21)
    {
        setTimeout(function () {
            addCard(card, currentPlayer);
            card = randomCard();
            showScore(currentPlayer);
            computerTurn();
        }, 500);
        console.log(checkScore(card['cardNum']));
    }
    else{
        determineGameOver();
    }
    

}

function addCard(card, activePlayer)
{
    let cardImage = document.createElement('img');
    cardImage.src = card['cardImage'];
    cardImage.height = 75;
    cardImage.width = 50;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    HITSOUND.play();

    updateScore(card['cardNum'], activePlayer);
}

function determineGameOver()
{
    if(PLAYER['score'] > DEALER['score'])
    {
        playerWon();
    }

    if(PLAYER['score'] < DEALER['score'])
    {
        playerLost();
    }

    if(PLAYER['score'] == DEALER['score'])
    {
        playerDraw();
    }
}