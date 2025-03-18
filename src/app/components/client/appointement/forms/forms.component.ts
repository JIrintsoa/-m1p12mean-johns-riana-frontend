import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-forms',
  imports: [RouterLink,CardComponent],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent {
}
