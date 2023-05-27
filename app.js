const pageviewsDisplay = document.querySelector('#pageviews-display');
const priceDisplay = document.querySelector('#price-display');

const stopsPageviewValues = ['10K', '50K', '100K', '500K', '1M'];
const stopsPriceValues = [8, 12, 16, 24, 36];
let yearlyDiscount = false;

const toggle = document.querySelector('.toggle');
toggle.addEventListener('click', () => {
    toggle.classList.toggle('toggled');
    if(toggle.classList.contains('toggled')) {
        // toggle.firstElementChild.classList = '';
        toggle.firstElementChild.classList.add('slide-right');
        toggle.firstElementChild.addEventListener('animationend', () => {
            toggle.firstElementChild.classList.remove('slide-right');
        })
    } else {
        toggle.firstElementChild.classList.add('slide-left');
        toggle.firstElementChild.addEventListener('animationend', () => {
            toggle.firstElementChild.classList.remove('slide-left');
        })
    }
    yearlyDiscount = !yearlyDiscount;
    setDisplays();
})


const slider = document.querySelector('.slider');
slider.containerX = slider.parentElement.getBoundingClientRect().left;
slider.containerXRight = slider.parentElement.getBoundingClientRect().right;
slider.width = slider.containerXRight - slider.containerX;
slider.priceSegmentWidth = slider.width / 4;
slider.fill = document.querySelector('.slider-fill');
slider.handle = document.querySelector('.slider-handle');
slider.handle.snapIndex = 2;

slider.handle.addEventListener('mousedown', () => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', () => {
        document.querySelectorAll('*').forEach(el => {
            el.style.cursor = ''; // setting el.style to an empty sting in the js file will revert the element style to the CSS you defined in the stylesheet
        });
        window.removeEventListener('mousemove', handleMouseMove);
        handleSnap();
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
    };

    for(let i = 0; i < 4; i++) {
        if(leftPos >= i*slider.priceSegmentWidth && leftPos < (i+1)*slider.priceSegmentWidth) {
            if(Math.abs(leftPos - i*slider.priceSegmentWidth) >= (Math.abs(leftPos - (i+1)*slider.priceSegmentWidth))) {
                // will snap to stops[i+1]
                slider.handle.snapIndex = i+1;
            } else {
                slider.handle.snapIndex = i;
            }
        }
    }
}

function handleSnap() {
    slider.handle.snapTo = slider.stops[slider.handle.snapIndex];
    slider.handle.style.left = slider.handle.snapTo + 'px';
    slider.fill.style.width = 100 * parseFloat(slider.handle.style.left)/parseFloat(getComputedStyle(slider).width) + '%';
    setDisplays();
}

function setDisplays() {
    pageviewsDisplay.textContent = stopsPageviewValues[slider.handle.snapIndex] + ' PAGEVIEWS';
    priceDisplay.textContent = yearlyDiscount ? 
        '$' + 0.75 * stopsPriceValues[slider.handle.snapIndex] + '.00':
        '$' + stopsPriceValues[slider.handle.snapIndex] + '.00';
}