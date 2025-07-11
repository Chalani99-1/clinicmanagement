import {Component, OnInit, ViewChild} from '@angular/core';
import {PickerInteractionMode} from 'igniteui-angular';
import {ReportService} from '../../reportservice';
import {PatientByClinicByTime} from '../../entity/patientbyclinicbytime';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

declare var google: any;

@Component({
  selector: 'app-patientcountbyclinicbytime',
  templateUrl: './patientcountbyclinicbytime.component.html',
  styleUrls: ['./patientcountbyclinicbytime.component.css']
})
export class PatientcountbyclinicbytimeComponent implements OnInit {

  patientByClinicByTime!: PatientByClinicByTime[];
  @ViewChild('patientbarchart', {static: false}) patientbarchart: any;
  @ViewChild('patientsteppedhart', {static: false}) patientsteppedhart: any;
  public mode: PickerInteractionMode = PickerInteractionMode.DropDown;
  public format = 'hh:mm:ss tt';
  public sdate: Date = new Date();
  public edate: Date = new Date();
  public form!: FormGroup;

  constructor(
    private rs: ReportService,
    private snackBar: MatSnackBar,
    private dp: DatePipe,
    private fb: FormBuilder
  ) {

    this.form = this.fb.group({
      "startdate": new FormControl('', [Validators.required]),
      "enddate": new FormControl('', [Validators.required]),

    }, {updateOn: 'change'});

  }

  ngOnInit() {
  }

  search() {
    const clisearchdata = this.form.getRawValue();
    let startdate = clisearchdata.startdate;
    let enddate = clisearchdata.enddate;
    let sdate = this.dp.transform(startdate, 'yyyy-MM-dd');
    let edate = this.dp.transform(enddate, 'yyyy-MM-dd');

    // console.log(stime, etime);
    let query = "";

    if (sdate) query += "startdate=" + sdate + "&";
    if (edate) query += "enddate=" + edate + "&";

    if (query.endsWith("&")) query = query.slice(0, -1);
    if (query) query = "?" + query;

    // console.log(query);
    this.generateChart(query);
  }

  generateChart(query: string
  ) {
    this.rs.getPatientByClinicByTime(query).then((patients: PatientByClinicByTime[]) => {
      // console.log(patients); // Log the patients data
      this.patientByClinicByTime = patients;
      this.loadCharts();
    }).catch((error) => {
      console.error('Error fetching patient data:', error);
      this.snackBar.open('Failed to fetch patient data. Please try again later.', 'Close', {
        duration: 5000,
      });
    });
  }

  loadCharts()
    :
    void {
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(this.drawCharts.bind(this));
  }

  drawCharts()
    :
    void {
    if (!
      this.patientByClinicByTime || this.patientByClinicByTime.length === 0
    ) {
      this.snackBar.open('No data available to draw charts.', 'Close', {
        duration: 5000,
      });
      return;
    }

    console.log('Drawing chart with data:', this.patientByClinicByTime);

    const patientBarData = new google.visualization.DataTable();
    patientBarData.addColumn('string', 'Clinic');
    patientBarData.addColumn('number', 'Patients');

    const steppeddata = new google.visualization.DataTable();
    steppeddata.addColumn('string', 'Clinic');
    steppeddata.addColumn('number', 'Patients');

    this.patientByClinicByTime.forEach((patient: PatientByClinicByTime) => {
      steppeddata.addRow([patient.clinic, patient.patients]);
    });

    this.patientByClinicByTime.forEach((patient: PatientByClinicByTime) => {
      patientBarData.addRow([patient.clinic, patient.patients]);
    });

    const patientBarOptions = {
      title: 'Patient Count by Clinic (Bar Chart)',
      bars: 'horizontal',
      height: 400,
      width: 600
    };

    const steppedoptions = {
      title: 'Patient Count by Clinic (Stepped Area Chart)',
      vAxis: {title: 'Number of Patients'},
      isStacked: true,
      height: 400,
      width: 600
    };

    const patientSteppedChart = new google.visualization.SteppedAreaChart(this.patientsteppedhart.nativeElement);
    patientSteppedChart.draw(steppeddata, steppedoptions);

    const patientBarChart = new google.visualization.ColumnChart(this.patientbarchart.nativeElement);
    patientBarChart.draw(patientBarData, patientBarOptions);
  }
}
