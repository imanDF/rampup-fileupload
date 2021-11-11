import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { diskStorage } from 'multer';
import { editFileName } from './utils/file-uploading.utils';
import { FileUploadService } from './file-upload.service';
import { FileUploadConsumer } from './file-upload.consumer';
import { Job } from 'bull';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fileUploadService: FileUploadService,
    private readonly fileUploadConsumer: FileUploadConsumer,
  ) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
    }),
  )
  async uploadFile(@UploadedFile() file, @Res() res): Promise<any> {
    try {
      const readExcel = await this.appService.saveExcel(file);
      if (readExcel) {
        this.fileUploadService.fileUploadAdd(file.originalname);
      }
      return res.send(readExcel);
    } catch (error) {
      res
        .status(400)
        .send({ message: 'error', body: { message: error.message } });
    }
  }
}
