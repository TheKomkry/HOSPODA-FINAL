let alertText = "Otevírací doba přes velikonočí svátky byla zveřejněna v Info & Akce nebo v Otevírací doba \n\nDěkujeme za pochopení.";
let allowAlerts = true;
let alertCode = 'VELIKONOCE2025';
function alertUser() {
    let hasBeenAlerted = localStorage['hasBeenAlerted'] || 'false';
    if (hasBeenAlerted != alertCode && allowAlerts) {
        alert(alertText);
        localStorage['hasBeenAlerted'] = alertCode;
    }
}
