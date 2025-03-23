// Depression Detection Quiz Logic
document.getElementById('depression-quiz').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the quiz responses
    const responses = [
        parseInt(document.getElementById('q1').value),
        parseInt(document.getElementById('q2').value),
        parseInt(document.getElementById('q3').value),
        parseInt(document.getElementById('q4').value),
        parseInt(document.getElementById('q5').value)
    ];

    const totalScore = responses.reduce((sum, value) => sum + value, 0);

    let resultText = '';
    if (totalScore <= 4) {
        resultText = 'Your responses suggest you might not be experiencing significant depression symptoms.';
    } else if (totalScore <= 8) {
        resultText = 'Your responses suggest mild depression symptoms. Consider speaking with a professional for further guidance.';
    } else if (totalScore <= 12) {
        resultText = 'Your responses suggest moderate depression symptoms. A professional consultation is recommended.';
    } else {
        resultText = 'Your responses suggest severe depression symptoms. It is highly recommended to consult with a healthcare provider immediately.';
    }

    // Show result
    document.getElementById('quiz-result').style.display = 'block';
    document.getElementById('result-text').textContent = resultText;
});

// Voice Detection Logic
let recognition;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = true;

    document.getElementById('start-recording').addEventListener('click', function() {
        document.getElementById('voice-result').style.display = 'block';
        recognition.start();
    });

    recognition.onresult = function(event) {
        const transcript = event.results[event.results.length - 1][0].transcript;
        // Here, you could add more advanced voice processing to detect depression-related cues.
        document.getElementById('voice-result').textContent = `Analyzing voice... Detected speech: "${transcript}"`;
    };

    recognition.onerror = function(event) {
        document.getElementById('voice-result').textContent = `Error: ${event.error}`;
    };
} else {
    document.getElementById('voice-detection').innerHTML += '<p>Your browser does not support voice recognition.</p>';
}
