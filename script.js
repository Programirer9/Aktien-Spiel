let geld = 1000; // Höheres Anfangsbudget
let aktien = [
    { name: "Tech Corp", preis: 50, besitz: 0 },
    { name: "Health Inc.", preis: 75, besitz: 0 },
    { name: "Finance Ltd.", preis: 100, besitz: 0 },
    { name: "Energy Co.", preis: 60, besitz: 0 },
    { name: "Auto GmbH", preis: 80, besitz: 0 }
];

let krisenAktiv = false; // Flag für Krisen
let berichtGekauft = false; // Flag für den Bericht

function aktualisiereNachricht() {
    document.getElementById('nachricht').textContent = `Geld: ${geld} €`;
}

function aktualisiereAktienListe() {
    const aktienListe = document.getElementById('aktien-liste');
    aktienListe.innerHTML = '';
    aktien.forEach((aktie) => {
        aktienListe.innerHTML += `
            <tr>
                <td>${aktie.name}</td>
                <td>${aktie.preis} €</td>
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
    
    if (geld >= aktie.preis * anzahl) {
        geld -= aktie.preis * anzahl;
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
    
    if (aktie.besitz >= anzahl) {
        geld += aktie.preis * anzahl;
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
        const berichtText = "Der Bericht zeigt, dass die Tech-Aktien in den kommenden Wochen wahrscheinlich steigen werden, während Gesundheitsaktien volatil bleiben könnten.";
        document.getElementById('bericht-anzeige').textContent = berichtText;
        alert("Bericht gekauft! Schau dir den Bericht an.");
        aktualisiereNachricht();
    } else {
        alert("Nicht genug Geld für den Bericht!");
    }
});

document.getElementById('bank-leihen').addEventListener('click', function() {
    geld += 100;
    alert("Du hast 100 € von der Bank geliehen.");
    aktualisiereNachricht();
});

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

// Initiale Anzeige
ladeAktienAuswahl();
aktualisiereNachricht();
aktualisiereAktienListe();
