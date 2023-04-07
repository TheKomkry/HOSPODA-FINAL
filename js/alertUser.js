let alertText = "Kvůli svátkům je změna v otevírací době. \nVíce informací na stránce Info & Akce.";
let allowAlerts = true;
let alertCode = 'ALERT_VELIKONOCE_2023';
function alertUser() {
    let hasBeenAlerted = localStorage['hasBeenAlerted'] || 'false';
    if (hasBeenAlerted != alertCode && allowAlerts) {
        alert(alertText);
        localStorage['hasBeenAlerted'] = alertCode;
    }
}