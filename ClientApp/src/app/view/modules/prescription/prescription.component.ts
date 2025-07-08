import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Prescription} from "../../../entity/prescription";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UiAssist} from "../../../util/ui/ui.assist";
import {Prescriptionservice} from "../../../service/prescriptionservice";
import {Employee} from "../../../entity/employee";
import {DatePipe} from "@angular/common";
import {Prescriptionstatus} from "../../../entity/prescriptionstatus";
import {Prescriptionstatusservice} from "../../../service/prescriptionstatusservice";
import {Patient} from "../../../entity/patient";
import {Patientservice} from "../../../service/patientservice";
import {Patientattendence} from "../../../entity/patientattendence";
import {Patientattendenceservice} from "../../../service/patientattendenceservice";
import {EmployeeService} from "../../../service/employeeservice";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {MatDialog} from "@angular/material/dialog";
import {Prescriptiondrug} from "../../../entity/prescriptiondrug";
import {RegexService} from "../../../service/regexservice";
import {MessageComponent} from "../../../util/dialog/message/message.component";
import {Drug} from "../../../entity/drug";
import {Drugservice} from "../../../service/drugservice";
import {Drugshedule} from "../../../entity/drugshedule";
import {Meal} from "../../../entity/meal";
import {Drugsheduleservice} from "../../../service/drugsheduleservice";
import {Mealservice} from "../../../service/mealservice";

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent {

  @ViewChild('myForm', {static: false}) myForm!: ElementRef;
  @ViewChild('myInnerForm', {static: false}) myInnerForm!: ElementRef;

  columns: string[] = ['date', 'prescriptionstatus' ,'employee','patient'];
  headers: string[] = ['Date', 'Status','Doctor' ,'Patient'];
  binders: string[] = ['getDate()', 'prescriptionstatus.name','employee.fullname','getPatient()'];

  cscolumns: string[] = ['csdate',  'csprescriptionstatus','csemployee','cspatient'];
  csprompts: string[] = ['Search by Date', 'Search by Status', 'Search by Doctor','Search by Patient'];

  incolumns: string[] = ['dose', 'description', 'days', 'drug','drugshedule','meal','prescription'];
  inheaders: string[] = ['Dose', 'Description', 'Days', 'Drug','Drug Shedule','Meal','Prescription'];
  inbinders: string[] = ['dose', 'description', 'days', 'drug.name','drugshedule.name','meal.name','prescription.date'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;
  public innerform!: FormGroup;

  prescription!: Prescription;
  oldprescription!: Prescription;

  prescriptions: Array<Prescription> = [];
  data!: MatTableDataSource<Prescription>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  indata!: MatTableDataSource<Prescriptiondrug>;

  popdrugs: Array<Prescriptiondrug> = [];

  enaadd:boolean = false;
  enaupd:boolean = false;
  enadel:boolean = false;

  innerdata: any;
  oldinnerdata: any;

  selectedrow: any;
  selectedinnerrow: any;

  prescriptionstatuses:Array<Prescriptionstatus>=[];
  employees:Array<Employee>=[];
  patients: Array<Patient>=[];
  patientattendences:Array<Patientattendence>=[];
  prescriptiondrugs:Array<Prescriptiondrug>=[];

  changedPreDrugs: Array<Prescriptiondrug> = [];
  drugs:Array<Drug>=[];
  filteredDrugs: Array<Drug> = [];
  ss: Array<Drug> = [];
  drugshedules:Array<Drugshedule>=[];
  meals:Array<Meal>=[];

  regexes: any;

  uiassist: UiAssist;

  constructor(
    private ps : Prescriptionservice,
    private fb: FormBuilder,
    private dp: DatePipe,
    private pss:Prescriptionstatusservice,
    private pats: Patientservice,
    private pas:Patientattendenceservice,
    private es:EmployeeService,
    private dss:Drugsheduleservice,
    private ms:Mealservice,
    private dg: MatDialog,
    private rs: RegexService,
    private ds:Drugservice,

  ){

    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      "csdate": new FormControl(),
      "csprescriptionstatus": new FormControl(),
      "csemployee": new FormControl(),
      "cspatient" : new FormControl()
    });

    this.ssearch = this.fb.group({
      "ssprescriptionstatus": new FormControl(),
      "sspatientattendence": new FormControl(),
      "ssemployee" : new FormControl(),

    });

    this.form = this.fb.group({
      "description": new FormControl('', []),
      "date": new FormControl(new Date(), [Validators.required]), // Set today's date as default
      "patientattendence": new FormControl('', [Validators.required]),
      "prescriptionstatus": new FormControl('', [Validators.required]),
      "employee": new FormControl('', [Validators.required]),
    });

    this.innerform = this.fb.group({
      "dose": new FormControl('', Validators.required),
      "days": new FormControl('', Validators.required),
      "drug": new FormControl('', Validators.required),
      "drugshedule": new FormControl('', Validators.required),
      "meal": new FormControl('', Validators.required),
      "prescription": new FormControl('', Validators.required),
      "description": new FormControl('', Validators.required),
    });


  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {

    this.createView();

    this.pss.getAllList().then((pres: Prescriptionstatus[]) => {
      this.prescriptionstatuses = pres;
    });

    this.pats.getAll("").then((patients: Patient[]) => {
      this.patients = patients;
    });

    this.pas.getAll("").then((patatte: Patientattendence[]) => {
      this.patientattendences = patatte;
    });

    this.es.getAll("?designationid=1").then((emps: Employee[]) => {
      this.employees = emps;
    });

    this.rs.get('prescription').then((regs: []) => {
      this.regexes = regs;
      this.createForm();
    });

    this.dss.getAllList().then((drugs: Drugshedule[]) => {
      this.drugshedules = drugs;
    });

    this.ms.getAllList().then((meal: Meal[]) => {
      this.meals = meal;
    });

    this.ds.getAll("").then((drugs: Drug[]) => {
      // Store all drugs for other operations
      this.drugs = drugs;

      // Create filtered list for dropdown (only active drugs)
      this.filteredDrugs = drugs.filter(drug =>
        drug.drugstatus?.id === 1 || drug.drugstatus?.id === 3
      );

      // Log both arrays for debugging
      console.log('All drugs:', this.drugs);
      console.log('Filtered drugs for dropdown:', this.filteredDrugs);
    });

  }
  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }

  getDate(ele:Prescription){
    return this.dp.transform(new Date(ele.date),'yyyy-MM-dd')
  }

  getPatient(element: Prescription) {
    return element.patientattendence.patient.name + '(' + element.patientattendence.patient.nic + ')';

  }

  createForm() {

    this.form.controls['date'].setValidators([Validators.required]);
    this.form.controls['description'].setValidators([]);
    this.form.controls['patientattendence'].setValidators([Validators.required]);
    this.form.controls['prescriptionstatus'].setValidators([Validators.required]);
    this.form.controls['employee'].setValidators([Validators.required]);
    this.form.controls['date'].setValue(new Date());

    this.innerform.controls['dose'].setValidators([Validators.required]);
    this.innerform.controls['description'].setValidators([Validators.required]);
    this.innerform.controls['days'].setValidators([Validators.required]);
    this.innerform.controls['drug'].setValidators([Validators.required]);
    this.innerform.controls['drugshedule'].setValidators([Validators.required]);
    this.innerform.controls['meal'].setValidators([Validators.required]);


    Object.values(this.form.controls).forEach(control => {
      control.markAsUntouched();
      control.markAsPristine();
    });
    Object.values(this.innerform.controls).forEach(control => {
      control.markAsUntouched();
      control.markAsPristine();
    });


    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
          // @ts-ignore
          if (controlName == "date")
            value = this.dp.transform(new Date(value), 'yyyy-MM-dd');
          // console.log("Date" +value);
          if (this.oldprescription != undefined && control.valid) {
            // @ts-ignore
            if (value === this.productionOrder[controlName]) {
              control.markAsPristine();
            } else {
              control.markAsDirty();
            }
          } else {
            control.markAsPristine();
          }
        }
      );
    }

    for (const controlName in this.innerform.controls) {
      const control = this.innerform.controls[controlName];
      control.valueChanges.subscribe(value => {

          if (this.oldinnerdata != undefined && control.valid) {
            // @ts-ignore
            if (value === this.innerdata[controlName]) {
              control.markAsPristine();
            } else {
              control.markAsDirty();
            }
          } else {
            control.markAsPristine();
          }
        }
      );
    }

    this.enableButtons(true, false, false);

  }

  loadTable(query: string) {

    this.ps.getAll(query)
      .then((prescriptions: Prescription[]) => {
        this.prescriptions = prescriptions;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.prescriptions);
        this.data.paginator = this.paginator;
      });


  }

  filterTable(): void {

    const csearchdata = this.csearch.getRawValue();

    this.data.filterPredicate = (prescription: Prescription, filter: string) => {
      return (csearchdata.csprescriptionstatus == null || prescription.prescriptionstatus.name.includes(csearchdata.csprescriptionstatus)) &&
        (csearchdata.csemployee == null || prescription.employee.fullname.includes(csearchdata.csemployee)) &&
        (csearchdata.csdate == null || prescription.date.includes(csearchdata.csdate))&&
        (csearchdata.cspatient==null || prescription.patientattendence.patient.name.includes(csearchdata.cspatient));

    };

    this.data.filter = 'xx';

  }

  btnSearchMc(): void {

    const sserchdata = this.ssearch.getRawValue();

    let prescriptionstatusid = sserchdata.ssprescriptionstatus;
    let employeeid = sserchdata.ssemployee;
    let patientnic = sserchdata.sspatientattendence;
    // let date = sserchdata.ssdate;

    console.log(prescriptionstatusid);
    console.log(employeeid);
    console.log(patientnic);

    let query = "";

    // if (date != null && date.trim() != "") query = query + "&date=" + date;
    if (prescriptionstatusid != null) query = query + "&prescriptionstatusid=" + prescriptionstatusid;
    if (employeeid != null) query = query + "&employeeid=" + employeeid;
    if (patientnic != null) query = query + "&patientnic=" + patientnic;

    if (query != "") query = query.replace(/^./, "?")

    this.loadTable(query);

  }

  btnSearchClearMc(): void {

    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {heading: "Search Clear", message: "Are you sure to Clear the Search?"}
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.ssearch.reset();
        this.loadTable("");
      }
    });
  }

  id = 0;

  deleteRaw(x:any) {

    let datasources = this.indata.data

    const index = datasources.findIndex(m => m.id === x.id);
    if (index > -1) {
      datasources.splice(index, 1);
    }
    this.updatePresDrugs(x);
    this.indata.data = datasources;
    this.prescriptiondrugs = this.indata.data;

  }

  enableButtons(add: boolean, upd: boolean, del: boolean) {
    this.enaadd = add;
    this.enaupd = upd;
    this.enadel = del;
  }

  getErrors(): string {

    let errors: string = "";

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.errors) errors = errors + "<br>Invalid " + controlName;
    }

    return errors;
  }

  btnaddMc() {

    this.innerdata = this.innerform.getRawValue();

    if( this.innerdata != null){

      const presdrug = new Prescriptiondrug(this.id, this.innerdata.dose, this.innerdata.description, this.innerdata.days, this.innerdata.drug, this.innerdata.drugshedule, this.innerdata.meal, this.innerdata.prescription);

      let tem: Prescriptiondrug[] = [];
      if(this.indata != null) this.indata.data.forEach((i) => tem.push(i));

      this.prescriptiondrugs = [];
      tem.forEach((t)=> this.prescriptiondrugs.push(t));

      this.prescriptiondrugs.push(presdrug);

      this.indata = new MatTableDataSource(this.prescriptiondrugs);

      this.id++;

      this.updatePresDrugs(presdrug);
      this.innerform.reset();

    }

  }

  fillInnerForm(prescriptiondrug: Prescriptiondrug){
    this.innerdata = JSON.parse(JSON.stringify(prescriptiondrug));
    this.oldinnerdata = JSON.parse(JSON.stringify(prescriptiondrug));

    //@ts-ignore
    this.innerdata.drug = this.drugs.find((d)=> d.id===this.innerdata.drug.id );
    //@ts-ignore
    this.innerdata.meal = this.meals.find((m)=> m.id===this.innerdata.meal.id );
    //@ts-ignore
    this.innerdata.drugshedule = this.drugshedules.find((d)=> d.id===this.innerdata.drugshedule.id );
    //@ts-ignore
    this.innerdata.prescription = this.prescriptions.find((p)=> p.id===this.innerdata.prescription.id );

    this.innerform.patchValue(this.innerdata);

  }

  fillForm(prescription: Prescription) {

    this.filteredDrugs = this.drugs;

    this.enableButtons(false, true, true);

    this.selectedrow = prescription;

    this.prescription = JSON.parse(JSON.stringify(prescription));

    this.oldprescription = JSON.parse(JSON.stringify(prescription));

    //@ts-ignore
    this.prescription.employee = this.employees.find(e => e.id === this.prescription.employee.id);
    //@ts-ignore
    this.prescription.patientattendence = this.patientattendences.find(p => p.id === this.prescription.patientattendence.patient.id);
    //@ts-ignore
    this.prescription.prescriptionstatus = this.prescriptionstatuses.find(ps => ps.id === this.prescription.prescriptionstatus.id);

    this.indata = new MatTableDataSource(this.prescription.prescriptiondrugs);

    // Update the form values
    this.form.patchValue(this.prescription);
    this.form.markAsPristine();
    this.enableButtons(false, true, true);


    for (const controlName in this.innerform.controls) {
      this.innerform.controls[controlName].clearValidators();
      this.innerform.controls[controlName].updateValueAndValidity();
    }
  }

  getUpdates(): string {

    let updates: string = "";
    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.dirty) {
        updates = updates + "<br>" + controlName.charAt(0).toUpperCase() + controlName.slice(1) + " Changed";
      }
    }
    for (const controlName in this.innerform.controls) {
      const control = this.innerform.controls[controlName];
      if (control.dirty) {
        updates = updates + "<br>" + controlName.charAt(0).toUpperCase() + controlName.slice(1) + " Changed";
      }
    }
    if (JSON.stringify(this.popdrugs) !== JSON.stringify(this.oldprescription)) {
      updates = updates + "<br>Drugs in the prescription Changed";
    }

    if (this.changedPreDrugs.length > 0) {
      updates += "<br>Prescription Drugs Changed";
    }


    return updates;

  }

  clear(): void {
    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Production Order Clear",
        message: "Are you sure to Clear following Details ? <br> <br>"
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.resetForms();
        this.form.controls['date'].setValue(new Date());
      }
    });
  }

  resetForms() {
    const form = this.myForm.nativeElement as HTMLFormElement;
    form.reset();

    const innerForm = this.myInnerForm.nativeElement as HTMLFormElement;
    innerForm.reset();

    this.createForm();
    this.form.controls['date'].setValue(new Date());

    this.selectedrow = null;
    // @ts-ignore
    this.prescription = null;
    // @ts-ignore
    this.oldprescription = null;
    // @ts-ignore
    this.indata = new MatTableDataSource([]);

    this.enableButtons(true, false, false);


  }

  add() {

    let errors = this.getErrors();

    if (errors != "") {
      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Prescription Add ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });
    } else {

      this.prescription = this.form.getRawValue();
      this.prescription.prescriptiondrugs = this.prescriptiondrugs;

      // @ts-ignore
      this.prescriptiondrugs.forEach((i) => delete i.id);

      // @ts-ignore
      this.prescription.date = this.dp.transform(this.prescription.date, "yyyy-MM-dd");

      let invdata: string = "";

      invdata = invdata + "<br>Prescribed Description is : " + this.prescription.description
      // invdata = invdata + "<br>Patient name is : " + this.prescription.patientattendence.employee.callingname;

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Production Order Add",
          message: "Are you sure to Add the following Prescription? <br> <br>" + invdata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found";

      confirm.afterClosed().subscribe(async result => {
        if (result) {
          this.ps.add(this.prescription).then((responce: [] | undefined) => {
            //console.log("Res-" + responce);
            //console.log("Un-" + responce == undefined);
            if (responce != undefined) { // @ts-ignore
              console.log("Add-" + responce['id'] + "-" + responce['url'] + "-" + (responce['errors'] == ""));
              // @ts-ignore
              addstatus = responce['errors'] == "";
              console.log("Add Status" + addstatus);
              if (!addstatus) { // @ts-ignore
                addmessage = responce['errors'];
              }
            } else {
              console.log("undefined");
              addstatus = false;
              addmessage = "Content Not Found"
            }
          }).finally(() => {

            if (addstatus) {
              addmessage = "Successfully Saved";
              this.printThirdPartyMedicines();
              this.form.reset();
              this.innerdata = [];
              Object.values(this.form.controls).forEach(control => {
                control.markAsTouched();
              });
              this.indata.data = [];
              Object.values(this.innerform.controls).forEach(control => {
                control.markAsUntouched();
              });
              this.loadTable("");
            }

            const stsmsg = this.dg.open(MessageComponent, {
              width: '500px',
              data: {heading: "Status -Prescription Add", message: addmessage}
            });

            stsmsg.afterClosed().subscribe(async result => {

              if (!result) {
                return;
              }

            });
          });
        }
      });
    }
  }

  update() {

    let errors = this.getErrors();
    if (errors != "") {
      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Prescription Update ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });

    } else {

      let updates: string = this.getUpdates();
      if (updates != "") {

        let updstatus: boolean = false;
        let updmessage: string = "Server Not Found";

        const confirm = this.dg.open(ConfirmComponent, {
          width: '500px',
          data: {
            heading: "Confirmation - Prescription Update",
            message: "Are you sure to Save following Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {

            this.prescription = this.form.getRawValue();
            this.prescription.prescriptiondrugs = this.prescriptiondrugs;
            this.prescription.id = this.oldprescription.id;

            // @ts-ignore
            this.prescriptiondrugs.forEach((i) => delete i.id);
            // @ts-ignore
            this.prescription.date= this.dp.transform(this.prescription.date, 'yyyy-MM-dd');

            this.ps.update(this.prescription).then((responce: [] | undefined) => {
              if (responce != undefined) {
                // @ts-ignore
                updstatus = responce['errors'] == "";
                if (!updstatus) {
                  // @ts-ignore
                  updmessage = responce['errors'];
                }
              } else {
                updstatus = false;
                updmessage = "Content Not Found"
              }
            }).finally(() => {
              if (updstatus) {
                updmessage = "Successfully Updated";
                this.form.reset();
                this.innerdata = [];
                Object.values(this.form.controls).forEach(control => {
                  control.markAsTouched();
                });
                this.indata.data = [];
                Object.values(this.innerform.controls).forEach(control => control.markAsUntouched());
                this.loadTable("");
              }

              const stsmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Status -PPrescription Update", message: updmessage}
              });
              stsmsg.afterClosed().subscribe(async result => {
                if (result) {
                  return;
                }
              });

            });
          }
        });
      } else {

        const updmsg = this.dg.open(MessageComponent, {
          width: '500px',
          data: {heading: "Confirmation -Prescription Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => {
          if (!result) {
            return;
          }

        });

      }
    }


  }

  delete(): void {

    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Prescription Delete",
        message: "Are you sure to Delete following Prescription ? : <br> <br>" + this.prescription.id
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        let delstatus: boolean = false;
        let delmessage: string = "Server Not Found";

        this.ps.delete(this.prescription.id).then((responce: [] | undefined) => {

          if (responce != undefined) { // @ts-ignore
            delstatus = responce['errors'] == "";
            if (!delstatus) { // @ts-ignore
              delmessage = responce['errors'];
            }
          } else {
            delstatus = false;
            delmessage = "Content Not Found"
          }
        }).finally(() => {
          if (delstatus) {
            delmessage = "Successfully Deleted";
            this.form.reset();
            Object.values(this.form.controls).forEach(control => {
              control.markAsUntouched();
            });
            Object.values(this.innerform.controls).forEach(control => {
              control.markAsUntouched();
            });

            this.loadTable("");
          }
          const stsmsg = this.dg.open(MessageComponent, {
            width: '500px',
            data: {heading: "Status - Production Order Delete ", message: delmessage}
          });
          stsmsg.afterClosed().subscribe(async result => {

            if (!result) {
              return;
            }
          });

        });
      }
    });
  }

  updatePresDrugs(element: Prescriptiondrug) {
    this.changedPreDrugs.push(element);
  }

  printThirdPartyMedicines(): void {
    if (!this.prescription) {
      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Error - Print Third Party Medicines", message: "Please select a prescription first"}
      });
      return;
    }

    // Get third party medicines from description
    const description = this.prescription.description || '';
    const patientName = this.prescription.patientattendence?.patient?.name || 'N/A';
    const patientNIC = this.prescription.patientattendence?.patient?.nic || 'N/A';
    const doctorName = this.prescription.employee?.fullname || 'N/A';
    const prescriptionDate = this.getDate(this.prescription) || 'N/A';

    // Create HTML content for printing
    const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Third Party Medicine Prescription</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                line-height: 1.6;
            }
            .header {
                text-align: center;
                border-bottom: 2px solid #333;
                padding-bottom: 20px;
                margin-bottom: 20px;
            }
            .hospital-name {
                font-size: 24px;
                font-weight: bold;
                color: #2c5aa0;
                margin-bottom: 5px;
            }
            .subtitle {
                font-size: 16px;
                color: #666;
                margin-bottom: 10px;
            }
            .info-section {
                margin-bottom: 20px;
            }
            .info-row {
                display: flex;
                margin-bottom: 10px;
            }
            .info-label {
                font-weight: bold;
                width: 150px;
                color: #333;
            }
            .info-value {
                color: #555;
            }
            .description-section {
                margin-top: 30px;
                padding: 15px;
                border: 1px solid #ddd;
                border-radius: 5px;
                background-color: #f9f9f9;
            }
            .description-title {
                font-size: 18px;
                font-weight: bold;
                color: #333;
                margin-bottom: 15px;
                border-bottom: 1px solid #ccc;
                padding-bottom: 5px;
            }
            .description-content {
                font-size: 14px;
                line-height: 1.8;
                color: #444;
                white-space: pre-wrap;
            }
            .footer {
                margin-top: 40px;
                text-align: center;
                font-size: 12px;
                color: #666;
                border-top: 1px solid #ddd;
                padding-top: 20px;
            }
            .note {
                margin-top: 30px;
                padding: 10px;
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 5px;
                font-size: 14px;
                color: #856404;
            }
            @media print {
                body {
                    margin: 0;
                }
                .no-print {
                    display: none;
                }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="hospital-name">POLONNARUWA HOSPITAL</div>
            <div class="subtitle">Third Party Medicine Prescription</div>
        </div>

        <div class="info-section">
            <div class="info-row">
                <div class="info-label">Date:</div>
                <div class="info-value">${prescriptionDate}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Patient Name:</div>
                <div class="info-value">${patientName}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Patient NIC:</div>
                <div class="info-value">${patientNIC}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Doctor Name:</div>
                <div class="info-value">${doctorName}</div>
            </div>
        </div>

        <div class="description-section">
            <div class="description-title">Third Party Medicines to Purchase:</div>
            <div class="description-content">${description}</div>
        </div>

        <div class="note">
            <strong>Note:</strong> Please purchase these medicines from authorized pharmacies.
            Keep the receipts for your records. Consult your doctor if you have any questions about dosage or usage.
        </div>

        <div class="footer">
            <p>Polonnaruwa Hospital - Third Party Medicine Prescription</p>
            <p>Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
    </body>
    </html>
  `;

    // Create new window and print
    const printWindow = window.open('', '_blank', 'width=800,height=600');

    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();

      // Wait for content to load, then print
      printWindow.onload = function() {
        printWindow.print();
        // Optional: Close window after printing
        printWindow.onafterprint = function() {
          printWindow.close();
        };
      };
    } else {
      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Error - Print", message: "Unable to open print window. Please check your browser's popup settings."}
      });
    }
  }
}
