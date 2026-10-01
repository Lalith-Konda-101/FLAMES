const form = document.getElementById("flamesForm");
const name1Input = document.getElementById("name1");
const name2Input = document.getElementById("name2");
const error = document.getElementById("error");
const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const resultDescription = document.getElementById("resultDescription");
const resultIcon = document.getElementById("resultIcon");
const flamesDisplay = document.getElementById("flamesDisplay");
const resetButton = document.getElementById("reset");

const meanings = {
  F: {
    title: "Friends",
    icon: "🤝",
    description: "Apparently, friendship is what the ancient algorithm has decided."
  },
  L: {
    title: "Lovers",
    icon: "💞",
    description: "The FLAMES algorithm has chosen romance. Whether reality agrees is another matter."
  },
  A: {
    title: "Affection",
    icon: "💗",
    description: "There seems to be some affection in the algorithm's completely unscientific calculations."
  },
  M: {
    title: "Marriage",
    icon: "💍",
    description: "The algorithm has apparently skipped several reasonable steps and gone straight to marriage."
  },
  E: {
    title: "Enemies",
    icon: "⚔️",
    description: "The algorithm predicts rivalry. Please remember that this is a game, not a legal ruling."
  },
  S: {
    title: "Siblings",
    icon: "👫",
    description: "The algorithm has decided you have sibling energy. Humanity survives another calculation."
  }
};

function cleanName(name) {
  return name.toLowerCase().replace(/[^a-z]/g, "");
}

function getRemainingCount(first, second) {
  const a = cleanName(first).split("");
  const b = cleanName(second).split("");

  for (let i = 0; i < a.length; i++) {
    const index = b.indexOf(a[i]);

    if (index !== -1) {
      a[i] = null;
      b[index] = null;
    }
  }

  return a.filter(Boolean).length + b.filter(Boolean).length;
}

function calculateFlames(count) {
  let letters = ["F", "L", "A", "M", "E", "S"];
  let index = 0;

  while (letters.length > 1) {
    index = (index + count - 1) % letters.length;
    letters.splice(index, 1);
  }

  return letters[0];
}

function renderLetters(winner) {
  flamesDisplay.innerHTML = "";

  ["F", "L", "A", "M", "E", "S"].forEach(letter => {
    const element = document.createElement("div");
    element.className = "letter" + (letter === winner ? " active" : "");
    element.textContent = letter;
    element.title = meanings[letter].title;
    flamesDisplay.appendChild(element);
  });
}

form.addEventListener("submit", event => {
  event.preventDefault();
  error.textContent = "";

  const first = name1Input.value.trim();
  const second = name2Input.value.trim();

  if (!first || !second) {
    error.textContent = "Enter both names first. Even FLAMES needs something to work with.";
    return;
  }

  const cleanFirst = cleanName(first);
  const cleanSecond = cleanName(second);

  if (!cleanFirst || !cleanSecond) {
    error.textContent = "Please use names containing at least one letter.";
    return;
  }

  const count = getRemainingCount(first, second);
  const winner = calculateFlames(count);
  const info = meanings[winner];

  resultIcon.textContent = info.icon;
  resultTitle.textContent = info.title;
  resultDescription.textContent = `${info.description} Remaining letters: ${count}.`;
  renderLetters(winner);

  result.classList.remove("hidden");
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

resetButton.addEventListener("click", () => {
  form.reset();
  error.textContent = "";
  result.classList.add("hidden");
  name1Input.focus();
});
