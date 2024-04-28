let alertText = "OTEVÍRACÍ DOBA\n\nÚTERÝ     30.4.  11.00 - 14.00\nSTŘEDA     1.5.    18.00 - 22.00\n\nVíce informací na stránce Info & Akce. ";
let allowAlerts = true;
let alertCode = 'ALERT_STATNI-SVATEK_24';
function alertUser() {
    let hasBeenAlerted = localStorage['hasBeenAlerted'] || 'false';
    if (hasBeenAlerted != alertCode && allowAlerts) {
        alert(alertText);
        localStorage['hasBeenAlerted'] = alertCode;
    }
}