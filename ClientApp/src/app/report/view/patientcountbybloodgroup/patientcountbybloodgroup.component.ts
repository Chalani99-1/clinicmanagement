import {Component, OnInit, ViewChild} from '@angular/core';
import {PatientCountByBloodgroup} from "../../entity/patientcountbybloodgroup";
import {MatTableDataSource} from "@angular/material/table";
import {ReportService} from "../../reportservice";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Patient} from "../../../entity/patient";
import {Bloodgroup} from "../../../entity/bloodgroup";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Bloodgroupservice} from "../../../service/bloodgroupservice";
import {Patientservice} from "../../../service/patientservice";

declare var google: any;
@Component({
  selector: 'app-patientcountbybloodgroup',
  templateUrl: './patientcountbybloodgroup.component.html',
  styleUrls: ['./patientcountbybloodgroup.component.css']
})
export class PatientcountbybloodgroupComponent implements OnInit {
  patientcountbybloodgroups!: PatientCountByBloodgroup[];
  data!: MatTableDataSource<PatientCountByBloodgroup>;

  columns: string[] = ['name', 'count'];
  headers: string[] = ['Name', 'Count'];
  binders: string[] = ['name', 'count'];

  @ViewChild('barchart', {static: false}) barchart: any;
  @ViewChild('piechart', {static: false}) piechart: any;
  @ViewChild('linechart', {static: false}) linechart: any;
  patients: Array<Patient> = [];
  bloodgroups: Array<Bloodgroup> = [];

  public form!: FormGroup;
  patientCountByBloodgroup!: PatientCountByBloodgroup[];

  constructor(private rs: ReportService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private bs: Bloodgroupservice,
              private ps: Patientservice) {
  }


  ngOnInit(): void {

    this.rs.countByBloodgroup()
      .then((bld: PatientCountByBloodgroup[]) => {
        this.patientcountbybloodgroups = bld;
      }).finally(() => {
      this.loadTable();
      this.loadCharts();
    });
  }

  loadTable(): void {
    this.data = new MatTableDataSource(this.patientcountbybloodgroups);
  }

  loadCharts(): void {
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(this.drawCharts.bind(this));
  }

  drawCharts() {

    const barData = new google.visualization.DataTable();
    barData.addColumn('string', 'name');
    barData.addColumn('number', 'Count');

    const pieData = new google.visualization.DataTable();
    pieData.addColumn('string', 'name');
    pieData.addColumn('number', 'Count');

    const lineData = new google.visualization.DataTable();
    lineData.addColumn('string', 'name');
    lineData.addColumn('number', 'Count');

    this.patientcountbybloodgroups.forEach((bld: PatientCountByBloodgroup) => {
      barData.addRow([bld.name, bld.count]);
      pieData.addRow([bld.name, bld.count]);
      lineData.addRow([bld.name, bld.count]);
    });

    const barOptions = {
      title: 'Bloodgroup Count (Bar Chart)',
      subtitle: 'Count of Bloodgroup',
      bars: 'horizontal',
      height: 400,
      width: 600
    };

    const pieOptions = {
      title: 'Bloodgroup Count (Pie Chart)',
      height: 400,
      width: 550
    };

    const lineOptions = {
      title: 'Bloodgroup Count (Line Chart)',
      height: 400,
      width: 600
    };

    const barChart = new google.visualization.BarChart(this.barchart.nativeElement);
    barChart.draw(barData, barOptions);

    const pieChart = new google.visualization.PieChart(this.piechart.nativeElement);
    pieChart.draw(pieData, pieOptions);

    const lineChart = new google.visualization.LineChart(this.linechart.nativeElement);
    lineChart.draw(lineData, lineOptions);
  }
}
