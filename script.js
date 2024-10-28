let geld = 1000;
let geliehen = 0; 
let aktien = [
    { name: "Tech Corp", preis: 50, besitz: 0, dividende: Math.random() * 0.06 },
    { name: "Health Inc.", preis: 75, besitz: 0, dividende: Math.random() * 0.06 },
    { name: "Finance Ltd.", preis: 100, besitz: 0, dividende: Math.random() * 0.06 },
    { name: "Energy Co.", preis: 60, besitz: 0, dividende: Math.random() * 0.06 },
    { name: "Auto GmbH", preis: 80, besitz: 0, dividende: Math.random() * 0.06 }
];

let krisenAktiv = false; 
let berichtGekauft = false; 
let zinsen = 0.1; // 10% Zinsen auf geliehenes Geld

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

function simuliereKrise() {
    const krisenProzentsatz = Math.random() * (20 - 10) + 10; // Zufälliger Preisverfall zwischen 10% und 20%
    aktien.forEach(aktie => {
        aktie.preis *= (1 - krisenProzentsatz / 100);
        aktie.preis = Math.max(aktie.preis, 5); // Preis kann nicht unter 5 € sinken
    });
    alert(`Eine Krise ist eingetreten! Aktienpreise sind um ${krisenProzentsatz.toFixed(2)}% gefallen.`);
    aktualisiereAktienListe();
}

// Ein Bericht, der regelmäßig aktualisiert werden kann
document.getElementById('bericht').addEventListener('click', function() {
    if (geld >= 50) {
        geld -= 50;
        berichtGekauft = true;
        const berichtText = "Der Bericht zeigt aktuelle Marktanalysen und Trends.";
        document.getElementById('bericht-anzeige').textContent = berichtText;
        alert("Bericht gekauft! Schau dir den Bericht an.");
        aktualisiereNachricht();
    } else {
        alert("Nicht genug Geld für den Bericht!");
    }
});

// Geld leihen, wobei der Benutzer den Betrag bestimmt
document.getElementById('bank-leihen').addEventListener('click', function() {
    let leihBetrag = prompt("Wie viel Geld möchtest du leihen? (max. 100 €)");
    leihBetrag = parseFloat(leihBetrag);
    if (leihBetrag > 0 && leihBetrag <= 100) {
        geld += leihBetrag;
        geliehen += leihBetrag;
        alert(`Du hast ${leihBetrag.toFixed(2)} € von der Bank geliehen.`);
        setTimeout(zurueckzahlen, 30000); // Rückzahlung nach 30 Sekunden
    } else {
        alert("Bitte gib einen gültigen Betrag ein (1-100 €).");
    }
    aktualisiereNachricht();
});

function zurueckzahlen() {
    if (geliehen > 0) {
        let rueckzahlBetrag = geliehen * (1 + zinsen); // Zinsen einrechnen
        geld -= rueckzahlBetrag;
        geliehen = 0; // Geld gilt als zurückgezahlt
        alert(`Du hast ${rueckzahlBetrag.toFixed(2)} € an die Bank zurückgezahlt.`);
        aktualisiereNachricht();
    }
}

// Zufällige Kursänderungen
function aktualisiereAktienpreise() {
    aktien.forEach(aktie => {
        const aenderung = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 10); // Zufällige Änderung zwischen -10 und +10
        aktie.preis = Math.max(5, aktie.preis + aenderung); // Preis nicht unter 5 € lassen
    });
    aktualisiereAktienListe();
}

// Simuliere Krisen und aktualisiere Aktienpreise regelmäßig
setTimeout(simuliereKrise, 30000); // 30 Sekunden nach dem Start
setInterval(aktualisiereAktienpreise, 30000); // Aktienpreise alle 30 Sekunden aktualisieren

// Initiale Anzeige
aktualisiereNachricht();
aktualisiereAktienListe();
