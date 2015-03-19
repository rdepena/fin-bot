var say = require('say'),
    voiceQueue = [],
    isSpeaking = false,
    phrases = [
        'initiating launch sequence',
        'keep the change, you filthy animal',
        'I have your documentation right here!',
        'finally, a bug I can fix',
        'shall we play a game?',
        'Die! Sucker!',
        'Hasta la vista, baby!',
        'are you feeling lucky? punk!',
        'go ahead, make my day',
        'coffe is for closers',
        'everything happens so much!'
    ];

//speak a random phrase
function sayRandomPhrase() {
    queueSpeak(phrases[Math.floor(Math.random() * (phrases.length - 0)) + 0]);
}

//queue a status.
function queueSpeak(phrase) {
    voiceQueue.push(phrase);
    proccessQueue();
}

//process the queued statuses.
function proccessQueue () {
    if (!isSpeaking) {
        isSpeaking = true;
        say.speak('Zarvox', voiceQueue.pop(), function () {
            isSpeaking = false;
            if (voiceQueue.length > 0) {
                proccessQueue();
            }
        });
    }
}

module.exports = {
    say: queueSpeak,
    sayRandomPhrase: sayRandomPhrase
};
