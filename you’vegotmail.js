(function() {
    // 1. CREATE AUTHENTIC 2000s GMAIL BOX
    const mailPop = document.createElement('div');
    mailPop.style.cssText = `
        position: fixed; bottom: 20px; right: 20px; width: 320px;
        background: #ececec; border: 2px solid #999; border-top: 22px solid #cc3333;
        font-family: 'Tahoma', sans-serif; font-size: 11px; z-index: 2000000;
        box-shadow: 5px 5px 15px rgba(0,0,0,0.3); padding: 10px;
    `;
    
    mailPop.innerHTML = `
        <div style="position:absolute; top:-19px; left:5px; color:white; font-weight:bold;">Gmail</div>
        <div style="display:flex; align-items:center; gap:10px;">
            <img src="https://upload.wikimedia.org" width="40">
            <div>
                <strong style="font-size:14px; color:#000;">You've got mail!</strong><br>
                <span style="color:#444;">From: AOL_System_Daemon</span>
            </div>
        </div>
        <div style="margin-top:10px; text-align:right;">
            <button id="openBtn" style="cursor:pointer; border:1px solid #000; background:#fff; font-weight:bold; padding:4px 15px;">Open</button>
        </div>
    `;
    document.body.appendChild(mailPop);

    // 2. TRIGGER ON CLICK
    document.getElementById('openBtn').onclick = function() {
        mailPop.remove();
        startStrobeMelt();
    };

    function startStrobeMelt() {
        let offset = 0;
        document.documentElement.style.overflow = 'hidden';

        // 3. STROBE TUNNEL LOOP
        const tunnelInterval = setInterval(() => {
            offset += 12; // Speed of the tunnel
            
            const t = document.createElement('div');
            t.className = 'tunnel-layer'; // Class for easy removal later
            t.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                border: 10px solid; pointer-events: none; z-index: 1999999;
                box-sizing: border-box;
            `;
            
            // Your diagonal move and scale logic
            t.style.transform = `scale(${1 - (offset/1000)}) translate(${offset}px, ${offset}px)`;
            
            // Strobe logic
            const strobeColor = (offset % 16 < 8) ? "white" : "black";
            t.style.borderColor = strobeColor;
            
            document.body.appendChild(t);

            // Screen Shake
            document.body.style.transform = `translate(${(Math.random()-0.5)*40}px, ${(Math.random()-0.5)*40}px)`;

            // 4. TRIGGER SCRIPT 2 WHEN TUNNEL IS ALMOST DONE (OFFSET 900)
            if (offset >= 900) {
                clearInterval(tunnelInterval); // Stop the tunnel
                
                // Remove all previous tunnel layers immediately
                document.querySelectorAll('.tunnel-layer').forEach(el => el.remove());
                document.body.style.transform = "none";
                
                runScript2();
            }
        }, 15);
    }

    function runScript2() {
        // Intensive Image Spamming (Script 2)
        setInterval(() => {
            const img = new Image();
            const size = Math.floor(Math.random() * 1500) + 1200; 
            // Fixed URL format for stability
            img.src = `https://picsum.photos{size}/${size}?random=${Math.random()}`;
            img.style.cssText = `
                position: fixed; top: ${Math.random() * 100}vh; left: ${Math.random() * 100}vw;
                width: ${size}px; z-index: 9999999; pointer-events: none;
                filter: invert(1) brightness(2) contrast(5); 
                transform: translate(-50%, -50%) scale(5) rotate(${Math.random() * 360}deg);
            `;
            document.body.appendChild(img);
            
            // System Overload Feedback
            document.documentElement.style.filter = `invert(${Math.random() > 0.5 ? 1 : 0})`;
            console.error("CRITICAL_VRAM_FAILURE: MAIL_OVERFLOW_DETECTED");
        }, 10);
    }
})();
