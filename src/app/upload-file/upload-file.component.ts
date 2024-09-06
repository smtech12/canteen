import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApilayerService} from 'src/app/apilayer.service'
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
const URL = 'http://localhost:48484/api/upload'
import {Video} from 'src/app/Models/VideoMedia'
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})

export class UploadFileComponent implements OnInit {




  imageUrl='';
  uploadedFiles: Array < File > ;
  medias=[];
  fileUrl='http://localhost:48484/api/downloadVideo?videoName=sound2.mp4';
  constructor(private http: HttpClient,private renderer: Renderer2,
    public apiService:ApilayerService,private sanitizer: DomSanitizer) {

   }

  ngOnInit() {
    debugger;
    this.getMedias();
  }


  onFileChanged(event) {

    console.log("Event");
    console.log(event);

    this.imageUrl = event.target.files[0].name;//; for testing
    // this.imageUrl=event.target.result;
       this.uploadedFiles=event.target.files;//[0].name;
       this.uploadFile();


  }

  getMedias() {
    this.apiService.getAllMedias().subscribe(
      (res) => {
        console.log(res);
        res.forEach(data=>{
            let temp =new Video()
            temp.MediaID=data.MediaID;
            temp.Name=data.Name;
            temp.Url=data.Url;
            temp.isActive=data.isActive;
            temp.DateCreated=data.DateCreated;
            //fileUrl='http://localhost:2668/api/downloadVideo?videoName=sound2.mp4';
            temp.downloadUrl=this.apiService.BaselocalUrl+'downloadVideo?videoName='+temp.Name;
            this.medias.push(temp);

        });
        // this.medias = new Array();
        // this.medias = res;
        // console.log(this.medias);
        //add urlLink

      },
      (error) => {
        console.log(error);
      }
    )
  }
  getDate(date) {
    if (date != undefined && date != null) {
      var d = moment(date);
      // return d.format('YYYY-MM-DD');
      return d.format('DD-MM-YYYY');
    }
    return 'N/A';
  }
  delete(mediaId){
    this.apiService.deleteMediaById(mediaId).subscribe(
      (res) => {
        console.log(res);
        this.getMedias();
      },
      (error) => {
        console.log(error);
      }
    )
  }


  downloadVideo(video){

    this.apiService.downloadVideoByName(video.Name).subscribe(
      (res) => {
        console.log(res);
        //this.getMedias();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  uploadFile() {

    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("App_Data[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    let url=this.apiService.BaselocalUrl+'uploadFile';
    this.http.post(url, formData)
    .subscribe((response) => {

          console.log("Response");
          console.log(response);
          console.log("Upload File")
          console.log(this.uploadedFiles);
          this.getMedias();


    });


}








}
