let alertText = "Víkendová nabídka\n\nOd 16. 5. 2026 opět vaříme víkendové obědy. Více informací najdete v sekci 'Jídelní a Nápojový lístek' na našem webu.";
let allowAlerts = true;
let alertCode = 'VIKEND_VARIME';
function alertUser() {
    let hasBeenAlerted = localStorage['hasBeenAlerted'] || 'false';
    if (hasBeenAlerted != alertCode && allowAlerts) {
        alert(alertText);
        localStorage['hasBeenAlerted'] = alertCode;
    }
}
