import { Injectable } from '@angular/core';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private dataService: DataService
  ) { }

  postWithFile(url: string, postData: any, files: File[]) {
    let formData: FormData = new FormData();
    formData.append('files', files[0], files[0].name);

    if (!postData) {
      for (let property in postData) {
        if (postData.hasOwnProperty(property)) {
          formData.append(property, postData[property]);
        }
      }
    }

    let returnResponse = new Promise((resolve, reject) => {
      this.dataService.postFile(url, formData).subscribe(
        res => {
          resolve(res)
        },
        error => { console.log(error); reject(error) }
      )
    })
    return returnResponse;
  }
}
