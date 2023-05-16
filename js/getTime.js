(function () {
    function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }

    function startTime() {
        var today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds());
        document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
        t = setTimeout(function () {
            startTime()
            isOpen();
        }, 500);
    }
    startTime();
})();
const pondeli = getOpenHours('pondeli');
const utery = getOpenHours('utery');
const streda = getOpenHours('streda');
const ctvrtek = getOpenHours('ctvrtek');
const patek = getOpenHours('patek');
const sobota = getOpenHours('sobota');
const nedele = getOpenHours('nedele');
const openHours = {
    1: { morning: [pondeli[0].split(' - ')[0], pondeli[0].split(' - ')[1]],
        afternoon: [pondeli[1].split(' - ')[0], pondeli[1].split(' - ')[1]] },
    2: { morning: [utery[0].split(' - ')[0], utery[0].split(' - ')[1]],
        afternoon: [utery[1].split(' - ')[0], utery[1].split(' - ')[1]] },
    3: { morning: [streda[0].split(' - ')[0], streda[0].split(' - ')[1]],
        afternoon: [streda[1].split(' - ')[0], streda[1].split(' - ')[1]] },
    4: { morning: [ctvrtek[0].split(' - ')[0], ctvrtek[0].split(' - ')[1]],
        afternoon: [ctvrtek[1].split(' - ')[0], ctvrtek[1].split(' - ')[1]] },
    5: { morning: [patek[0].split(' - ')[0], patek[0].split(' - ')[1]],
        afternoon: [patek[1].split(' - ')[0], patek[1].split(' - ')[1]] },
    6: { morning: [sobota[0].split(' - ')[0], sobota[0].split(' - ')[1]],
        afternoon: [sobota[1].split(' - ')[0], sobota[1].split(' - ')[1]] },
    0: { morning: [nedele[0].split(' - ')[0], nedele[0].split(' - ')[1]],
        afternoon: [nedele[1].split(' - ')[0], nedele[1].split(' - ')[1]] }
}

function getOpenHours(day){
    var day = document.getElementById(day);
    if (day.classList.contains('closed')) return ['NaN - NaN', 'NaN - NaN'];
    var childNum = day.childElementCount;
    var openHoursString = (childNum == 4) ? [day.children[2].innerHTML, day.children[2].innerHTML] : [day.children[2].innerHTML, day.children[3].innerHTML];
    return openHoursString;
}
function isOpen(){
    var textContainer = document.getElementById('openStatus');
    var now = getCurrentTime();
    var daynum = new Date().getDay();
    var todayOpenHours = openHours[daynum];
    // find next open day and get its index NOT today
    var numOfClosedDays = 0;
    var nextOpenDay = daynum;
    while (numOfClosedDays < 7){
        nextOpenDay = (nextOpenDay == 6) ? 0 : nextOpenDay + 1;
        if (openHours[nextOpenDay].morning[0] != "NaN") break;
        numOfClosedDays++;
    }
    if (numOfClosedDays > 6){
        textContainer.innerHTML = 'Tento týden máme zavřeno.';
        textContainer.style.color = 'rgb(251, 102, 122)';
        return;
    }

    var dayIndexToName = {0: "v neděli", 1: "v pondělí", 2: "v úterý", 3: "ve středu", 4: "ve čtvrtek", 5: "v pátek", 6: "v sobotu"};
    var tommorowOpenHours = openHours[nextOpenDay]

    if (inRange(convertToSeconds(now), convertToSeconds(todayOpenHours.morning[0]), convertToSeconds(todayOpenHours.morning[1])) || inRange(convertToSeconds(now), convertToSeconds(todayOpenHours.afternoon[0]), convertToSeconds(todayOpenHours.afternoon[1]))){
        textContainer.innerHTML = 'Otevřeno do ' + (inRange(convertToSeconds(now), convertToSeconds(todayOpenHours.morning[0]), convertToSeconds(todayOpenHours.morning[1])) ? todayOpenHours.morning[1] : todayOpenHours.afternoon[1]);
        textContainer.style.color = 'lime';
        return;
    }
    // polední pauza
    if (inRange(convertToSeconds(now), convertToSeconds(todayOpenHours.morning[1]), convertToSeconds(todayOpenHours.afternoon[0]))){
        textContainer.innerHTML = 'Polední pauza, otevřeno od ' + todayOpenHours.afternoon[0];
        textContainer.style.color = '#FB667A';
        return;
    }
    // dnes před otevřením
    if (convertToSeconds(now) < convertToSeconds(todayOpenHours.morning[0])){
        textContainer.innerHTML = 'Zavřeno, dnes otevřeno od ' + todayOpenHours.morning[0];
        textContainer.style.color = '#FB667A';
        return;
    }
    // dnes po zavření, příští otevření
    if (convertToSeconds(now) > convertToSeconds(todayOpenHours.afternoon[1])){
        textContainer.innerHTML = 'Zavřeno, otevřeno ' + dayIndexToName[nextOpenDay] + ' od ' + tommorowOpenHours.morning[0];
        textContainer.style.color = '#FB667A';
        return;
    }
}   
function convertToSeconds(time){
    var hours = time.split(':')[0];
    var minutes = time.split(':')[1];
    var totalSeconds = (hours * 3600) + (minutes * 60);
    return totalSeconds;
}
function inRange(x, min, max) {
    return ((x-min)*(x-max) <= 0);
}
function getCurrentTime(){
    return `${new Date().getHours()}:${new Date().getMinutes()}`
}