import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Employee} from "../../../entity/employee";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Patient} from "../../../entity/patient";
import {UiAssist} from "../../../util/ui/ui.assist";
import {Patientservice} from "../../../service/patientservice";
import {Gender} from "../../../entity/gender";
import {Designation} from "../../../entity/designation";
import {Empstatus} from "../../../entity/empstatus";
import {Emptype} from "../../../entity/emptype";
import {Patientstatus} from "../../../entity/patientstatus";
import {Patientstatusservice} from "../../../service/patientstatusservice";
import {District} from "../../../entity/district";
import {Districtservice} from "../../../service/districtservice";
import {Bloodgroup} from "../../../entity/bloodgroup";
import {Bloodgroupservice} from "../../../service/bloodgroupservice";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {MatDialog} from "@angular/material/dialog";
import {Genderservice} from "../../../service/genderservice";
import {DatePipe} from "@angular/common";
import {Riskfactorservice} from "../../../service/riskfactorservice";
import {Riskfactor} from "../../../entity/riskfactor";
import {Patientriskfactor} from "../../../entity/patientriskfactor";
import {MatSelectionList} from "@angular/material/list";
import {RegexService} from "../../../service/regexservice";
import {MessageComponent} from "../../../util/dialog/message/message.component";
import {EmployeeService} from "../../../service/employeeservice";
import {User} from "../../../entity/user";
import {AuthorizationManager} from "../../../service/authorizationmanager";
import {Province} from "../../../entity/province";
import {NumberService} from "../../../service/numberservice";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  public cssearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  employees: Array<Employee> = [];
  patientstatuses: Array<Patientstatus> = [];
  districts: Array<District> = [];
  genders: Array<Gender> = [];
  bloodgroups: Array<Bloodgroup> = [];
  patientriskfactors: Array<Patientriskfactor> = [];
  patients: Array<Patient> = [];
  provinces: Array<Province>=[];

  disable = true;

  @Input() riskfactors: Array<Riskfactor> = [];
  oldriskfactors: Array<Riskfactor> = [];
  @Input() selectedriskfactors: Array<Riskfactor> = [];

  patient!: Patient;
  oldpatient!: Patient;

  @ViewChild('availablelist') availablelist!: MatSelectionList;
  @ViewChild('selectedlist') selectedlist!: MatSelectionList;

  columns: string[] = ['regno','name', 'patientstatus', 'contactnumber', 'dob', 'nic'];
  headers: string[] = ['Reg No','Name', 'patientstatus', 'Mobile', 'Birth Date', 'nic'];
  binders: string[] = ['regno','name', 'patientstatus.name', 'contactnumber', 'dob', 'nic'];

  cscolumns: string[] = ['csregno','csname', 'cspatientstatus', 'cscontactnumber', 'csdob', 'csnic'];
  csprompts: string[] = ['Search by Name','Search by Name', 'Search by Patient status', 'Search By Mobile',
    'Search by Birth Date', 'Search by NIC'];


  imageurl: string = '';

  data!: MatTableDataSource<Patient>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  imagepnturl: string = 'assets/default.png'

  selectedrow: any;

  authorities: string[] = [];

  uiassist: UiAssist;

  regexes: any;

  enaadd: boolean = false;
  enaupd: boolean = false;
  enadel: boolean = false;

  constructor(private fb: FormBuilder,
              private ps: Patientservice,
              private pss: Patientstatusservice,
              private ds: Districtservice,
              private bg: Bloodgroupservice,
              private dg: MatDialog,
              private gs: Genderservice,
              private dp: DatePipe,
              private rs: RegexService,
              private rfs: Riskfactorservice,
              private es:EmployeeService,
              private ns:NumberService,
              public authService:AuthorizationManager
  ) {
    this.uiassist = new UiAssist(this);
    this.patient= new Patient();

    this.cssearch = this.fb.group({
      'csregno': new FormControl(),
      'csname': new FormControl(),
      'cspatientstatus': new FormControl(),
      'cscontactnumber': new FormControl(),
      'csdob': new FormControl(),
      'csnic': new FormControl(),
      'csmodi': new FormControl()

    });


    this.form = this.fb.group({
      "regno": new FormControl('', [Validators.required]),
      "name": new FormControl('', [Validators.required]),
      "gender": new FormControl('', [Validators.required]),
      "dob": new FormControl('', [Validators.required]),
      "nic": new FormControl('', [Validators.required]),
      "photo": new FormControl('', [Validators.required]),
      "address": new FormControl('', [Validators.required]),
      "contactnumber": new FormControl('', [Validators.required]),
      //"province": new FormControl('', [Validators.required]),
      "district": new FormControl('', [Validators.required]),
      "guardianname": new FormControl('', [Validators.required]),
      "guardiancontact": new FormControl('', [Validators.required]),
      "description": new FormControl('', [Validators.required]),
      "bloodgroup": new FormControl('',[Validators.required]),
      "patientriskfactors": new FormControl('', [Validators.required]),
      "patientstatus": new FormControl('', [Validators.required]),
      "employee": new FormControl('', [Validators.required]),

    } );
    // {updateOn: 'change'}

    this.ssearch = this.fb.group({
      'ssname': new FormControl(),
      'ssregno': new FormControl(),
      'ssnic': new FormControl(),
      'ssdob': new FormControl(),
      'sspatientstatus': new FormControl(),
      'ssdistrict': new FormControl(),
      'ssriskfactor': new FormControl(),
      'ssbloodgroup': new FormControl(),
      'ssprovince': new FormControl(),
    });

  }

  async ngOnInit(): Promise<void> {
    this.initialize();
  }
  initialize(){
    this.createView();

    this.pss.getAllList().then((pss: Patientstatus[]) => {
      this.patientstatuses = pss;
    });

    this.ds.getAllList().then((ds: District[]) => {
      this.districts = ds;
    });

  this.es.getAll("?designationid=2").then((emps: Employee[]) => {
    this.employees = emps;
  });

    this.gs.getAllList().then((gs: Gender[]) => {
      this.genders = gs;
    });

    this.bg.getAllList().then((bg: Bloodgroup[]) => {
      this.bloodgroups = bg;
    });

    this.rfs.getAllList().then((rfs: Riskfactor[]) => {
      this.riskfactors = rfs;
      this.oldriskfactors = Array.from(this.riskfactors);
    });

    this.rs.get('patients').then((regs: []) => {
      this.regexes = regs;
      this.createForm();
    });

  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }

  loadTable(query: string):void {

    this.ps.getAll(query)
      .then((patients: Patient[]) => {
        this.patients = patients;
        this.ns.setLastSequenceNumber(this.patients[this.patients.length-1].regno);
        this.generateNumber();
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.patients);
        this.data.paginator = this.paginator;
      });
  }

  getModi(element: Patient) {
    return element.name + '(' + element.nic + ')';
  }

  getRegno(element: Patient) {
    return ("P" + element.dob + '(' + element.name + ')');
  }

  getDate(element: User) {
    return this.dp.transform(element.docreated,'yyyy-MM-dd');
  }
  getRiskfactor(element: Patient) {
    let riskfactors = "";
    element.patientriskfactors.forEach((p) => {
      riskfactors = riskfactors + p.riskfactor.name + "," + "\n";
    });
    return riskfactors;

  }

  createForm() {

    this.form.controls['name'].setValidators([Validators.required, Validators.pattern(this.regexes['name']['regex'])]);
    this.form.controls['regno'].setValidators([Validators.required]);
    this.form.controls['gender'].setValidators([Validators.required]);
    this.form.controls['dob'].setValidators([Validators.required]);
    this.form.controls['nic'].setValidators([Validators.required, Validators.pattern(this.regexes['nic']['regex'])]);
    this.form.controls['photo'].setValidators([Validators.required]);
    this.form.controls['address'].setValidators([Validators.required, Validators.pattern(this.regexes['address']['regex'])]);
    this.form.controls['contactnumber'].setValidators([Validators.required, Validators.pattern(this.regexes['contactnumber']['regex'])]);
   // this.form.controls['province'].setValidators([Validators.required, Validators.pattern(this.regexes['contactnumber']['regex'])]);
    this.form.controls['district'].setValidators([Validators.required]);
    this.form.controls['guardianname'].setValidators([Validators.required, Validators.pattern(this.regexes['guardianname']['regex'])]);
    this.form.controls['guardiancontact'].setValidators([Validators.required, Validators.pattern(this.regexes['guardiancontact']['regex'])]);
    this.form.controls['description'].setValidators([Validators.required, Validators.pattern(this.regexes['description']['regex'])]);
    this.form.controls['bloodgroup'].setValidators([Validators.required]);
    this.form.controls['patientriskfactors'].setValidators([Validators.required]);
    this.form.controls['patientstatus'].setValidators([Validators.required]);
    this.form.controls['employee'].setValidators([Validators.required]);

    Object.values(this.form.controls).forEach(control => {control.markAsTouched();});

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.markAsUntouched();
      control.valueChanges.subscribe(value => {
        //@ts-ignore
        if (controlName == "dob")
          value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

        if (this.oldpatient != undefined && control.valid) {
          // @ts-ignore
          if (value === this.patient[controlName]) {
            control.markAsPristine();
          } else {
            control.markAsDirty();
          }
        } else {
          control.markAsPristine();
        }
      });

    }
    this.enableButtons(true, false, false);

  }


  enableButtons(add: boolean, upd: boolean, del: boolean) {
    this.enaadd = add;
    this.enaupd = upd;
    this.enadel = del;
  }


  rightSelected(): void {

    this.patient.patientriskfactors = this.availablelist.selectedOptions.selected.map(option => {
      const patientRiskfactor = new Patientriskfactor(option.value);
      this.riskfactors = this.riskfactors.filter(riskfactor => riskfactor !== option.value); //Remove Selected
      this.patientriskfactors.push(patientRiskfactor); // Add selected to Right Side
      return patientRiskfactor;
    });

    this.form.controls["patientriskfactors"].clearValidators();
    this.form.controls["patientriskfactors"].updateValueAndValidity(); // Update status
  }

  leftSelected(): void {
    const selectedOptions = this.selectedlist.selectedOptions.selected; // Right Side
    for (const option of selectedOptions) {
      const extPatientRiskfactors = option.value;
      this.patientriskfactors = this.patientriskfactors.filter(riskfactor => {
        riskfactor !== extPatientRiskfactors
      }); // Remove the Selected one From Right Side
      this.riskfactors.push(extPatientRiskfactors.riskfactor);
    }

  }


  rightAll(): void {
    this.patient.patientriskfactors = this.availablelist.selectAll().map(option => {
      const patientRiskfactor = new Patientriskfactor(option.value);
      this.riskfactors = this.riskfactors.filter(riskfactor => riskfactor !== option.value);
      this.patientriskfactors.push(patientRiskfactor);
      return patientRiskfactor;
    });

    this.form.controls["patientriskfactors"].clearValidators();
    this.form.controls["patientriskfactors"].updateValueAndValidity();
  }

  leftAll(): void {
    for (let patientriskfactor of this.patientriskfactors) this.riskfactors.push(patientriskfactor.riskfactor);
    this.patientriskfactors = [];
  }

  filterTable() {
    const cssearchdata = this.cssearch.getRawValue();

    this.data.filterPredicate = ((patient: Patient, filter: string) => {
      return (cssearchdata.csregno == null || patient.regno.includes(cssearchdata.csregno)) &&
        (cssearchdata.csname == null || patient.name.includes(cssearchdata.csname)) &&
        (cssearchdata.cspatientstatus == null || patient.patientstatus.name.includes(cssearchdata.cspatientstatus)) &&
        (cssearchdata.cscontactnumber == null || patient.contactnumber.includes(cssearchdata.cscontactnumber)) &&
        (cssearchdata.csdob == null || patient.dob.includes(cssearchdata.csdob)) &&
        (cssearchdata.csnic == null || patient.nic.includes(cssearchdata.csnic)) &&
        (cssearchdata.csmodi == null || this.getModi(patient).includes(cssearchdata.csmodi));
    });
    this.data.filter = 'xx';
  }

  btnSearchMc(): void {
    const ssearchdata = this.ssearch.getRawValue();

    let name = ssearchdata.ssname;
    let nic = ssearchdata.ssnic;
    let dob = ssearchdata.ssdob;
    let patientstatusid = ssearchdata.sspatientstatus;
    let districtid = ssearchdata.ssdistrict;
    let bloodgroupid = ssearchdata.ssbloodgroup;
    let riskfactorid = ssearchdata.ssriskfactor;
    let provinceid = ssearchdata.ssprovince;

    let query = "";

    if (name != null && name.trim() != "") query = query + "&patientname=" + name;
    if (nic != null && nic.trim() != "") query = query + "&patientnic=" + nic;
    if (dob != null && dob.trim() != "") query = query + "&patientdob=" + dob;
    if (patientstatusid != null) query = query + "&patientstatusid=" + patientstatusid;
    if (districtid != null) query = query + "&patientdistrictid=" + districtid;
    if (bloodgroupid != null) query = query + "&patientbloodgroupid=" + bloodgroupid;
    if (riskfactorid != null) query = query + "&riskfactorid=" + riskfactorid;
    if (provinceid != null) query = query + "&provinceid=" + provinceid;

    if (query != "") query = query.replace(/^./, "?")

    this.loadTable(query);
  }


  btnSearchClearMc(): void {

    const confirm = this.dg.open(ConfirmComponent, {
      width: '450px',
      data: {heading: "Search Clear", message: "Are you sure to Clear the Search?"}
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.ssearch.reset();
        this.loadTable("");
      }
    });

  }

  getErrors(): string {

    let errors: string = "";

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

    return errors;
  }

  add() {

    let errors = this.getErrors();

    if (errors != "") {
      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Patient Add ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });
    } else {

      let patient: Patient = this.form.getRawValue();


      patient.photo = btoa(this.imagepnturl);

      // @ts-ignore
      patient.dob = this.dp.transform(this.patient.dob, "YYYY-MM-dd");

      // console.log(patient);
      patient.patientriskfactors = this.patient.patientriskfactors;
      this.patient = patient;

      let pntdata: string = "";

      pntdata = pntdata + "<br>Name is : " + this.patient.name;
      pntdata = pntdata + "<br>Nic is : " + this.patient.nic;


      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Patient Add",
          message: "Are you sure to Add the following Patient? <br> <br>" + pntdata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found";

      confirm.afterClosed().subscribe(async result => {
        if (result) {
          console.log(JSON.stringify(this.patient));
          this.ps.add(this.patient).then((responce: [] | undefined) => {
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
              this.patientriskfactors = [];
              Object.values(this.form.controls).forEach(control => {
                control.markAsTouched();
              });
              this.loadTable("");
            }

            const stsmsg = this.dg.open(MessageComponent, {
              width: '500px',
              data: {heading: "Status -Patient Add", message: addmessage}
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

  fillForm(patient: Patient) {

    // this.enableButtons(false,true,true);

    //this.enableButtons(false, true, true);

    this.riskfactors = Array.from(this.oldriskfactors);

    this.selectedrow = patient;

    this.patient = JSON.parse(JSON.stringify(patient));
    this.oldpatient = JSON.parse(JSON.stringify(patient));

    if (this.patient.photo != null) {
      this.imagepnturl = atob(this.patient.photo);
      this.form.controls['photo'].clearValidators();
    } else {
      this.clearImage();
    }
    this.patient.photo = "";

    //@ts-ignore
    this.patient.gender = this.genders.find(g => g.id === this.patient.gender.id);
    //@ts-ignore
    this.patient.district = this.districts.find(d => d.id === this.patient.district.id);
    //@ts-ignore
    this.patient.bloodgroup = this.bloodgroups.find(b => b.id === this.patient.bloodgroup.id);
    //@ts-ignore
    this.patient.patientstatus = this.patientstatuses.find(ps => ps.id === this.patient.patientstatus.id);
    //@ts-ignore
    this.patient.employee = this.employees.find(e => e.id === this.patient.employee.id);

    this.patientriskfactors = this.patient.patientriskfactors; // Load User Roles

    this.patient.patientriskfactors.forEach((pr) => this.riskfactors = this.riskfactors.filter((r) => r.id != pr.riskfactor.id)); // Load or remove roles by comparing with user.userroles

    this.form.patchValue(this.patient);
    this.form.markAsPristine();

  }

  getUpdates(): string {
    let updates: string = '';

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.dirty) {
        updates = updates + "<br>" + controlName.charAt(0).toUpperCase() + controlName.slice(1) + " Changed";
      }
    }
    return updates;
  }


  selectImage(e: any): void {
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imagepnturl = event.target.result;
        this.form.controls['photo'].clearValidators();
      }
    }
  }

  clearImage(): void {
    this.imagepnturl = 'assets/default.png';
    this.form.controls['photo'].setErrors({'required': true});
  }




  update() {

    let errors = this.getErrors();

    if (errors != "") {

      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Patient Update ", message: "You have following Errors <br> " + errors}
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
            heading: "Confirmation - Patient Update",
            message: "Are you sure to Save folowing Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {
            //console.log("EmployeeService.update()");
            this.patient = this.form.getRawValue();
            if (this.form.controls['photo'].dirty) this.patient.photo = btoa(this.imagepnturl);
            else this.patient.photo = this.oldpatient.photo;

            this.patient.id = this.oldpatient.id;

            this.ps.update(this.patient).then((responce: [] | undefined) => {
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
            }).finally(() => {
              if (updstatus) {
                updmessage = "Successfully Updated";
                this.form.reset();
                this.clearImage();
                this.leftAll();
                Object.values(this.form.controls).forEach(control => {control.markAsTouched();});
                this.loadTable("");
              }

              const stsmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Status -Patient Add", message: updmessage}
              });
              stsmsg.afterClosed().subscribe(async result => {
                if (!result) {
                  return;
                }
              });

            });
          }
        });
      } else {

        const updmsg = this.dg.open(MessageComponent, {
          width: '500px',
          data: {heading: "Confirmation - Patient Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => {
          if (!result) {
            return;
          }
        });

      }
    }


  }

  delete() {

    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Patient Delete",
        message: "Are you sure to Delete following Patient? <br> <br>" + this.patient.name
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        let delstatus: boolean = false;
        let delmessage: string = "Server Not Found";

        this.ps.delete(this.patient.id).then((responce: [] | undefined) => {

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
            this.clearImage();
            Object.values(this.form.controls).forEach(control => {
              control.markAsTouched();
            });
            this.loadTable("");
          }

          const stsmsg = this.dg.open(MessageComponent, {
            width: '500px',
            data: {heading: "Status - Patient Delete ", message: delmessage}
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




  clear(): void {
    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Patient Clear",
        message: "Are you sure to Clear following Details ? <br> <br>"
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.form.reset()
      }
    });
  }

  generateNumber(){
    const newNumber = this.ns.generateNumber('PAT');
    this.form.controls['regno'].setValue(newNumber);
  }

  // genregno():void{
  //   this.form.get("patient")?.valueChanges.subscribe((sup:Patient)=>{
  //     this.pos.getMaxNumber().then(maxnumber=>{
  //       if(maxnumber==null){
  //         this.form.get("number")?.setValue("PO0001")
  //       }else {
  //         let s1 = JSON.stringify(maxnumber).toString();
  //         let match1 = s1.match(/\d+/);
  //         // @ts-ignore
  //         let match = parseInt(match1[0], 10);
  //         this.form.get("number")?.setValue("PO000" + ++match);
  //       }
  //     })
  //   })

  // getUpdates(): string {
  //
  //   let updates: string = "";
  //   for (const controlName in this.form.controls) {
  //     const control = this.form.controls[controlName];
  //     if (control.dirty) {
  //       updates = updates + "<br>" + controlName.charAt(0).toUpperCase() + controlName.slice(1)+" Changed";
  //     }
  //   }
  //   return updates;
  // }


}

