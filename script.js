function goToPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show the target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // TRIGGER: Loading Screen logic
    if (pageId === 'page3') {
        startLoading();
    }

    // TRIGGER: First Receipt Date (Page 4)
    if (pageId === 'page4') {
        const dateElement = document.getElementById('currentDate');
        if (dateElement) {
            dateElement.innerText = new Date().toLocaleString();
        }
    }

    // TRIGGER: Final Session logic (Date + Confetti)
    if (pageId === 'receiptSessionPage') {
        // Set the formatted date
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateDisplay = document.getElementById('todayDate');
        if (dateDisplay) {
            dateDisplay.innerText = today.toLocaleDateString('en-US', options);
        }

        // Launch Confetti!
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff69b4', '#ff1493', '#ffffff']
        });
    }
}

// 2. CHECKBOX LOGIC
function toggleCheckout() {
    const btn = document.getElementById('checkoutBtn');
    const termsCheck = document.getElementById('termsCheck');
    
    if (btn && termsCheck) {
        const checked = termsCheck.checked;
        btn.className = checked ? 'btn-checkout enabled' : 'btn-checkout disabled';
    }
}

// 3. USER REGISTRATION
function saveUserAndLoad() {
    const nameInput = document.getElementById('userName');
    const name = nameInput ? nameInput.value.trim() : "";

    if (!name) {
        alert("Please enter your name to register!");
        return;
    }

    // Set name on both the small and large receipts
    const receiptName = document.getElementById('receiptName');
    if (receiptName) receiptName.innerText = name;

    goToPage('page3');
}

// 4. LOADING BAR LOGIC
function startLoading() {
    const msgs = [
        "Compiling feelings...", 
        "Scanning for red flags...", 
        "Deleting Single.exe...", 
        "Finalizing transaction...", 
        "Updating heart status..."
    ];
    let i = 0;
    
    const progress = document.querySelector('.loading-progress');
    const loadingText = document.getElementById('loading-text');

    if (progress) {
        progress.style.animation = 'none'; // Reset animation
        progress.offsetHeight; // Trigger reflow
        progress.style.animation = 'loadBar 5s linear forwards';
    }

    const interval = setInterval(() => {
        if (i < msgs.length && loadingText) {
            loadingText.innerText = msgs[i];
            i++;
        }
    }, 900);

    setTimeout(() => {
        clearInterval(interval);
        goToPage('page4');
    }, 5000);
}

// 5. DOWNLOAD RECEIPT LOGIC
function downloadReceipt() {
    const receiptElement = document.getElementById('finalReceiptImg');
    
    if (!receiptElement) {
        console.error("Receipt element not found!");
        return;
    }

    html2canvas(receiptElement, {
        scale: 3, 
        backgroundColor: "#d3d3d3"
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'My-Valentine-Receipt.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
} // Fixed: Added this missing closing brace!
