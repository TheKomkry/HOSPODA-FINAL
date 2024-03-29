let alertText = "Sobota 30.3. a 1.4. - ZAVŘENO\n\nVíce informací na stránce Info & Akce. ";
let allowAlerts = true;
let alertCode = 'ALERT_VELIKONOCE_24';
function alertUser() {
    let hasBeenAlerted = localStorage['hasBeenAlerted'] || 'false';
    if (hasBeenAlerted != alertCode && allowAlerts) {
        alert(alertText);
        localStorage['hasBeenAlerted'] = alertCode;
    }
}