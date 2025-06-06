const fs = require('fs');
const path = require('path');
const { rawListeners } = require('process');
const readline = require('readline');
const {makeTable,statistics} = require('./makeTable');
const {findPath} = require('./findPath');


(() => {

    var time = new Date()
    var obj = { time }
    // Correct order of days starting from Sunday so we can
    // directly use Date.getDay() which returns 0-6 with 0 being Sunday
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let dayTime = time.getHours() <= 11 ? 'morning' : 'evening';
    

    const getData = (day, obj) => {
        try {
            let data = fs.readFileSync(path.join(__dirname, '..', 'storage', `${days[day]}.txt`));
            return JSON.parse(data);
        } catch (e) {

            fs.writeFileSync(path.join(__dirname, '..', 'storage', `${days[day]}.txt`), `[${JSON.stringify(obj)}]`, function (e) { console.log('Here in the CATCH!') })
            return undefined
        }
    }


    var previousText = getData(time.getDay(), obj)

    if (!previousText) {
        console.log(
            `
    First time getting to work today?  
    _______________________________________
    |                                     |
    |               *         Lets        |
    | \\O/        *    *       Get         |   
    |  |       *     *   *    STARTED!    |     #______________________________#   
    |  /\\     *  *    *  *                |      You started working from:                                                                                 
    |         *  *   *   *                |      ${time.getHours()}h:${time.getMinutes()}m:${time.getSeconds()}s on ${days[time.getDay()]} ${dayTime}!
    |        *  __   ---    *             |     #______________________________#
    |      <    (*)  (*)    >             |
    |              @              \\O/     |
    |                              |      |
    |        \\-----------/        /\\      |
    |         \\_________/                 |
    |_____________________________________|                                     
`)
        return
    }
    if (previousText.length >= 2) {

        let t1 = new Date(previousText[0].time).getTime()
        let t2 = new Date(previousText[1].time).getTime()
        let inSeconds = parseInt((t2 - t1) / 1000)

        let hours = parseInt(inSeconds / 3600)
        let minutes = Math.floor((inSeconds % 3600) / 60)
        let sec = Math.floor(inSeconds % 60)
        let endWorkImage = `
        Work is DONE! Nice JOB!  
       _______________________________________
       |                                     |
       |               *                     |
       |\\0/         *    *                   |   
       | |        *     *   *                |     #______________________________#   
       | /\\      *  *    *  *                |      You ended work for:                                                                                 
       |         *  *   *   *                |      ${hours}h:${minutes}m:${sec}s
       |        *  __   ---    *             |      on ${days[time.getDay()]} ${dayTime}!
       |      <    (*)  (*)    >             |     #______________________________#
       |              @             \\0/      |
       |                             |       |
       |        \\-----------/       /\\       |
       |         \\_________/                 |
       |_____________________________________|                                     
         

       `
        console.log(endWorkImage)
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Do you want to see your weekly activity?(y/n) => ', (answer) => {
            if (answer == 'y') {
                makeTable()
            } else {
                console.log('You refused table of your activity. Go take your deserved rest!')
            }
            rl.close();
        });
        return


    }


    console.log(`
    #______________________________#     
      Work Finished at:
      ${time.getHours()}h:${time.getMinutes()}m:${time.getSeconds()}s on ${days[time.getDay()]} ${dayTime}!
    #______________________________#
    `)
    previousText.push(obj)
    previousText = JSON.stringify(previousText)
    fs.writeFileSync(path.join(__dirname, '..', 'storage', `${days[time.getDay()]}.txt`), previousText, function (err) { if (err) return console.log(err) })

})()

