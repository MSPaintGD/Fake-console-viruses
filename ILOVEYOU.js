(async function() {
    // 1. Grab IP/Location for that "targeted" scare
    let city = "Unknown", ip = "FETCHING...";
    try {
        const res = await fetch('https://api.ipify.org');
        const data = await res.json();
        ip = data.ip;
        const loc = await fetch(`https://ipapi.co{ip}/json/`);
        const lData = await loc.json();
        city = lData.city || "User";
    } catch (e) { ip = "127.0.0.1"; }

    // 2. Clear page and set the "Retro Virus" look
    document.documentElement.innerHTML = `
        <body style="background:#008080; color:white; font-family:'MS Sans Serif', Arial; margin:0; overflow:hidden; cursor:wait;">
            <div id="desktop" style="height:100vh; width:100vw; position:relative;">
                <div style="background:#c0c0c0; border:2px outset #fff; color:black; width:400px; padding:2px; position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); z-index:9999; box-shadow:2px 2px 10px black;">
                    <div style="background:darkblue; color:white; padding:3px; font-weight:bold;">VBS.LoveLetter.Var</div>
                    <div style="padding:20px; text-align:center;">
                        <p style="font-size:18px;">kindly check the LOVE-LETTER-FOR-YOU.txt.vbs</p>
                        <p>Sent from: <b>${city} (@${ip})</b></p>
                        <button onclick="location.reload()" style="padding:5px 20px;">OK</button>
                    </div>
                </div>
            </div>
            <style>
                .icon { position:absolute; text-align:center; width:80px; font-size:10px; animation: jitter 0.1s infinite; }
                @keyframes jitter { 0% { transform:translate(0,0); } 50% { transform:translate(2px,2px); } 100% { transform:translate(0,0); } }
            </style>
        </body>
    `;

    // 3. Flood the desktop with "Infected" file icons
    const desktop = document.getElementById('desktop');
    setInterval(() => {
        const icon = document.createElement('div');
        icon.className = 'icon';
        icon.innerHTML = `<div style="font-size:30px;">📄</div>LOVE-LETTER-FOR-YOU.txt.vbs`;
        icon.style.left = Math.random() * 90 + 'vw';
        icon.style.top = Math.random() * 90 + 'vh';
        icon.style.color = (Math.random() > 0.5) ? 'yellow' : 'white';
        desktop.appendChild(icon);
        
        // Randomly invert the whole screen
        if(Math.random() > 0.9) document.body.style.filter = 'invert(1)';
        else document.body.style.filter = 'none';
    }, 300);

    // 4. Change the title bar to act like a virus
    let titleToggle = false;
    setInterval(() => {
        document.title = titleToggle ? "ILOveyou" : "I HATE YOU";
        titleToggle = !titleToggle;
    }, 500);
})();
