let geld = 100; // Anfangsbudget
let aktienBesitz = 0; // Anzahl der Aktien

document.getElementById('kaufen').addEventListener('click', function() {
    if (geld >= 10) { // Preis pro Aktie
        geld -= 10;
        aktienBesitz += 1;
        aktualisiereNachricht();
    } else {
        document.getElementById('nachricht').textContent = 'Nicht genug Geld!';
    }
});

document.getElementById('verkaufen').addEventListener('click', function() {
    if (aktienBesitz > 0) {
        geld += 10;
        aktienBesitz -= 1;
        aktualisiereNachricht();
    } else {
        document.getElementById('nachricht').textContent = 'Keine Aktien zum Verkaufen!';
    }
});

function aktualisiereNachricht() {
    document.getElementById('nachricht').textContent = 
        `Geld: ${geld} | Aktien: ${aktienBesitz}`;
}
