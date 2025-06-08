/*const wordBank = ['JOLT', 'LOOT', 'ZOOM', 'TOOL', 'ROLL', 'BANANA', 'COGNAC', 'CANNON', 'CANON', 'CONGA', 'KABOB', 'BACON', 'BLUFF', 'BALL', 'BUFF', 'TALL', 'SWORD', 'DOOR', 'KEY', 'AXE', 'JUMP', 'MAGIC', 'FIRE', 'FIREBALL', 'SPELL', 'BAG', 'ZAP', 'POW', 'LIMP', 'MINI', 'HURT', 'HOT', 'CAT', 'ACT', 'POT', 'JAM', 'POET', 'POEM', 'PELT', 'POLE', 'TEETH', 'BITE', 'MIST', 'MOTH', 'QUIT', 'FROG', 'HORSE', 'HOVER', 'GRIME', 'GHOST', 'TREAT', 'STRIKE', 'STORM', 'WORM', 'COLT', 'CROW', 'CRY', 'COY', 'XYST', 'CRWTH', 'GRIMOIRE', 'WARRIOR', 'QUIZ', 'WIZ', 'POUND', 'RONDO', 'BURN', 'FOOD', 'ODOR', 'POOF', 'SPURN', 'BOP', 'OOPS', 'OPUS', 'ORBS', 'ROD', 'STAFF', 'SOUP', 'ROB', 'URN', 'COAX', 'CARDIO', 'GRACE', 'RODEO', 'ZODIAC', 'ACID', 'ARC', 'CIDER', 'CORGI', 'DARING', 'DECOY', 'DIRGE', 'DICE', 'RAZE', 'DANCE', 'RAGE', 'YOGA', 'AID', 'DOX', 'FORK', 'GROOVE', 'HOOK', 'AUGURY', 'FAKE', 'HEAVY', 'RHYME', 'VOGUE', 'HUGE', 'OYSTER', 'MAGE']
*/
const wordBank = [
    {
        name: "JOLT",
        description: "",
        dmg: 0,


    },
    {
        name: "LOOT",
        description: "Your eyes dart around the room in search of items or weapons. With a keen eye and a quick hand, you deftly collect several items or questionable value and add them to your inventory.",
        dmg: 0,


    },
    {
        name: "ZOOM",
        description: "You immediately begin running laps around the $enemy. The $enemy is briefly confused and becomes somewhat dizzy as it cranes it's neck to follow your movements. You get tired after a while and stop to catch your breath.",
        dmg: 0,


    },
    {
        name: "TOOL",
        description: "You grab a nearby $tool and fling it gracelessly at the $enemy. You never were a handy man.",
        dmg: 2,


    },
    {
        name: "ROLL",
        description: "You keenly anticipate the $enemy's attack and prepare to roll to safety. Years of playing Fromsoft games have prepared you for this moment.",
        dmg: 0,


    },
    {
        name: "BANANA",
        description: "You reach into your pocket and produce a banana your forgot you had. You peel the banana and devour it in a mad frenzy, regaining 2 HP. You discard the banana peel carelessly.",
        dmg: 0,


    },
    {
        name: "COGNAC",
        description: "You see a dusty bottle on the stone shelf to your left and drink deeply of the sticky ancient brew, gaining you 1HP and a nice afternoon buzz",
        dmg: 0,


    },
    {
        name: "CANNON",
        description: "You take a step back and bump up against a low railing, only you turn around and realize it is not a railing-- it's a cannon! Abandoning all common sense, you pull the mouth of the cannon around to face the $enemy and light the fuse. Sure enough, an enormous blast buffets the $enemy!",
        dmg: 8,


    },
    {
        name: "CANON",
        description: "You produce a thick volume and read aloud from In Search Of Lost Time by Marcel Proust, but only after a brief preface discussing the relative merits of it's former English title Remembrance Of Things Past, which is less accurate to the exact translation, but is more evocative of the novel's subject matter. The $enemy finds the novel dull and questions it's position of importance in light of the legacy of colonialism it obscures through it's romanticization of aristocratic introspection. Your attempt to connect with the $enemy has failed spectacularly, and violence is imminent.",
        dmg: 0,


    }

]

/*const enemyBank = ['TROLL', 'GOBLIN', 'GHOUL', 'DRAGONKIN', 'FJORD OGRE', 'AUTOMATON', 'SODIUM WARG' ]*/

const enemyBank = [
    {
        name: "TROLL",
        emoji: "🧌",
        hp: 6,
        weaknesses: ["FIRE", "LIGHT"],  // Takes extra damage from these words
        resistance: ["ROCK", "EARTH"]   // Reduced damage from these
    },
    {
        name: "GOBLIN",
        emoji: "👺",
        hp: 4,
        weaknesses: ["SWORD", "LIGHT"],
        resistance: ["POISON", "DARK"]
    },
    {
        name: "FJORD OGRE",
        emoji: "👹❄️",
        hp: 9,
        weaknesses: ["FIRE", "SUN"],
        resistance: ["ICE", "WATER"]
    },
    {
        name: "DRAGONKIN",
        emoji: "🐲",
        hp: 8,
        weaknesses: ["ICE", "ZAP"],
        resistance: ["FIRE", "FIREBALL", "BURN"],
    },
    {
        name: "GHOUL",
        emoji: "👻",
        hp: 3,
        weaknesses: ["MAGIC", "LIGHT"],
        resistance: [],
        immunity: ["SWORD", "BITE", "TEETH", "AXE", "BASH"],
    },
    {
        name: "AUTOMATON",
        emoji: "🤖",
        hp: 10,
        weaknesses: ["WATER", "SPLASH"],
        resistance: ["FIRE", "FIREBALL", "HEAT"],
        immunity: ["ZAP", "LIGHT"],
    },
    {
        name: "SODIUM WARG",
        emoji: "🐺🧂",
        hp: 7,
        weaknesses: ["LIGHT", "FIRE", "FIREBALL"],
        resistances: ["WATER", "SPLASH", "ICE"],
        immunity: [],
    }]
/*const bossBank = ['WOLFESCHLEGELSTEINHAUSENBERGERDORFF', 'RED BOG MEGADRAGON', 'MISTER MXYZPTLK', 'ZRFFF', 'Y']*/
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
    enemy = enemyBank[Math.floor(Math.random() * enemyBank.length)]
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