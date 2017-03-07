// import jQuery from 'jquery';

class DOMManipulation {
    constructor() {
        let self = this;
        self.window = window;
    }
    minHeightApp() {
        let pageWrapper = document.getElementById('wrapper');
        let windowHeight = window.innerHeight;
        if (pageWrapper.offsetHeight < windowHeight) {
            console.log(windowHeight, pageWrapper.offsetHeight);
            pageWrapper.style.height = windowHeight + 'px';
        }
    }
    addEventListener(event, cb) {
        self.window.addEventListener(event, cb);
    }
    removeEventListener(event, cb) {
        self.window.removeEventListener(event, cb);
    }
}

export default new DOMManipulation();
