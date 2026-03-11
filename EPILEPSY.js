setInterval(() => {
  const img = document.createElement('img');
  // BIGGER: Increased size range to 400px - 800px
  const size = Math.floor(Math.random() * 400) + 400;
  
  img.src = `https://picsum.photos{size}/${size}?random=${Math.random()}`;
  
  img.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 99999;
    width: ${size}px;
    height: auto;
    transition: all 5s linear; /* LONGER: 5-second movement duration */
    transform: translate(-50%, -50%) scale(0) rotate(0deg);
    pointer-events: none;
    border: 5px solid white;
    box-shadow: 0 0 50px rgba(0,0,0,0.5);
  `;
  
  document.body.appendChild(img);

  // Trigger the expansion and flight
  setTimeout(() => {
    const x = (Math.random() - 0.5) * 150; 
    const y = (Math.random() - 0.5) * 150; 
    img.style.transform = `translate(${x}vw, ${y}vh) scale(2) rotate(${Math.random() * 2000}deg)`;
    img.style.opacity = '0.8';
  }, 50);

  // LONGER: Stays on screen for 6 seconds before being deleted
  setTimeout(() => {
    img.style.opacity = '0';
    setTimeout(() => img.remove(), 1000);
  }, 6000);

}, 400); // Slower spawn rate (every 400ms) to handle the larger image sizes

// 1. Setup the styles for the movement and flashing
const style = document.createElement('style');
style.innerHTML = `
  body {
    transition: transform 0.05s linear;
    position: relative;
  }
`;
document.head.appendChild(style);

let pos = 0;

// 2. The Chaos Loop
setInterval(() => {
  // Move diagonally down (x and y increase together)
  pos += 5;
  
  // Random "Glitch" Jitter
  const jitterX = (Math.random() - 0.5) * 20;
  const jitterY = (Math.random() - 0.5) * 20;

  // Apply Diagonal Movement + Jitter
  document.body.style.transform = `translate(${pos + jitterX}px, ${pos + jitterY}px)`;

  // Inverted Colour Flashing
  // Toggles between 0% and 100% inversion every frame
  document.documentElement.style.filter = 
    (Math.random() > 0.5) ? 'invert(100%)' : 'invert(0%)';

  // If it moves too far off screen, you can reset it (Optional)
  if (pos > window.innerHeight) pos = -200;

}, 50); // 50ms interval for high-speed glitching
