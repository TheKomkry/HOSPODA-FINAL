let alertText = "Otevírací doba tento týden byla zveřejněna v Info & Akce \n\nDěkujeme za pochopení.";
let allowAlerts = true;
let alertCode = 'STATNISVATEK-1.5.2025';
function alertUser() {
    let hasBeenAlerted = localStorage['hasBeenAlerted'] || 'false';
    if (hasBeenAlerted != alertCode && allowAlerts) {
        alert(alertText);
        localStorage['hasBeenAlerted'] = alertCode;
    }
}
