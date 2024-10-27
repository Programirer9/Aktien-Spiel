let geld = 100; // Anfangsbudget
let aktienBesitz = 0; // Anzahl der Aktien
let aktienPreis = 10; // Startpreis pro Aktie
let aktionHistory = []; // Historie der Transaktionen

function aktualisiereNachricht() {
    document.getElementById('nachricht').textContent = 
        `Geld: ${geld} € | Aktien: ${aktienBesitz} | Preis pro Aktie: ${aktienPreis} €`;
}

function aktualisiereHistorie(transaktion) {
    aktionHistory.push(transaktion);
    const historieDiv = document.getElementById('historie');
    historieDiv.innerHTML = '<h3>Transaktionshistorie:</h3>';
    aktionHistory.forEach(item => {
        historieDiv.innerHTML += `<p>${item}</p>`;
    });
}

document.getElementById('kaufen').addEventListener('click', function() {
    if (geld >= aktienPreis) {
        geld -= aktienPreis;
        aktienBesitz += 1;
        let transaktion = `Aktie gekauft für ${aktienPreis} €`;
        aktienPreis = Math.floor(Math.random() * 20) + 5; // Preis zwischen 5 und 25
        aktualisiereNachricht();
        aktualisiereHistorie(transaktion);
        alert(`Du hast 1 Aktie gekauft! Neuer Preis: ${aktienPreis} €`);
    } else {
        document.getElementById('nachricht').textContent = 'Nicht genug Geld!';
    }
});

document.getElementById('verkaufen').addEventListener('click', function() {
    if (aktienBesitz > 0) {
        geld += aktienPreis;
        aktienBesitz -= 1;
        let transaktion = `Aktie verkauft für ${aktienPreis} €`;
        aktienPreis = Math.floor(Math.random() * 20) + 5; // Preis zwischen 5 und 25
        aktualisiereNachricht();
        aktualisiereHistorie(transaktion);
        alert(`Du hast 1 Aktie verkauft! Neuer Preis: ${aktienPreis} €`);
    } else {
        document.getElementById('nachricht').textContent = 'Keine Aktien zum Verkaufen!';
    }
});

// Initiale Anzeige der Nachricht
aktualisiereNachricht();
