// script.js
const mapRows = 6;
const mapCols = 12;

// Phase 1: Squad Customization
const classes = ["Soldier", "Scout", "Heavy", "Engineer"];
const weapons = ["Rifle", "Sniper", "Machine Gun", "Shotgun"];
const items = ["Medkit", "Binoculars", "Ammo Crate", "Toolkit"];

let playerSquad = [];
let enemySquad = [];
let map = [];

// Generate the squad customization UI
function createSquadCustomizationUI() {
  const squadCustomization = document.getElementById("squadCustomization");
  squadCustomization.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    const unitDiv = document.createElement("div");
    unitDiv.className = "unitCustomization";
    unitDiv.innerHTML = `
      <h3>Unit ${i}</h3>
      <label>Class: <select class="classSelect"></select></label>
      <label>Weapon: <select class="weaponSelect"></select></label>
      <label>Item: <select class="itemSelect"></select></label>
    `;

    const classSelect = unitDiv.querySelector(".classSelect");
    const weaponSelect = unitDiv.querySelector(".weaponSelect");
    const itemSelect = unitDiv.querySelector(".itemSelect");

    // Populate class dropdown
    classes.forEach((cls) => {
      const option = document.createElement("option");
      option.value = cls;
      option.textContent = cls;
      classSelect.appendChild(option);
    });

    // Populate weapon dropdown
    weapons.forEach((weapon) => {
      const option = document.createElement("option");
      option.value = weapon;
      option.textContent = weapon;
      weaponSelect.appendChild(option);
    });

    // Populate item dropdown
    items.forEach((item) => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      itemSelect.appendChild(option);
    });

    squadCustomization.appendChild(unitDiv);
  }
}

// Randomize squad customization
function randomizeSquad() {
  const unitDivs = document.querySelectorAll("#squadCustomization > div");

  unitDivs.forEach((unitDiv) => {
    const classSelect = unitDiv.querySelector(".classSelect");
    const weaponSelect = unitDiv.querySelector(".weaponSelect");
    const itemSelect = unitDiv.querySelector(".itemSelect");

    classSelect.value = classes[Math.floor(Math.random() * classes.length)];
    weaponSelect.value = weapons[Math.floor(Math.random() * weapons.length)];
    itemSelect.value = items[Math.floor(Math.random() * items.length)];
  });
}

// Initialize the UI
createSquadCustomizationUI();

// Handle the "Randomize Squad" button click
document.getElementById("randomizeButton").addEventListener("click", randomizeSquad);

// Handle the "Initiate Battle" button click
document.getElementById("initiateBattle").addEventListener("click", () => {
  const unitDivs = document.querySelectorAll("#squadCustomization > div");

  playerSquad = [];
  unitDivs.forEach((unitDiv) => {
    const classSelect = unitDiv.querySelector(".classSelect");
    const weaponSelect = unitDiv.querySelector(".weaponSelect");
    const itemSelect = unitDiv.querySelector(".itemSelect");

    playerSquad.push({
      Class: classSelect.value,
      Weapon: weaponSelect.value,
      Item: itemSelect.value,
      HP: 100, // Default HP
      Ammo: 30, // Default ammo
      Status: "Active",
      position: null, // Will be set in Phase 2
    });
  });

  // Hide Phase 1 and proceed to Phase 2
  document.getElementById("phase1").style.display = "none";
  startPhase2(playerSquad);
});

// Phase 2: Battle Simulation
function startPhase2(playerSquad) {
  enemySquad = [
    { Class: "Soldier", Weapon: "Rifle", Item: "Medkit", HP: 100, Ammo: 30, Status: "Active", position: null },
    { Class: "Scout", Weapon: "Sniper", Item: "Binoculars", HP: 100, Ammo: 10, Status: "Active", position: null },
    { Class: "Heavy", Weapon: "Machine Gun", Item: "Ammo Crate", HP: 100, Ammo: 100, Status: "Active", position: null },
    { Class: "Engineer", Weapon: "Shotgun", Item: "Toolkit", HP: 100, Ammo: 8, Status: "Active", position: null },
    { Class: "Soldier", Weapon: "Rifle", Item: "Medkit", HP: 100, Ammo: 30, Status: "Active", position: null },
  ];

  // Generate the map
  map = generateMap(mapRows, mapCols);

  // Place squads on the map
  placeSquads(map, playerSquad, enemySquad);

  // Render the map
  renderMap(map, playerSquad, enemySquad);

  // Show Phase 2
  document.getElementById("phase2").style.display = "block";

  // Handle the "Move" button click
  document.getElementById("moveButton").addEventListener("click", () => {
    simulateTurn(playerSquad, enemySquad, map);
  });

  // Handle the "Surrender" button click
  document.getElementById("surrenderButton").addEventListener("click", () => {
    endBattle("Surrender", playerSquad, enemySquad);
  });
}

// Generate the map
function generateMap(rows, cols) {
  const terrainTypes = ["Fields", "Trenches", "Trees", "Structures"];
  const map = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      // 70% chance of Fields, 10% chance for others
      const random = Math.random();
      let terrain;
      if (random < 0.7) {
        terrain = "Fields";
      } else if (random < 0.8) {
        terrain = "Trenches";
      } else if (random < 0.9) {
        terrain = "Trees";
      } else {
        terrain = "Structures";
      }
      row.push(terrain);
    }
    map.push(row);
  }

  // Create clusters for non-Field terrain
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (map[i][j] !== "Fields" && Math.random() < 0.5) {
        spreadTerrain(map, i, j, map[i][j]);
      }
    }
  }

  return map;
}

// Spread terrain to adjacent cells
function spreadTerrain(map, row, col, terrain) {
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1], // Up, Down, Left, Right
  ];

  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;
    if (
      newRow >= 0 &&
      newRow < map.length &&
      newCol >= 0 &&
      newCol < map[0].length &&
      map[newRow][newCol] === "Fields"
    ) {
      map[newRow][newCol] = terrain;
    }
  }
}

// Place squads on the map
function placeSquads(map, playerSquad, enemySquad) {
  const rows = map.length;
  const cols = map[0].length;

  // Place player squad on the left side (column 0)
  for (let i = 0; i < playerSquad.length; i++) {
    playerSquad[i].position = { row: i, col: 0 };
  }

  // Place enemy squad on the right side (column 11)
  for (let i = 0; i < enemySquad.length; i++) {
    enemySquad[i].position = { row: i, col: cols - 1 };
  }
}

// Render the map
function renderMap(map, playerSquad, enemySquad) {
  const table = document.getElementById("map");
  table.innerHTML = ""; // Clear the table

  for (let i = 0; i < map.length; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < map[i].length; j++) {
      const cell = document.createElement("td");
      cell.className = map[i][j]; // Set terrain class for color-coding

      // Check if a player unit is in this cell
      const playerUnit = playerSquad.find(
        (unit) => unit.position.row === i && unit.position.col === j
      );
      if (playerUnit) {
        cell.textContent = playerUnit.Class.substring(0, 2); // First two letters of class
        cell.classList.add("playerUnit"); // Add player unit class
      }

      // Check if an enemy unit is in this cell
      const enemyUnit = enemySquad.find(
        (unit) => unit.position.row === i && unit.position.col === j
      );
      if (enemyUnit) {
        cell.textContent = enemyUnit.Class.substring(0, 2); // First two letters of class
        cell.classList.add("enemyUnit"); // Add enemy unit class
      }

      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

// Check if a cell is occupied by another unit
function isCellOccupied(row, col, playerSquad, enemySquad) {
  const allUnits = [...playerSquad, ...enemySquad];
  return allUnits.some(
    (unit) => unit.position.row === row && unit.position.col === col && unit.Status === "Active"
  );
}

// Simulate a turn (movement or attack)
function simulateTurn(playerSquad, enemySquad, map) {
  const allUnits = [...playerSquad, ...enemySquad].filter((unit) => unit.Status === "Active");
  const attackedUnits = []; // Track units that attacked or were attacked

  // Check for attacks first
  for (const unit of allUnits) {
    const isPlayerUnit = playerSquad.includes(unit);
    const targets = getTargetsInRange(unit, isPlayerUnit ? enemySquad : playerSquad);
    if (targets.length > 0) {
      const target = targets[0]; // Attack the first target in range
      attackUnit(unit, target);
      attackedUnits.push(unit, target);
    }
  }

  // Move units that did not attack
  for (const unit of allUnits) {
    if (!attackedUnits.includes(unit)) {
      moveUnit(unit, playerSquad, enemySquad, map);
    }
  }

  // Remove dead units
  playerSquad = playerSquad.filter((unit) => unit.HP > 0);
  enemySquad = enemySquad.filter((unit) => unit.HP > 0);

  // Re-render the map
  renderMap(map, playerSquad, enemySquad);

  // Display health bars for attacked units
  displayHealthBars(attackedUnits);

  // Check if the battle is over
  const playerAlive = playerSquad.some((unit) => unit.Status === "Active");
  const enemyAlive = enemySquad.some((unit) => unit.Status === "Active");

  if (!playerAlive || !enemyAlive) {
    endBattle(playerAlive ? "Victory" : "Defeat", playerSquad, enemySquad);
  }
}

// Get targets in attack range
function getTargetsInRange(unit, enemySquad) {
  const targets = [];
  for (const enemy of enemySquad) {
    if (enemy.Status === "Active") {
      const distance = Math.abs(unit.position.row - enemy.position.row) + Math.abs(unit.position.col - enemy.position.col);
      if (distance <= getAttackRange(unit.Weapon)) {
        targets.push(enemy);
      }
    }
  }
  return targets;
}

// Get attack range based on weapon
function getAttackRange(weapon) {
  switch (weapon) {
    case "Rifle":
      return 3;
    case "Sniper":
      return 5;
    case "Machine Gun":
      return 2;
    case "Shotgun":
      return 1;
    default:
      return 1;
  }
}

// Attack a target unit
function attackUnit(attacker, target) {
  const damage = calculateDamage(attacker.Weapon);
  target.HP -= damage;
  if (target.HP <= 0) {
    target.Status = "Dead";
  }
}

// Calculate damage based on weapon
function calculateDamage(weapon) {
  switch (weapon) {
    case "Rifle":
      return 20;
    case "Sniper":
      return 30;
    case "Machine Gun":
      return 25;
    case "Shotgun":
      return 15;
    default:
      return 10;
  }
}

// Move a unit to a random adjacent cell
function moveUnit(unit, playerSquad, enemySquad, map) {
  const directions = [
    { row: -1, col: 0 }, // Up
    { row: 1, col: 0 },  // Down
    { row: 0, col: -1 }, // Left
    { row: 0, col: 1 },  // Right
  ];

  // Shuffle directions to randomize movement
  const shuffledDirections = directions.sort(() => Math.random() - 0.5);

  for (const dir of shuffledDirections) {
    const newRow = unit.position.row + dir.row;
    const newCol = unit.position.col + dir.col;

    // Check if the new cell is within bounds and not occupied
    if (
      newRow >= 0 &&
      newRow < map.length &&
      newCol >= 0 &&
      newCol < map[0].length &&
      !isCellOccupied(newRow, newCol, playerSquad, enemySquad)
    ) {
      unit.position = { row: newRow, col: newCol }; // Move to the new cell
      break; // Stop after finding a valid move
    }
  }
}

// Display health bars for attacked units
function displayHealthBars(units) {
  const healthBars = document.getElementById("healthBars");
  healthBars.innerHTML = ""; // Clear previous health bars

  for (const unit of units) {
    const healthBar = document.createElement("div");
    healthBar.className = "healthBar";
    healthBar.innerHTML = `
      <span>${unit.Class.substring(0, 2)}: ${unit.HP} HP</span>
      <div class="healthBarInner" style="width: ${unit.HP}%;"></div>
    `;
    healthBars.appendChild(healthBar);
  }
}

// End the battle
function endBattle(outcome, playerSquad, enemySquad) {
  // Hide Phase 2 and show Phase 3
  document.getElementById("phase2").style.display = "none";
  document.getElementById("phase3").style.display = "block";

  // Generate the battle report
  const battleReport = document.getElementById("battleReport");
  battleReport.innerHTML = `
    <h3>Battle Outcome: ${outcome}</h3>
    <p>Player Squad:</p>
    <ul>
      ${playerSquad
        .map(
          (unit) =>
            `<li>${unit.Class} (${unit.Weapon}, ${unit.Item}) - ${
              unit.Status === "Active" ? `${unit.HP} HP` : "Dead"
            }</li>`
        )
        .join("")}
    </ul>
    <p>Enemy Squad:</p>
    <ul>
      ${enemySquad
        .map(
          (unit) =>
            `<li>${unit.Class} (${unit.Weapon}, ${unit.Item}) - ${
              unit.Status === "Active" ? `${unit.HP} HP` : "Dead"
            }</li>`
        )
        .join("")}
    </ul>
  `;

  // Handle the "Try Again" button click
  document.getElementById("tryAgainButton").addEventListener("click", () => {
    // Reset the game
    document.getElementById("phase3").style.display = "none";
    document.getElementById("phase1").style.display = "block";
    createSquadCustomizationUI(); // Reinitialize squad customization
  });
}

// Helper function to shuffle an array (used in moveUnit)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}