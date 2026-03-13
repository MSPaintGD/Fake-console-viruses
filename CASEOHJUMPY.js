(function() {
    let jumpCount = 0;
    const maxJumps = 10;

    // 1. Create the Full-Screen Crack Layer
    const crackCanvas = document.createElement('canvas');
    const cctx = crackCanvas.getContext('2d');
    Object.assign(crackCanvas.style, {
        position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
        zIndex: '1000001', pointerEvents: 'none'
    });
    document.body.appendChild(crackCanvas);
    crackCanvas.width = window.innerWidth;
    crackCanvas.height = window.innerHeight;

    // 2. DESIGN CASEOH (Blue Hoodie)
    const caseOh = document.createElement('div');
    caseOh.id = 'caseoh-avatar';
    caseOh.innerHTML = `
        <div style="position:absolute; width:160px; height:180px; background:#d2691e; border-radius:50% 50% 40% 40%; top:-10px; left:-5px;"></div>
        <div style="position:absolute; width:150px; height:150px; background:#ffe4c4; border-radius:50%; top:10px; left:0; border-bottom: 10px solid #d2691e;">
            <div style="position:absolute; width:15px; height:15px; background:black; border-radius:50%; top:60px; left:35px;"></div>
            <div style="position:absolute; width:15px; height:15px; background:black; border-radius:50%; top:60px; left:100px;"></div>
            <div style="position:absolute; width:40px; height:10px; background:#8b4513; border-radius:5px; top:110px; left:55px;"></div>
        </div>
        <!-- Blue Hoodie Body -->
        <div style="position:absolute; width:220px; height:120px; background:#0047AB; border-radius:50% 50% 0 0; top:130px; left:-35px;"></div>
    `;

    Object.assign(caseOh.style, {
        position: 'fixed', top: '40vh', left: '50%',
        width: '150px', height: '150px',
        marginLeft: '-75px', zIndex: '2000000',
        transition: 'transform 0.1s ease-in-out',
        pointerEvents: 'none', filter: 'drop-shadow(0 0 30px rgba(0,0,0,0.8))'
    });
    document.body.appendChild(caseOh);

    function drawGlobalCracks() {
        cctx.strokeStyle = 'rgba(0,0,0,0.9)';
        cctx.lineWidth = 3;
        // Draw 3-5 random cracks anywhere on the screen
        for(let j=0; j<5; j++) {
            let startX = Math.random() * window.innerWidth;
            let startY = Math.random() * window.innerHeight;
            cctx.beginPath();
            cctx.moveTo(startX, startY);
            for(let i=0; i<10; i++) {
                cctx.lineTo(startX + (Math.random()*200-100), startY + (Math.random()*200-100));
            }
            cctx.stroke();
        }
    }

    // 3. The Jump Sequence (30px up/down)
    const jumpInterval = setInterval(() => {
        jumpCount++;
        
        // JUMP UP 30px
        caseOh.style.transform = 'translateY(-30px)';
        
        setTimeout(() => {
            // IMPACT (JUMP DOWN)
            caseOh.style.transform = 'translateY(0)';
            
            // Violent Screen Jolt
            const shake = 30 + (jumpCount * 15);
            document.body.style.transform = `translateY(${shake}px)`;
            
            // Random Cracks Everywhere
            drawGlobalCracks();
            
            console.error(`[SEISMIC_ALERT]: IMPACT_${jumpCount} - SENSORS_OFFLINE`);

            // RESET BODY POSITION
            setTimeout(() => {
                document.body.style.transform = 'translateY(0)';
            }, 150);

            // FINAL STAGE
            if (jumpCount >= maxJumps) {
                clearInterval(jumpInterval);
                caseOh.style.transform = 'scale(10)';
                caseOh.style.opacity = '0';
                startShredder();
            }
        }, 150);

    }, 2000);

    function startShredder() {
        function spawnMegaImage() {
            const img = new Image();
            const size = Math.floor(Math.random() * 1500) + 1500; 
            img.src = `https://picsum.photos{size}/${size}?random=${Math.random()}`;
            img.style.cssText = `
                position: fixed; top: ${Math.random() * 100}vh; left: ${Math.random() * 100}vw;
                width: ${size}px; z-index: 999999; pointer-events: none;
                filter: contrast(2) saturate(4) drop-shadow(0 0 50px red);
                transition: transform 3s cubic-bezier(0.1, 0, 0.9, 1);
                transform: translate(-50%, -50%) scale(0.01) rotate(0deg);
            `;
            document.body.appendChild(img);
            requestAnimationFrame(() => {
                img.style.transform = `translate(-50%, -50%) scale(10) rotate(${Math.random() * 7200}deg)`;
            });
        }

        setInterval(() => {
            spawnMegaImage();
            document.body.style.transform = `translate(${(Math.random()-0.5)*600}px, ${(Math.random()-0.5)*600}px)`;
            document.documentElement.style.filter = `invert(${Math.random() > 0.5 ? 100 : 0}%) hue-rotate(${Math.random() * 360}deg)`;
            document.title = "SYSTEM_SHATTERED_BY_CASEOH_" + Date.now();
        }, 10);

        setInterval(() => console.error("FATAL_ERROR_MASSIVE_LOAD_" + Date.now()), 1);
    }
})();
