

const toggle = document.querySelector('.toggle');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('toggled');
})


const slider = document.querySelector('.slider');
slider.containerX = slider.parentElement.getBoundingClientRect().left;
slider.containerXRight = slider.parentElement.getBoundingClientRect().right;
slider.width = slider.containerXRight - slider.containerX;
slider.priceSegmentWidth = slider.width / 4;
slider.fill = document.querySelector('.slider-fill');
slider.handle = document.querySelector('.slider-handle');

slider.handle.addEventListener('mousedown', () => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', () => {
        document.querySelectorAll('*').forEach(el => {
            el.style.cursor = ''; // setting el.style to an empty sting in the js file will revert the element style to the CSS you defined in the stylesheet
        });
        slider.handle.style.left = slider.handle.snapTo + 'px';
        slider.fill.style.width = 100 * parseFloat(slider.handle.style.left)/parseFloat(getComputedStyle(slider).width) + '%'
        window.removeEventListener('mousemove', handleMouseMove)
    })
})

function handleMouseMove(e) {
    e.target.style.cursor = 'grabbing';
    if(e.clientX >= slider.containerX && e.clientX <= slider.containerXRight) {
        slider.handle.style.left = e.clientX - slider.containerX + 'px';
        slider.fill.style.width = 100 * parseFloat(slider.handle.style.left)/parseFloat(getComputedStyle(slider).width) + '%';
        handleIdentifyStop();
    }
}


function handleIdentifyStop() {
    let leftPos = parseFloat(slider.handle.style.left);
    slider.stops = [];
    for(let i = 0; i < 5; i++) {
        slider.stops.push(i * slider.priceSegmentWidth)
    }
    // console.log(slider.stops)
    for(let i = 0; i < 4; i++) {
        if(leftPos >= i*slider.priceSegmentWidth && leftPos < (i+1)*slider.priceSegmentWidth) {
            if(Math.abs(leftPos - i*slider.priceSegmentWidth) >= (Math.abs(leftPos - (i+1)*slider.priceSegmentWidth))) {
                // will snap to stops[i+1]
                slider.handle.snapTo = slider.stops[i+1];
            } else {
                slider.handle.snapTo = slider.stops[i];
            }
        }
    }
}