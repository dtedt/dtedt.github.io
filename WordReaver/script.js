const wordBank = ['SWORD', 'DOOR', 'KEY', 'AXE', 'JUMP', 'MAGIC', 'FIRE', 'FIREBALL', 'SPELL', 'BAG', 'ZAP', 'POW', 'LIMP', 'MINI', 'HURT', 'HOT', 'CAT', 'ACT', 'POT', 'JAM', 'POET', 'POEM', 'PELT', 'POLE', 'TEETH', 'BITE', 'MIST', 'MOTH', 'QUIT', 'FROG', 'HORSE', 'HOVER', 'GRIME', 'GHOST', 'TREAT', 'STRIKE', 'STORM', 'WORM', 'COLT', 'CROW', 'CRY', 'COY', 'XYST', 'CRWTH', 'GRIMOIRE', 'WARRIOR', 'QUIZ', 'WIZ', 'POUND', 'RONDO', 'BURN', 'FOOD', 'ODOR', 'POOF', 'SPURN', 'BOP', 'OOPS', 'OPUS', 'ORBS', 'ROD', 'STAFF', 'SOUP', 'ROB', 'URN', 'COAX', 'CARDIO', 'GRACE', 'RODEO', 'ZODIAC', 'ACID', 'ARC', 'CIDER', 'CORGI', 'DARING', 'DECOY', 'DIRGE', 'DICE', 'RAZE', 'DANCE', 'RAGE', 'YOGA', 'AID', 'DOX', 'FORK', 'GROOVE', 'HOOK', 'AUGURY', 'FAKE', 'HEAVY', 'RHYME', 'VOGUE', 'HUGE', 'OYSTER', 'MAGE']
const enemyBank = ['TROLL', 'GOBLIN', 'GHOUL', 'DRAGONKIN', 'FJORD OGRE', 'AUTOMATON', 'SODIUM WARG' ]
const bossBank = ['WOLFESCHLEGELSTEINHAUSENBERGERDORFF', 'RED BOG MEGADRAGON', 'MISTER MXYZPTLK', 'ZRFFF', 'Y']
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const vowels = "AEIOU";
let yourLettersDOM = document.getElementById("yourLetters")
maxLetters = 12;


    for (let i = 0; i < 12; i++) {
        moreLetters();
    }
    if (yourLettersDOM.length == maxLetters) {
    document.getElementById("getMore").style.display = "none";
}

/* let dSix = (Math.floor(Math.random()*6)+1); let d24 = (Math.floor(Math.random()*24)+1); */

function randomLetter() {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}    

/*function randomVowel() {
    return vowels[Math.floor(Math.random() * vowels.length)]
}*/

function startGame() {
    document.getElementById("start").style.display = "none";
    
    document.getElementById("border").style.display = "flex";

        if (yourLettersDOM.length == maxLetters) {
    document.getElementById("getMore").style.display = "none";
}


    }

function moreLetters() {
    let rLetter = randomLetter();
    let currentLetters = yourLettersDOM.textContent
    const maxLetters = 12;
    
    if (currentLetters.length + 1 <= maxLetters) {
    const letterSpan = document.createElement("span");
    /*yourLettersDOM.textContent += rLetter;*/
    document.getElementById("haveLetters").textContent = "You're carrying " + (yourLettersDOM.textContent.length + 1) + " letters.";
    document.getElementById("haveLetters").style.color = "grey";
    letterSpan.textContent = rLetter;
    letterSpan.className = "new-letter";
    yourLettersDOM.appendChild(letterSpan);
    } else {
    document.getElementById("haveLetters").textContent = "Chill! You've got maximum letters now.";
    document.getElementById("haveLetters").style.color = "red";
    document.getElementById("getMore").style.display = "none";
    document.getElementById("dungeon").style.display = "flex";
    yourLettersDOM.textContent = currentLetters.substring(0, maxLetters);
    }
}


/*function availableLetters() {

}

function availableWords() {

}*/

function enemyAppears() {
let currentLetters = yourLettersDOM.textContent
let enemy = enemyBank[Math.floor(Math.random() * enemyBank.length)]
let enemyNoSpace = enemy.replace(/\s/g,"");


document.getElementById("appearance").textContent = "An enemy " + enemy + " appears!"
document.getElementById("currentEnemy").textContent = enemy;
document.getElementById("nowWhat").textContent = "What will you do?"
yourLettersDOM.textContent += enemyNoSpace;

document.getElementById("dungeon").style.display = "none";
document.getElementById("attack").style.display = "block";
}



function spellableWords() {
let yourHand = yourLettersDOM.textContent;
const createLetterMap = yourHand => {
    const map = {};
    for (const char of yourHand.toUpperCase()) {
        map[char] = (map[char] || 0) + 1;
    }
    return map;
};
const lettersMap = createLetterMap(yourHand);
const result = [];
for (const word of wordBank) {
    const wordMap = createLetterMap(word)
    let canSpell = true;

    for (const char in wordMap) {
        if ((lettersMap[char] || 0) <wordMap[char]) {canSpell = false;
            break;
        }
    }

    if (canSpell) {
        result.push(word);
    }

}
   /* document.getElementById("yourOptions").textContent = result; */
   const optionsDOM = document.getElementById('yourOptions')
   if (optionsDOM) {
    optionsDOM.innerHTML = '';

        if(result.length > 0) {
            const flexContainer = document.createElement('div');
            flexContainer.style.display = "flex";
            flexContainer.style.flexWrap = "wrap";
            flexContainer.style.gap = "10px";
            flexContainer.style.padding = "10px";

            result.forEach(word => {
                const button = document.createElement('button');

                button.textContent = word;
                button.style.padding = '8px 16px';
                button.style.cursor = 'pointer';
                button.style.border = "2px solid #6b4bcc";
                button.style.color = "white";
                button.style.flexShrink = "0";

                button.addEventListener('mouseenter', () => {
                    button.style.backgroundColor = "#6b4bcc";
                });
                button.addEventListener('mouseleave', () => {
                    button.style.backgroundColor = "#3a246d"
                })

                flexContainer.appendChild(button);
            });
            optionsDOM.appendChild(flexContainer);
        } else {
            optionsDOM.textContent = 'No actions available!'
        }
        
   }
}
