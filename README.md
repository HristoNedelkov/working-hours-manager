# working-hours-manager

This app will help with not burning out.

## How it works

1. **Start your day**
   - Run `node src/index.js` when you begin working. The app saves the start time and shows a friendly ASCII message.
2. **Finish your day**
   - Run the same command when you are done. It records the end time.
3. **See the summary**
   - Running the command again prints a *Work is DONE!* banner and asks if you want to view your weekly activity.
4. **View weekly activity** (optional)
   - Reply with `y` and a table with your working hours for the week appears.
5. **Stored data**
   - Times are kept in the `storage` folder in files named after each day of the week.
