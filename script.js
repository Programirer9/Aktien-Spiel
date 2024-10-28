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
let ausgabenEinnahmenListe = []; // Liste für Ausgaben und Einnahmen

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

// Zufällige Kursänderung für Geld
function aendereAktienKurs() {
    let aktieName = document.getElementById('aktie-auswahl').value;
    let aktie = aktien.find(a => a.name === aktieName);
    let aenderung = Math.random() * 20 - 10; // Kurs kann zwischen -10 und +10 ändern
    aktie.preis += aenderung;
    aktie.preis = Math.max(aktie.preis, 5); // Preis nicht unter 5 Euro
    alert(`Der Kurs von ${aktie.name} wurde auf ${aktie.preis.toFixed(2)} € geändert.`);
    aktualisiereAktienListe();
}

// Rückzahlung in Raten
function ratenzahlung() {
    if (geliehen > 0 && geld >= ratenBetrag) {
        geld -= ratenBetrag;
        geliehen -= ratenBetrag;
        alert(`Du hast ${ratenBetrag.toFixed(2)} € an die Bank zurückgezahlt.`);
        aktualisiereNachricht();
    }
}

// Liste der Ausgaben und Einnahmen
function zeigeAusgabenEinnahmen() {
    let ausgabenText = ausgabenEinnahmenListe.length > 0 ? ausgabenEinnahmenListe.join('\n') : "Keine Ausgaben oder Einnahmen vorhanden.";
    alert("Ausgaben und Einnahmen:\n" + ausgabenText);
}

// Dividende zahlen, wenn Aktien unter 10 €
function pruefeDividende() {
    aktien.forEach(aktie => {
        if (aktie.preis < 10 && aktie.besitz > 0) {
            let dividende = aktie.besitz * aktie.preis * 0.07; // 7% Dividende
            geld -= dividende;
            alert(`Du musst eine Dividende von ${dividende.toFixed(2)} € für ${aktie.name} zahlen.`);
            aktualisiereNachricht();
        }
    });
}

// Event Listener für Bankleihen
document.getElementById('bank-leihen').addEventListener('click', function() {
    let betrag = parseFloat(prompt("Wie viel Geld möchtest du leihen? (max. 1000 €)"));
    if (betrag <= 1000 && betrag > 0) {
        geld += betrag;
        geliehen += betrag * (1 + zinsSatz); // Zinsen hinzufügen
        ausgabenEinnahmenListe.push(`Geliehen: ${betrag.toFixed(2)} €`);
        alert(`Du hast ${betrag.toFixed(2)} € von der Bank geliehen.`);
        ratenBetrag = betrag / 5; // Beispiel: In 5 Raten zurückzahlen
    } else {
        alert("Ungültiger Betrag! Bitte einen Betrag bis 1000 € wählen.");
    }
});

// Event Listener für Berichte
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

// Event Listener für Kursänderung
document.getElementById('kurs-aendern').addEventListener('click', aendereAktienKurs);

// Event Listener für Ausgaben und Einnahmen anzeigen
document.getElementById('zeige-ausgaben').addEventListener('click', zeigeAusgabenEinnahmen);

// Initiale Anzeige
ladeAktienAuswahl();
aktualisiereNachricht();
aktualisiereAktienListe();

// Prüfen und Zinsen bei Dividenden
setInterval(pruefeDividende, 5000); // Alle 5 Sekunden prüfen
