import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class FileUploadService {
  constructor(@InjectQueue('fileUpload') private fileUpload: Queue) {}

  async fileUploadAdd (fileName:string)
  {
     await this.fileUpload.add('studentJob',{
      fileName:fileName
    })
  }
}