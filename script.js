function goToPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    if (pageId === 'page3') startLoading();
    
    if (pageId === 'page4') {
        document.getElementById('currentDate').innerText = "Date: " + new Date().toLocaleDateString();
    }
}

function toggleCheckout() {
    const btn = document.getElementById('checkoutBtn');
    const isChecked = document.getElementById('termsCheck').checked;
    btn.className = isChecked ? 'btn-checkout enabled' : 'btn-checkout disabled';
}

function saveUserAndLoad() {
    const name = document.getElementById('userName').value;
    if (!name) {
        alert("Please enter your name to register!");
        return;
    }
    document.getElementById('receiptName').innerText = name;
    goToPage('page3');
}

function startLoading() {
    const msgs = ["Compiling feelings...", "Scanning for red flags...", "Deleting Single.exe...", "Finalizing transaction...", "Updating heart status..."];
    let i = 0;
    const interval = setInterval(() => {
        document.getElementById('loading-text').innerText = msgs[i % msgs.length];
        i++;
    }, 900);

    setTimeout(() => {
        clearInterval(interval);
        goToPage('page4');
    }, 5000);
}