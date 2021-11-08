import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { BullModule } from '@nestjs/bull';
import { FileUploadService } from './file-upload.service';
import { FileUploadConsumer } from './file-upload.consumer';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 5379,
      },
    }),
    BullModule.registerQueue({
      name: 'fileUpload',
    })
  ],
  controllers: [AppController],
  providers: [AppService,FileUploadService,FileUploadConsumer],
})
export class AppModule {}
