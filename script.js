const correctAnswers = {
    q1: "Adebowale",
    q2: "Precious",
    q3: "Quadri",
    q4: "Zinoleesky",
    q5: "18"
};

const form = document.getElementById("quizForm");
const winnerPopup = document.getElementById("winnerPopup");
const loserPopup = document.getElementById("loserPopup");
const alreadyTakenDiv = document.getElementById("alreadyTaken");

// OWNER SAFE FLAG
const isOwner = false; // true = you can test freely, false = normal users

// Check if user already took quiz (only affects non-owner)
if(!isOwner && localStorage.getItem("quizTaken")){
    form.querySelectorAll("input, button").forEach(el => el.disabled = true);
    alreadyTakenDiv.style.display = "block";
}

form.addEventListener("submit", function(e){
    e.preventDefault();

    let score = 0;
    const formData = new FormData(form);

    for (let [key, value] of formData.entries()) {
        if(value.trim().toLowerCase() === correctAnswers[key].toLowerCase()){
            score++;
        }
    }

    // Show popup
    if(score === Object.keys(correctAnswers).length){
        winnerPopup.style.display = "flex";
    } else {
        loserPopup.style.display = "flex";
    }

    // Disable inputs & button for non-owner
    if(!isOwner){
        form.querySelectorAll("input, button").forEach(el => el.disabled = true);
        localStorage.setItem("quizTaken", "true"); // lock them
        alreadyTakenDiv.style.display = "block";   // show green box
    }
});

function closePopup(){
    winnerPopup.style.display = "none";
    loserPopup.style.display = "none";
}
