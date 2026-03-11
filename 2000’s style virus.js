(function() {
    // 1. Classic Windows 95 UI styles
    const style = document.createElement('style');
    style.innerHTML = `
        .win95 {
            position: fixed; width: 350px; background: #c0c0c0;
            border: 2px outset #fff; box-shadow: 5px 5px 15px rgba(0,0,0,0.5);
            font-family: "MS Sans Serif", Arial; z-index: 1000000; cursor: move;
        }
        .win-header { background: darkblue; color: white; padding: 3px 5px; font-weight: bold; display: flex; justify-content: space-between; }
        .win-body { padding: 15px; color: black; text-align: center; font-size: 13px; }
        .win-btn { background: #c0c0c0; border: 2px outset #fff; padding: 2px 10px; margin-top: 10px; }
        @keyframes drift { from { transform: translate(0,0); } to { transform: translate(10px, 10px); } }
    `;
    document.head.appendChild(style);

    const messages = [
        "IMPORTANT: Check LOVE-LETTER-FOR-YOU.txt",
        "System Error: Out of Memory",
        "Mail delivery failed: Returned to sender",
        "C:\\WINDOWS\\SYSTEM32 is being modified...",
        "I LOVE YOU - Open the attachment!"
    ];

    function spawnWindow() {
        const win = document.createElement('div');
        win.className = 'win95';
        
        // Random position on screen
        win.style.left = Math.random() * (window.innerWidth - 350) + 'px';
        win.style.top = Math.random() * (window.innerHeight - 200) + 'px';

        const msg = messages[Math.floor(Math.random() * messages.length)];

        win.innerHTML = `
            <div class="win-header">
                <span>Microsoft Outlook Express</span>
                <span>[X]</span>
            </div>
            <div class="win-body">
                <div style="font-size:30px; margin-bottom:10px;">💾</div>
                ${msg}
                <br><button class="win-btn" onclick="this.parentElement.parentElement.remove()">OK</button>
            </div>
        `;

        document.body.appendChild(win);

        // Make the window "shake" slightly like it's glitching
        setInterval(() => {
            win.style.transform = `translate(${(Math.random()-0.5)*4}px, ${(Math.random()-0.5)*4}px)`;
        }, 50);
    }

    // 2. Start the chain reaction
    let count = 0;
    const infect = setInterval(() => {
        spawnWindow();
        count++;
        
        // Every 10 windows, flip the screen colors for 1 second
        if (count % 10 === 0) {
            document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
            setTimeout(() => document.documentElement.style.filter = 'none', 1000);
        }

        // Stop if it gets too crazy (prevents browser crash)
        if (count > 50) clearInterval(infect);
    }, 800); // New window every 0.8 seconds

    // 3. Change tab title
    setInterval(() => {
        document.title = (Math.random() > 0.5) ? "ILOVEYOU" : "MAIL_DAEMON_ERROR";
    }, 400);

})();
