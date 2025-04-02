// angular import
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import tableData from 'src/fake-data/default-data.json';
// icons
import { IconService, IconDirective } from '@ant-design/icons-angular';
import { FallOutline, GiftOutline, MessageOutline, RiseOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { ApexChart, ApexResponsive, NgApexchartsModule, } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { ServiceType } from 'src/app/models/service.model';
import { ServiceTypeService } from 'src/app/services/service-type/service-type.service';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { ScoreCountModel } from 'src/app/models/scorecount.model';

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
  averageScore: number;
  nbAppointmentDone: number;
  scoreCounts: ScoreCountModel[] = [];

  recentOrder = tableData;

  // chart stuff
  selectedService = '';  

  chartOptions: {
    series: number[];
    chart: ApexChart;
    labels: string[];
    responsive: ApexResponsive[];
  };
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
    this.fetchGeneralAvg();
    this.fetchScoreCounts(this.selectedService)
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
  fetchAvgByServiceType(): void {
    this.appointmentService.getAppointmentScoreAvgByServiceType(this.selectedService).subscribe({
      next: (response: any) => {
        const result = response;
        this.averageScore = result.items[0].averageScore || [];
        console.log(response)
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
        this.averageScore = result.averageScore || [];
        this.nbAppointmentDone = result.nbOfAppointmentsDone || 0;
        console.log(response)
      },
      error: (error) => {
        console.error('Error fetching service types:', error);
      }
    });
  }

  fetchScoreCounts(serviceTypeId: string): void {
    this.appointmentService.getScoreCounts(serviceTypeId).subscribe({
      next: (response: any) => {
        const result = response;
        this.scoreCounts = result.items || [];
      // Update serviceData and chartOptions once the scoreCounts are fetched
        this.updateServiceData();
        console.log(this.scoreCounts);
      },
      error: (error) => {
        console.error('Error fetching score counts:', error);
      }
    });
  }

  updateServiceData() {
    const service = this.scoreCounts[0] || { series: [0, 0, 0, 0, 0] };
  
    this.serviceData = {
      data: {
        series: [
          service.series[0] || 0,
          service.series[1] || 0,
          service.series[2] || 0,
          service.series[3] || 0,
          service.series[4] || 0,
        ],
        labels: ['Note: 1', 'Note: 2', 'Note: 3', 'Note: 4', 'Note: 5'],
      },
    };
  
    this.updateChartData();
  }
  serviceData = {
    data: {
      series: [
        this.scoreCounts[0]?.series[0] || 0,
        this.scoreCounts[0]?.series[1] || 0,
        this.scoreCounts[0]?.series[2] || 0,
        this.scoreCounts[0]?.series[3] || 0,
        this.scoreCounts[0]?.series[4] || 0,
      ],
      labels: ['Note: 1', 'Note: 2', 'Note: 3', 'Note: 4', 'Note: 5'],
    },
  };

  updateChartData() {
    const service = this.serviceData.data;
    this.chartOptions = {
      series: service.series,
      chart: {
        type: 'pie' as ApexChart['type'],
        width: '100%',
      },
      labels: service.labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }  

  onServiceChange() {
    if (this.selectedService === '') {
      this.fetchGeneralAvg(); // Fetch general average when no service is selected
    } else {
      this.fetchAvgByServiceType(); // Fetch average score by selected service type
    }
  
    this.fetchScoreCounts(this.selectedService);
    this.updateChartData();
    this.fetchScoreCounts(this.selectedService);
  }
}
