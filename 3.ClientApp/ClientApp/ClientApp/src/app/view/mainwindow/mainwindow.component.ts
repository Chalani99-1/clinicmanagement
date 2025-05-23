import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthorizationManager} from "../../service/authorizationmanager";
import {DarkModeService} from "../../service/DarkModeService";


@Component({
  selector: 'app-mainwindow',
  templateUrl: './mainwindow.component.html',
  styleUrls: ['./mainwindow.component.css']
})
export class MainwindowComponent {

  opened: boolean = true;
  // repGroup:any[]=[
  //   {name:"Count By Designation",routerLink:"reports/countbydesignation"},
  //   {name:"Patient Count By Bloodgroup",routerLink:"reports/patientcountbybloodgroup"},
  //   {name:"Doctor Count By Speciality in given SLMC Resistration Period",routerLink:"reports/doctorcountbyspeciality"}
  // ]

  constructor(private router: Router,public authService: AuthorizationManager) {
  }


  logout(): void {
    this.router.navigateByUrl("login")
    this.authService.clearUsername();
    this.authService.clearButtonState();
    this.authService.clearMenuState();
    localStorage.removeItem("Authorization");
  }
    admMenuItems = this.authService.admMenuItems;
    drugMenuItems = this.authService.drugMenuItems;
    registrationMenuItems = this.authService.registrationMenuItems;
    hospitalMenuItems = this.authService.hospitalMenuItems;
    treatmentMenuItems=this.authService.treatmentMenuItems;
    presMenuItems = this.authService.presMenuItems;
    invesMenuItems= this.authService.invesMenuItems;
    repsMenuItems= this.authService.repMenuItems;
  isMenuVisible(category: string): boolean {
    switch (category) {
        case 'Admin':
        return this.admMenuItems.some(menuItem => menuItem.accessFlag);
        case 'Registration':
        return this.registrationMenuItems.some(menuItem => menuItem.accessFlag);
        case 'Clinic':
        return this.hospitalMenuItems.some(menuItem => menuItem.accessFlag);
        case 'Drug':
        return this.drugMenuItems.some(menuItem => menuItem.accessFlag);
        case 'Treatment':
        return this.treatmentMenuItems.some(menuItem => menuItem.accessFlag);
        case 'Prescription':
        return this.presMenuItems.some(menuItem => menuItem.accessFlag);
        case 'Investigation':
        return this.invesMenuItems.some(menuItem => menuItem.accessFlag);
        case 'Reports':
        return this.repsMenuItems.some(menuItem => menuItem.accessFlag);
        default:
        return false;
    }
  }

}
