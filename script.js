let geld = 1000; // Höheres Anfangsbudget
let aktien = [
    { name: "Tech Corp", preis: 50, besitz: 0 },
    { name: "Health Inc.", preis: 75, besitz: 0 },
    { name: "Finance Ltd.", preis: 100, besitz: 0 }
];

function aktualisiereNachricht() {
    document.getElementById('nachricht').textContent = 
        `Geld: ${geld} €`;
}

function aktualisiereAktienListe() {
    const aktienListe = document.getElementById('aktien-liste');
    aktienListe.innerHTML = '';
    aktien.forEach((aktie, index) => {
        aktienListe.innerHTML += `
            <tr>
                <td>${aktie.name}</td>
                <td>${aktie.preis} €</td>
                <td>${aktie.besitz}</td>
            </tr>
        `;
    });
}

document.getElementById('kaufen').addEventListener('click', function() {
    const anzahl = parseInt(document.getElementById('anzahl').value);
    aktien.forEach(aktie => {
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
});

document.getElementById('verkaufen').addEventListener('click', function() {
    const anzahl = parseInt(document.getElementById('anzahl').value);
    aktien.forEach(aktie => {
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
});

// Initiale Anzeige
aktualisiereNachricht();
aktualisiereAktienListe();

