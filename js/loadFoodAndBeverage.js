
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
    // load(data.Vikend, "vikend");
    load(data.Napoje, "napoje");
    load(data.Deserty, "deserty");

}
function load(data, type){
    // document.getElementById(type).innerHTML += `<small-date> - ${data.datum}</small-date>`;
    const containerForType = document.getElementById(`${type}-container`);
    
    let listTypu = data;
    let currentType = "";
    let prevItem = "";
    let prevItemContainer;
    listTypu.forEach(element => {
        if (currentType == "" || currentType != element.typ){
            currentTypeContainer = document.createElement("div");
            containerForType.appendChild(currentTypeContainer);
                currentType = element.typ;
                currentTypeContainer.innerHTML += currentType!=undefined?`<h2>─── ${currentType.charAt(0).toUpperCase() + currentType.slice(1).toLowerCase()} ───</h2>`:"";
        }
        // div > li > h2
        if (element.nazev != prevItem){
            const itemContainer = document.createElement("div");
            prevItemContainer = itemContainer;
            currentTypeContainer.appendChild(itemContainer);
            const typeListElem = document.createElement("li");
            const typeNazevElem = document.createElement("h2");
            let typeNazev = typeListElem.appendChild(typeNazevElem);
            typeNazev.innerHTML = element.nazev;
            itemContainer.appendChild(typeListElem);
        }
        // li > p
        let typePopisElem = document.createElement("p");
        if (element.cena != undefined){
            typePopisElem.innerHTML = `${element.cena} Kč`;
        }
        // create the elements
        prevItemContainer.appendChild(typePopisElem);
        prevItem = element.nazev;
    });
}
