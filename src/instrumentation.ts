
import schedule from 'node-schedule';
import { importService } from './server/service/import-service';

export function register()
{
  if (process.env.NEXT_RUNTIME === 'nodejs')
  {
    Object.keys(schedule.scheduledJobs).forEach((jobName) =>
    {
      console.log("Cancel Job:", schedule?.scheduledJobs[jobName])
      schedule.cancelJob(schedule?.scheduledJobs[jobName] ?? "");
    });
    console.log("Starting import job");
    schedule.scheduleJob('* * * * *', async () =>
    {
      try
      {
        console.log("Running cron job")
        await importService.saveApiData();
      }
      catch (e)
      {
        console.log("Something went wrong");
      }
    });
  }
}
