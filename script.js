let geld = 1000; // Höheres Anfangsbudget
let geliehen = 0; // Geliehenes Geld
let aktien = [
    { name: "Tech Corp", preis: 50, besitz: 0, dividende: Math.random() * 0.06 },
    { name: "Health Inc.", preis: 75, besitz: 0, dividende: Math.random() * 0.06 },
    { name: "Finance Ltd.", preis: 100, besitz: 0, dividende: Math.random() * 0.06 },
    { name: "Energy Co.", preis: 60, besitz: 0, dividende: Math.random() * 0.06 },
    { name: "Auto GmbH", preis: 80, besitz: 0, dividende: Math.random() * 0.06 }
];

let krisenAktiv = false; // Flag für Krisen
let berichtGekauft = false; // Flag für den Bericht

function aktualisiereNachricht() {
    document.getElementById('nachricht').textContent = 
        `Geld: ${geld} € | Geliehen: ${geliehen} €`;
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

    if (geld >= (aktie.preis * anzahl + gebuehr)) {
        geld -= (aktie.preis * anzahl + gebuehr);
        aktie.besitz += anzahl;
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
    
    const gebuehr = 0.02 * (aktie.preis * anzahl); // 2% Verkaufsgebühr

    if (aktie.besitz >= anzahl) {
        geld += (aktie.preis * anzahl - gebuehr);
        aktie.besitz -= anzahl;
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
        const berichtText = "Der Bericht zeigt, dass Tech-Aktien aufgrund neuer Technologien voraussichtlich um 5% steigen könnten, während Gesundheitsaktien volatil bleiben. Finance Ltd. könnte von neuen Regelungen profitieren.";
        document.getElementById('bericht-anzeige').textContent = berichtText;
        alert("Bericht gekauft! Schau dir den Bericht an.");
        aktualisiereNachricht();
    } else {
        alert("Nicht genug Geld für den Bericht!");
    }
});

document.getElementById('bank-leihen').addEventListener('click', function() {
    if (geliehen === 0) {
        geld += 100;
        geliehen += 100;
        alert("Du hast 100 € von der Bank geliehen.");
        setTimeout(zurueckzahlen, 30000); // Rückzahlung nach 30 Sekunden
    } else {
        alert("Du hast bereits Geld geliehen!");
    }
    aktualisiereNachricht();
});

function zurueckzahlen() {
    if (geliehen > 0) {
        geld -= 100; // Rückzahlung von 100 €
        geliehen = 0; // Geld gilt als zurückgezahlt
        alert("Du hast 100 € an die Bank zurückgezahlt.");
        aktualisiereNachricht();
    }
}

function simuliereKrise() {
    krisenAktiv = true;
    aktien.forEach(aktie => {
        aktie.preis *= 0.7; // 30% Preisreduktion
    });
    alert("Eine Krise ist eingetreten! Aktienpreise sind um 30% gefallen.");
    aktualisiereAktienListe();
}

// Simulation einer Krise (z.B. nach einer bestimmten Zeit)
setTimeout(simuliereKrise, 30000); // 30 Sekunden nach dem Start

// Aktienpreise regelmäßig aktualisieren
function aktualisiereAktienpreise() {
    aktien.forEach(aktie => {
        const aenderung = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 10); // Zufällige Änderung zwischen -10 und +10
        aktie.preis = Math.max(0, aktie.preis + aenderung); // Preis nicht negativ werden lassen
    });
    aktualisiereAktienListe();
}

// Aktienpreise alle 30 Sekunden aktualisieren
setInterval(aktualisiereAktienpreise, 30000);

// Dividenden am Ende des Spiels (oder nach einer bestimmten Zeit)
function verteileDividende() {
    aktien.forEach(aktie => {
        if (aktie.besitz > 0) {
            const dividende = aktie.besitz * aktie.preis * aktie.dividende; // Dividende basierend auf dem Besitz und der Dividende
            geld += dividende; // Dividende zum Geld hinzufügen
            alert(`Du hast eine Dividende von ${dividende.toFixed(2)} € für ${aktie.name} erhalten!`);
        }
    });
}

// Dividendenverteilung nach 60 Sekunden (oder zu einem anderen Zeitpunkt)
setTimeout(verteileDividende, 60000); // 60 Sekunden nach dem Start

// Initiale Anzeige
ladeAktienAuswahl();
aktualisiereNachricht();
aktualisiereAktienListe();
