
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
    // load(data.Jidla, "jidla");
    load(data.Vikend, "vikend");
    load(data.Napoje, "napoje");
    load(data.Deserty, "deserty");

}
function load(data, type){
    // document.getElementById(type).innerHTML += `<small-date> - ${data.datum}</small-date>`;
    const containerForType = document.getElementById(`${type}-container`);
    const isFoodType = type === "vikend" || type === "jidla";
    
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
            itemContainer.classList.add("menu-card");
            itemContainer.classList.add(isFoodType ? "food-card" : "other-card");
            prevItemContainer = itemContainer;
            currentTypeContainer.appendChild(itemContainer);
            const typeListElem = document.createElement("li");
            const typeNazevElem = document.createElement("h2");
            let typeNazev = typeListElem.appendChild(typeNazevElem);
            typeNazev.innerHTML = element.nazev;
            itemContainer.appendChild(typeListElem);
        }
        const detailParts = [];
        let priceText = "";
        const hasMnozstvi = element.mnozstvi != undefined && element.jednotka != undefined;
        const mnozstviText = hasMnozstvi ? `${element.mnozstvi}${element.jednotka}` : "";

        if (element.popis != undefined && element.popis.trim() !== "") {
            detailParts.push(element.popis.trim());
        }

        if (element.cena != undefined) {
            if (hasMnozstvi) {
                priceText = `${mnozstviText} - ${element.cena}&nbsp;Kč`;
            }
            else {
                priceText = `${element.cena}&nbsp;Kč`;
            }
        }
        else if (hasMnozstvi) {
            priceText = mnozstviText;
        }

        const detailsText = detailParts.join(" - ");

        if (detailsText !== "") {
            let typePopisElem = document.createElement("p");
            typePopisElem.innerHTML = detailsText;
            prevItemContainer.appendChild(typePopisElem);
        }

        if (priceText !== "") {
            let typeCenaElem = document.createElement("p");
            typeCenaElem.classList.add("price-line", "price-no-wrap");
            typeCenaElem.innerHTML = priceText;
            prevItemContainer.appendChild(typeCenaElem);
        }
        prevItem = element.nazev;
    });
}
