const positionSkills = {
  libero: ["serving", "passing", "defense", "setting", "serve-recieve", "communication"],
  outside: ["serving", "passing", "defense", "setting", "hitting", "blocking", "communication"],
  rightside: ["serving", "passing", "hitting", "blocking", "communication"],
  middle: ["serving", "hitting", "blocking", "communication"],
  setter: ["serving", "passing", "setting", "communication"]
};
// Declares the position and what they are graded on including the weight




document.addEventListener('DOMContentLoaded', function() {
    const continueButton = document.getElementById('continueButton'); //Stage 1 button
    const inputBox = document.getElementById('inputbox'); // Inoput box for name of player
    const mainDiv = document.querySelector('.mainDiv'); // Stage 1 div
    const continueButton2 = document.getElementById("continueButton2"); // Stage 2 Button
    const positionButtons = document.querySelectorAll(".pickPosition"); //Position buttons
    let userInputValue = ''; // Gets the name of the player for final result page
    let userPosition = ''; // Keeps the user position from the button clicked

    let stage = 1; //Decides what stage of the ranking process we are on
    //Stage 1: name
    //Stage 2: Position
    //Stage3: Attacking, passing, etc criteria
    //Stage 4: results

    continueButton.addEventListener('click', function() {
      if (stage === 1) {
        if (inputBox.value.trim() !== '') {
          // Hide the initial input section
          userInputValue = inputBox.value.trim();
          inputBox.classList.add("leave-right");
          continueButton.classList.add("leave-down");

          // Hide the stage1 elements
          setTimeout(function() {
              inputBox.classList.remove("leave-right");
              continueButton.classList.remove("leave-down");
              mainDiv.style.display = "none"
          }, 800)
          document.getElementsByClassName("button-container")[0].style.opacity = 1;
          continueButton2.style.opacity = 1;
          stage = 2; //Move on to the next stage
        } else {
          inputBox.classList.add("shake", "error");
          setTimeout(function() {
              inputBox.classList.remove("shake", "error")
          }, 800);
        }
      } 
    });

    continueButton2.addEventListener("click", function() {
      if (stage === 2) {
        //See if volleyball position is selected
        let isSelected = false; //Checks to see if a position box is picked
        positionButtons.forEach(button => {
          if (button.classList.contains("selected")) {
            isSelected = true;
          } 
        });
        if (isSelected) {
          console.log("Good to go")
        }else {
          positionButtons.forEach(button => {
            button.classList.add("error")
            setTimeout(function() {
              button.classList.remove("error")
            }, 800)
          })
        }
      }
    })

    function handleButtonClick(event) {
      positionButtons.forEach(button => {
        if (button !== event.target) {
          button.classList.remove("selected");
        }
      });
      event.target.classList.add("selected")
    }

    positionButtons.forEach(button => {
      button.addEventListener("click", handleButtonClick)
    });
  });