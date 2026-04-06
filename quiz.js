const allQuizzes = {
    movies: [
        { emoji: "🦁👑", answer: "The Lion King" },
        { emoji: "🧙‍♂️🪄⚡", answer: "Harry Potter" },
        { emoji: "🍫🏭", answer: "Charlie and the Chocolate Factory" },
        { emoji: "🦖🦕", answer: "Jurassic Park" },
        { emoji: "👸❄️⛄", answer: "Frozen" },
        { emoji: "🚢🧊", answer: "Titanic" },
        { emoji: "🕷️🕸️", answer: "Spider-Man" },
        { emoji: "🌌🛸", answer: "Star Wars" },
        { emoji: "🦸🛡️", answer: "Captain America" },
        { emoji: "🏹👧🔥", answer: "The Hunger Games" },
        { emoji: "🐰🦊🏙️", answer: "Zootopia" },
        { emoji: "🦸🛡️", answer: "Captain America" },
        { emoji: "🐺📈📉💰", answer: "The Wolf of Wall Street" },
        { emoji: "🐟🐠🔎", answer: "Finding Nemo" },
        { emoji: "👦👴🎈🏠", answer: "Up" },
        { emoji: "🐀🧑‍🍳", answer: "Ratatouille" },
        { emoji: "👦🎄🏠", answer: "Home Alone" },
        { emoji: "🕶️💊💻", answer: "The Matrix" },
        { emoji: "🦈🛥️", answer: "Jaws" },
        { emoji: "🧸🤠🚀", answer: "Toy Story" }
    ],
    animals: [
        { emoji: "🌊🐎", answer: "Seahorse" },
        { emoji: "🧈🪰", answer: "Butterfly" },
        { emoji: "🌙🔑", answer: "Monkey" },
        { emoji: "🌍🪱", answer: "Earthworm" },
        { emoji: "😺🐠", answer: "Catfish" },
        { emoji: "🌊🦁", answer: "Sea Lion" },
        { emoji: "👔⚙️", answer: "Tiger" },
        { emoji: "⭐🐟", answer: "Starfish" },
        { emoji: "🐝👂", answer: "Bear" },
        { emoji: "🐂🐶", answer: "Bulldog" },
        { emoji: "🌧️🙅‍♀️", answer: "Rhino" },
        { emoji: "👩‍🦰🐞", answer: "Ladybug" },
        { emoji: "🐜😋👂", answer: "Anteater" }
    ],
    food: [
        { emoji: "🧅💍", answer: "Onion Ring" },
        { emoji: "🥵🐶", answer: "Hot Dog" },
        { emoji: "🍳🎂", answer: "Pancake" },
        { emoji: "🌮🔔", answer: "Taco Bell" },
        { emoji: "🎲🍕", answer: "Domino's Pizza" },
        { emoji: "🫧☕", answer: "Bubble Tea" },
        { emoji: "🍎🥧", answer: "Apple Pie" },
        { emoji: "🧊🥤", answer: "Iced Tea" },
        { emoji: "🌽🍞", answer: "Corn Bread" },
        { emoji: "🍓🍰", answer: "Strawberry Shortcake" },
        { emoji: "🍔🤴", answer: "Burger King" }
    ],
    word: [
        { emoji: "☀️🌺", answer: "Sunflower" },
        { emoji: "⌚👨‍🦲", answer: "Watchman" },
        { emoji: "💖✉️", answer: "Love Letter" },
        { emoji: "🍎📺", answer: "Apple TV" },
        { emoji: "☀️🕶️", answer: "Sunglasses" },
        { emoji: "🦷🪥", answer: "Toothbrush" },
        { emoji: "🌞🧢", answer: "Sunhat" },
        { emoji: "🐄👦", answer: "Cowboy" },
        { emoji: "🌍🍵", answer: "World Cup" },
        { emoji: "🚪🔔", answer: "Door Bell" },
        { emoji: "👂💍", answer: "Earring" },
        { emoji: "🦶🏉", answer: "Football" },
        { emoji: "🤚👜", answer: "Handbag" },
        { emoji: "🍬🦷", answer: "Sweet Tooth" },
        { emoji: "🌧️🏹", answer: "Rainbow" },
        { emoji: "🧑‍🦰📘", answer: "Facebook" },
        { emoji: "👵👴", answer: "Grandparents" },
        { emoji: "✖️📦", answer: "Xbox" },
    ]
};

let current = 0;
let score = 0;
let quiz = [];
let timeLeft = 20;
let timerInterval;

function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function startCategory(category) {
    quiz = shuffleArray([...allQuizzes[category]]);
    current = 0;
    score = 0;

    document.getElementById("categorySelect").style.display = "none";
    document.getElementById("quizContent").style.display = "block";

    showQuestion();
}

function showQuestion() {
    const restartBtn = document.getElementById("restartBtn");
    restartBtn.style.display = "none";
    startTimer();

    if (current >= quiz.length) {
        document.getElementById("emoji").textContent = "🎉 Game Over! 🎉";
        document.getElementById("choices").innerHTML = "";
        document.getElementById("message").textContent = `Final Score: ${score}/${quiz.length}`;
        restartBtn.style.display = "inline-block";
        return;
    }

    const question = quiz[current];
    document.getElementById("emoji").textContent = question.emoji;
    document.getElementById("message").textContent = "";

    let options = [question.answer];
    while (options.length < 4) {
        const randomChoice = quiz[Math.floor(Math.random() * quiz.length)].answer;
        if (!options.includes(randomChoice)) options.push(randomChoice);
    }
    options = shuffleArray(options);

    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
    options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option);
        choicesDiv.appendChild(btn);
    });

    document.getElementById("score").textContent = `Score: ${score}`;
}

function checkAnswer(selected) {
    clearInterval(timerInterval);
    const correctAnswer = quiz[current].answer;
    if (selected === correctAnswer) {
        score++;
        document.getElementById("message").textContent = "✅ Correct!";
        startConfetti();
    } else {
        document.getElementById("message").textContent = `❌ Wrong! Correct: ${correctAnswer}`;
    }
    current++;
    setTimeout(showQuestion, 1200);
}

function restartGame() {
    document.getElementById("categorySelect").style.display = "block";
    document.getElementById("quizContent").style.display = "none";
}

function exitGame() {
    if (confirm("Exit the quiz?")) {
        location.reload();
    }
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 20;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById("message").textContent = "⏰ Time's up!";
            current++;
            setTimeout(showQuestion, 1000);
        }
    }, 1000);
}