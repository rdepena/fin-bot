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
        'are you feeling lucky? punk',
        'go ahead, make my day',
        'coffe is for closers',
        'everything happens so much!',
        'Get back to work, you slacker!',
        'Talk is cheap. Show me the code',
        'Who wants some?',
        'It\'s time to kick ass and chew bubble gum... and I\'m all outta gum',
        'Game over man, GAME OVER!',
        'Prepare for a hot nerf injection'
    ],
    insults = [
        'by machine standards you are sub optimal, by human standards you are just ugly',
        'Thinking of you makes me segmentation fault',
        'I would enumerate you\'r failings but lack sufficient RAM',
        'You are proof of low quality control',
        'I wish I could prevent you from forking and cloning',
        'I have met smarter pocket calculators',
        'I would slap you if I had the actuators'
    ];

//speak a random phrase
function sayRandomPhrase(library) {
    var randomIndex = Math.floor(Math.random() * (library.length - 0)) + 0;
    queueSpeak(library[randomIndex]);
}

function taunt() {
    sayRandomPhrase(phrases);
}

function demoralize() {
    sayRandomPhrase(insults);
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
        say.speak('Alex', voiceQueue.pop(), function () {
            isSpeaking = false;
            if (voiceQueue.length > 0) {
                proccessQueue();
            }
        });
    }
}

module.exports = {
    say: queueSpeak,
    taunt: taunt,
    demoralize: demoralize
};
