
function loadMenu(){
    fetch(`./data/Menu.json`)
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
function writeMenu(data){
    loadDay(data.Pondeli, "pondeli");
    loadDay(data.Utery, "utery");
    loadDay(data.Streda, "streda");
    loadDay(data.Ctvrtek, "ctvrtek");
    loadDay(data.Patek, "patek");

}
function loadDay(data, day){
    document.getElementById(day).innerHTML += `<small-date> - ${data.datum}</small-date>`;
    const containerForDay = document.getElementById(`${day.substring(0,2)}-container`);
    
    let listJidel = data.jidla;
    listJidel.forEach(element => {
        // li > h2
        const jidloListElem = document.createElement("li");
        const jidloNazevElem = document.createElement("h2");
        let jidloNazev = jidloListElem.appendChild(jidloNazevElem);
        jidloNazev.innerHTML = element.nazev;
        // li > p
        let jidloPopisElem = document.createElement("p");
        if (element.popis == undefined || element.popis == ""){
            jidloPopisElem.innerHTML = `${element.cena} Kč <small>(${element.mnozstvi} ${element.jednotka})</small>`;
        } else {
            jidloPopisElem.innerHTML = `${element.popis} - ${element.cena} Kč <small>(${element.mnozstvi} ${element.jednotka})</small>`;
        }
        // create the elements
        containerForDay.appendChild(jidloListElem);
        containerForDay.appendChild(jidloPopisElem);
    });
}