export const wordBank = [
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

export const enemyBank = [
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