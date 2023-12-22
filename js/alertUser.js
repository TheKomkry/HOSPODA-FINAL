let alertText = "Změny v otevírací době a nabídky přes svátky \n\nVíce informací na stránce Info & Akce. ";
let allowAlerts = true;
let alertCode = 'ALERT_VANOCE_2023';
function alertUser() {
    let hasBeenAlerted = localStorage['hasBeenAlerted'] || 'false';
    if (hasBeenAlerted != alertCode && allowAlerts) {
        alert(alertText);
        localStorage['hasBeenAlerted'] = alertCode;
    }
}