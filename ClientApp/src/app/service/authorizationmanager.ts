import { Injectable } from '@angular/core';
import { AuthoritySevice } from './authoritysevice';

@Injectable()
export class AuthorizationManager {

  private readonly localStorageUsreName = 'username';
  private readonly localStorageButtonKey = 'buttonState';

  private readonly localStorageAdmMenus = 'admMenuState';
  private readonly localStorageRegistrationMenus = 'registrationMenuState';
  private readonly localStorageHospitalMenus = 'hospitalMenuState';
  private readonly localStorageDrugMenus = 'drugMenuState';
  private readonly localStorageTreatmentMenus = 'treatmentMenuState';
  private readonly localStoragePresMenus = 'presMenuState';
  private readonly localStorageInvesMenus = 'invesMenuState';
  private readonly localStorageRepsMenus = 'repsMenuState';


  public enaadd = false;
  public enaupd = false;
  public enadel = false;

  admMenuItems = [
    { name: 'Employee', accessFlag: true, routerLink: 'employee' },
    { name: 'User', accessFlag: true, routerLink: 'user' },
    { name: 'Privilege', accessFlag: true, routerLink: 'privilege' },
    { name: 'Operations', accessFlag: true, routerLink: 'operation' },
  ];

  drugMenuItems =[
    {name: 'Drug Details',accessFlag:true,routerLink: 'drug'}
  ]

  registrationMenuItems = [
    { name: 'Patient', accessFlag: true, routerLink: 'patient' },
    { name: 'Doctor', accessFlag: true, routerLink: 'doctor' },

  ];

  hospitalMenuItems =[
    {name: 'Clinic Shedule',accessFlag:true,routerLink: 'clinic'},
    {name: 'Clinic Attendence',accessFlag:true,routerLink: 'clinicattendence'},
    { name: 'Ward Assignment', accessFlag: true, routerLink: 'wardassignment' },
    { name: 'Patient Attendence', accessFlag: true, routerLink: 'patientattendence' },
  ];

  treatmentMenuItems =[
    {name: 'Treatment & Diagnosis',accessFlag:true,routerLink: 'diagnosis'},
  ]

  presMenuItems = [
    { name: 'Prescription', accessFlag: true, routerLink: 'prescription' },
  ];
  invesMenuItems = [
    { name: 'Investigation', accessFlag: true, routerLink: 'investigation' },
  ];

  repMenuItems = [
    { name:"Count By Designation",accessFlag:true,routerLink:"reports/countbydesignation"},
    { name:"Patient Count By Bloodgroup",accessFlag:true,routerLink:"reports/patientcountbybloodgroup"},
    { name:"Doctor Count By Speciality in given SLMC Resistration Period",accessFlag:true,routerLink:"reports/doctorcountbyspeciality"},
    { name: 'Patient Count By Clinic And Time', accessFlag: true, routerLink: 'reports/patientcountclinicstime' },
    { name: 'Drug By Brand or Generic or Status', accessFlag: true, routerLink: 'reports/drugbrandgenericstatus' },
  ];


  constructor(private am: AuthoritySevice) {}

  enableButtons(authorities: { module: string; operation: string }[]): void {
    this.enaadd = authorities.some(authority => authority.operation === 'insert');
    this.enaupd = authorities.some(authority => authority.operation === 'update');
    this.enadel = authorities.some(authority => authority.operation === 'delete');

    // Save button state in localStorage
    localStorage.setItem(this.localStorageButtonKey, JSON.stringify({ enaadd: this.enaadd, enaupd: this.enaupd, enadel: this.enadel }));
  }

  enableMenues(modules: { module: string; operation: string }[]): void {

    this.admMenuItems.forEach(menuItem => {
      menuItem.accessFlag = modules.some(module => module.module.toLowerCase() === menuItem.name.toLowerCase());
    });

    this.drugMenuItems.forEach(menuItem => {
      menuItem.accessFlag = modules.some(module => module.module.toLowerCase() === menuItem.name.toLowerCase());
    });

    this.registrationMenuItems.forEach(menuItem => {
      menuItem.accessFlag = modules.some(module => module.module.toLowerCase() === menuItem.name.toLowerCase());
    });

    this.hospitalMenuItems.forEach(menuItem => {
      menuItem.accessFlag = modules.some(module => module.module.toLowerCase() === menuItem.name.toLowerCase());
    });

    this.treatmentMenuItems.forEach(menuItem => {
      menuItem.accessFlag = modules.some(module => module.module.toLowerCase() === menuItem.name.toLowerCase());
    });

    this.presMenuItems.forEach(menuItem => {
      menuItem.accessFlag = modules.some(module => module.module.toLowerCase() === menuItem.name.toLowerCase());
    });

    this.invesMenuItems.forEach(menuItem => {
      menuItem.accessFlag = modules.some(module => module.module.toLowerCase() === menuItem.name.toLowerCase());
    });

    this.repMenuItems.forEach(menuItem => {
      menuItem.accessFlag = modules.some(module => module.module.toLowerCase() === menuItem.name.toLowerCase());
    });


    // Save menu state in localStorage
    localStorage.setItem(this.localStorageAdmMenus, JSON.stringify(this.admMenuItems));
    localStorage.setItem(this.localStorageDrugMenus, JSON.stringify(this.drugMenuItems));
    localStorage.setItem(this.localStorageRegistrationMenus, JSON.stringify(this.registrationMenuItems));
    localStorage.setItem(this.localStorageHospitalMenus, JSON.stringify(this.hospitalMenuItems));
    localStorage.setItem(this.localStorageTreatmentMenus, JSON.stringify(this.treatmentMenuItems));
    localStorage.setItem(this.localStoragePresMenus, JSON.stringify(this.presMenuItems));
    localStorage.setItem(this.localStorageInvesMenus, JSON.stringify(this.invesMenuItems));
    localStorage.setItem(this.localStorageRepsMenus, JSON.stringify(this.repMenuItems));
  }


  async getAuth(username: string): Promise<void> {

    this.setUsername(username);

    try {
      const result = await this.am.getAutorities(username);
      if (result !== undefined) {
        const authorities = result.map(authority => {
          const [module, operation] = authority.split('-');
          return { module, operation };
        });
        console.log(authorities);

        this.enableButtons(authorities);
        this.enableMenues(authorities);

      } else {
        console.log('Authorities are undefined');
      }
    } catch (error) {
      console.error(error);
    }
  }

  getUsername(): string {
    return localStorage.getItem(this.localStorageUsreName) || '';
  }

  setUsername(value: string): void {
    localStorage.setItem(this.localStorageUsreName, value);
  }

  getEnaAdd(): boolean {
    return this.enaadd;
  }

  getEnaUpd(): boolean {
    return this.enaupd;
  }

  getEnaDel(): boolean {
    return this.enadel;
  }

  initializeButtonState(): void {
    const buttonState = localStorage.getItem(this.localStorageButtonKey);
    if (buttonState) {
      const { enaadd, enaupd, enadel } = JSON.parse(buttonState);
      this.enaadd = enaadd;
      this.enaupd = enaupd;
      this.enadel = enadel;
    }
  }

  initializeMenuState(): void {
    const admMenuState = localStorage.getItem(this.localStorageAdmMenus);
    if (admMenuState) {
      this.admMenuItems = JSON.parse(admMenuState);
    }

    const treatmentMenuState = localStorage.getItem(this.localStorageTreatmentMenus);
    if (treatmentMenuState) {
      this.treatmentMenuItems = JSON.parse(treatmentMenuState);
    }

    const drugMenuState = localStorage.getItem(this.localStorageDrugMenus);
    if (drugMenuState) {
      this.drugMenuItems = JSON.parse(drugMenuState);
    }

    const hospitalMenuState = localStorage.getItem(this.localStorageHospitalMenus);
    if (hospitalMenuState) {
      this.hospitalMenuItems = JSON.parse(hospitalMenuState);
    }

    const registrationMenuState = localStorage.getItem(this.localStorageRegistrationMenus);
    if (registrationMenuState) {
      this.registrationMenuItems = JSON.parse(registrationMenuState);
    }

    const presMenuState = localStorage.getItem(this.localStoragePresMenus);
    if (presMenuState) {
      this.presMenuItems = JSON.parse(presMenuState);
    }

    const invesMenuState = localStorage.getItem(this.localStorageInvesMenus);
    if (invesMenuState) {
      this.invesMenuItems = JSON.parse(invesMenuState);
    }
    const repsMenuState = localStorage.getItem(this.localStorageRepsMenus);
    if (repsMenuState) {
      this.repMenuItems = JSON.parse(repsMenuState);
    }


  }

  clearUsername(): void {
    localStorage.removeItem(this.localStorageUsreName);
  }

  clearButtonState(): void {
    localStorage.removeItem(this.localStorageButtonKey);
  }

  clearMenuState(): void {
    localStorage.removeItem(this.localStorageAdmMenus);
    localStorage.removeItem(this.localStorageRegistrationMenus);
    localStorage.removeItem(this.localStorageHospitalMenus);
    localStorage.removeItem(this.localStorageDrugMenus);
    localStorage.removeItem(this.localStorageTreatmentMenus);
    localStorage.removeItem(this.localStoragePresMenus);
    localStorage.removeItem(this.localStorageInvesMenus);
    localStorage.removeItem(this.localStorageRepsMenus);

  }

  isMenuItemDisabled(menuItem: { accessFlag: boolean }): boolean {
    return !menuItem.accessFlag;
  }

}
