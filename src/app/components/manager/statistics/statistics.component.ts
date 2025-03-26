// angular import
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import tableData from 'src/fake-data/default-data.json';
// icons
import { IconService, IconDirective } from '@ant-design/icons-angular';
import { FallOutline, GiftOutline, MessageOutline, RiseOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { ApexChart, ApexResponsive, ChartType, NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { ServiceType } from 'src/app/models/service.model';
import { ServiceTypeService } from 'src/app/services/service-type/service-type.service';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';

@Component({
  selector: 'app-default',
  imports: [
    CommonModule,
    CardComponent,
    IconDirective,
    NgApexchartsModule,
    FormsModule
  ],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  private iconService = inject(IconService);
  serviceTypes: ServiceType[] = [];
  generalAvg: number;
  nbAppointmentDone: number;
  // constructor
  constructor(
    private serviceTypeService: ServiceTypeService,
    private appointmentService: AppointmentService,
  ) {
    this.iconService.addIcon(...[RiseOutline, FallOutline, SettingOutline, GiftOutline, MessageOutline]);
    this.updateChartData();
  }

  ngOnInit() {
    this.fetchServiceTypes();
    this.fetchGeneralAvg()
  }

  fetchServiceTypes(): void {
    this.serviceTypeService.getServiceTypes().subscribe({
      next: (response: any) => {
        const result = response;
        this.serviceTypes = result.items || [];
      },
      error: (error) => {
        console.error('Error fetching service types:', error);
      }
    });
  }

  fetchGeneralAvg(): void {
    this.appointmentService.getAppointmentScoreGeneralAvg().subscribe({
      next: (response: any) => {
        const result = response;
        this.generalAvg = result.averageScore || [];
        this.nbAppointmentDone = result.nbOfAppointmentsDone || 0;
      },
      error: (error) => {
        console.error('Error fetching service types:', error);
      }
    });
  }

  recentOrder = tableData;

  FinishedRepairs = [
    {
      title: 'Nb réparations effectués',
      amount: '400',
      background: 'bg-light-primary ',
      border: 'border-primary',
      icon: 'rise',
      percentage: '59.3%',
    },
    {
      title: 'Moyenne générale avis clients',
      amount: '4.5 / 5',
      background: 'bg-light-primary ',
      border: 'border-primary',
      icon: 'rise',
      percentage: '70.5%',
    },
  ];

  selectedService = 'general';  

  chartOptions: {
    series: number[];
    chart: ApexChart;
    labels: string[];
    responsive: ApexResponsive[];
  };

  serviceData = {
    general: {
      series: [44, 55, 41, 17],
      labels: ['Note: 1', 'Note: 2', 'Note: 3', 'Note: 4']
    },
    service1: {
      series: [25, 30, 20, 25],
      labels: ['Note: 1', 'Note: 2', 'Note: 3', 'Note: 4']
    },
    service2: {
      series: [60, 15, 10, 15],
      labels: ['Note: 1', 'Note: 2', 'Note: 3', 'Note: 4']
    },
    service3: {
      series: [30, 40, 10, 20],
      labels: ['Note: 1', 'Note: 2', 'Note: 3', 'Note: 4']
    }
  };

  updateChartData() {
    const service = this.serviceData[this.selectedService];
    this.chartOptions = {
      series: service.series,
      chart: {
        type: 'pie' as ChartType,
        width: '100%',
      },
      labels: service.labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }

  onServiceChange() {
    this.updateChartData();
  }
}
