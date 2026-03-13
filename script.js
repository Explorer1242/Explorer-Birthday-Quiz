const correctAnswers = {
    q1: "Adebowale",
    q2: "Precious",
    q3: "Quadri",
    q4: "Zinoleesky",
    q5: "18" // What year did I turn today
};

const form = document.getElementById("quizForm");
const resultDiv = document.getElementById("result");

// OWNER SAFE FLAG
const isOwner = true; // <-- set to true while testing, false for real users

// Check if user already took quiz (only affects non-owner)
if(!isOwner && localStorage.getItem("quizTaken")){
    form.querySelectorAll("input, button").forEach(el => el.disabled = true);
    resultDiv.style.display = "block";
    resultDiv.innerHTML = "You have already taken the quiz! 🎉";
}

form.addEventListener("submit", function(e){
    e.preventDefault();

    let score = 0;
    const formData = new FormData(form);

    for (let [key, value] of formData.entries()) {
        // Case-insensitive comparison
        if(value.trim().toLowerCase() === correctAnswers[key].toLowerCase()){
            score++;
        }
    }

    // Show the score
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `You scored ${score} out of ${Object.keys(correctAnswers).length}! 🎉`;

    // Disable inputs & button for non-owner users only
    if(!isOwner){
        form.querySelectorAll("input, button").forEach(el => el.disabled = true);
        localStorage.setItem("quizTaken", "true"); // lock them
    }
});
