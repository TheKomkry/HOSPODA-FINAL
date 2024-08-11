let alertText = "Oznamujeme, že z provozních důvodů v týdnu od 5. do 11. srpna 2024 nebudeme vařit. \nOtevírací doba zůstává nezměněna a vše se vrací do normálu od pondělí 12. srpna 2024. \n\nDěkujeme za pochopení.";
let allowAlerts = false;
let alertCode = 'NEVARIME_SRPEN_2024_05-11';
function alertUser() {
    let hasBeenAlerted = localStorage['hasBeenAlerted'] || 'false';
    if (hasBeenAlerted != alertCode && allowAlerts) {
        alert(alertText);
        localStorage['hasBeenAlerted'] = alertCode;
    }
}