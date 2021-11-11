import { Injectable } from '@nestjs/common';
import xlsx from 'xlsx';
import * as fs from 'fs';
import path from 'path';
import moment from 'moment'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  saveExcel(file): any {
    try {
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
        mobileNumber: '',
        dateOfBirth: '',
        age:''
      };
      for (let cell in worksheet) {
        const cellAsString = cell.toString();
        if (cellAsString !== null) {
          if (cellAsString[0] === 'A') {
            post.name = worksheet[cell].v;
          }
          if (cellAsString[0] === 'B') {
            post.gender = worksheet[cell].v;
          }
          if (cellAsString[0] === 'C') {
            post.address = worksheet[cell].v;
          }
          if (cellAsString[0] === 'D') {
            const dob =  worksheet[cell].v;
            const nowDate = moment();
            const editDob =  moment(new Date(Math.round((dob - (25567 + 1)) * 86400 * 1000))).format('YYYY-MM-DD');
            const dobYear = moment(editDob, 'YYYY');
            const age = nowDate.diff(dobYear, 'years');
            post.dateOfBirth =editDob;
            post.age = `${age}`;
          }
        }
        if (cellAsString[0] === 'E') {
          post.mobileNumber = `${worksheet[cell].v}`;
          posts.push(post);
          post = {
            name: '',
            address: '',
            gender: '',
            mobileNumber: '',
            dateOfBirth:'',
            age:''
          };
        }
      }
      posts.splice(0, 1);
      return posts;
    } catch (error) {
      throw new Error(error);
    }
  } 
}
