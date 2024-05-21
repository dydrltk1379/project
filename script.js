document.addEventListener('DOMContentLoaded', () => {
    const guessInput = document.getElementById('guessInput');
    const submitGuess = document.getElementById('submitGuess');
    const result = document.getElementById('result');
    const history = document.getElementById('history');
    let answer = generateAnswer();
    let attempts = 0;

    submitGuess.addEventListener('click', () => {
        const guess = guessInput.value;
        if (validateGuess(guess)) {
            attempts++;
            const feedback = checkGuess(guess);
            result.textContent = feedback.message;
            history.innerHTML += `<p>Attempt ${attempts}: ${guess} - ${feedback.strikes} Strike(s), ${feedback.balls} Ball(s)</p>`;
            guessInput.value = '';
            if (feedback.strikes === 4) {
                alert(`Congratulations! You guessed the correct number ${answer} in ${attempts} attempts.`);
                resetGame();
            }
        } else {
            alert('Please enter a valid 4-digit number with unique digits.');
        }
    });

    
});
