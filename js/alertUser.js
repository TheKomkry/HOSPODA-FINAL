let alertText = "Kvůli svátkům je změna v otevírací době a v nabídce. Více informací na stránce Info & Akce.";
let allowAlerts = false;
let alertCode = 'ALERT_VANOCNI_2022';
function alertUser() {
    let hasBeenAlerted = localStorage['hasBeenAlerted'] || 'false';
    if (hasBeenAlerted != alertCode && allowAlerts) {
        alert(alertText);
        localStorage['hasBeenAlerted'] = alertCode;
    }
}