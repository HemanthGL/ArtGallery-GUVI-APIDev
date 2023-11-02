import { Component } from '@angular/core';
import { ArtsService } from './services/arts.service';
import { FormControl, FormGroup } from '@angular/forms';
import { IMG_API_PRE, IMG_API_SUF } from 'src/constants/constants';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ArtGallery';

  
}
