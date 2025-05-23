import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ReportService } from '../../report/reportservice';
import { DrugByBrandAndStstus } from '../../report/entity/drugbybrandandststus';
import { MatTableDataSource } from '@angular/material/table';
import {PatientByClinics} from "../../report/entity/patientbyclinics";
import {formatDate} from "@angular/common";

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy  {

  currentDate: string = '';
  currentTime: string = '';
  private timer: any;

  doctorCount!: number;
  scheduledclinics!: number;
  cancelledclinics!: number;
  admittedpatients!: number;
  criticalpatients!: number;
  inprogressinves!: number;
  drugByBrandAndStatus!: DrugByBrandAndStstus[];
  patientsbyclinics!: PatientByClinics[];

  data!: MatTableDataSource<DrugByBrandAndStstus>;

  columns: string[] = ['brand', 'status', 'count'];
  headers: string[] = ['Brand', 'Status', 'Count'];
  binders: string[] = ['brand', 'status', 'count'];

  @ViewChild('drugbarchart', { static: false }) drugbarchart: any;
  @ViewChild('drugpiechart', { static: false }) drugpiechart: any;
  @ViewChild('druglinechart', { static: false }) druglinechart: any;

  @ViewChild('patientbarchart', { static: false }) patientbarchart: any;
  @ViewChild('patientpiechart', { static: false }) patientpiechart: any;
  @ViewChild('patientlinechart', { static: false }) patientlinechart: any;

  constructor(public rs: ReportService) {}

  ngOnInit(): void {

    this.updateDateTime();
    this.timer = setInterval(() => this.updateDateTime(), 1000);

    this.initialize();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private updateDateTime(): void {
    const now = new Date();
    this.currentDate = formatDate(now, 'fullDate', 'en-US');
    this.currentTime = formatDate(now, 'hh:mm:ss a', 'en-US');
  }

  initialize(): void {
    this.rs.getCountByDoctor().then((cnt: number) => {
      this.doctorCount = cnt;
    });

    this.rs.getScheduledClinicCount().then((cnt: number) => {
      this.scheduledclinics = cnt;
    });

    this.rs.getCancelledClinicCount().then((cnt: number) => {
      this.cancelledclinics = cnt;
    });

    this.rs.getAdmittedPatientsCount().then((cnt: number) => {
      this.admittedpatients = cnt;
    });

    this.rs.getCriticalPatientsCount().then((cnt: number) => {
      this.criticalpatients = cnt;
    });

    this.rs.getInProgressInvestigationsCount().then((cnt: number) => {
      this.inprogressinves = cnt;
    });

    this.rs.getdrugByBrandStatsu().then((drugs: DrugByBrandAndStstus[]) => {
      this.drugByBrandAndStatus = drugs;
      this.loadTable();
      this.loadCharts();
    }).catch((error) => {
      console.error('Error fetching drug data:', error);
    });

    this.rs.getPatientCountByClinics().then((patients: PatientByClinics[]) => {
      this.patientsbyclinics = patients;
      this.loadTable();
      this.loadCharts();
    }).catch((error) => {
      console.error('Error fetching drug data:', error);
    });
  }

  loadTable(): void {
    this.data = new MatTableDataSource(this.drugByBrandAndStatus);
  }

  loadCharts(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawCharts.bind(this));
  }

  drawCharts(): void {
    if (!this.drugByBrandAndStatus || this.drugByBrandAndStatus.length === 0 || !this.patientsbyclinics || this.patientsbyclinics.length === 0) {
      console.error('No data available to draw charts.');
      return;
    }

    // Drug Chart
    const drugbarData = new google.visualization.DataTable();
    drugbarData.addColumn('string', 'Brand');
    drugbarData.addColumn('number', 'Count');

    const drugpieData = new google.visualization.DataTable();
    drugpieData.addColumn('string', 'Brand');
    drugpieData.addColumn('number', 'Count');

    const druglineData = new google.visualization.DataTable();
    druglineData.addColumn('string', 'Brand');
    druglineData.addColumn('number', 'Count');

    this.drugByBrandAndStatus.forEach((drug: DrugByBrandAndStstus) => {
      drugbarData.addRow([drug.brand, drug.count]);
      drugpieData.addRow([drug.brand, drug.count]);
      druglineData.addRow([drug.brand, drug.count]);
    });

    // Patient Chart
    const patientbarData = new google.visualization.DataTable();
    patientbarData.addColumn('string', 'Brand');
    patientbarData.addColumn('number', 'Count');

    const patientpieData = new google.visualization.DataTable();
    patientpieData.addColumn('string', 'Brand');
    patientpieData.addColumn('number', 'Count');

    const patientlineData = new google.visualization.DataTable();
    patientlineData.addColumn('string', 'Brand');
    patientlineData.addColumn('number', 'Count');

    this.patientsbyclinics.forEach((patient: PatientByClinics) => {
      patientbarData.addRow([patient.clinic, patient.patients]);
      patientpieData.addRow([patient.clinic, patient.patients]);
      patientlineData.addRow([patient.clinic, patient.patients]);
    });

    // Drug
    const drugbarOptions = {
      title: 'Drug Count by Brand (Bar Chart)',
      subtitle: 'Count of Drugs by Brand',
      bars: 'horizontal',
      height: 400,
      width: 600
    };

    const drugpieOptions = {
      title: 'Drug Count by Brand (Pie Chart)',
      height: 300,
      width: 450
    };

    const druglineOptions = {
      title: 'Drug Count by Brand (Line Chart)',
      height: 400,
      width: 600
    };

    // Patient
    const patientbarOptions = {
      title: 'Patient Count by Clinics (Bar Chart)',
      subtitle: 'Count of Drugs by Brand',
      bars: 'horizontal',
      height: 380,
      width: 990
    };

    const patientpieOptions = {
      title: 'Patient Count by Clinics (Pie Chart)',
      height: 400,
      width: 550
    };

    const patientlineOptions = {
      title: 'Patient Count by Clinics (Line Chart)',
      height: 400,
      width: 600
    };

    // const drugbarChart = new google.visualization.BarChart(this.drugbarchart.nativeElement);
    // drugbarChart.draw(drugbarData, drugbarOptions);
    //
    const drugpieChart = new google.visualization.PieChart(this.drugpiechart.nativeElement);
    drugpieChart.draw(drugpieData, drugpieOptions);

    // const druglineChart = new google.visualization.LineChart(this.druglinechart.nativeElement);
    // druglineChart.draw(lineData, druglineOptions);

    const patientbarChart = new google.visualization.ColumnChart(this.patientbarchart.nativeElement);
    patientbarChart.draw(patientbarData, patientbarOptions);
  }
}
