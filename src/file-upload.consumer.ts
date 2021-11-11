import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { AppService } from './app.service';
import * as fetch from 'node-fetch';
@Processor('fileUpload')
export class FileUploadConsumer {
  constructor(private readonly appService: AppService) {}
  @Process('studentJob')
  async fileUploadJob (job: Job<any>) {
    let excelRead = await this.appService.readExcel(job.data.fileName);
    if (excelRead) {
      const createAllQuery = `mutation createAllStudents($students: [StudentCreateDTO!]!){
        createAllStudents(students: $students){
            id
        }
    }`;
      await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query:createAllQuery,
          variables: { students: excelRead },
        }),
      }).then((res) => {
      }).catch(error => console.log(error,"ERROR!!"))
    }
  }
  
}
