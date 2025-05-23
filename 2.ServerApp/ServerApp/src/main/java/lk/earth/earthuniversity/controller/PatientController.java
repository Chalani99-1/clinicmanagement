package lk.earth.earthuniversity.controller;
import lk.earth.earthuniversity.dao.PatientDao;
import lk.earth.earthuniversity.entity.Patient;
import lk.earth.earthuniversity.entity.Patientriskfactor;
import lk.earth.earthuniversity.entity.User;
import lk.earth.earthuniversity.entity.Userrole;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@CrossOrigin
@RestController
@RequestMapping(value = "/patients")
public class PatientController {

    @Autowired
    private PatientDao patientdao;


//    @PreAuthorize("hasAuthority('employee-select')")
    @GetMapping(produces = "application/json")
    public List<Patient> get(@RequestParam HashMap<String,String> params) {
        List<Patient> patients = this.patientdao.findAll();

        if(params.isEmpty()) return patients;

        String patientname = params.get("patientname");
        String patientregno = params.get("patientregno");
        String patientnic = params.get("patientnic");
        String patientdob = params.get("patientdob");
        String patienstatusid = params.get("patientstatusid");
        String patientdistrictid = params.get("patientdistrictid");
        String patientbloodgroupid = params.get("patientbloodgroupid");
        String riskfactorid = params.get("riskfactorid");


        //String patientbloodgroupid = params.get("patientbloodgroupid");

        Stream<Patient> pstream = patients.stream();

        if(patientname!=null) pstream = pstream.filter(p -> p.getName().contains(patientname));
        if(patientregno!=null) pstream = pstream.filter(p -> p.getRegno().contains(patientregno));
        if(patientnic!=null) pstream = pstream.filter(p -> p.getNic().contains(patientnic));
        if(patientdob!=null) pstream = pstream.filter(p -> p.getDob().equals(Date.valueOf(patientdob)));
        if(patientdistrictid!=null) pstream = pstream.filter(p -> p.getDistrict().getId()==Integer.parseInt(patientdistrictid));
        if(patienstatusid!=null) pstream = pstream.filter(p -> p.getPatientstatus().getId()==Integer.parseInt(patienstatusid));
        if(patientbloodgroupid!=null) pstream = pstream.filter(p -> p.getBloodgroup().getId()==Integer.parseInt(patientbloodgroupid));
        if(riskfactorid != null) {pstream = pstream.filter(p -> p.getPatientriskfactors().stream().anyMatch(pr -> pr.getRiskfactor().getId() == Integer.parseInt(riskfactorid)));}


        return pstream.collect(Collectors.toList());
    }

//    @GetMapping(produces = "application/json")
////    @PreAuthorize("hasAuthority('employee-select')")
//    public List<Employee> get(@RequestParam HashMap<String, String> params) {
//
//        List<Employee> employees = this.employeedao.findAll();
//
//        if(params.isEmpty())  return employees;
//
//        String number = params.get("number");
//        String genderid= params.get("genderid");
//        String fullname= params.get("fullname");
//        String designationid= params.get("designationid");
//        String nic= params.get("nic");
//
//        Stream<Employee> estream = employees.stream();
//
//        if(designationid!=null) estream = estream.filter(e -> e.getDesignation().getId()==Integer.parseInt(designationid));
//        if(genderid!=null) estream = estream.filter(e -> e.getGender().getId()==Integer.parseInt(genderid));
//        if(number!=null) estream = estream.filter(e -> e.getNumber().equals(number));
//        if(nic!=null) estream = estream.filter(e -> e.getNic().contains(nic));
//        if(fullname!=null) estream = estream.filter(e -> e.getFullname().contains(fullname));
//
//        return estream.collect(Collectors.toList());
//
//    }


    //    @PreAuthorize("hasAuthority('Employee-Insert')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)

    public HashMap<String,String> add(@RequestBody Patient patient){

        HashMap<String,String> response = new HashMap<>();
        String errors="";

        if(patientdao.findByNic(patient.getNic())!=null)
            errors = errors+"<br> Existing Patient";

        if(patientdao.findByRegno(patient.getRegno())!=null)
            errors = errors+"<br> Existing Patient";


//        if(errors==""){
//            for(Patientriskfactor p : patient.getPatientriskfactors()) p.setPatient(patient);
//            patientdao.save(patient);
//        }
//
//        else errors = "Server Validation Errors : <br> "+errors;
        if(errors=="") {
            for(Patientriskfactor p : patient.getPatientriskfactors()) p.setPatient(patient);
            patientdao.save(patient);

            response.put("id",String.valueOf(patient.getId()));
            response.put("url","/patients/"+patient.getId());
            response.put("errors",errors);

            return response;

        } else {
            errors = "Server Validation Errors : <br> "+errors;
        }


        response.put("id",String.valueOf(patient.getId()));
        response.put("url","/patients/"+patient.getId());
        response.put("errors",errors);

        return response;
    }



    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Employee-Update')")
    public HashMap<String,String> update(@RequestBody Patient patient){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Patient pnt1 = patientdao.findByNic(patient.getNic());
        Patient pnt2 = patientdao.findByRegno(patient.getRegno());

        if(pnt1!=null && patient.getId()!=pnt1.getId())
            errors = errors+"<br> Existing Patient";

        if(pnt2!=null && patient.getId()!=pnt2.getId())
            errors = errors+"<br> Existing Patient";


        if(errors=="") {
            for (Patientriskfactor p : patient.getPatientriskfactors()) p.setPatient(patient);
            patientdao.save(patient);
        }
            else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(patient.getId()));
        responce.put("url","/employees/"+patient.getId());
        responce.put("errors",errors);

        return responce;
    }


//    @PutMapping
//    @ResponseStatus(HttpStatus.CREATED)
//    public HashMap<String, String> update(@RequestBody Patient patient) {
//
//        HashMap<String, String> response = new HashMap<>();
//        String errors = "";
//
//        Patient pnt1 = patientdao.findByNic(patient.getNic());
//
//        if (pnt1 != null) {
//
//            // Update Existing User Roles
//            try {
//                pnt1.getPatientriskfactors().clear();
//                patient.getPatientriskfactors().forEach(newPatientRiskfactor -> {
//                    newPatientRiskfactor.setPatient(pnt1);
//                    pnt1.getPatientriskfactors().add(newPatientRiskfactor);
//                    newPatientRiskfactor.setPatient(pnt1);
//                });
//
//                // Update basic user properties
//                BeanUtils.copyProperties(patient, pnt1, "id","patientriskfactors");
//
//                patientdao.save(pnt1); // Save the updated extUser object
//
//                response.put("id", String.valueOf(patient.getId()));
//                response.put("url", "/users/" + patient.getId());
//                response.put("errors", errors);
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        }
//
//        return response;
//    }



    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id){


        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Patient pnt = patientdao.findByMyId(id);

        if(pnt==null)
            errors = errors+"<br> Patient Does Not Existed";

        if(errors=="") patientdao.delete(pnt);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(id));
        responce.put("url","/patients/"+id);
        responce.put("errors",errors);

        return responce;
    }

}




