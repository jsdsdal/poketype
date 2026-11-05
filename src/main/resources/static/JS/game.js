let currentPokemon = null;
let currentIndex = 0;
let currentScreen = "menu"; // "menu" | "playing"
let score = 0;
let catchStreak = 0;

function awardCatch(pokemonName) {
    catchStreak++;

    const basePoints = 10;
    const lengthBonus = pokemonName.length * 2;
    const streakBonus = Math.min((catchStreak - 1) * 5, 25);

    const earned = basePoints + lengthBonus + streakBonus;

    score += earned;

    updateScoreDisplay();

    return earned;
}

function resetStreak() {
    catchStreak = 0;
    updateScoreDisplay();
}

function updateScoreDisplay() {
    document.querySelector("#score").textContent = score;
    document.querySelector("#streak").textContent = catchStreak;
}

function showScreen(screen) {
    currentScreen = screen;
    document.getElementById("menuScreen").style.display = screen === "menu" ? "block" : "none";
    document.getElementById("gameScreen").style.display = screen === "playing" ? "block" : "none";
}

async function loadNewPokemon() {
    const response = await fetch("/pokemon/random");
    currentPokemon = await response.json();
    currentIndex = 0;

    document.getElementById("sprite").src = currentPokemon.spriteUrl;
    renderName();
}

function renderName() {
    const nameDisplay = document.getElementById("nameDisplay");
    nameDisplay.innerHTML = ""; // ryd op før vi tegner igen

    const letters = currentPokemon.name.split("");

    letters.forEach((letter, index) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";

        if (index < currentIndex) {
            span.classList.add("correct");
        } else if (index === currentIndex) {
            span.classList.add("current");
        }

        nameDisplay.appendChild(span);
    });
}

document.addEventListener("keydown", (event) => {
    if (!currentPokemon) return;

    const expectedLetter = currentPokemon.name[currentIndex];
    const pressedLetter = event.key.toLowerCase();

    if (pressedLetter === expectedLetter) {
        currentIndex++;
        renderName();

        if (currentIndex === currentPokemon.name.length) {
            setTimeout(loadNewPokemon, 800);
        }
    }
});

loadNewPokemon();