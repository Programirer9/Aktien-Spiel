console.log("Skript geladen");
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

document.getElementById('ausgaben-einnahmen').addEventListener('click', function() {
    const ausgabenText = ausgaben.length > 0 ? `Ausgaben: ${ausgaben.reduce((a, b) => a + b, 0)} €` : 'Keine Ausgaben';
    const einnahmenText = einnahmen.length > 0 ? `Einnahmen: ${einnahmen.reduce((a, b) => a + b, 0)} €` : 'Keine Einnahmen';
    alert(`${ausgabenText}\n${einnahmenText}`);
});

// Initialisierung
ladeAktienAuswahl();
aktualisiereNachricht();
aktualisiereAktienListe();
