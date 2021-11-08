import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor('fileUpload')
export class FileUploadConsumer{
    @Process('studentJob')
    fileUploadJob(job:Job<unknown>){
        console.log(job.data);
    }
}