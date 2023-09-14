import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
// @Decorate<ContainerContext>({actions: BrandsActions, stateClass: BrandsState})
export class BrandsComponent {

  @ViewChild('image', {static: true}) public image: ElementRef;


  brands = [
    {
      'name': 'tesla',
      'img': 'https://www.avis.co.il/media/e0mcnkpg/tesla.png'
    },
    {
      'name': 'toyota',
      'img': 'https://www.avis.co.il/media/tawlbj4o/toyota.png'
    },
    {
      'name': 'BYD',
      'img': 'https://www.avis.co.il/media/rm4feadk/byd.png'
    },
    {
      'name': 'mazda',
      'img': 'https://www.mazda.co.il/_next/image?url=%2Fimg%2Flogo-header.png&w=200&q=75'
    }
  ]

}
