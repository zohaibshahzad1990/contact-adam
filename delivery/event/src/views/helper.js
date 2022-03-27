

export function getdateString(date) {
    try {
        let m = date.getMonth() + 1;
        let d = date.getDate();
        if (m.toString().length == 1) {
            m = "0" + m.toString();
        }
        else {
            m = m.toString();
        }
        if (d.toString().length == 1) {
            d = "0" + d.toString();
        }
        else {
            d = d.toString();
        }
        return `${date.getFullYear()}-${m}-${d}`;
    }
    catch (e) {
        return date;
    }
}

