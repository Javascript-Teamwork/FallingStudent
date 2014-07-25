JavaScript team project
=======================

Our team will create a web-based game "Solitaire".
##Overview
This project is a team work task from Software University
[softuni.bg](http://softuni.bg)

- - -

It will be written in JavaScript.
```JavaScript
function log(msg) {
    if (window.console && log.enabled) {
        console.log(msg);
    }
}
```
## The TEAM

## Rules of the game
Taking a shuffled standard 52-card deck of playing cards (without Jokers), one upturned card is dealt on the left of the playing area, then six downturned cards (from left to right). On top of the downturned cards, an upturned card is dealt on the left-most downturned pile, and downturned cards on the rest until all piles have an upturned card. The piles should look like the figure to the right.

The four foundations (light rectangles in the upper right of the figure) are built up by suit from Ace (low in this game) to King, and the tableau piles can be built down by alternate colors, and partial or complete piles can be moved if they are built down by alternate colors also. Any empty piles can be filled with a King or a pile of cards with a King. The aim of the game is to build up a stack of cards starting with 2 and ending with King, all of the same suit. Once this is accomplished, the goal is to move this to a foundation, where the player has previously placed the Ace of that suit. Once the player has done this, they will have "finished" that suit, the goal being, of course, to finish all suits, at which time the player would have won. There are different ways of dealing the remainder of the deck:
- Turning three cards at once to the waste, either allowing three passes through the deck or placing no limit on passes through the deck.
- Turning three cards at once, reversing the order of each group of three as the cards are dealt.
- Turning only one card at a time, but only passing through the deck once.
- Turning only one card at a time, but placing no limit on passes through the deck.
- Turning three cards at once to the waste with no limit on passes through the deck, but allowing the player to switch once to a single pass through the deck one card at a time; after that single pass, however, the player cannot go back to turning three cards at a time and can turn over no more cards from the waste.