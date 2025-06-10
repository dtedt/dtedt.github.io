const wordBank = ['JOLT', 'LOOT', 'ZOOM', 'TOOL', 'ROLL', 'BANANA', 'COGNAC', 'CANNON', 'CANON', 'CONGA', 'KABOB', 'BACON', 'BLUFF', 'BALL', 'BUFF', 'TALL', 'SWORD', 'DOOR', 'KEY', 'AXE', 'JUMP', 'MAGIC', 'FIRE', 'FIREBALL', 'SPELL', 'BAG', 'ZAP', 'POW', 'LIMP', 'MINI', 'HURT', 'HOT', 'CAT', 'ACT', 'POT', 'JAM', 'POET', 'POEM', 'PELT', 'POLE', 'TEETH', 'BITE', 'MIST', 'MOTH', 'QUIT', 'FROG', 'HORSE', 'HOVER', 'GRIME', 'GHOST', 'TREAT', 'STRIKE', 'STORM', 'WORM', 'COLT', 'CROW', 'CRY', 'COY', 'XYST', 'CRWTH', 'GRIMOIRE', 'WARRIOR', 'QUIZ', 'WIZ', 'POUND', 'RONDO', 'BURN', 'FOOD', 'ODOR', 'POOF', 'SPURN', 'BOP', 'OOPS', 'OPUS', 'ORBS', 'ROD', 'STAFF', 'SOUP', 'ROB', 'URN', 'COAX', 'CARDIO', 'GRACE', 'RODEO', 'ZODIAC', 'ACID', 'ARC', 'CIDER', 'CORGI', 'DARING', 'DECOY', 'DIRGE', 'DICE', 'RAZE', 'DANCE', 'RAGE', 'YOGA', 'AID', 'DOX', 'FORK', 'GROOVE', 'HOOK', 'AUGURY', 'FAKE', 'HEAVY', 'RHYME', 'VOGUE', 'HUGE', 'OYSTER', 'MAGE']

const enemyBank = ['TROLL', 'GOBLIN', 'GHOUL', 'DRAGONKIN', 'FJORD OGRE', 'AUTOMATON', 'SODIUM WARG' ]

const bossBank = ['WOLFESCHLEGELSTEINHAUSENBERGERDORFF', 'RED BOG MEGADRAGON', 'MISTER MXYZPTLK', 'ZRFFF', 'Y']

/* import from banks.js */

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const vowels = "AEIOU";
let yourLettersDOM = document.getElementById("yourLetters")
const maxLetters = 12;
let enemy;



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

    yourLettersDOM.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        moreLetters();
    }
}
    if (yourLettersDOM.length == maxLetters) {
    
    document.getElementById("getLetters").style.display = "none";
    document.getElementById("indicator1").style.display = "flexbox";  
    document.getElementById("dungeon").style.display = "flexbox";
    console.log("indicator1 element:", document.getElementById("indicator1"));
}



    

function moreLetters() {
    let rLetter = randomLetter();
    let currentLetters = yourLettersDOM.textContent
    
    
    if (currentLetters.length < maxLetters) {
    const letterSpan = document.createElement("span");
    document.getElementById("getLetters").style.display = "flexbox";
    yourLettersDOM.textContent += rLetter;
    document.getElementById("haveLetters").textContent = "You're carrying " + (yourLettersDOM.textContent.length + 1) + " letters.";
    document.getElementById("haveLetters").style.color = "grey";
    letterSpan.textContent = rLetter;
    letterSpan.className = "new-letter";
    yourLettersDOM.appendChild(letterSpan);
    } else {
    document.getElementById("haveLetters").textContent = "You're carrying " + (yourLettersDOM.textContent.length + 1) + " letters.";
    document.getElementById("chill").textContent = "Chill! You've got maximum letters now.";
    document.getElementById("haveLetters").style.color = "red";
    document.getElementById("getLetters").style.display = "none";

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
let enemyNoSpace = enemy.name.replace(/\s/g,"");


document.getElementById("appearance").textContent = "An enemy " + enemy.name + " appears!"
/*document.getElementById("currentEnemy").innerHTML = `${enemy.emoji} ${enemy.name} ${'🟥'.repeat(enemy.hp)}
`;
document.getElementById("nowWhat").textContent = "What will you do?"*/
yourLettersDOM.textContent += enemyNoSpace;

document.getElementById("dungeon").style.display = "none";
document.getElementById("intro").style.display = "none";
document.getElementById("attack").style.display = "flex";
document.getElementById("indicator1").style.display = "flex";
return enemy;
}


function spellableWords() {
document.getElementById("appearance").style.display = "none";
let yourHand = document.getElementById("yourLetters").textContent;
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
           document.getElementById("currentEnemy").innerHTML = `${enemy.emoji} ${enemy.name} ${'🟥'.repeat(enemy.hp)}`;
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

                button.classList.add('action');
                button.textContent = word;
                button.onclick = () => {
                    console.log("button clicked!");
                };


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
        document.getElementById("indicator2").style.display = "flexbox";
        document.getElementById("attack").style.display = "none";


   }
}

function takeAction() {

}