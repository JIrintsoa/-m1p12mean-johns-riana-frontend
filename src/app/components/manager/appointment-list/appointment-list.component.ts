import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-appointment-list',
  imports: [RouterLink, CardComponent],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss'
})
export class AppointmentListComponent {

}
