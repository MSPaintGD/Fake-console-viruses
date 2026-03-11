const style = document.createElement('style');
style.innerHTML = `
  @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
  }
  .idiot-window {
    position: fixed;
    width: 300px;
    height: 200px;
    background: #ccc;
    border: 3px outset #fff;
    z-index: 1000000;
    font-family: "MS Sans Serif", "Courier New", sans-serif;
    box-shadow: 10px 10px 0px rgba(0,0,0,0.5);
    text-align: center;
    user-select: none;
    pointer-events: none;
  }
  .idiot-header { background: darkblue; color: white; padding: 2px; font-weight: bold; text-align: left; }
  .idiot-content { font-size: 24px; padding: 20px; font-weight: bold; animation: shake 0.1s infinite; }
`;
document.head.appendChild(style);

function spawnIdiot() {
  const win = document.createElement('div');
  win.className = 'idiot-window';
  win.innerHTML = `<div class="idiot-header">Error</div><div class="idiot-content">YOU ARE AN IDIOT!<br>☺☺☺</div>`;
  document.body.appendChild(win);

  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;
  let dx = (Math.random() - 0.5) * 30; // Speed X
  let dy = (Math.random() - 0.5) * 30; // Speed Y

  function move() {
    x += dx;
    y += dy;

    // Bounce logic
    if (x <= 0 || x >= window.innerWidth - 300) dx *= -1;
    if (y <= 0 || y >= window.innerHeight - 200) dy *= -1;

    win.style.left = x + 'px';
    win.style.top = y + 'px';
    requestAnimationFrame(move);
  }
  move();
}

// Spawn one every half second
setInterval(spawnIdiot, 500);

// Flash the screen for extra annoyance
setInterval(() => {
  document.body.style.filter = document.body.style.filter === 'invert(1)' ? 'invert(0)' : 'invert(1)';
}, 200);
