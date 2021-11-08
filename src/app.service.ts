import { Injectable } from '@nestjs/common';
import xlsx from 'xlsx';
import * as fs from 'fs';
import path from 'path';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  saveExcel(file): any {
    try {
      console.log(file, 'filedetails');
      const response = {
        originalName: file.originalname,
        filename: file.filename,
      };
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  readExcel(file): any {
    try {
      let reqPath = path.join(__dirname, '../files/');
      reqPath = `${reqPath}${file}`;
      const workbook = xlsx.readFile(reqPath);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      let posts = [];
      let post = {
        name: '',
        address: '',
        gender: '',
      };
      console.log(worksheet, 'worksheet');
      for (let cell in worksheet) {
        const cellAsString = cell.toString();
        if (cellAsString !== null) {
          if (cellAsString[0] === 'A') {
            post.name = worksheet[cell].v;
          }
          if (cellAsString[0] === 'B') {
            post.address = worksheet[cell].v;
          }
        }
        if (cellAsString[0] === 'C') {
          post.gender = worksheet[cell].v;
          posts.push(post);
          post = {
            name: '',
            address: '',
            gender: '',
          };
        }
      }
      console.log(posts, 'EXCEL!!!');
    } catch (error) {
      console.log(error, '123321');
      throw new Error(error);
    }
  }
}
