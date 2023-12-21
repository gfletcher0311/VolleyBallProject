document.addEventListener('DOMContentLoaded', function() {
    const continueButton = document.getElementById('continueButton');
    const inputBox = document.getElementById('inputbox');
    const mainDiv = document.querySelector('.mainDiv');
    

    let userInputValue = '';

    continueButton.addEventListener('click', function() {
      if (inputBox.value.trim() !== '') {
        // Hide the initial input section
        userInputValue = inputBox.value.trim();
        console.log(userInputValue)
        inputBox.classList.add("leave-right");
        continueButton.classList.add("leave-down");

        setTimeout(function() {
            inputBox.classList.remove("leave-right");
            continueButton.classList.remove("leave-down");
        }, 800)
        // Show the volleyball ranking process section
        rankingProcess.style.display = 'block';
        continueButton.classList.add("return-from-down")
      } else {
        inputBox.classList.add("shake", "error");
        setTimeout(function() {
            inputBox.classList.remove("shake", "error")
        }, 800);
      }
    });
  });