 import {Component, Input, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Diagnosis} from "../../../entity/diagnosis";
import {MatTableDataSource} from "@angular/material/table";
import {Employee} from "../../../entity/employee";
import {MatPaginator} from "@angular/material/paginator";
import {UiAssist} from "../../../util/ui/ui.assist";
import {RegexService} from "../../../service/regexservice";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {Diagnosisservice} from "../../../service/diagnosisservice";
import {Gender} from "../../../entity/gender";
import {Designation} from "../../../entity/designation";
import {Empstatus} from "../../../entity/empstatus";
import {Emptype} from "../../../entity/emptype";
import {Severityservice} from "../../../service/severityservice";
import {Treatmentplanservice} from "../../../service/treatmentplanservice";
import {Diagnosisstatusservice} from "../../../service/diagnosisstatusservice";
import {EmployeeService} from "../../../service/employeeservice";
import {Patientservice} from "../../../service/patientservice";
import {Severity} from "../../../entity/severity";
import {Diagnosisstatus} from "../../../entity/diagnosisstatus";
import {Patient} from "../../../entity/patient";
import {Clinic} from "../../../entity/clinic";
import {Treatmentplan} from "../../../entity/treatmentplan";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {Role} from "../../../entity/role";
import {Allergyservice} from "../../../service/allergyservice";
import {Symptomservice} from "../../../service/symptomservice";
import {Diseaseservice} from "../../../service/diseaseservice";
import {Allergy} from "../../../entity/allergy";
import {Symptom} from "../../../entity/symptom";
import {Disease} from "../../../entity/disease";
import {Userrole} from "../../../entity/userrole";
import {Allergydiagnosis} from "../../../entity/allergydiagnosis";
import {Symptomdiagnosis} from "../../../entity/symptomdiagnosis";
import {Diseasediagnosis} from "../../../entity/diseasediagnosis";
import {MatSelectionList} from "@angular/material/list";
import {Drugcontraindication} from "../../../entity/drugcontraindication";
import {MessageComponent} from "../../../util/dialog/message/message.component";
import {User} from "../../../entity/user";

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent {

  columns: string[] = ['patientmodi', 'treatmentplan', 'diagnosisstatus','bplevel', 'bloodpressure','heartrate', 'employeemodi'];
  headers: string[] = ['Patient', 'Treatmentplan', 'Status', 'BP Level', 'Bloodpressure','Heartrate','Doctor'];
  binders: string[] = ['getPatientmodi()', 'treatmentplan.name', 'diagnosisstatus.name', 'bplevel', 'bloodpressure','heartrate', 'getEmployeemodi()'];

  cscolumns: string[] = ['cspatientmodi', 'cstreatmentplan', 'csdiagnosisstatus', 'csbplevel', 'csbloodpressure', 'csheartrate','csemployeemodi'];
  csprompts: string[] = ['Search by Patient', 'Search by Treatmentplan', 'Search by Status', 'Search by BP level',
    'Search by Blood Pressure', 'Search by Heart Rate', 'Search by Employee'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  enaadd:boolean = false;
  enaupd:boolean = false;
  enadel:boolean = false;

  diagnosis!: Diagnosis;
  olddiagnosis!: Diagnosis;

  selectedrow: any;

  regexes:any;

  diagnoses: Array<Diagnosis>=[];
  data!: MatTableDataSource<Diagnosis>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  employees: Array<Employee>=[];
  severities: Array<Severity>=[];
  diagnosisstatuses:Array<Diagnosisstatus>=[];
  patients:Array<Patient>=[];
  treatmentplans:Array<Treatmentplan>=[];
  allergydiagnoses: Array<Allergydiagnosis> = [];
  symptomdiagnoses: Array<Symptomdiagnosis> = [];
  diseasediagnoses: Array<Diseasediagnosis> = [];


  @Input()allergies: Array<Allergy> = [];
  oldallergies:Array<Allergy>=[];
  @Input()selectedallergies: Array<Allergy> =[];

  @Input()symptoms: Array<Symptom> = [];
  oldsymptoms:Array<Symptom>=[];
  @Input()selectesymptoms: Array<Symptom> =[];

  @Input()diseases: Array<Disease> = [];
  olddiseases:Array<Disease>=[];
  @Input()selecteddiseases: Array<Disease> =[];

  @ViewChild('availablelist1') availablelist1!: MatSelectionList;
  @ViewChild('selectedlist1') selectedlist1!: MatSelectionList ;

  @ViewChild('availablelist2') availablelist2!: MatSelectionList;
  @ViewChild('selectedlist2') selectedlist2!: MatSelectionList;

  @ViewChild('availablelist3') availablelist3!: MatSelectionList;
  @ViewChild('selectedlist3') selectedlist3!: MatSelectionList;


  uiassist: UiAssist;
  constructor(
    private rs: RegexService,
    private ss: Severityservice,
    private tps: Treatmentplanservice,
    private dss: Diagnosisstatusservice,
    private es: EmployeeService,
    private ps: Patientservice,
    private fb: FormBuilder,
    private dg: MatDialog,
    private dp: DatePipe,
    private ds: Diagnosisservice,
    private as:Allergyservice,
    private syms:Symptomservice,
    private diss:Diseaseservice){

    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      "cspatientmodi": new FormControl(),
      "cstreatmentplan": new FormControl(),
      "csdiagnosisstatus": new FormControl(),
      "csbplevel": new FormControl(),
      "csbloodpressure": new FormControl(),
      "csheartrate": new FormControl(),
      "csemployeemodi": new FormControl(),
     // "cstime": new FormControl()
    });

    this.ssearch = this.fb.group({
      "ssseverity": new FormControl(),
      "sstreatmentplan":new FormControl(),
      "ssdiagnosisstatus":new FormControl(),
      "ssemployee":new FormControl(),
      "sspatient":new FormControl(),
      "ssnic" : new FormControl()

    });

    this.form = this.fb.group({
      "patient": new FormControl('',[Validators.required]),
      "onsetduration": new FormControl('',[Validators.required]),
      "diseasediagnoses": new FormControl(),
      "disease": new FormControl(),
      "symptomdiagnoses": new FormControl(),
      "severity": new FormControl('',[Validators.required]),
      "bplevel": new FormControl(),
      "bloodpressure": new FormControl(),
      "heartrate": new FormControl(),
      "temperature": new FormControl(),
      "respiratoryrate": new FormControl(),
      "height": new FormControl(),
      "weight": new FormControl(),
      "examination": new FormControl(),
      "allergydiagnoses": new FormControl(),
      "allergy": new FormControl(),
      "medicalhistory": new FormControl(),
      "surgicalhistory": new FormControl(),
      "diagnosisstatus": new FormControl('',[Validators.required]),
      "treatmentplan": new FormControl('',[Validators.required]),
      "doctornote": new FormControl(),
      "description": new FormControl(),
      "employee": new FormControl('',[Validators.required]),
      //"time": new FormControl(),

    },{updateOn: 'change'});

  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {

    this.createView();

    this.es.getAll("?designationid=1").then((emps: Employee[]) => {
      this.employees = emps;
    });

    this.ps.getAll("").then((pnts: Patient[]) => {
      this.patients = pnts;
    });

    this.dss.getAllList().then((diags: Diagnosisstatus[]) => {
      this.diagnosisstatuses = diags;
    });

    this.ss.getAllList().then((sers: Severity[]) => {
      this.severities = sers;
    });

    this.tps.getAllList().then((treps: Treatmentplan[]) => {
      this.treatmentplans = treps;
    });

    this.as.getAllList().then((alrgy:Allergy[])=>{
      this.allergies = alrgy;
      this.oldallergies = Array.from(this.allergies);
    });

    this.syms.getAllList().then((symp:Symptom[])=>{
      this.symptoms = symp;
      this.oldsymptoms = Array.from(this.symptoms);
    });

    this.diss.getAllList().then((dis:Disease[])=>{
      this.diseases = dis;
      this.olddiseases = Array.from(this.diseases);
    });

    this.rs.get("diagnoses").then((regs:[])=>{
      this.regexes = regs;
      this.createForm();
    });
  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }

  loadTable(query: string) {

    this.ds.getAll(query)
      .then((diagns: Diagnosis[]) => {
        this.diagnoses = diagns;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.diagnoses);
        this.data.paginator = this.paginator;
      });

  }

  btnSearchMc(): void {
    const sserchdata = this.ssearch.getRawValue();
    let severityid = sserchdata.ssseverity;
    let diagnosisstatusid = sserchdata.ssdiagnosisstatus;
    let employeeid = sserchdata.ssemployee;
    let patientid = sserchdata.sspatient;
    let treatmentplanid = sserchdata.sstreatmentplan;
    let patientnic = sserchdata.ssnic;

    let query = "";

    if (employeeid != null) query = query + "&employeeid=" + employeeid;
    if (severityid != null) query = query + "&severityid=" + severityid;
    if (diagnosisstatusid != null) query = query + "&diagnosisstatusid=" + diagnosisstatusid;
    if (patientid != null) query = query + "&patientid=" + patientid;
    if (treatmentplanid != null) query = query + "&treatmentplanid=" + treatmentplanid;
    if (patientnic != null && patientnic.trim() != "") query = query + "&patientnic=" + patientnic;

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


  getPatientmodi(element: Diagnosis) {
    return element.patient.name ;

  }

  getEmployeemodi(element: Diagnosis) {
    return element.employee.callingname + '(' + element.employee.number + ')';

  }

  createForm() {
    this.form.controls['patient'].setValidators([Validators.required]);
    this.form.controls['onsetduration'].setValidators([Validators.required]);
    this.form.controls['diseasediagnoses'].setValidators([Validators.required]);
    this.form.controls['disease'].setValidators([Validators.required]);
    this.form.controls['symptomdiagnoses'].setValidators([Validators.required]);
    this.form.controls['severity'].setValidators([Validators.required]);
    this.form.controls['bplevel'].setValidators([Validators.required]);
    this.form.controls['bloodpressure'].setValidators([Validators.required]);
    this.form.controls['heartrate'].setValidators([Validators.required]);
    this.form.controls['temperature'].setValidators([Validators.required]);
    this.form.controls['respiratoryrate'].setValidators([Validators.required]);
    this.form.controls['height'].setValidators([Validators.required]);
    this.form.controls['weight'].setValidators([Validators.required]);
    this.form.controls['examination'].setValidators([Validators.required]);
    this.form.controls['allergydiagnoses'].setValidators([Validators.required]);
    this.form.controls['allergy'].setValidators([Validators.required]);
    this.form.controls['medicalhistory'].setValidators([Validators.required]);
    this.form.controls['surgicalhistory'].setValidators([Validators.required]);
    this.form.controls['diagnosisstatus'].setValidators([Validators.required]);
    this.form.controls['treatmentplan'].setValidators([Validators.required]);
    this.form.controls['doctornote'].setValidators([Validators.required]);
    this.form.controls['description'].setValidators([Validators.required]);
    this.form.controls['employee'].setValidators([Validators.required]);


    Object.values(this.form.controls).forEach( control => { control.markAsTouched(); } );

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {


          if (this.olddiagnosis != undefined && control.valid) {
            // @ts-ignore
            if (value === this.diagnosis[controlName]) {
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

    this.enableButtons(true,false,false);
  }

  enableButtons(add:boolean, upd:boolean, del:boolean){
    this.enaadd=add;
    this.enaupd=upd;
    this.enadel=del;
  }

  filterTable(): void {

    const cserchdata = this.csearch.getRawValue();

    this.data.filterPredicate = (diagnosis: Diagnosis, filter: string) => {
      return (cserchdata.cspatientmodi == null || this.getPatientmodi(diagnosis).includes(cserchdata.cspatientmodi))&&
      (cserchdata.csemployeemodi == null || this.getEmployeemodi(diagnosis).includes(cserchdata.csemployeemodi))&&
      (cserchdata.cstreatmentplan == null || diagnosis.treatmentplan.name.includes(cserchdata.cstreatmentplan)) &&
      (cserchdata.csdiagnosisstatus == null || diagnosis.diagnosisstatus.name.includes(cserchdata.csdiagnosisstatus)) &&
      (cserchdata.csbplevel == null || diagnosis.bplevel.toString().includes(cserchdata.csbplevel)) &&
        (cserchdata.csbloodpressure == null || diagnosis.bloodpressure.toString().includes(cserchdata.csbloodpressure)) &&
        (cserchdata.csheartrate == null || diagnosis.heartrate.toString().includes(cserchdata.csheartrate)) &&
        (cserchdata.csemployeemodi == null || this.getEmployeemodi(diagnosis).includes(cserchdata.csemployeemodi));
        //(cserchdata.cstime == null || diagnosis.time.toString().includes(cserchdata.cstime))
    };

    this.data.filter = 'xx';

  }

  rightSelected1(): void {
    this.diagnosis.allergydiagnoses = this.availablelist1.selectedOptions.selected.map(option => {
      const allergyDiag = new Allergydiagnosis(option.value);
      this.allergies = this.allergies.filter(allergy => allergy !== option.value); //Remove Selected
      this.allergydiagnoses.push(allergyDiag); // Add selected to Right Side
      return allergyDiag;
    });

    this.form.controls["allergydiagnoses"].clearValidators();
    this.form.controls["allergydiagnoses"].updateValueAndValidity(); // Update status
  }

  leftSelected1(): void {
    const selectedOptions = this.selectedlist1.selectedOptions.selected; // Right Side
    for (const option of selectedOptions) {
      const extAlleDiagnos = option.value;
      this.allergydiagnoses = this.allergydiagnoses.filter(allergy =>{
        allergy !== extAlleDiagnos
      }); // Remove the Selected one From Right Side
      this.allergies.push(extAlleDiagnos.allergy);
    }

  }

  rightAll1(): void {
    this.diagnosis.allergydiagnoses = this.availablelist1.selectAll().map(option => {
      const allerDiag = new Allergydiagnosis(option.value);
      this.allergies = this.allergies.filter(allergy => allergy !== option.value);
      this.allergydiagnoses.push(allerDiag);
      return allerDiag;
    });

    this.form.controls["allergydiagnoses"].clearValidators();
    this.form.controls["allergydiagnoses"].updateValueAndValidity();

  }

  leftAll1():void{
    for(let allergydiagnosis of this.allergydiagnoses) this.allergies.push(allergydiagnosis.allergy);
    this.allergydiagnoses = [];
  }




  rightSelected2(): void {
    this.diagnosis.symptomdiagnoses = this.availablelist2.selectedOptions.selected.map(option => {
      const symptomDiag = new Symptomdiagnosis(option.value);
      this.symptoms = this.symptoms.filter(symptom => symptom !== option.value); //Remove Selected
      this.symptomdiagnoses.push(symptomDiag); // Add selected to Right Side
      return symptomDiag;
    });

    this.form.controls["symptomdiagnoses"].clearValidators();
    this.form.controls["symptomdiagnoses"].updateValueAndValidity(); // Update status
  }

  leftSelected2(): void {
    const selectedOptions = this.selectedlist2.selectedOptions.selected; // Right Side
    for (const option of selectedOptions) {
      const extSympDiagnos = option.value;
      this.symptomdiagnoses = this.symptomdiagnoses.filter(symptom =>{
        symptom !== extSympDiagnos
      }); // Remove the Selected one From Right Side
      this.symptoms.push(extSympDiagnos.symptom);
    }

  }

  rightAll2(): void {
    this.diagnosis.symptomdiagnoses = this.availablelist2.selectAll().map(option => {
      const symprDiag = new Symptomdiagnosis(option.value);
      this.symptoms = this.symptoms.filter(symptom => symptom !== option.value);
      this.symptomdiagnoses.push(symprDiag);
      return symprDiag;
    });

    this.form.controls["symptomdiagnoses"].clearValidators();
    this.form.controls["symptomdiagnoses"].updateValueAndValidity();

  }

  leftAll2():void{
    for(let symptomdiagnosis of this.symptomdiagnoses) this.symptoms.push(symptomdiagnosis.symptom);
    this.symptomdiagnoses = [];
  }



  rightSelected3(): void {
    this.diagnosis.diseasediagnoses = this.availablelist3.selectedOptions.selected.map(option => {
      const diseaseDiag = new Diseasediagnosis(option.value);
      this.diseases = this.diseases.filter(disease => disease !== option.value); //Remove Selected
      this.diseasediagnoses.push(diseaseDiag); // Add selected to Right Side
      return diseaseDiag;
    });

    this.form.controls["diseasediagnoses"].clearValidators();
    this.form.controls["diseasediagnoses"].updateValueAndValidity(); // Update status
  }

  leftSelected3(): void {
    const selectedOptions = this.selectedlist3.selectedOptions.selected; // Right Side
    for (const option of selectedOptions) {
      const extDisDiagnos = option.value;
      this.diseasediagnoses = this.diseasediagnoses.filter(disease =>{
        disease !== extDisDiagnos
      }); // Remove the Selected one From Right Side
      this.diseases.push(extDisDiagnos.disease);
    }

  }

  rightAll3(): void {
    this.diagnosis.diseasediagnoses = this.availablelist3.selectAll().map(option => {
      const diseaseDiag = new Diseasediagnosis(option.value);
      this.diseases = this.diseases.filter(disease => disease !== option.value);
      this.diseasediagnoses.push(diseaseDiag);
      return diseaseDiag;
    });

    this.form.controls["diseasediagnoses"].clearValidators();
    this.form.controls["diseasediagnoses"].updateValueAndValidity();

  }

  leftAll3():void{
    for(let diseasediagnosis of this.diseasediagnoses) this.diseases.push(diseasediagnosis.disease);
    this.diseasediagnoses = [];
  }


  getErrors(): string {

    let errors: string = ""

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];

      if (control.errors) {

        if (this.regexes[controlName] != undefined) {
          errors = errors + "<br>" + this.regexes[controlName]['message'];
        } else {
          errors = errors + "<br>Invalid " + controlName;
        }
      }
    }

    // if(this.form.controls['password'].getRawValue() != this.form.controls['confirmpassword'].getRawValue())
    //   errors = errors + "<br> Password doesn't Match";

    return errors;
  }



  add() {

    let errors = this.getErrors();

    if (errors != "") {
      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Diagnosis Add ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });
    } else {

      this.diagnosis = this.form.getRawValue();

      this.diagnosis.symptomdiagnoses = this.symptomdiagnoses;
      this.diagnosis.allergydiagnoses = this.allergydiagnoses;
      this.diagnosis.diseasediagnoses = this.diseasediagnoses;

      let formdata: string = "";

      formdata = formdata + "<br>Patient is : " + this.diagnosis.patient.name;


      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Diagnosis Add",
          message: "Are you sure to Add the folowing Diagnosis? <br> <br>" + formdata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found";

      confirm.afterClosed().subscribe(async result => {
        if (result) {
          console.log(JSON.stringify(this.diagnosis));
          this.ds.add(this.diagnosis).then((responce: [] | undefined) => {
            //console.log("Res-" + responce);
            //console.log("Un-" + responce == undefined);
            if (responce != undefined) { // @ts-ignore
              console.log("Add-" + responce['id'] + "-" + responce['url'] + "-" + (responce['errors'] == ""));
              // @ts-ignore
              addstatus = responce['errors'] == "";
              console.log("Add Sta-" + addstatus);
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
              this.form.reset();
              this.allergydiagnoses = [];
              this.symptomdiagnoses = [];
              this.diseasediagnoses = [];
              Object.values(this.form.controls).forEach(control => {
                control.markAsTouched();
              });
              this.loadTable("");
            }

            const stsmsg = this.dg.open(MessageComponent, {
              width: '500px',
              data: {heading: "Status -Diagnosis Add", message: addmessage}
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


  fillForm(diagnosis: Diagnosis) {

    this.enableButtons(false,true,true);

    this.allergies = Array.from(this.oldallergies);
    this.symptoms = Array.from(this.symptoms);
    this.diseases = Array.from(this.diseases);

    this.selectedrow=diagnosis;

    this.diagnosis = JSON.parse(JSON.stringify(diagnosis));
    this.olddiagnosis = JSON.parse(JSON.stringify(diagnosis));

    //@ts-ignore
    this.diagnosis.patient = this.patients.find(p => p.id === this.diagnosis.patient.id);

    //@ts-ignore
    this.diagnosis.employee = this.employees.find(e => e.id === this.diagnosis.employee.id);

    //@ts-ignore
    this.diagnosis.severity = this.severities.find(s => s.id === this.diagnosis.severity.id);

    //@ts-ignore
    this.diagnosis.treatmentplan = this.treatmentplans.find(t => t.id === this.diagnosis.treatmentplan.id);

    //@ts-ignore
    this.diagnosis.diagnosisstatus = this.diagnosisstatuses.find(ds => ds.id === this.diagnosis.diagnosisstatus.id);

    this.allergydiagnoses = this.diagnosis.allergydiagnoses; // Load User Roles
    this.symptomdiagnoses = this.diagnosis.symptomdiagnoses;
    this.diseasediagnoses = this.diagnosis.diseasediagnoses;

    this.diagnosis.allergydiagnoses.forEach((ad)=> this.allergies= this.allergies.filter((a)=> a.id != ad.allergy.id )); // Load or remove roles by comparing with user.userroles
    this.diagnosis.symptomdiagnoses.forEach((sd)=> this.symptoms= this.symptoms.filter((s)=> s.id != sd.symptom.id ));
    this.diagnosis.diseasediagnoses.forEach((dd)=> this.diseases= this.diseases.filter((d)=> d.id != dd.disease.id ));

    this.form.patchValue(this.diagnosis);
    // this.form.controls["username"].disable();
    this.form.markAsPristine();

  }

  getUpdates(): string {

    let updates: string = "";
    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.dirty) {
        updates = updates + "<br>" + controlName.charAt(0).toUpperCase() + controlName.slice(1)+" Changed";
      }
    }
    return updates;
  }


  update() {

    let errors = this.getErrors();

    if (errors != "") {

      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Diagnosis Update ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

    } else {

      let updates: string = this.getUpdates();

      if (updates != "") {

        let updstatus: boolean = false;
        let updmessage: string = "Server Not Found";

        const confirm = this.dg.open(ConfirmComponent, {
          width: '500px',
          data: {
            heading: "Confirmation - Diagnosis Update",
            message: "Are you sure to Save folowing Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {
            //console.log("EmployeeService.update()");
            this.diagnosis = this.form.getRawValue();

            this.ds.update(this.diagnosis).then((responce: [] | undefined) => {
              //console.log("Res-" + responce);
              // console.log("Un-" + responce == undefined);
              if (responce != undefined) { // @ts-ignore
                //console.log("Add-" + responce['id'] + "-" + responce['url'] + "-" + (responce['errors'] == ""));
                // @ts-ignore
                updstatus = responce['errors'] == "";
                //console.log("Upd Sta-" + updstatus);
                if (!updstatus) { // @ts-ignore
                  updmessage = responce['errors'];
                }
              } else {
                //console.log("undefined");
                updstatus = false;
                updmessage = "Content Not Found"
              }
            } ).finally(() => {
              if (updstatus) {
                updmessage = "Successfully Updated";
                this.form.reset();
                this.leftAll1();
                this.leftAll2();
                this.leftAll3();
                Object.values(this.form.controls).forEach(control => { control.markAsTouched(); });
                this.loadTable("");
              }

              const stsmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Status -Diagnosis Add", message: updmessage}
              });
              stsmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

            });
          }
        });
      }
      else {

        const updmsg = this.dg.open(MessageComponent, {
          width: '500px',
          data: {heading: "Confirmation - Diagnosis Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

      }
    }
  }


  delete() : void {

    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - User Delete",
        message: "Are you sure to Delete following Diagnosis? <br> <br>" + this.diagnosis.patient.name
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        let delstatus: boolean = false;
        let delmessage: string = "Server Not Found";

        this.ds.delete(this.diagnosis.id).then((responce: [] | undefined) => {

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
            this.leftAll1();
            this.leftAll2();
            this.leftAll3();
            Object.values(this.form.controls).forEach(control => {
              control.markAsTouched();
            });
            this.loadTable("");
          }
          const stsmsg = this.dg.open(MessageComponent, {
            width: '500px',
            data: {heading: "Status - Diagnosis Delete ", message: delmessage}
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

  clear():void{
    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Diagnosis Clear",
        message: "Are you sure to Clear following Details ? <br> <br>"
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.form.reset()
      }
    });
  }

}
