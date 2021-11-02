import { Observable } from 'rxjs';
import { FlickrService } from './../services/flickr.service';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-last-uploaded',
  templateUrl: './last-uploaded.component.html',
  styleUrls: ['./last-uploaded.component.css']
})
export class LastUploadedComponent implements OnInit {
  lastUploadedImgs$: any;
  photo: any;
  page: number = 0;
  isLoading=true;
  bigUrl="";
  imgSize="_b.jpg";
  CurentimgSize='_m.jpg';

  constructor(private service: FlickrService) { }
  ngOnInit() {
    this.service.getAll()
      .subscribe((res: any) => {
        this.setData(res);
      });

    window.onscroll = (event) => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight&&(this.page <= 10) ) {
        this.isLoading=true;
        const next = () => {
          this.getByPage();
        };
        next();
      }
    };
  }
  imgOnClick(img:any) {
    debugger;
    var index=img.indexOf(this.CurentimgSize);
    var split=img.slice(0,index);
   this.bigUrl=split+this.imgSize;
   console.log(this.bigUrl);
  }
  setData(res: any) {
    this.lastUploadedImgs$ = res;
    this.page = this.lastUploadedImgs$.page;
    this.photo=(this.page=1)?res.photo:[...this.photo, ...res.photo];
    this.isLoading=false;
  }
  getByPage() {
      this.service.getByPage(++this.page).subscribe((res: any) => {
        this.setData(res);
      });
  }
}
