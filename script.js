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
    const inputBox = document.getElementById('nameBox'); // Inoput box for name of player
    const mainDiv = document.querySelector('.mainDiv'); // Stage 1 div
    const continueButton2 = document.getElementById("continueButton2"); // Stage 2 Button
    const positionButtons = document.querySelectorAll(".pickPosition"); //Position buttons
    const continueButton3 = document.getElementById("continueButton3");
    const skillGrid = document.querySelectorAll(".skillsInput");
    const step3Container = document.getElementById("step3-container");
    const skillChart = document.getElementById("skillChart").getContext("2d");
    const step4Container = document.getElementById("step4-container");
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
              mainDiv.style.display = "none" // Hide the main div.
              staggerButtons(positionButtons, 200); //Make the positons animate
          }, 800)
          document.getElementsByClassName("button-container")[0].style.opacity = 1;
          document.addEventListener('DOMContentLoaded', staggerButtons);
          stage = 2; //Move on to the next stage
        } else {
          inputBox.classList.add("shake", "error");
          setTimeout(function() {
              inputBox.classList.remove("shake", "error")
          }, 800);
        }
      } 
    });

    // Function for the position button animation (fades in one at a time)
    function staggerButtons(elementToLoop, timeDelay) {
      elementToLoop.forEach((button, index) => {
        setTimeout(() => {
          button.style.cssText = "opacity: 1; transform: translateY(0);";
        }, index * timeDelay); // Change the delay time (in milliseconds) as needed
      });
        document.getElementById("posP").style.opacity = 1;
        continueButton2.style.cssText = "opacity: 1; transform: translateY(0);";
    }

    function staggerButtonsReverse(elementToLoop, timeDelay) {
      elementToLoop.forEach((button, index) => {
        setTimeout(() => {
          button.style.cssText = "opacity: 0; transform: translateY(-20);";
        }, index * timeDelay); // Change the delay time (in milliseconds) as needed
      });
    }

    continueButton2.addEventListener("click", function() {
      if (stage === 2) {
        //See if volleyball position is selected
        let isSelected = false; //Checks to see if a position box is picked
        positionButtons.forEach(button => {
          if (button.classList.contains("selected")) {
            isSelected = true;
          } 
        });
        if (isSelected) { // Runs the code within the statement IF the user has clicked a button.
          stage = 3;
          continueButton2.style.cssText = "opacity: 0; transform: translateY(-20);";
          // Hide step 2 and show step 3
          document.getElementsByClassName("button-container")[0].style.display = "none"; // Removes the main div from viewing
          document.getElementById("parent-container").style.display = "flex";
          continueButton2.style.display = "none";
          continueButton2.style.opacity = 0;
          continueButton3.style.cssText = 'display: flex; opacity: 1;';
          staggerButtons(skillGrid, 200);
          staggerButtons(document.querySelectorAll(".skillLabel"), 250);
          // Get the skill array:
          const skillArray = positionSkills[userPosition];
          
          //Cross out the skills not associated with the position
          step3Container.querySelectorAll(".skill").forEach(skill => {
            const currentSkill = skill.id;
            const currentLabel = skill.querySelector(".skillLabel");
            const currentInput = skill.querySelector(".skillsInput");
            if (!skillArray.includes(currentSkill)) {
              currentInput.disabled = "true";
              currentLabel.classList.add("crossOut");
            }
          });
          continueButton3.style.cssText = "opacity: 1; transform: translateY(0);";
        }else {
          // Show that the user MUST select a position
          positionButtons.forEach(button => {
            button.classList.add("error")
            setTimeout(function() {
              button.classList.remove("error")
            }, 800)
          })
        }
      }
    })

    continueButton3.addEventListener("click", function() {
      if(checkNumbers() && stage === 3) {
        userData = [];
        step3Container.querySelectorAll(".skill").forEach(skill => {
          currentInput = skill.querySelector(".skillsInput")
          if (!currentInput.disabled) {
            userData.push(currentInput.value);
          }
        });
        stage = 4; // Change to results stage
        staggerButtonsReverse(skillGrid, 200);
        staggerButtonsReverse(document.querySelectorAll(".skillLabel"), 250);
        continueButton3.style.cssText = "opacity: 0; transform: translateY(-20);";
        setTimeout(function() {
          continueButton3.style.cssText = "opacity: 0; display: none;";
          document.getElementById("parent-container").style.display = "none";
        }, 2000);



        const sum = userData.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue, 10), 0);
        const totalPoints = (positionSkills[userPosition].length) * 10 // Take the number of skills * 10(max points)
        const percentage = Math.round((sum/totalPoints)*100) // Round to nearest whole number for ranking
        //console.log(percentage + " therefore rank: "+ getRank(percentage));
        document.getElementById("scoreText").textContent += sum+"/"+totalPoints
        var config = {
          type: 'radar',
          data: {
            labels: positionSkills[userPosition],
            datasets: [{
              label: "Skill Results",
              backgroundColor: "rgba(69, 162, 158, 0.6)",
              borderColor: "white",
              pointBackgroundColor: "white",
              pointRadius: 5.3,
              data: userData,
            }]
          },
          options: {
            legend: {
              position: 'top',
              labels: {
                fontColor: 'white'
              }
            },
            scale: {
              ticks: {
                beginAtZero: true,
                fontColor: 'white', // labels such as 10, 20, etc
                showLabelBackdrop: false, // hide square behind text
                suggestedMax: 10,
                callback: function(value) {
                  // Show only '10' 5 and 1, hide other values
                  return value === 10 || value === 5 || value === 1? value : '';
              }
              },
              pointLabels: {
                fontColor: '#c5c6c7',
                fontSize: 18,
              },
              gridLines: {
                color: 'grey'
              },
              angleLines: {
                color: 'white' // lines radiating from the center
              }
            },
          }
        };
        const drawChart = new Chart(skillChart, config);
        step4Container.style.display = "block";
        setTimeout(function() {
          document.getElementById("chartContainer").style.left = "85%"
          document.getElementById("actualSpecial").style.cssText = "opacity: 1; left: 0%;";
          document.getElementById("memeSpecial").style.cssText = "opacity: 1; left: 0%;";
        }, 2000);
        const userRank = getRank(percentage);
        setTimeout(function() {
          document.getElementById("scoreText").style.opacity = 1;
        }, 3000);
        setTimeout(function() {
          document.getElementById("rankText").textContent = userRank;
          document.getElementById("rankText").style.opacity = 1;
          document.getElementById("rankText").classList.add(userRank.toLowerCase()+"-grade");
          document.getElementById("scoreText").classList.add(userRank.toLowerCase()+"-grade");
        }, 5000);
        setTimeout(function() {
            document.getElementById("scoreText").classList.remove(userRank.toLowerCase()+"-grade");
            document.getElementById("continueButton4").style.cssText = "transform: translateY(0); opacity: 1;";
          }, 8000);
      } 
})

    document.getElementById("continueButton4").addEventListener("click", function() {
      window.location.reload();
    });

    function handleButtonClick(event) {
      positionButtons.forEach(button => {
        if (button !== event.target) {
          button.classList.remove("selected");
        }
      });
      event.target.classList.add("selected")
      userPosition = event.target.dataset.value;
    }

    function getRank(percentage) {
      const rankMapping = {
        S: { min: 95, max: 100 },
        A: { min: 85, max: 94 },
        B: { min: 75, max: 84 },
        C: { min: 65, max: 74 },
        D: { min: 50, max: 64 },
        F: { min: 0, max: 49 },
      };
    
      for (const [rank, range] of Object.entries(rankMapping)) {
        if (percentage >= range.min && percentage <= range.max) {
          return rank;
        }
      }
      return 'Undefined'; // Return 'Undefined' if the percentage doesn't fit into any range
    }

    function checkNumbers() {
      let isValid = true;
      step3Container.querySelectorAll(".skill").forEach(skill => {
        const currentInput = skill.querySelector(".skillsInput");
        if (!currentInput.disabled) { // If the current skill is not disabled ( You cant put numbers in a disabled box)
          if(currentInput.value.trim() === '') {
            skill.querySelector(".skillLabel").classList.add("shake");
            currentInput.classList.add("error", "shake");
            setTimeout(function() {
              skill.querySelector(".skillLabel").classList.remove("shake");
              currentInput.classList.remove("error", "shake");
            }, 800)
            isValid = false;
          }
          else if (!(currentInput.value >= 0 && currentInput.value <= 10)) { //Is the number between 0-5?
            skill.querySelector(".skillLabel").classList.add("shake");
            currentInput.classList.add("error", "shake");
            setTimeout(function() {
              skill.querySelector(".skillLabel").classList.remove("shake");
              currentInput.classList.remove("error", "shake");
            }, 800)
            isValid = false;
          }
        }
      });
      return isValid;
    }

    positionButtons.forEach(button => {
      button.addEventListener("click", handleButtonClick)
    });
  });