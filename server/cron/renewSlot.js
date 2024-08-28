import cron from 'node-cron'
import { TimeSlot } from '../models/TimeSlot.js';


export const cronScheduler = () => {
    cron.schedule('*/6 * * * * *', async() => {
        const date = Date.now()
        const ndate = new Date(date)
        var hour = ndate.getHours().toString().padStart(2, '0')
        
        console.log('running a task every minute');
        hour = hour*100
        console.log(hour)

        try {
            // Update documents with time within the previous hour
            await TimeSlot.updateMany({
                time_start: { $lt: hour }
            }, { occupied: false });

            console.log('Update successful');
        } catch (error) {
            console.error('Error updating documents:', error);
        }
    
    });
}
