
let currentPokemon = null;
let currentIndex = 0;

let score = 0;
let catchStreak = 0;
let isCatching = false;

async function loadNewPokemon() {
    isCatching = false;

    const response = await fetch("/pokemon/random");
    currentPokemon = await response.json();
    currentIndex = 0;

    document.getElementById("sprite").src = currentPokemon.spriteUrl;

    document.getElementById("feedback").textContent =
        "Start typing to catch your Pokémon.";

    document.getElementById("feedback").className = "feedback";

    renderName();
}

function renderName() {
    const nameDisplay = document.getElementById("nameDisplay");
    nameDisplay.innerHTML = "";

    const letters = currentPokemon.name.toLowerCase().split("");

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

function catchPokemon() {
    isCatching = true;
    catchStreak++;

    const basePoints = 10;
    const lengthBonus = currentPokemon.name.length * 2;
    const streakBonus = Math.min((catchStreak - 1) * 5, 25);

    const earnedPoints = basePoints + lengthBonus + streakBonus;

    score += earnedPoints;

    updateScoreDisplay();

    const feedback = document.getElementById("feedback");

    feedback.textContent = `Pokémon caught! +${earnedPoints} points!`;
    feedback.className = "feedback success";

    setTimeout(loadNewPokemon, 1200);
}

function updateScoreDisplay() {
    document.getElementById("score").textContent = score;
    document.getElementById("streak").textContent = catchStreak;
}

document.addEventListener("keydown", (event) => {
    if (!currentPokemon || isCatching) return;

    // Only accept single-character keys.
    if (event.key.length !== 1) return;

    const expectedLetter = currentPokemon.name[currentIndex].toLowerCase();
    const pressedLetter = event.key.toLowerCase();

    if (pressedLetter === expectedLetter) {
        currentIndex++;
        renderName();

        if (currentIndex === currentPokemon.name.length) {
            catchPokemon();
        }
    }
});

loadNewPokemon();
