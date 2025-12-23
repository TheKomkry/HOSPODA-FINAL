let alertText = "Otevírací doba tyto vánoce byla zveřejněna v Info & Akce \n\nDěkujeme za pochopení.";
let allowAlerts = true;
let alertCode = 'VANOCE25';
function alertUser() {
    let hasBeenAlerted = localStorage['hasBeenAlerted'] || 'false';
    if (hasBeenAlerted != alertCode && allowAlerts) {
        alert(alertText);
        localStorage['hasBeenAlerted'] = alertCode;
    }
}
