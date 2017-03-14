// import jQuery from 'jquery';

export const minHeightApp = () => {
    let pageWrapper = document.getElementById('wrapper');
    let windowHeight = window.innerHeight;
    pageWrapper.style.height = windowHeight + 'px';
    /*if (pageWrapper.offsetHeight < windowHeight) {
        pageWrapper.style.height = windowHeight + 'px';
    }*/
};
