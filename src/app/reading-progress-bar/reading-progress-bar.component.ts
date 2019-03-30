import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reading-progress-bar',
  templateUrl: './reading-progress-bar.component.html',
  styleUrls: ['./reading-progress-bar.component.scss'],
})
export class ReadingProgressBarComponent implements OnInit {
  list = [
    'https://i.imgur.com/G2fvN4d.jpg',
    'https://i.imgur.com/CFfnFq0.jpg',
    'https://i.imgur.com/1CH3gwC.jpg',
    'https://i.imgur.com/p8rpWxC.png',
    'https://i.imgur.com/ony5FUW.png',
    'https://i.imgur.com/KjpFdDd.png',
    'https://i.imgur.com/L1SciSp.jpg',
    'https://i.imgur.com/Vc3KAi7.jpg',
    'https://i.imgur.com/MU8QoJ7.jpg',
    'https://i.imgur.com/rcH8E6H.jpg',
    'http://i.imgur.com/m81FuJSh.gif',
    'https://i.imgur.com/Y7vYM1D.jpg',
    'https://i.imgur.com/FQWQJCI.jpg',
    'https://i.imgur.com/kqyK7Uc.jpg',
    'https://i.imgur.com/NPrELSV.jpg',
    'https://i.imgur.com/KvcQANF.jpg',
    'https://i.imgur.com/SDvbXIS.jpg',
    'https://i.imgur.com/l05unwg.jpg',
    'https://i.imgur.com/ENtQ8TY.jpg',
    'https://i.imgur.com/x4b2soF.jpg',
    'https://i.imgur.com/hurQsW0.jpg',
    'https://i.imgur.com/hSYhFbc.jpg',
    'https://i.imgur.com/IPyt7ue.jpg',
    'https://i.imgur.com/RWmk24U.gif',
    'https://i.imgur.com/PnmXH1V.jpg',
    'https://i.imgur.com/VHiaI3D.jpg',
    'https://i.imgur.com/ZMzLtn2.jpg',
    'https://i.imgur.com/RT6wGv5.jpg',
    'https://i.imgur.com/z4xO9RV.jpg',
    'https://i.imgur.com/OSKsXKV.gif',
    'https://i.imgur.com/cG5i64K.jpg',
    'https://i.imgur.com/Pu2lvLN.jpg',
    'https://i.imgur.com/EeHBwsQ.jpg',
    'https://i.imgur.com/ViSxNtw.jpg',
    'https://i.imgur.com/Ma7pDt5.jpg',
    'https://i.imgur.com/imOpJJO.jpg',
    'https://i.imgur.com/RD7xeAv.jpg',
    'https://i.imgur.com/vRtYNzT.jpg',
    'https://i.imgur.com/sy4T2dw.png',
    'https://i.imgur.com/6VUcUzL.jpg',
    'https://i.imgur.com/7aeKkz2.jpg',
    'https://i.imgur.com/wbGD7YJ.jpg',
    'https://i.imgur.com/dtbg8Za.jpg',
    'https://i.imgur.com/fcuv2UQ.jpg',
    'https://i.imgur.com/N6ycGmF.gif',
    'https://i.imgur.com/UxOBOk3.gif',
    'https://i.imgur.com/hJsNFD5.gif',
  ];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    /* this.list$ = of(datas)
      .pipe(
        map(res => res.data),
        map(data => {
          const link = [];
          data.forEach(element => {
            // console.log(element);
            if (element.images) {
              element.images.forEach(image => {
                if(!image.link.endsWith('mp4')) {
                console.log(image.link);
                link.push(image.link);
              }
              });
            }
          });
          console.log(link);
          return link;
        }),
      );*/
    /*

    this.httpClient
      .get<any>('https://api.imgur.com/3/gallery/hot/viral/0.json')
      .pipe(
        map(res => res.data),
        map(data => {
          data.forEach(element => {
            element.images.forEach(image => {
              this.list.push(image.link);
            });
          });
        }),
      )
      .subscribe();*/
  }
}
