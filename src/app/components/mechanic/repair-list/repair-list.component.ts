import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-repair-list',
  imports: [RouterLink, CardComponent],
  templateUrl: './repair-list.component.html',
  styleUrl: './repair-list.component.scss'
})
export class RepairListComponent {

}
