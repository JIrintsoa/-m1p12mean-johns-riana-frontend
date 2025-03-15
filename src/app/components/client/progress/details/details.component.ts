import { Component, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  private activatedRoute = inject(ActivatedRoute);
  public id: string | null = null;


  constructor() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // Utilisez this.id pour récupérer les détails de la carte
    console.log('ID de la carte:', this.id);
  }
}
