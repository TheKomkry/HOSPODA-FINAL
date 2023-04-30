let alertText = "Pondělí 1. a 8. května ZAVŘENO, státní svátek.\n\nVíce informací na stránce Info & Akce. ";
let allowAlerts = true;
let alertCode = 'ALERT_KVETEN_STATNI-SVATEK_2023';
function alertUser() {
    let hasBeenAlerted = localStorage['hasBeenAlerted'] || 'false';
    if (hasBeenAlerted != alertCode && allowAlerts) {
        alert(alertText);
        localStorage['hasBeenAlerted'] = alertCode;
    }
}