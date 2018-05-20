mocha.setup({
    ui: 'bdd',
    ignoreLeaks: true,
    asyncOnly: true
});
const expect = chai.expect;
const yogafireFn = yogafire.yogafire;


const flashTarget = target => {
    console.log('flashTarget')
    let once = true;
    const previousBackgroundColor = target.style.background;
    target.style.background = 'rgba(255, 255, 150, 1)';
    let delayed;
    const flash = (timeStamp) => {
        if (once) {
            delayed = timeStamp + 50;
            once = false;
        }


        if (timeStamp > delayed) {
            target.style.background = previousBackgroundColor;
        }
        requestAnimationFrame(flash);
    }
    requestAnimationFrame(flash);
}

const clickEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
});
const mousemoveEvent = new MouseEvent('mousemove', {
    view: window,
    bubbles: true,
    cancelable: true
});

const on = it;