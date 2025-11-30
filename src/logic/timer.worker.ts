/* eslint-disable no-restricted-globals */
self.onmessage = (e: MessageEvent) => {
    const { command, payload } = e.data;

    switch (command) {
        case 'START':
            startTimer(payload.duration);
            break;
        case 'STOP':
            stopTimer();
            break;
        case 'RESET':
            resetTimer();
            break;
    }
};

let timerId: number | null = null;
let remainingTime = 0;

function startTimer(duration: number) {
    if (timerId) clearInterval(timerId);
    remainingTime = duration;

    timerId = self.setInterval(() => {
        remainingTime--;
        self.postMessage({ type: 'TICK', remainingTime });

        if (remainingTime <= 0) {
            stopTimer();
            self.postMessage({ type: 'COMPLETE' });
        }
    }, 1000);
}

function stopTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
}

function resetTimer() {
    stopTimer();
    remainingTime = 0;
}

export { };
