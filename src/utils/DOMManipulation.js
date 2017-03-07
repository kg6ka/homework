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
}

export default new DOMManipulation();
