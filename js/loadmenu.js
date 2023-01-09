
function loadMenu(){
    fetch(`./data/menu.json`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        writeMenu(data);
    })
    .catch(err => {
        console.error(err);
    });
}
tyden = [];
delkaMesice = {1:31, 2:28, 3:31, 4:30, 5:31, 6:30, 7:31, 8:31, 9:30, 10:31, 11:30, 12:31};
function loadDate(data){
    den = data.den;
    mesic = data.mesic;
    rok = data.rok;
    tyden.push(`${den.toString().length==2?den:"0"+den}.${mesic.toString().length==2?mesic:"0"+mesic}.${rok}`);

    for (let dayNum = 0; dayNum < 5; dayNum++) {
        den++;
        if (den > delkaMesice[mesic]) {
            den = 1;
            mesic++;
            if (mesic > 12) {
                mesic = 1;
                rok++;
                
            }
        }
        tyden.push(`${den.toString().length==2?den:"0"+den}.${mesic.toString().length==2?mesic:"0"+mesic}.${rok}`);        
    }
}
function writeMenu(data){
    loadDate(data.zacatekTydne);
    loadDay(data.Pondeli, "pondeli");
    loadDay(data.Utery, "utery");
    loadDay(data.Streda, "streda");
    loadDay(data.Ctvrtek, "ctvrtek");
    loadDay(data.Patek, "patek");

}
dniNacteno = 0;
function loadDay(data, day){
    document.getElementById(day).innerHTML += `<small-date> - ${tyden[dniNacteno]}</small-date>`;
    dniNacteno++;
    const containerForDay = document.getElementById(`${day.substring(0,2)}-container`);
    
    let listJidel = data.jidla;
    if (listJidel.length == 0){
        let noFood = document.createElement("p");
        noFood.innerHTML = "Na tento den nejsou žádná jídla, pro více informací klikněte zde <a href='/info'>INFO & AKCE</a>";
        containerForDay.appendChild(noFood);
    }
    listJidel.forEach(element => {
        // li > h2
        const jidloListElem = document.createElement("li");
        const jidloNazevElem = document.createElement("h2");
        let jidloNazev = jidloListElem.appendChild(jidloNazevElem);
        jidloNazev.innerHTML = element.nazev;
        // li > p
        let jidloPopisElem = document.createElement("p");
        if (element.popis == undefined || element.popis == ""){
            if (element.cena == 0 || element.cena == undefined){
                jidloPopisElem.innerHTML = `v ceně menu`;
            }
            else {
            jidloPopisElem.innerHTML = `${element.cena} Kč`;
            }
            // jidloPopisElem.innerHTML = `${element.cena} Kč <small>(${element.mnozstvi} ${element.jednotka})</small>`;
        } else {
            if (element.cena == 0){
                jidloPopisElem.innerHTML = `v ceně menu`;
            }
            else {
            jidloPopisElem.innerHTML = `${element.popis} - ${element.cena} Kč`;
            }
            // jidloPopisElem.innerHTML = `${element.popis} - ${element.cena} Kč <small>(${element.mnozstvi} ${element.jednotka})</small>`;
        }
        // create the elements
        containerForDay.appendChild(jidloListElem);
        containerForDay.appendChild(jidloPopisElem);
    });
}