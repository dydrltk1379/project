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

    function generateAnswer() {
        let digits = '0123456789'.split('');
        let answer = '';
        for (let i = 0; i < 4; i++) {
            const index = Math.floor(Math.random() * digits.length);
            answer += digits.splice(index, 1);
        }
        return answer;
    }
    function validateGuess(guess) {
        if (guess.length !== 4 || isNaN(guess)) return false;
        let uniqueDigits = new Set(guess.split(''));
        return uniqueDigits.size === 4;
    }

    function checkGuess(guess) {
        let strikes = 0, balls = 0;
        for (let i = 0; i < 4; i++) {
            if (guess[i] === answer[i]) {
                strikes++;
            } else if (answer.includes(guess[i])) {
                balls++;
            }
        }
        return { strikes, balls, message: `Strikes: ${strikes}, Balls: ${balls}` };
    }

    function resetGame() {
        answer = generateAnswer();
        attempts = 0;
        history.innerHTML = '';
        result.textContent = '';
    }

    
});
