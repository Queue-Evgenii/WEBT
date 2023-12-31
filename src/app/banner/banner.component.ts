import { Component } from '@angular/core';
import { Banner } from 'src/models/banner.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  bannerElems: Banner[] = [
    {
      id: 1,
      title: 'Product name 1',
      price: 230,
      image: 'https://picsum.photos/id/231/600/300',
    },
    {
      id: 2,
      title: 'Product name 2',
      price: 230,
      image: 'https://picsum.photos/id/235/600/300',
    },
    {
      id: 3,
      title: 'Product name 3',
      price: 230,
      image: 'https://picsum.photos/id/234/600/300',
    },
    {
      id: 4,
      title: 'Product name 4',
      price: 230,
      image: 'https://picsum.photos/id/233/600/300',
    },
    {
      id: 5,
      title: 'Product name 5',
      price: 230,
      image: 'https://picsum.photos/id/236/600/300',
    },
  ]
}
