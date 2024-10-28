let geld = 1000; // Höheres Anfangsbudget
let geliehen = 0; // Geliehenes Geld
let zinsen = 0.07; // 7% Zinsen auf geliehenes Geld
let aktien = [
    { name: "Tech Corp", preis: 50, besitz: 0, dividende: Math.random() * 0.06 },
    { name: "Health Inc.", preis: 75, besitz: 0, dividende: Math.random() * 0.06 },
    { name: "Finance Ltd.", preis: 100, besitz: 0, dividende: Math.random() * 0.06 },
    { name: "Energy Co.", preis: 60, besitz: 0, dividende: Math.random() * 0.06 },
    { name: "Auto GmbH", preis: 80, besitz: 0, dividende: Math.random() * 0.06 },
    { name: "Retail AG", preis: 90, besitz: 0, dividende: Math.random() * 0.06 }, // Neue Aktie
    { name: "Travel Inc.", preis: 70, besitz: 0, dividende: Math.random() * 0.06 }, // Neue Aktie
    { name: "Biotech Ltd.", preis: 120, besitz: 0, dividende: Math.random() * 0.06 }, // Neue Aktie
    { name: "Real Estate Co.", preis: 95, besitz: 0, dividende: Math.random() * 0.06 } // Neue Aktie
];

let krisenAktiv = false; 
let berichtGekauft = false; 

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

document.getElementById('kaufen').addEventListener('click', function() {
    const aktieName = document.getElementById('aktie-auswahl').value;
    const anzahl = parseInt(document.getElementById('anzahl').value);
    const aktie = aktien.find(a => a.name === aktieName);
    
    const gebuehr = 0.02 * (aktie.preis * anzahl); // 2% Kaufgebühr
    const gesamtKosten = aktie.preis * anzahl + gebuehr;

    if (geld >= gesamtKosten) {
        geld -= gesamtKosten;
        aktie.besitz += anzahl;
        alert(`Du hast ${anzahl} Aktien von ${aktie.name} gekauft! Gesamtkosten: ${gesamtKosten.toFixed(2)} €`);
        aktualisiereNachricht();
        aktualisiereAktienListe();
    } else {
        alert(`Nicht genug Geld für ${anzahl} Aktien von ${aktie.name}!`);
    }
});

document.getElementById('verkaufen').addEventListener('click', function() {
    const aktieName = document.getElementById('aktie-auswahl').value;
    const anzahl = parseInt(document.getElementById('anzahl').value);
    const aktie = aktien.find(a => a.name === aktieName);
    
    const gebuehr = 0.02 * (aktie.preis * anzahl); // 2% Verkaufsgebühr
    const gesamtEinnahmen = aktie.preis * anzahl - gebuehr;

    if (aktie.besitz >= anzahl) {
        geld += gesamtEinnahmen;
        aktie.besitz -= anzahl;
        alert(`Du hast ${anzahl} Aktien von ${aktie.name} verkauft! Einnahmen: ${gesamtEinnahmen.toFixed(2)} €`);
        aktualisiereNachricht();
        aktualisiereAktienListe();
    } else {
        alert(`Nicht genug Aktien von ${aktie.name} zum Verkaufen!`);
    }
});

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

document.getElementById('bank-leihen').addEventListener('click', function() {
    let leihBetrag = prompt("Wie viel Geld möchtest du leihen? (max. 1000 €)");
    leihBetrag = parseFloat(leihBetrag);
    if (leihBetrag > 0 && leihBetrag <= 1000) {
        geld += leihBetrag;
        geliehen += leihBetrag;
        alert(`Du hast ${leihBetrag.toFixed(2)} € von der Bank geliehen.`);
        setTimeout(zurueckzahlen, 30000); // Rückzahlung nach 30 Sekunden
    } else {
        alert("Bitte gib einen gültigen Betrag ein (1-1000 €).");
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

function simuliereKrise() {
    const krisenProzentsatz = Math.random() * (20 - 10) + 10; // Zufälliger Preisverfall zwischen 10% und 20%
    aktien.forEach(aktie => {
        aktie.preis *= (1 - krisenProzentsatz / 100);
        aktie.preis = Math.max(aktie.preis, 5); // Preis kann nicht unter 5 € sinken
    });
    alert(`Eine Krise ist eingetreten! Aktienpreise sind um ${krisenProzentsatz.toFixed(2)}% gefallen.`);
    aktualisiereAktienListe();
}

// Aktienpreise regelmäßig aktualisieren
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
ladeAktienAuswahl();
aktualisiereNachricht();
aktualisiereAktienListe();
