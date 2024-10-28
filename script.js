let geld = 1000; // Anfangsbudget
let geliehen = 0; // Geliehenes Geld
let aktien = [
    { name: "Tech Corp", preis: 50, besitz: 0, dividende: Math.random() * 0.06 },
    { name: "Health Inc.", preis: 75, besitz: 0, dividende: Math.random() * 0.06 },
    { name: "Finance Ltd.", preis: 100, besitz: 0, dividende: Math.random() * 0.06 },
    { name: "Energy Co.", preis: 60, besitz: 0, dividende: Math.random() * 0.06 },
    { name: "Auto GmbH", preis: 80, besitz: 0, dividende: Math.random() * 0.06 },
    { name: "Retail AG", preis: 90, besitz: 0, dividende: Math.random() * 0.06 },
    { name: "Food Inc.", preis: 70, besitz: 0, dividende: Math.random() * 0.06 },
    { name: "Travel Co.", preis: 55, besitz: 0, dividende: Math.random() * 0.06 }
];

let krisenAktiv = false; // Flag für Krisen
let berichtGekauft = false; // Flag für den Bericht
let ziel = 10000; // Zielbetrag
let zeit = 20 * 60 * 1000; // 20 Minuten in Millisekunden
let krisenIntervall = 15000; // Krisen alle 15 Sekunden
let zinsSatz = 0.07; // 7% Zinsen
let ratenzahlungAktiv = false; // Ratenzahlung aktiv
let ratenBetrag = 0; // Betrag der Ratenzahlung

function aktualisiereNachricht() {
    document.getElementById('nachricht').textContent = 
        `Geld: ${geld.toFixed(2)} € | Geliehen: ${geliehen.toFixed(2)} €`;
}

function aktualisiereAktienListe() {
    const aktienListe = document.getElementById('aktien-liste');
    aktienListe.innerHTML = '';
    aktien.forEach((aktie) => {
        aktienListe.innerHTML += `
            <tr>
                <td>${aktie.name}</td>
                <td>${aktie.preis.toFixed(2)} €</td>
                <td>${aktie.besitz}</td>
            </tr>
        `;
    });
}

function ladeAktienAuswahl() {
    const auswahl = document.getElementById('aktie-auswahl');
    aktien.forEach((aktie) => {
        const option = document.createElement('option');
        option.value = aktie.name;
        option.textContent = aktie.name;
        auswahl.appendChild(option);
    });
}

function simuliereKrise() {
    krisenAktiv = true;
    aktien.forEach(aktie => {
        const prozentsatz = Math.random() * (0.4 - 0.1) + 0.1; // Unterschiedliche Rückgänge zwischen 10% und 40%
        aktie.preis *= (1 - prozentsatz);
        aktie.preis = Math.max(aktie.preis, 5); // Preis nicht unter 5 Euro
    });
    alert("Eine Krise ist eingetreten! Aktienpreise sind gefallen.");
    aktualisiereAktienListe();
}

// Häufigere Krisen simulieren
setInterval(simuliereKrise, krisenIntervall);

// Ratenzahlung für geliehenes Geld
function ratenzahlung() {
    if (geliehen > 0 && geld >= ratenBetrag) {
        geld -= ratenBetrag;
        geliehen -= ratenBetrag;
        alert(`Du hast ${ratenBetrag.toFixed(2)} € an die Bank zurückgezahlt.`);
        aktualisiereNachricht();
    }
}

document.getElementById('bank-leihen').addEventListener('click', function() {
    let betrag = parseFloat(prompt("Wie viel Geld möchtest du leihen? (max. 1000 €)"));
    if (betrag <= 1000 && betrag > 0) {
        geld += betrag;
        geliehen += betrag * (1 + zinsSatz); // Zinsen hinzufügen
        alert(`Du hast ${betrag.toFixed(2)} € von der Bank geliehen.`);
        ratenBetrag = betrag / 5; // Beispiel: In 5 Raten zurückzahlen
    } else {
        alert("Ungültiger Betrag! Bitte einen Betrag bis 1000 € wählen.");
    }
});

// Ziel innerhalb der Zeit erreichen
setTimeout(() => {
    if (geld >= ziel) {
        alert("Herzlichen Glückwunsch! Du hast das Ziel erreicht!");
    } else {
        alert("Leider hast du das Ziel nicht erreicht. Versuch es noch einmal!");
    }
}, zeit);

// Berichte verbessern
document.getElementById('bericht').addEventListener('click', function() {
    if (geld >= 50) {
        geld -= 50;
        berichtGekauft = true;
        const berichtText = "Aktien von Tech Corp könnten aufgrund neuer Technologien steigen. Health Inc. ist volatil, während Finance Ltd. von neuen Regelungen profitieren könnte.";
        document.getElementById('bericht-anzeige').textContent = berichtText;
        alert("Bericht gekauft! Schau dir den Bericht an.");
        aktualisiereNachricht();
    } else {
        alert("Nicht genug Geld für den Bericht!");
    }
});

// Initiale Anzeige
ladeAktienAuswahl();
aktualisiereNachricht();
aktualisiereAktienListe();
