(async function() {
    // 1. Snapshot original page to return to later
    const originalHTML = document.documentElement.innerHTML;
    const originalStyle = document.body.style.cssText;
    const originalBg = window.getComputedStyle(document.body).backgroundColor;

    // 2. Fetch IP and Location for the fake ransomware screen
    let city = "Unknown", region = "Unknown", ip = "FETCHING...";
    try {
        const ipRes = await fetch('https://api.ipify.org');
        const ipData = await ipRes.json();
        ip = ipData.ip;
        const locRes = await fetch(`https://ipapi.co{ip}/json/`);
        const locData = await locRes.json();
        city = locData.city || "Restricted";
        region = locData.region || "Area";
    } catch (e) {
        ip = "192.168." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255);
        city = "PROXY DETECTED";
    }

    // 3. Display the Ransomware UI
    document.documentElement.innerHTML = `
        <body style="background:black; color:#ff0000; font-family:'Courier New', monospace; margin:0; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; overflow:hidden; text-align:center;">
            <h1 style="font-size: 5vw; text-shadow: 0 0 20px red; animation: blink 0.5s infinite;">⚠️ SYSTEM ENCRYPTED ⚠️</h1>
            <div style="border: 5px solid red; padding: 40px; background: rgba(20,0,0,1); box-shadow: 0 0 100px red; max-width: 90%;">
                <p style="font-size: 1.5vw; color: white;">IP: ${ip}</p>
                <p style="font-size: 1.5vw; color: white;">LOCATION: ${city.toUpperCase()}, ${region.toUpperCase()}</p>
                <hr style="border: 1px solid red; width: 80%; margin: 20px 0;">
                <button id="giveCrypto" style="background:#00ff00; color:black; font-weight:bold; font-size:2vw; padding:20px 40px; border:none; cursor:pointer; box-shadow: 0 0 20px #00ff00;">GIVE CRYPTO</button>
            </div>
            <style>@keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.1; } 100% { opacity: 1; } }</style>
        </body>
    `;

    // 4. Trigger Sequence on Click
    document.getElementById('giveCrypto').addEventListener('click', function() {
        // Restore main page first for extra lag/surprise
        document.documentElement.innerHTML = originalHTML;
        document.body.style.cssText = originalStyle;
        document.body.style.backgroundColor = originalBg;

        // 1 Second Silent Fuse
        setTimeout(() => {
            
            // --- SECOND SCRIPT START ---
            
            // 1. Alert Spam
            for(let i=0; i<3; i++) alert("!!! WARNING: VRAM OVERFLOW !!!");

            // 2. The "System Killer" Spawner
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

            // 3. The Hyper-Loop
            const chaosInterval = setInterval(() => {
                spawnMegaImage();
                document.body.style.transform = `translate(${(Math.random()-0.5)*300}px, ${(Math.random()-0.5)*300}px) rotate(${(Math.random()-0.5)*10}deg)`;
                document.documentElement.style.filter = `invert(${Math.random() > 0.5 ? 100 : 0}%) hue-rotate(${Math.random() * 360}deg)`;
                document.title = "CRASH_LOG_" + Math.random().toString(16).toUpperCase();
            }, 10);

            // 4. Console Flooding
            setInterval(() => {
                console.error("FATAL ERROR: MEMORY_BUFFER_EXCEEDED_" + Date.now());
            }, 1);

        }, 1000); // 1-second delay
    });
})();
