/*
function log(msg) {
    if (window.console && log.enabled) {
        console.log(msg);
    }
}
*/
(function () {

    var deck = new Array(52);
	var firstColumn = new Array(1);
	var secondColumn = new Array(2);
	var thirdColumn = new Array(3);
	var fourthColumn = new Array(4);
	var fifthColumn = new Array(5);
	var sixthColumn = new Array(6);
	var seventhColumn = new Array(7);
	var completedSuitOne = new Array(13);
	var completedSuitTwo = new Array(13);
	var completedSuitThree = new Array(13);
	var completedSuitFour = new Array(13);
    var suits = [ '\u2663', '\u2666', '\u2665', '\u2660' ];
    var cards = "2 3 4 5 6 7 8 9 10 J D K A".split(" ");
	
    for (var i = 0, cnt = 0; i < cards.length; i++) {
        for (var j = 0; j < suits.length; j++, cnt++) {
            deck[cnt] = cards[i] + suits[j];
        }
    }
    //lets shuffle the deck
    shuffle(deck);
    console.log(deck);

}());

function shuffle(array){
    for(var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x) {}
    return array;
}