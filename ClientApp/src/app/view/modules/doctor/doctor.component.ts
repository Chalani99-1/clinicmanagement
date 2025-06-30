import {Component, Input, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Employee} from "../../../entity/employee";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Doctor} from "../../../entity/doctor";
import {UiAssist} from "../../../util/ui/ui.assist";
import {EmployeeService} from "../../../service/employeeservice";
import {Doctorservice} from "../../../service/doctorservice";
import {RegexService} from "../../../service/regexservice";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {AuthorizationManager} from "../../../service/authorizationmanager";
import {Degreeservice} from "../../../service/degreeservice";
import {Specialityservice} from "../../../service/specialityservice";
import {Doctorgradeservice} from "../../../service/doctorgradeservice";
import {Degree} from "../../../entity/degree";
import {Speciality} from "../../../entity/speciality";
import {Doctorgrade} from "../../../entity/doctorgrade";
import {Genderservice} from "../../../service/genderservice";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {Countryservice} from "../../../service/countryservice";
import {Country} from "../../../entity/country";
import {University} from "../../../entity/university";
import {Universityservice} from "../../../service/universityservice";
import {Doctordegree} from "../../../entity/doctordegree";
import {MessageComponent} from "../../../util/dialog/message/message.component";
import {Subscription} from "rxjs";
import {query} from "@angular/animations";
import {Prescription} from "../../../entity/prescription";


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent {
  private universitySubscription: Subscription = new Subscription();
  private countrySubscription: Subscription = new Subscription();

  columns: string[] = ['employee','fullname', 'slmcregno', 'speciality',  'email','degreeyear'];
  headers: string[] = ['Employee Number','Full Name',  'SLMC number', 'Speciality', 'Email','Degree Year'];
  binders: string[] = ['employee.number','employee.fullname', 'slmcregno', 'speciality.name','employee.email','getdegreeyear()'];

  cscolumns: string[] = ['csemployee','csfullname','csslmcregno',  'csspeciality', 'csemail','csdegreeyear'];
  csprompts: string[] = ['Search by Employee Number','Search by Full Name','Search by SLMC reg number',
    'Search by Speciality',  'Search by Email','Degree Year'];

  incolumns: string[] = ['country', 'university', 'degree', 'year'];
  inheaders: string[] = ['Country', 'University', 'Degree', 'Year'];
  inbinders: string[] = ['university.country.name', 'university.name', 'degree.name', 'year'];

  innerdata:any;
  oldinnerdata:any;

  doctors: Array<Doctor> = [];
  data!: MatTableDataSource<Doctor>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //imageempurl: string = 'assets/default.png'


  selectedrow: any;

  enaadd: boolean = false;
  enaupd: boolean = false;
  enadel: boolean = false;

  employees: Array<Employee> = [];
  countries:Array<Country>=[];
  specialities:Array<Speciality> = [];
  extdegrees: Array<Degree> = [];
  extdegreeuniversities:Array<University>=[];
  doctordegrees:Array<Doctordegree>=[];
  doctorgrades:Array<Doctorgrade>=[];

  doctor!: Doctor;
  olddoctor!: Doctor;

  innerform!:FormGroup;

  indata!:MatTableDataSource<Doctordegree>;

  changedDoctorDegree: Array<Doctordegree> = [];

  uiassist: UiAssist;
  regexes: any;
  innerregexes: any;

  public cssearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  constructor(   private ds: Doctorservice,
                 private fb: FormBuilder,
                 private rs: RegexService,
                 private dg: MatDialog,
                 private dp: DatePipe,
                 private gs: Genderservice,
                 private dds: Degreeservice,
                 private dgs: Doctorgradeservice,
                 private us:Universityservice,
                 private cs: Countryservice,
                 private ss: Specialityservice,
                 private es:EmployeeService,
                 public authService:AuthorizationManager){

    this.uiassist = new UiAssist(this);

    this.cssearch = this.fb.group({
      'csemployee': new FormControl(),
      'csfullname': new FormControl(),
      'csslmcregno': new FormControl(),
      'csspeciality': new FormControl(),
      'csemail': new FormControl(),
      'csdegreeyear': new FormControl()

    });

    this.ssearch = this.fb.group({
      "ssemployee": new FormControl(),
      "ssfullname": new FormControl(),
      "ssslmcregno": new FormControl(),
      "ssspeciality": new FormControl(),
      "sscountry": new FormControl(),
      "ssnic": new FormControl()
    });

    this.form = this.fb.group({
      "employee": new FormControl('', [Validators.required]),
      "speciality": new FormControl('', [Validators.required]),
      "doctorgrade": new FormControl('', [Validators.required]),
      "description": new FormControl('', [Validators.required]),
      "slmcregno": new FormControl('', [Validators.required]),
      "country": new FormControl('', [Validators.required]),
      "doslmcregisterd": new FormControl('', [Validators.required]),
      "degreeyear": new FormControl('', [Validators.required]),
      "foreigntraining": new FormControl,
    }, {updateOn: 'change'});

    this.innerform = this.fb.group({
      extcountry: new FormControl('', [Validators.required]),
      extdegree: new FormControl('', [Validators.required]),
      extuniversity: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
    }, { updateOn: 'change' });
  }


  ngOnInit() {
    this.initialize();
  }
  initialize(){
    this.createView();

    this.ss.getAllList().then((ss: Speciality[]) => {
      this.specialities = ss;
    });

    this.cs.getAllList().then((cs: Country[]) => {
      this.countries = cs;
    });

    this.dgs.getAllList().then((dgs: Doctorgrade[]) => {
      this.doctorgrades = dgs;
    });

    this.es.getAll("?designationid=1").then((emps: Employee[]) => {
      this.employees = emps;
    });

    this.rs.get('doctor').then((regs: []) => {
      this.regexes = regs;
      this.createForm();
    });

    this.filterExtUniByCountry();
    this.filterExtDgByUniversity();

  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }

  createForm() {

    this.form.controls['employee'].setValidators([Validators.required]);
    this.form.controls['speciality'].setValidators([Validators.required]);
    this.form.controls['doctorgrade'].setValidators([Validators.required]);
    this.form.controls['description'].setValidators([Validators.required, Validators.pattern(this.regexes['description']['regex'])]);
    this.form.controls['slmcregno'].setValidators([Validators.required,Validators.pattern(this.regexes['slmcregno']['regex'])]);
    this.form.controls['doslmcregisterd'].setValidators([Validators.required]);
    this.form.controls['foreigntraining'].setValidators([Validators.required,Validators.pattern(this.regexes['foreigntraining']['regex'])]);
    this.form.controls['country'].setValidators([Validators.required]);
    this.form.controls['degreeyear'].setValidators([Validators.required]);

    this.innerform.controls['extdegree'].setValidators([Validators.required]);
    this.innerform.controls['extcountry'].setValidators([Validators.required]);
    this.innerform.controls['extuniversity'].setValidators([Validators.required]);
    this.innerform.controls['year'].setValidators([Validators.required]);


    Object.values(this.form.controls).forEach(control => {control.markAsTouched();});
    Object.values(this.innerform.controls).forEach( control => { control.markAsTouched(); } );

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
        //@ts-ignore
        if (controlName == "year")
          value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

        if (controlName == "doslmcregisterd")
          value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

        if (this.olddoctor != undefined && control.valid) {
          // @ts-ignore
          if (value === this.doctor[controlName]) {
            control.markAsPristine();
          } else {
            control.markAsDirty();
          }
        } else {
          control.markAsPristine();
        }
      });
    }

    for (const controlName in this.innerform.controls) {
      const control = this.innerform.controls[controlName];
      control.valueChanges.subscribe(value => {
          // @ts-ignore
          if (this.oldgrn != undefined && control.valid) {
            // @ts-ignore
            if (value === this.grn[controlName]) {
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

  enableButtons(add: boolean, upd: boolean, del: boolean) {
    this.enaadd = add;
    this.enaupd = upd;
    this.enadel = del;
  }


  loadTable(query: string) {

    this.ds.getAll(query)
      .then((doctors: Doctor[]) => {
        this.doctors = doctors;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.doctors);
        this.data.paginator = this.paginator;
      });
  }


  filterTable() {
    const cssearchdata = this.cssearch.getRawValue();

    this.data.filterPredicate = ((doctor:Doctor,filter)=>{
       return (cssearchdata.csemployee==null||doctor.employee.number.includes(cssearchdata.csemployee)) &&
              (cssearchdata.csfullname==null||doctor.employee.fullname.includes(cssearchdata.csfullname))  &&
              (cssearchdata.csslmcregno==null||doctor.slmcregno.includes(cssearchdata.csslmcregno))&&
              (cssearchdata.csspeciality==null||doctor.speciality.name.includes(cssearchdata.csspeciality)) &&
              (cssearchdata.csemail==null||doctor.employee.email.includes(cssearchdata.csemail));
             // (cssearchdata.csdate == null || doctor.employee..date.includes(cssearchdata.csdate));
    });
    this.data.filter = 'xx';
  }

  btnSearchMc(): void {

    const sserchdata = this.ssearch.getRawValue();
    let employee = sserchdata.ssemployee;
    let fullname = sserchdata.ssfullname;
    let slmcregno = sserchdata.ssslmcregno;
    let specialityid = sserchdata.ssspeciality;
    let nic = sserchdata.ssnic;
    let countryid = sserchdata.sscountry;
    let query = "";

    if (employee != null && employee.trim() != "") query = query + "&employeeid=" + employee;
    if (fullname != null && fullname.trim() != "") query = query + "&fullname=" + fullname;
    if (nic != null && nic.trim() != "") query = query + "&nic=" + nic;
    if (specialityid != null) query = query + "&specialityid=" + specialityid;
    if (slmcregno != null && slmcregno.trim() != "") query = query + "&slmcregno=" + slmcregno;
    if (countryid != null) query = query + "&countryid=" + countryid;


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

  filterExtDgByUniversity(): void {
    // Unsubscribe any previous subscription
    if (this.universitySubscription) {
      this.universitySubscription.unsubscribe();
    }

    const control = this.innerform.get("extuniversity");
    // @ts-ignore
    this.universitySubscription = control?.valueChanges.subscribe((uni: University) => {
      if (uni && uni.id) {
        let query = "?universityid=" + uni.id;
        this.dds.getAllList(query).then((dgrs: Degree[]) => {
          this.extdegrees = dgrs;
        }).finally(() => {
          this.universitySubscription.unsubscribe();
        });
      }
    });

    const currentValue = control?.value;
    control?.setValue(null, { emitEvent: false });
    control?.setValue(currentValue);
  }

  filterExtUniByCountry(): void {
    console.log("filterExtUniByCountry");

    if (this.countrySubscription) {
      this.countrySubscription.unsubscribe();
    }
    const control = this.innerform.get("extcountry");
    // @ts-ignore
    this.countrySubscription = control?.valueChanges.subscribe((con: Country) => {
      if (con && con.id) {
        let query = "?countryid=" + con.id;
        this.us.getAllList(query).then((uni: University[]) => {
          this.extdegreeuniversities = uni;
        }).finally(() => {
          this.countrySubscription.unsubscribe();
        });
      }
    });
    const currentValue = control?.value;
    control?.setValue(null, { emitEvent: false });
    control?.setValue(currentValue);
  }

  getdegreeyear(ele:Doctor){
    return this.dp.transform(new Date(ele.degreeyear),'yyyy')
  }


  btnaddMc() {

    this.innerdata = this.innerform.getRawValue();
    this.innerdata.doctor = this.form.controls['employee'].value;
    console.log(this.innerdata.doctor.id);

    if( this.innerdata != null){

      let doctordegree = new Doctordegree(this.id,this.innerdata.doctor,this.innerdata.extdegree,this.innerdata.extuniversity,this.innerdata.year);

      let tem: Doctordegree[] = [];
      if(this.indata != null) this.indata.data.forEach((i) => tem.push(i));

      this.doctordegrees = [];
      tem.forEach((t)=> this.doctordegrees.push(t));

      this.doctordegrees.push(doctordegree);

      this.indata = new MatTableDataSource(this.doctordegrees);

      this.id++;

      this.updateDoctorDegree(doctordegree);
      this.innerform.reset();

    }

  }

  deleteRaw(x:any) {

    let datasources = this.indata.data

    const index = datasources.findIndex(m => m.id === x.id);
    if (index > -1) {
      datasources.splice(index, 1);
    }

    this.updateDoctorDegree(x);

    this.indata.data = datasources;
    this.doctordegrees = this.indata.data;

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
        data: {heading: "Errors - Doctor Add ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(result => {
        if (!result) {
          return;
        }
      });
    } else {
      this.doctor = this.form.getRawValue();
      this.doctor.doctordegrees = this.doctordegrees;

      this.doctor.doctordegrees.forEach(e => console.log("Final Doctor" + e.doctor.id + "-" + e.university.id));
      // @ts-ignore
      this.doctordegrees.forEach((d) => delete d.id);
      // @ts-ignore
      this.doctor.degreeyear = this.dp.transform(this.doctor.degreeyear, "YYYY");
      // @ts-ignore
      this.doctor.doslmcregisterd = this.dp.transform(this.doctor.doslmcregisterd, "yyyy-MM-dd");
      // @ts-ignore
      this.doctor.doctordegrees.forEach(dg => { dg.year = this.dp.transform(dg.year, "YYYY"); });

      let dctrdata = "";
      dctrdata += "<br>SLMC registered Number is : " + this.doctor.slmcregno;
      dctrdata += "<br>Name is : " + this.doctor.employee.fullname;

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Employee Add",
          message: "Are you sure to Add the following Doctor? <br> <br>" + dctrdata
        }
      });

      confirm.afterClosed().subscribe(result => {
        if (result) {
          this.ds.add(this.doctor).then((responce: [] | undefined) => {
            if (responce != undefined) {
              // @ts-ignore
              const addstatus = responce['errors'] == "";
              let addmessage = "Successfully Saved";

              if (!addstatus) {
                // @ts-ignore
                addmessage = responce['errors'];
              }

              const stsmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Status -Doctor Add", message: addmessage}
              });

              stsmsg.afterClosed().subscribe(result => {
                if (!result) {
                  return;
                }
              });
              if (addstatus) {
                this.form.reset();
                this.innerdata = [];
                Object.values(this.form.controls).forEach(control => {
                  control.markAsTouched();
                });
                this.indata.data = [];
                this.loadTable("");
              }
            } else {
              const addmessage = "Content Not Found";
              const stsmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Status -Doctor Add", message: addmessage}
              });

              stsmsg.afterClosed().subscribe(result => {
                if (!result) {
                  return;
                }
              });
            }
          });
        }
      });
    }
  }

  fillForm(doctor: Doctor) {

    this.enableButtons(false, true, true);

    this.selectedrow = doctor;

    this.doctor = JSON.parse(JSON.stringify(doctor));
    this.olddoctor = JSON.parse(JSON.stringify(doctor));

    console.log(this.doctor);

    this.form.get("country")?.valueChanges.subscribe((con: Country) => {
      let query = "?countryid=" + con.id;
      this.us.getAllList(query).then((uni: University[]) =>
        this.extdegreeuniversities = uni);

      //@ts-ignore
      this.doctor.doctordegrees = this.doctordegrees.find(dd=>dd.university ===this.doctor.doctordegrees);});

    //@ts-ignore
    this.doctor.employee = this.employees.find(e => e.fullname === this.doctor.employee.fullname);
    //@ts-ignore
    // this.doctor.speciality = this.specialities.find(s => s.id === this.doctor.speciality.id);
    // //@ts-ignore
    // this.doctor.doctorgrade = this.doctorgrades.find(dg => dg.id === this.doctor.doctorgrade.id);
    // //@ts-ignore
    // this.doctor.doctorgrade = this.doctorgrades.find(dg => dg.id === this.doctor.doctorgrade.id);
    // //@ts-ignore
    // this.doctor.country = this.countries.find(dg => dg.id === this.doctor.country.id);

    this.indata = new MatTableDataSource(this.doctor.doctordegrees);

    this.form.patchValue(this.doctor);

    this.form.markAsPristine();
  }

  fillInnerForm(docdegree: Doctordegree) {
    this.innerdata = JSON.parse(JSON.stringify(docdegree));
    this.oldinnerdata = JSON.parse(JSON.stringify(docdegree));
    this.innerdata.country = docdegree.university.country;
    console.log("InnerData - " + this.innerdata.country.name);
    console.log("InnerData - " + this.innerdata.university.name);
    console.log("InnerData - " + this.innerdata.degree.id);
    console.log("InnerData - " + this.innerdata.year);

    // @ts-ignore
    this.innerform.controls['extcountry'].setValue(this.countries.find(s => s.id === this.innerdata.university.country.id));
    console.log(this.innerdata.university.country);
    //@ts-ignore
    this.innerform.controls['extuniversity'].setValue(this.extdegreeuniversities.find((s)=> s.id === this.innerdata.university.id ));
    console.log(this.innerdata.university);
    //@ts-ignore
    this.innerform.controls['extdegree'].setValue(this.extdegrees.find(s => s.id === this.innerdata.degree.id));
    // console.log(con);
    this.innerform.patchValue(this.innerdata);

    // this.innerform.patchValue({
    //   extcountry: this.innerdata.country,
    //   extuniversity: this.innerdata.university,
    //   extdegree: this.innerdata.degree,
    //   year: this.innerdata.year
    // });
  }

  getUpdates(): string {
    let updates: string = '';

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.dirty) {
        updates = updates + "<br>" + controlName.charAt(0).toUpperCase() + controlName.slice(1) + " Changed";
      }
    }

    if (this.changedDoctorDegree.length > 0) {
      updates += "<br>Doctor Degree Changed";
    }

    return updates;
  }
  update() {

    let errors = this.getErrors();

    if (errors != "") {

      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Doctor Update ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {if (!result) {return;} });

    } else {

      let updates: string = this.getUpdates();

      if (updates != "") {

        let updstatus: boolean = false;
        let updmessage: string = "Server Not Found";

        const confirm = this.dg.open(ConfirmComponent, {
          width: '500px',
          data: {
            heading: "Confirmation - Doctor Update",
            message: "Are you sure to Save folowing Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {
            this.doctor = this.form.getRawValue();

            this.doctor.id=this.olddoctor.id;
            this.doctor.doctordegrees = this.doctordegrees;

             // @ts-ignore
            this.doctordegrees.forEach((d) => delete d.id);
            // @ts-ignore
            this.doctor.degreeyear = this.dp.transform(this.doctor.degreeyear, "YYYY");
            // @ts-ignore
            this.doctor.doslmcregisterd = this.dp.transform(this.doctor.doslmcregisterd, "yyyy-MM-dd");
            // @ts-ignore
            this.doctor.doctordegrees.forEach(dg => { dg.year = this.dp.transform(dg.year, "YYYY"); });

            this.ds.update(this.doctor).then((responce: [] | undefined) => {
              if (responce != undefined) { // @ts-ignore
                // @ts-ignore
                updstatus = responce['errors'] == "";
                if (!updstatus) { // @ts-ignore
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
                this.loadTable("");

              }

              const stsmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Status -Doctor Update", message: updmessage}
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
          data: {heading: "Confirmation - Doctor Update", message: "Nothing Changed"}
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
        heading: "Confirmation - Doctor Delete",
        message: "Are you sure to Delete following Doctor? <br> <br>" + this.doctor.employee.fullname
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        let delstatus: boolean = false;
        let delmessage: string = "Server Not Found";

        this.ds.delete(this.doctor.id).then((responce: [] | undefined) => {

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
              control.markAsTouched();
            });
            this.loadTable("");
          }

          const stsmsg = this.dg.open(MessageComponent, {
            width: '500px',
            data: {heading: "Status - Doctor Delete ", message: delmessage}
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

  id = 0;
  clear(): void {
    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Doctor Clear",
        message: "Are you sure to Clear following Details ? <br> <br>"
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.form.reset()
      }
    });
  }

  updateDoctorDegree(element: Doctordegree) {
    this.changedDoctorDegree.push(element);
  }

  // filterExtDgByUniversity():void{
  //   this.innerform.get("extuniversity")?.valueChanges.subscribe((uni:University)=>{
  //     let query="?universityid="+uni.id;
  //     this.dds.getAllList(query).then((dgrs:Degree[])=>
  //       this.extdegrees = dgrs).finally(e=> e.unsubscribe());
  //   });
  // }

}
