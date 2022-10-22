
function loadMenu(){
    fetch(`./data/nabidka.json`)
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
    load(data.Jidla, "jidla");
    load(data.Napoje, "napoje");
    load(data.Deserty, "deserty");

}
function load(data, type){
    // document.getElementById(type).innerHTML += `<small-date> - ${data.datum}</small-date>`;
    const containerForType = document.getElementById(`${type}-container`);
    
    let listTypu = data;
    listTypu.forEach(element => {
        // li > h2
        const typeListElem = document.createElement("li");
        const typeNazevElem = document.createElement("h2");
        let typeNazev = typeListElem.appendChild(typeNazevElem);
        typeNazev.innerHTML = element.nazev;
        // li > p
        let typePopisElem = document.createElement("p");
        typePopisElem.innerHTML = `${element.mnozstvi} ${element.jednotka} | ${element.cena} Kč`;
        // create the elements
        containerForType.appendChild(typeListElem);
        containerForType.appendChild(typePopisElem);
    });
}