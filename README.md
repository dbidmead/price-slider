# Frontend Mentor - Interactive pricing component solution

This is a solution to the [Interactive pricing component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-pricing-component-t0m8PIyY8). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [The challenge](#the-challenge)
- [Links](#links)
- [Built with](#built-with)
- [What I learned](#what-i-learned)
- [Author](#author)

## The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Use the slider and toggle to see prices for different page view numbers

## Links

- Solution URL: [https://dbidmead.github.io/price-slider](https://dbidmead.github.io/price-slider)

## Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- JS for DOM manipulation and slider functionality

## What I learned

### Mobile scrolling glitch fix when dragging an item by 'touchmove' event:
```js
function stopMobileScroll(e) {
    e.preventDefault();
}

el.addEventListener('pointerdown', () => {
    // as soon as the pointer goes down, add a touchmove event listener to the document body that prevents default, and SET {passive:false}!!! This allows the prevent default function to work
    document.body.addEventListener('touchmove', stopMobileScroll, {passive: false});

    // add event listener for the dragging logic
    document.addEventListener('pointermove', handleMouseMove)

    document.addEventListener('pointerup', () => {
        // as soon as the pointer goes up, remove the scroll preventer so the site functions normally again when the dragging is over
        document.body.removeEventListener('touchmove', stopMobileScroll, {passive: false});

        // remove drag function event listener
        document.removeEventListener('pointermove', handleMouseMove);
        handleSnap();
    })
})
```
Note that you should use 'pointer___' for the eventListener event to affect both mouse and touch actions.

### reset JS-implemented style changes back to stylesheet-defined styles
```js
const el = document.querySelector('#el')
el.style.height = '' // simply .style it to an empty string since it is specific to JS-implemented style changes
```

### Reusable toggle switch code with animation
```html
<div class="toggle">
    <div class="toggle-handle"></div>
</div>
```

```css
.toggle {
    background-color: grey;
    width: 2.5rem;
    height: 1.25rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    padding: 0.2rem;
    cursor: pointer;
    transition: all 0.4s ease;
    position: relative;
}

.toggle:hover {
    background-color: aqua;
}

.toggle-handle {
    width: 0.9rem;
    height: 0.9rem;
    background-color: white;
    border-radius: 50%;
    pointer-events: none;
    position: absolute;
}

.toggled {
    justify-content: flex-end;
    background-color: aqua;
}

.slide-right {
    animation-name: slide-right;
    animation-duration: 0.3s;
    animation-timing-function: linear;
}
.slide-left {
    animation-name: slide-left;
    animation-duration: 0.3s;
    animation-timing-function: linear;
}

@keyframes slide-right {
    0% {left: 0.2rem;}
    50% {left: 50%;}
    60% {left: 55%;}
    100% {right: 0.2rem;}
}

@keyframes slide-left {
    0% {right: 0.2rem;}
    20% {right: 30%;}
    50% {right: 50%;}
    100% {left: 0.2rem;}
}
```
```js
const toggle = document.querySelector('.toggle');
toggle.addEventListener('click', () => {
    toggle.classList.toggle('toggled');
    let animation = toggle.classList.contains('toggled') ? 'slide-right' : 'slide-left';
    toggle.firstElementChild.classList.add(animation);
    toggle.firstElementChild.addEventListener('animationend', () => {
        toggle.firstElementChild.classList.remove(animation);
    });
    // insert other toggle-related logic
})
```

## Author

- GitHub - [@dbidmead](https://github.com/dbidmead)
- Frontend Mentor - [@dbidmead](https://www.frontendmentor.io/profile/dbidmead)