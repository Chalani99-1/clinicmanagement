import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ReportService} from "../../reportservice";
import {DoctorCountBySpeciality} from "../../entity/doctorcountbyspeciality";

declare var google: any;
@Component({
  selector: 'app-doctorcountbyspeciality',
  templateUrl: './doctorcountbyspeciality.component.html',
  styleUrls: ['./doctorcountbyspeciality.component.css']
})
export class DoctorcountbyspecialityComponent {
  doctorcountbyspecialities!: DoctorCountBySpeciality[];
  data!: MatTableDataSource<DoctorCountBySpeciality>;

  columns: string[] = ['specialityname', 'count'];
  headers: string[] = ['Speciality Name', 'Count'];
  binders: string[] = ['specialityname', 'count'];

  @ViewChild('barchart', { static: false }) barchart: any;
  @ViewChild('piechart', { static: false }) piechart: any;
  @ViewChild('linechart', { static: false }) linechart: any;

  constructor(private rs: ReportService) {
  }

  ngOnInit(): void {

    this.rs.countBySpeciality()
      .then((spe: DoctorCountBySpeciality[]) => {
        this.doctorcountbyspecialities = spe;
      }).finally(() => {
      this.loadTable();
      this.loadCharts();
    });

  }

  loadTable() : void{
    this.data = new MatTableDataSource(this.doctorcountbyspecialities);
  }

  loadCharts() : void{
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawCharts.bind(this));
  }


  drawCharts() {

    const barData = new google.visualization.DataTable();
    barData.addColumn('string', 'specialityname');
    barData.addColumn('number', 'Count');

    const pieData = new google.visualization.DataTable();
    pieData.addColumn('string', 'specialityname');
    pieData.addColumn('number', 'Count');

    const lineData = new google.visualization.DataTable();
    lineData.addColumn('string', 'specialityname');
    lineData.addColumn('number', 'Count');

    this.doctorcountbyspecialities.forEach((spe: DoctorCountBySpeciality) => {
      barData.addRow([spe.specialityname, spe.count]);
      pieData.addRow([spe.specialityname, spe.count]);
      lineData.addRow([spe.specialityname, spe.count]);
    });

    const barOptions = {
      title: 'Speciality Count (Bar Chart)',
      subtitle: 'Count of Employees by Speciality',
      bars: 'horizontal',
      height: 400,
      width: 600
    };

    const pieOptions = {
      title: 'Speciality Count (Pie Chart)',
      height: 400,
      width: 550
    };

    const lineOptions = {
      title: 'Speciality Count (Line Chart)',
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
