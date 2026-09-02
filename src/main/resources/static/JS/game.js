let currentPokemon = null;
let currentIndex = 0;

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

    const letters = currentPokemon.name.split(""); // "eevee" -> ["e","e","v","e","e"]

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
            setTimeout(loadNewPokemon, 800); // lille pause så man kan se "fangsten"
        }
    }
});

loadNewPokemon();