(function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    Object.assign(canvas.style, {
        position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
        zIndex: '1000000', pointerEvents: 'none'
    });
    document.body.appendChild(canvas);

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    let banana = { x: w/2, y: h/2, vx: 4, vy: 4, size: 100 }; 
    let activeEffects = new Set();
    let invertToggle = false;

    function draw() {
        // MELT: Now draws random colored rectangles for "Dead Pixels"
        if (activeEffects.has('STATIC')) {
            ctx.fillStyle = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 0.1)`;
            for(let i=0; i<5; i++) ctx.fillRect(Math.random()*w, Math.random()*h, 100, 2);
        } else {
            ctx.clearRect(0, 0, w, h);
        }

        let filters = [];
        if (invertToggle) filters.push('invert(100%)');
        if (activeEffects.has('GLITCH')) filters.push(`hue-rotate(${Math.random() * 360}deg) saturate(500%)`);
        
        // Minor blur only if triggered (barely visible)
        if (activeEffects.has('LITE_BLUR')) filters.push('blur(1px)');
        
        document.body.style.filter = filters.join(' ');

        // SCREEN TEAR: Shakes the page horizontally and vertically
        if (activeEffects.has('SHAKE')) {
            document.body.style.transform = `translate(${Math.random()*30-15}px, ${Math.random()*10-5}px)`;
        }

        // Draw the Huge Banana
        ctx.font = `${banana.size}px serif`;
        ctx.shadowBlur = 40;
        ctx.shadowColor = invertToggle ? "cyan" : "red";
        ctx.fillText('🍌', banana.x, banana.y);

        banana.x += banana.vx;
        banana.y += banana.vy;

        // Collision logic
        let hit = false;
        if (banana.x <= 0 || banana.x >= w - banana.size) { banana.vx *= -1; hit = true; }
        if (banana.y <= 0 || banana.y >= h - banana.size) { banana.vy *= -1; hit = true; }

        if (hit) {
            // High chance to flip inversion
            if (Math.random() > 0.3) invertToggle = !invertToggle;

            const newEffects = ['STATIC', 'SHAKE', 'GLITCH', 'LITE_BLUR', 'TEAR'];
            activeEffects.add(newEffects[Math.floor(Math.random() * newEffects.length)]);
            
            // Random Background Flash
            document.body.style.backgroundColor = `hsl(${Math.random()*360}, 100%, 50%)`;
            
            console.log("%c [CRITICAL] BANANA_CORRUPTION_INDEX_STABLE", "color: white; background: red;");
        }

        requestAnimationFrame(draw);
    }

    draw();
})();
