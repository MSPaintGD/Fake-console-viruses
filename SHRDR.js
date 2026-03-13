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

    function shredder() {
        // 1. RANDOM SCREEN TEARING
        ctx.fillStyle = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 0.3)`;
        ctx.fillRect(0, Math.random()*h, w, Math.random()*20);
        
        // 2. STROBE EVERYTHING
        document.body.style.filter = `invert(${Math.random() > 0.8 ? 100 : 0}%) hue-rotate(${Math.random()*360}deg) contrast(300%)`;
        
        // 3. ELEMENT SHREDDER (Pick random parts of the site and break them)
        const els = document.querySelectorAll('div, p, img, span, button, a');
        for(let i=0; i<3; i++) {
            const el = els[Math.floor(Math.random() * els.length)];
            if(el && el !== canvas) {
                el.style.position = 'relative';
                el.style.left = (Math.random()*100 - 50) + 'px';
                el.style.top = (Math.random()*100 - 50) + 'px';
                el.style.transform = `rotate(${Math.random()*360}deg) scale(${Math.random()*2})`;
                el.style.opacity = Math.random();
                el.style.backgroundColor = `rgb(${Math.random()*255},0,0)`;
            }
        }

        // 4. VIOLENT JITTER
        document.body.style.marginLeft = (Math.random()*50 - 25) + 'px';
        document.body.style.marginTop = (Math.random()*50 - 25) + 'px';

        // 5. DATA LEAK TEXT
        ctx.font = "bold 50px monospace";
        ctx.fillStyle = "white";
        if(Math.random() > 0.95) ctx.fillText("0x000000FF_SEGMENT_FAULT", Math.random()*w, Math.random()*h);

        requestAnimationFrame(shredder);
    }

    shredder();
    console.log("%c SYSTEM_SHREDDER_ACTIVE ", "background: black; color: red; font-size: 40px;");
})();
