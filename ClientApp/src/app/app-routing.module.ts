import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./view/login/login.component";
import {MainwindowComponent} from "./view/mainwindow/mainwindow.component";
import {EmployeeComponent} from "./view/modules/employee/employee.component";
import {HomeComponent} from "./view/home/home.component";
import {UserComponent} from "./view/modules/user/user.component";
import {CountByDesignationComponent} from "./report/view/countbydesignation/countbydesignation.component";
import {ArrearsByProgramComponent} from "./report/view/arrearsbyprogram/arrearsbyprogram.component";
import {PrivilageComponent} from "./view/modules/privilage/privilage.component";
import {OperationComponent} from "./view/modules/operation/operation.component";
import {AttendanceComponent} from "./view/modules/attendance/attendance.component";
import {PaymentComponent} from "./view/modules/payment/payment.component";
import {StudentComponent} from "./view/modules/student/student.component";
import {BatchregistrationComponent} from "./view/modules/batchregistration/batchregistration.component";
import {ClassComponent} from "./view/modules/class/class.component";
import {BookdistributionComponent} from "./view/modules/bookdistribution/bookdistribution.component";
import {PatientComponent} from "./view/modules/patient/patient.component";
import {
  PatientcountbybloodgroupComponent
} from "./report/view/patientcountbybloodgroup/patientcountbybloodgroup.component";
import {DoctorComponent} from "./view/modules/doctor/doctor.component";
import {
  DoctorcountbyspecialityComponent
} from "./report/view/doctorcountbyspeciality/doctorcountbyspeciality.component";
import {ClinicComponent} from "./view/modules/clinic/clinic.component";
import {WardassignmentComponent} from "./view/modules/wardassignment/wardassignment.component";
import {PatientattendenceComponent} from "./view/modules/patientattendence/patientattendence.component";
import {DrugComponent} from "./view/modules/drug/drug.component";
import {ClinicattendenceComponent} from "./view/modules/clinicattendence/clinicattendence.component";
import {DiagnosisComponent} from "./view/modules/diagnosis/diagnosis.component";
import {PrescriptionComponent} from "./view/modules/prescription/prescription.component";
import {InvestigationComponent} from "./view/modules/investigation/investigation.component";
import {DashboardComponent} from "./view/dashboard/dashboard.component";
import {
  DrugbybrandgenericstatusComponent
} from "./report/view/drugbybrandgenericstatus/drugbybrandgenericstatus.component";
import {
  PatientcountbyclinicbytimeComponent
} from "./report/view/patientcountbyclinicbytime/patientcountbyclinicbytime.component";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "", redirectTo: 'login', pathMatch: 'full'},
  {
    path: "main",
    component: MainwindowComponent,
    children: [
      {path: "home", component: HomeComponent},
      {path: "dashboard", component: DashboardComponent},
      {path: "employee", component: EmployeeComponent},
      {path: "operation", component: OperationComponent},
      {path: "user", component: UserComponent},
      {path: "privilege", component: PrivilageComponent},
      {path: "patient", component: PatientComponent},
      {path: "doctor", component: DoctorComponent},
      {path: "clinic", component: ClinicComponent},
      {path: "drug", component: DrugComponent},
      {path: "prescription", component: PrescriptionComponent},
      {path: "diagnosis", component: DiagnosisComponent},
      {path: "investigation", component: InvestigationComponent},
      {path: "wardassignment", component: WardassignmentComponent},
      {path: "patientattendence", component: PatientattendenceComponent},
      {path: "clinicattendence", component: ClinicattendenceComponent},
      {path:"reports/countbydesignation", component: CountByDesignationComponent},
      {path:"reports/patientcountbybloodgroup", component: PatientcountbybloodgroupComponent},
      {path:"reports/doctorcountbyspeciality", component: DoctorcountbyspecialityComponent},
      {path:"reports/drugbrandgenericstatus", component: DrugbybrandgenericstatusComponent},
      {path:"reports/patientcountclinicstime", component: PatientcountbyclinicbytimeComponent},

    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
