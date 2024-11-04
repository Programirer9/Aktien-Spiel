let geld = 1000; 
let geliehen = 0; 
let einnahmen = []; // Array für Einnahmen
let ausgaben = []; // Array für Ausgaben

let aktien = [
    { name: "Tech Corp", preis: 50, besitz: 0 },
    { name: "Health Inc.", preis: 75, besitz: 0 },
    { name: "Finance Ltd.", preis: 100, besitz: 0 },
    { name: "Energy Co.", preis: 60, besitz: 0 },
    { name: "Auto GmbH", preis: 80, besitz: 0 },
    { name: "Real Estate Group", preis: 120, besitz: 0 },
    { name: "Retail Chain", preis: 90, besitz: 0 },
    { name: "Biotech LLC", preis: 110, besitz: 0 }
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

function speichereEinnahme(betrag) {
    einnahmen.push(betrag);
}

function speichereAusgabe(betrag) {
    ausgaben.push(betrag);
}

document.getElementById('kaufen').addEventListener('click', function() {
    const aktieName = document.getElementById('aktie-auswahl').value;
    const anzahl = parseInt(document.getElementById('anzahl').value);
    const aktie = aktien.find(a => a.name === aktieName);
    
    const gesamtKosten = aktie.preis * anzahl;

    if (geld >= gesamtKosten) {
        geld -= gesamtKosten;
        aktie.besitz += anzahl;
        speichereAusgabe(gesamtKosten); // Ausgabe speichern
        alert(`Du hast ${anzahl} Aktien von ${aktie.name} gekauft!`);
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
    
    if (aktie.besitz >= anzahl) {
        const gesamtEinnahme = aktie.preis * anzahl;
        geld += gesamtEinnahme;
        aktie.besitz -= anzahl;
        speichereEinnahme(gesamtEinnahme); // Einnahme speichern
        alert(`Du hast ${anzahl} Aktien von ${aktie.name} verkauft!`);
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
        const berichtText = "Die Märkte zeigen Anzeichen von Stabilität. Tech-Aktien könnten steigen.";
        document.getElementById('bericht-anzeige').textContent = berichtText;
        alert("Bericht gekauft! Schau dir den Bericht an.");
        aktualisiereNachricht();
    } else {
        alert("Nicht genug Geld für den Bericht!");
    }
});

document.getElementById('bank-leihen').addEventListener('click', function() {
    const leihbetrag = parseInt(prompt("Wie viel Geld möchtest du leihen? (Maximal 1000 €)"));
    if (leihbetrag > 0 && leihbetrag <= 1000 && geliehen + leihbetrag <= 1000) {
        geld += leihbetrag;
        geliehen += leihbetrag;
        alert(`Du hast ${leihbetrag} € von der Bank geliehen. Zinsen: 7%`);
        setTimeout(zurueckzahlen, 30000); // Rückzahlung nach 30 Sekunden
    } else {
        alert("Ungültiger Betrag!");
    }
    aktualisiereNachricht();
});

function zurueckzahlen() {
    if (geliehen > 0) {
        geld -= geliehen * 0.07; // Zinsen
        geliehen = 0; 
        alert("Du hast deine Schulden zurückgezahlt.");
        aktualisiereNachricht();
    }
}

function simuliereKrise() {
    krisenAktiv = true;
    aktien.forEach(aktie => {
        const verlust = Math.random() * (30 - 10) + 10; // Zufälliger Verlust zwischen 10% und 30%
        aktie.preis *= (1 - verlust / 100);
        if (aktie.preis < 10) {
            alert(`Achtung! ${aktie.name} ist unter 10 € gefallen. Dividende von 7% fällig.`);
        }
    });
    alert("Eine Krise ist eingetreten! Aktienpreise sind gefallen.");
    aktualisiereAktienListe();
}

setInterval(simuliereKrise, 60000); // Krise alle 60 Sekunden

function aktualisiereAktienpreise() {
    aktien.forEach(aktie => {
        const aenderung = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 10); 
        aktie.preis = Math.max(5, aktie.preis + aenderung); // Preis nicht unter 5 €
    });
    aktualisiereAktienListe();
}

setInterval(aktualisiereAktienpreise, 30000);

// Event Listener für Einnahmen/Ausgaben anzeigen
document.getElementById('ausgaben-einnahmen').addEventListener('click', function() {
    const ausgabenText = ausgaben.length > 0 ? `Ausgaben: ${ausgaben.reduce((a, b) => a + b, 0)} €` : 'Keine Ausgaben';
    const einnahmenText = einnahmen.length > 0 ? `Einnahmen: ${einnahmen.reduce((a, b) => a + b, 0)} €` : 'Keine Einnahmen';
    alert(`${ausgabenText}\n${einnahmenText}`);
});

// Initialisierung
ladeAktienAuswahl();
aktualisiereNachricht();
aktualisiereAktienListe();
