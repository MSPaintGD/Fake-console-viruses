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

    // The Army of Bananas
    let bananas = [{ x: w/2, y: h/2, vx: 3, vy: 3, size: 100, isMain: true }];
    let activeEffects = new Set();
    let invertToggle = false;

    function draw() {
        // NOISE/STATIC EFFECT
        if (activeEffects.has('NOISE')) {
            ctx.fillStyle = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 0.1)`;
            for(let i=0; i<8; i++) ctx.fillRect(0, Math.random()*h, w, 2);
        } else {
            ctx.clearRect(0, 0, w, h);
        }

        // INTENSE STROBE & FILTERS
        let filters = [];
        if (invertToggle) filters.push('invert(100%)');
        if (activeEffects.has('GLITCH')) filters.push(`hue-rotate(${Math.random() * 360}deg) contrast(300%)`);
        if (activeEffects.has('LITE_BLUR')) filters.push('blur(1.5px)');
        document.body.style.filter = filters.join(' ');

        // SHAKE & WARP
        let transform = '';
        if (activeEffects.has('SHAKE')) transform += `translate(${Math.random()*20-10}px, ${Math.random()*10-5}px) `;
        if (activeEffects.has('WARP')) transform += `skew(${Math.random()*8}deg) `;
        document.body.style.transform = transform;

        // PROCESS ALL BANANAS
        ctx.shadowBlur = 20;
        ctx.shadowColor = "yellow";

        for (let i = bananas.length - 1; i >= 0; i--) {
            let b = bananas[i];
            ctx.font = `${b.size}px serif`;
            ctx.fillText('🍌', b.x, b.y);

            b.x += b.vx;
            b.y += b.vy;

            // Collision Detection
            let hit = false;
            if (b.x <= 0 || b.x >= w - b.size) { b.vx *= -1; hit = true; }
            if (b.y <= 0 || b.y >= h - b.size) { b.vy *= -1; hit = true; }

            if (hit) {
                // 1. INVERT CHANCE
                if (Math.random() > 0.4) invertToggle = !invertToggle;

                // 2. ADD VIRUS EFFECTS
                const pool = ['NOISE', 'SHAKE', 'GLITCH', 'LITE_BLUR', 'WARP'];
                activeEffects.add(pool[Math.floor(Math.random() * pool.length)]);

                // 3. DUPLICATE: Spawn 1 new banana per bounce (limit 100 to prevent crash)
                if (bananas.length < 100) {
                    bananas.push({
                        x: b.x,
                        y: b.y,
                        vx: -b.vx + (Math.random() * 2 - 1),
                        vy: b.vy + (Math.random() * 2 - 1),
                        size: Math.max(30, b.size * 0.8) // Clones get slightly smaller
                    });
                }

                // Neon background flash
                document.body.style.backgroundColor = `hsl(${Math.random()*360}, 100%, 50%)`;
                console.log("%c [!] CLONE_DUPLICATION_ERROR: BANANA_COUNT=" + bananas.length, "color: yellow; background: red;");
            }
        }

        requestAnimationFrame(draw);
    }

    draw();
})();
