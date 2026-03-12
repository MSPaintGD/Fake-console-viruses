(function() {
    // --- PHASE 1: 2019 GLITCH OVERLOAD (5 SECONDS) ---
    const glitchOverlay = document.createElement('div');
    glitchOverlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(255, 0, 255, 0.2); z-index: 2000000; overflow: hidden;
        display: flex; flex-direction: column; justify-content: center; align-items: center;
        pointer-events: none; backdrop-filter: invert(1) hue-rotate(90deg);
    `;
    
    glitchOverlay.innerHTML = `
        <div style="background: white; padding: 20px; border: 3px solid black; box-shadow: 10px 10px 0px red;">
            <h1 style="color:black; font-family:'Comic Sans MS', sans-serif; font-size:40px; margin:0;">⚠️ VIBE_CHECK_FAILED.exe</h1>
            <p style="color:red; font-weight:bold; text-align:center;">MEMORY LEAK DETECTED [2019_MEMZ_MOD]</p>
        </div>
    `;
    document.body.appendChild(glitchOverlay);

    // 2019 "Screen Melt" effect loop
    const meltInterval = setInterval(() => {
        const errorBox = document.createElement('div');
        errorBox.innerText = "CRITICAL_ERROR_" + Math.random().toString(16).toUpperCase();
        errorBox.style.cssText = `
            position: fixed;
            top: ${Math.random() * 100}vh; left: ${Math.random() * 100}vw;
            background: #f1f1f1; border: 1px solid #777; padding: 10px;
            font-family: 'Segoe UI', sans-serif; font-size: 12px; z-index: 2000001;
            box-shadow: 2px 2px 5px rgba(0,0,0,0.5); transform: rotate(${(Math.random()-0.5)*20}deg);
        `;
        document.body.appendChild(errorBox);
        setTimeout(() => errorBox.remove(), 500);

        // Screen Distortion
        document.body.style.filter = `contrast(3) saturate(5) hue-rotate(${Math.random() * 360}deg)`;
        document.body.style.transform = `skew(${(Math.random()-0.5)*10}deg)`;
    }, 100);

    // --- TRANSITION AFTER 5 SECONDS ---
    setTimeout(() => {
        clearInterval(meltInterval);
        glitchOverlay.remove();
        
        // --- PHASE 2: YOUR ORIGINAL "SYSTEM KILLER" SCRIPT ---
        (function() {
            // 1. ALERT SPAM
            for(let i=0; i<3; i++) alert("!!! 2019_SYSTEM_OVERRIDE_ACTIVE !!!");

            // 2. THE "SYSTEM KILLER" SPAWNER
            function spawnMegaImage() {
                const img = new Image();
                const size = Math.floor(Math.random() * 1500) + 1500; 
                img.src = `https://picsum.photos{size}/${size}?random=${Math.random()}`;
                
                img.style.cssText = `
                    position: fixed; top: ${Math.random() * 100}vh; left: ${Math.random() * 100}vw;
                    width: ${size}px; z-index: 999999; pointer-events: none;
                    filter: contrast(3) saturate(10) invert(1) drop-shadow(0 0 50px lime);
                    transition: transform 3s cubic-bezier(0.1, 0, 0.9, 1);
                    transform: translate(-50%, -50%) scale(0.01) rotate(0deg);
                `;
                document.body.appendChild(img);

                requestAnimationFrame(() => {
                    img.style.transform = `translate(-50%, -50%) scale(8) rotate(${Math.random() * 5000}deg)`;
                    img.style.opacity = '0.9';
                });
            }

            // 3. THE HYPER-LOOP (10ms)
            setInterval(() => {
                spawnMegaImage();
                document.body.style.transform = `translate(${(Math.random()-0.5)*400}px, ${(Math.random()-0.5)*400}px) rotate(${(Math.random()-0.5)*15}deg) scale(${1 + Math.random()})`;
                document.documentElement.style.filter = `invert(${Math.random() > 0.5 ? 100 : 0}%) hue-rotate(${Math.random() * 360}deg) brightness(2)`;
                document.title = "U_GOT_HAXED_" + Math.random().toString(36).substring(7).toUpperCase();
            }, 10);

            // 4. CONSOLE FLOODING
            setInterval(() => {
                console.error("VIRUS_ID: 2019_DEATH_STREAK_" + Date.now());
            }, 1);
        })();
    }, 5000);
})();
