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

    // Movement is slightly slower (2.5) for a "creeping" virus feel
    let bananas = [{ x: w/2, y: h/2, vx: 2.5, vy: 2.5, size: 100 }];
    let activeEffects = new Set();
    let invertToggle = false;

    function draw() {
        // Subtle Melt/Static (20% less opacity)
        if (activeEffects.has('STATIC')) {
            ctx.fillStyle = `rgba(255, 255, 255, 0.02)`;
            for(let i=0; i<3; i++) ctx.fillRect(0, Math.random()*h, w, 1);
        } else {
            ctx.clearRect(0, 0, w, h);
        }

        let filters = [];
        if (invertToggle) filters.push('invert(80%)'); // Not a full 100% harsh invert
        if (activeEffects.has('GLITCH')) filters.push(`hue-rotate(${Math.random() * 90}deg) saturate(200%)`);
        if (activeEffects.has('LITE_BLUR')) filters.push('blur(0.8px)');
        document.body.style.filter = filters.join(' ');

        // Reduced Shake/Warp
        let transform = '';
        if (activeEffects.has('SHAKE')) transform += `translate(${Math.random()*10-5}px, ${Math.random()*4-2}px) `;
        if (activeEffects.has('WARP')) transform += `skew(${Math.random()*4}deg) `;
        document.body.style.transform = transform;

        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(255, 255, 0, 0.5)";

        for (let i = bananas.length - 1; i >= 0; i--) {
            let b = bananas[i];
            ctx.font = `${b.size}px serif`;
            ctx.fillText('🍌', b.x, b.y);

            b.x += b.vx;
            b.y += b.vy;

            let hit = false;
            if (b.x <= 0 || b.x >= w - b.size) { b.vx *= -1; hit = true; }
            if (b.y <= 0 || b.y >= h - b.size) { b.vy *= -1; hit = true; }

            if (hit) {
                // Invert happens less often (20% chance)
                if (Math.random() > 0.8) invertToggle = !invertToggle;

                const pool = ['STATIC', 'SHAKE', 'GLITCH', 'LITE_BLUR', 'WARP'];
                activeEffects.add(pool[Math.floor(Math.random() * pool.length)]);

                // Duplicate 1 more per bounce (Limit 100)
                if (bananas.length < 100) {
                    bananas.push({
                        x: b.x,
                        y: b.y,
                        vx: -b.vx + (Math.random() - 0.5),
                        vy: b.vy + (Math.random() - 0.5),
                        size: Math.max(30, b.size * 0.9)
                    });
                }

                // Subtler background tint instead of bright neon
                document.body.style.backgroundColor = `hsla(${Math.random()*360}, 50%, 50%, 0.1)`;
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
    console.log("%c BANANA_VIRUS: REDUCED_INTENSITY_MODE_ACTIVE", "color: orange; font-weight: bold;");
})();
