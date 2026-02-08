function goToPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');

    if (pageId === 'page3') startLoading();

    if (pageId === 'page4') {
        const now = new Date();
        document.getElementById('currentDate').innerText = "Date: " + now.toLocaleDateString() + " " + now.toLocaleTimeString();
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
    
    const progress = document.querySelector('.loading-progress');
    progress.style.animation = 'loadBar 5s linear forwards';

    const interval = setInterval(() => {
        if (i < msgs.length) {
            document.getElementById('loading-text').innerText = msgs[i];
            i++;
        }
    }, 900);

    setTimeout(() => {
        clearInterval(interval);
        goToPage('page4');
    }, 5000);
}
