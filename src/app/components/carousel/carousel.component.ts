import { Component } from '@angular/core';
import { CAROUSEL_1, CAROUSEL_2, CAROUSEL_3} from '../../../constants/constants'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  carousel1: string = CAROUSEL_1
  carousel2: string = CAROUSEL_2
  carousel3: string = CAROUSEL_3
}
