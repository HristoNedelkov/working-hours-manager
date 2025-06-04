fs = require('fs');
module.exports = { makeTable, statistics, getData }
function getData(name) {
    try {
        let data = fs.readFileSync(`../storage/${name}.txt`);
        return JSON.parse(data);    
    } catch (e) {
        return false
    }
}

function makeTable() {
    // template object used for building the table
    let arr = [{
        'Monday': `1h32m2s`,
        'Tuesday': 12,
        'Wednesday': 12,
        'Thursday': 12,
        'Friday': 12,
        'Saturday': 12,
        'Sunday': 12,

    }]
    let array = []
    for (const day in arr[0]) {
        array.push(getData(day))
    }

    array = array.map(el => {
        if (el == false) {
            return '0 hours'
        }

        let t1 = new Date(el[0].time).getTime()
        let t2 = new Date(el[1].time).getTime()
        let inSeconds = parseInt((t2 - t1) / 1000)

        let hours = parseInt(inSeconds / 3600)
        let minutes = Math.floor((inSeconds % 3600) / 60)
        let sec = Math.floor(inSeconds % 60)
        return `${hours}h:${minutes}m:${sec}s`

    })
    
    for (const day in arr[0]) {
        let i = Object.keys(arr[0]).indexOf(day)
        arr[0][day] = array[i]
    }
    console.table(arr)
    return [arr, array]
}


function statistics() {

    console.log(makeTable())
}


