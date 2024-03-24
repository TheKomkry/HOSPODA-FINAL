let alertText = "Pátek 29. 3. 2024 vaříme dle stálé nabídky.";
let allowAlerts = true;
let alertCode = 'ALERT_VALIKONOCE_2024';
function alertUser() {
    let hasBeenAlerted = localStorage['hasBeenAlerted'] || 'false';
    if (hasBeenAlerted != alertCode && allowAlerts) {
        alert(alertText);
        localStorage['hasBeenAlerted'] = alertCode;
    }
}