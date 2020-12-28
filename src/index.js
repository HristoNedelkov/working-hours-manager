fs = require('fs');
const readline = require('readline');
(() => {




    var time = new Date()
    var obj = { time }
    var days = ['Monday', 'Tuesday', 'Thursday', 'Wednesday', 'Friday', 'Saturday', 'Sunday']
    let dayTime = time.getHours() <= 11 ? 'morning' : 'evening';

    const getData = (day, obj) => {
        var days = ['Monday', 'Tuesday', 'Thursday', 'Wednesday', 'Friday', 'Saturday', 'Sunday']
        try {
            let data = fs.readFileSync(`../storage/${days[day - 1]}.txt`);
            return JSON.parse(data);
        } catch (e) {

            fs.writeFileSync(`../storage/${days[day - 1]}.txt`, `[${JSON.stringify(obj)}]`, function (e) { console.log('Here in the CATCH!') })
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
    |         *  *   *   *                |      ${time.getHours()}h:${time.getMinutes()}m:${time.getSeconds()}s on ${days[time.getDay() - 1]} ${dayTime}! 
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
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Do you want to start new task? *yes/no* =>  ', (answer) => {
            // TODO: Log the answer in a database
            if (answer == 'yes') {
                console.log(`You will proceed  ${answer}`);
            } else {
                let t1 = new Date(previousText[0].time).getTime()
                let t2 = new Date(previousText[1].time).getTime()
                let inSeconds = parseInt((t2 - t1) / 1000)

                let hours = parseInt(inSeconds / 3600)
                let minutes = Math.floor((inSeconds % 3600) / 60)
                let sec = Math.floor(inSeconds % 60)
                let endWorkImage = `
        Work is DONE! Nice JOB!  
       ______________________________________
       |                                     |
       |               *                     |
       |\\0/         *    *                   |   
       | |        *     *   *                |     #______________________________#   
       | /\\      *  *    *  *                |      You ended work in:                                                                                 
       |         *  *   *   *                |      ${hours}h:${minutes}m:${sec}s 
       |        *  __   ---    *             |     #______________________________#
       |      <    (*)  (*)    >             |
       |              @             \\0/      |
       |                             |       |
       |        \\-----------/       /\\       |
       |         \\_________/                 |
       |_____________________________________|                                     
         

       `
                console.log(endWorkImage)

            }
                rl.close();
            });
            return

    }




    for (let i = 1; i <= 4; i++) {
        console.log('Loading... ' + `( ${i * 25}% )`)
    }
    console.log(`
    #______________________________#     
      Work Finished at:
      ${time.getHours()}h:${time.getMinutes()}m:${time.getSeconds()}s on ${days[time.getDay() - 1]} ${dayTime}!
    #______________________________#
    `)
    previousText.push(obj)
    previousText = JSON.stringify(previousText)
    fs.writeFile(`../storage/${days[time.getDay() - 1]}.txt`, previousText, function (err) { if (err) return console.log(err) })

})()

