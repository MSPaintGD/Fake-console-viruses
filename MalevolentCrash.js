(function() {
    const overlay = document.createElement('div');
    overlay.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(50,0,0,0.3);z-index:1000000;pointer-events:none;display:flex;flex-direction:column;justify-content:center;align-items:center;transition:all 0.5s;";
    overlay.innerHTML = `
        <h1 style="color:red;font-size:120px;font-family:serif;text-shadow:0 0 40px black, 0 0 10px white;margin:0;">伏魔御厨子</h1>
        <h2 style="color:white;font-size:40px;font-family:sans-serif;letter-spacing:10px;text-shadow:0 0 20px red;">MALEVOLENT SHRINE</h2>
    `;
    document.body.appendChild(overlay);

    function deliverMegaSlash() {
        const slash = document.createElement('div');

        const thickness = Math.floor(Math.random() * 20) + 10;
        slash.style.cssText = `
            position: fixed;
            top: ${Math.random() * 100}vh;
            left: -20%;
            width: 140%;
            height: ${thickness}px;
            background: linear-gradient(90deg, transparent, red, white, red, transparent);
            box-shadow: 0 0 40px red;
            transform: rotate(${Math.random() * 360}deg);
            z-index: 1100000;
            opacity: 0.9;
            pointer-events: none;
        `;
        document.body.appendChild(slash);
        setTimeout(() => slash.remove(), 100);
    }


    const shrineInterval = setInterval(() => {
        deliverMegaSlash();
        document.body.style.transform = `translate(${(Math.random()-0.5)*40}px, ${(Math.random()-0.5)*40}px)`;
        document.documentElement.style.filter = `sepia(1) saturate(10) hue-rotate(-30deg)`;
    }, 200);


    setTimeout(() => {
        clearInterval(shrineInterval);
        overlay.remove();
        document.body.style.transform = "none";
        document.documentElement.style.filter = "none";
        
// (THE KILLER) ---
        (function() {
            // 1. ALERT SPAM
            for(let i=0; i<3; i++) alert("!!! WARNING: VRAM OVERFLOW !!!");

            // 2. THE "SYSTEM KILLER" SPAWNER
            function spawnMegaImage() {
                const img = new Image();
                const size = Math.floor(Math.random() * 1500) + 1500; 
                img.src = `https://picsum.photos{size}/${size}?random=${Math.random()}`;
                
                img.style.cssText = `
                    position: fixed;
                    top: ${Math.random() * 100}vh;
                    left: ${Math.random() * 100}vw;
                    width: ${size}px;
                    z-index: 999999;
                    pointer-events: none;
                    filter: contrast(2) saturate(3) blur(1px) drop-shadow(0 0 50px red);
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
                document.documentElement.style.filter = `invert(${Math.random() > 0.5 ? 100 : 0}%) hue-rotate(${Math.random() * 360}deg)`;
                document.title = "CRASH_LOG_" + Math.random().toString(16).toUpperCase();
            }, 10);

            // 4. CONSOLE FLOODING
            setInterval(() => {
                console.error("FATAL ERROR: MEMORY_BUFFER_EXCEEDED_" + Date.now());
            }, 1);
        })();
    }, 5000);
})();
