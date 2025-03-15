import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  cards = [
    {
      id: 1,
      imageUrl: '../../../../../assets/images/vehicle/car-icon.png',
      vehicle: 'Toyota Corolla 2020',
      registration: 'XY 456 ZW',
      service: 'Peinture',
      appointment_date: '10/12/2021',
      appointment_time: '10:00',
      estimated_date: '10/12/2021',
      estimated_time: '11:00',
      progress: 1 // Réparation terminée
    },
    {
      id: 2,
      imageUrl: '../../../../../assets/images/vehicle/car-icon.png',
      vehicle: 'Renault Master 2022',
      registration: 'QR 101 UV',
      service: 'Révision',
      appointment_date: '12/12/2021',
      appointment_time: '09:00',
      estimated_date: '12/12/2021',
      estimated_time: '10:00',
      progress: 0.1 // Début imminent
    },
    {
      id: 3,
      imageUrl: '../../../../../assets/images/vehicle/car-icon.png',
      vehicle: 'Mercedes Sprinter 2019',
      registration: 'LM 789 OP',
      service: 'Mécanique',
      appointment_date: '11/12/2021',
      appointment_time: '14:00',
      estimated_date: '13/12/2021',
      estimated_time: '16:00',
      progress: 0.5 // Progression à mi-chemin
    }
    // Ajoutez d'autres données de cartes ici
  ];
}
