

function getNowYYYYMMDDHHmmss() {
    let now = new Date();
    let mon = now.getMonth()+1;
    if(mon < 10) {
        mon = "0" + mon;
    }
    let date = now.getDate();
    if(date < 10) {
        date = "0" + date;
    }
    let hour = now.getHours();
    if(hour < 10) {
        hour = "0" + hour;
    }
    let min = now.getMinutes();
    if(min < 10) {
        min = "0" + min;
    }
    let sec = now.getSeconds();
    if(sec < 10) {
        sec = "0" + sec;
    }
    
    return now.getFullYear() +"-"+mon+"-"+date+" "+hour+":"+min+":"+sec;
}


export default {
    getNowYYYYMMDDHHmmss: getNowYYYYMMDDHHmmss
}
