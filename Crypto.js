/*
THIS DOES ACTUALLY TRACK YOUR IP FROM GOOGLES SEARCH
/*
(async function() {
    // 1. Fetch IP and Location with multiple fallbacks
    let city = "Unknown", region = "Unknown", country = "Unknown", ip = "FETCHING...";
    
    try {
        // Try getting the IP first
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();
        ip = ipData.ip;

        // Try getting location based on that IP
        const locRes = await fetch(`https://ipapi.co{ip}/json/`);
        const locData = await locRes.json();
        city = locData.city || "Restricted";
        region = locData.region || "Area";
        country = locData.country_name || "Unknown";
    } catch (e) {
        ip = "192.168." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255);
        city = "PROXY DETECTED";
    }

    // 2. Wipe screen and apply "Evil" Styles
    document.documentElement.innerHTML = `
        <body style="background:black; color:#ff0000; font-family:'Courier New', monospace; margin:0; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; overflow:hidden; text-align:center;">
            <h1 style="font-size: 5vw; text-shadow: 0 0 20px red; animation: blink 0.5s infinite;">⚠️ YOUR SYSTEM IS INFECTED ⚠️</h1>
            <div style="border: 5px solid red; padding: 40px; background: rgba(30,0,0,0.9); box-shadow: 0 0 100px red; max-width: 90%;">
                <p style="font-size: 1.5vw; color: white; margin: 5px;">TARGET IDENTIFIED:</p>
                <p style="font-size: 2.5vw; font-weight: bold; color: yellow; margin: 10px;">
                    LOCATION: ${city.toUpperCase()}, ${region.toUpperCase()} <br>
                    IP: ${ip}
                </p>
                <hr style="border: 1px solid red; width: 80%;">
                <p style="font-size: 1.2vw; color: #00ff00;">ENCRYPTING LOCAL DRIVE [C:/...] ... 100% COMPLETE</p>
                <p style="font-size: 1.2vw;">Send <b>$500 in BTC</b> to avoid permanent data loss.</p>
                <p style="background: #111; padding: 15px; color: white; font-size: 1.3vw; border: 1px dashed red;">bc1qsatoshisaddressfake1234567890</p>
                <div id="timer" style="font-size: 4vw; margin-top: 20px; color: white;">00:59:59</div>
            </div>
            <p id="glitch" style="position: absolute; bottom: 20px; font-size: 12px; color: #444;">Accessing webcam... [OK] | Uploading contacts... [OK]</p>
            <style>
                @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.1; } 100% { opacity: 1; } }
                body { filter: contrast(1.2) brightness(0.8); }
            </style>
        </body>
    `;

    // 3. Fake Timer and Glitch Flashing
    let time = 3599;
    setInterval(() => {
        let m = Math.floor(time / 60);
        let s = time % 60;
        document.getElementById('timer').innerText = `00:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
        time--;
        // Random screen flickers
        if (Math.random() > 0.95) document.body.style.filter = 'invert(1)';
        else document.body.style.filter = 'none';
    }, 1000);
})();
