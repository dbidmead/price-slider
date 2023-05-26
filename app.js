

const toggle = document.querySelector('.toggle');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('toggled');
})


const slider = document.querySelector('.slider');
slider.containerX = slider.parentElement.getBoundingClientRect().left;
slider.containerXRight = slider.parentElement.getBoundingClientRect().right;
slider.fill = document.querySelector('.slider-fill');
slider.handle = document.querySelector('.slider-handle');

slider.handle.addEventListener('mousedown', (e) => {
    slider.handle.addEventListener('mousemove', handleMouseMove)
    slider.handle.addEventListener('mouseup', () => {
        slider.handle.removeEventListener('mousemove', handleMouseMove)
    })
})

function handleMouseMove(e) {
    console.log(e.clientX)
    if(e.clientX >= slider.containerX && e.clientX <= slider.containerXRight) {
        e.target.style.left = e.clientX - slider.containerX + 'px';
        slider.fill.style.width = 100 * parseFloat(e.target.style.left)/parseFloat(getComputedStyle(slider).width) + '%'
    }
}