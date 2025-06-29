package lk.earth.earthuniversity.controller;


import lk.earth.earthuniversity.dao.DiagnosisDao;
import lk.earth.earthuniversity.entity.Diagnosis;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/diagnoses")
public class DiagnosisController {

    @Autowired
    private DiagnosisDao diagnosisdao;

    @GetMapping(produces = "application/json")
    public List<Diagnosis> get(@RequestParam HashMap<String, String> params) {
        List<Diagnosis> diagnoses = this.diagnosisdao.findAll();

        if (params.isEmpty()) {
            return diagnoses;
        }

        String employeeid= params.get("employeeid");
        String diagnosisstatusid= params.get("diagnosisstatusid");
        String treatmentplanid= params.get("treatmentplanid");
        String severityid= params.get("severityid");
        String patientid = params.get("patientid");
        String patientnic = params.get("patientnic");


        Stream<Diagnosis> dstream = diagnoses.stream();

        if(employeeid!=null) dstream = dstream.filter(d -> d.getEmployee().getId()==Integer.parseInt(employeeid));
        if(patientid!=null) dstream = dstream.filter(d -> d.getPatient().getId()==Integer.parseInt(patientid));
        if(diagnosisstatusid!=null) dstream = dstream.filter(d -> d.getDiagnosisstatus().getId()==Integer.parseInt(diagnosisstatusid));
        if(treatmentplanid!=null) dstream = dstream.filter(d -> d.getTreatmentplan().getId()==Integer.parseInt(treatmentplanid));
        if(severityid!=null) dstream = dstream.filter(d -> d.getSeverity().getId()==Integer.parseInt(severityid));
        if(patientnic!=null) dstream = dstream.filter(d -> d.getPatient().getNic().contains(patientnic));

        return dstream.collect(Collectors.toList());
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> add(@RequestBody Diagnosis diagnosis){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

       if(diagnosisdao.findByMyId(diagnosis.getId())!=null)
           errors = errors+"<br> Existing Diagnosis ID";

        if(diagnosisdao.findByPatientNic(diagnosis.getPatient().getNic())!=null)
            errors = errors+"<br> Existing Patient";

        if(errors==""){
            diagnosis.setTime(new Timestamp( new Date().getTime()));
            diagnosisdao.save(diagnosis);

            responce.put("id",String.valueOf(diagnosis.getId()));
            responce.put("url","/diagnoses/"+diagnosis.getId());
            responce.put("errors",errors);

            return responce;
        }

        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(diagnosis.getId()));
        responce.put("url","/diagnoses/"+diagnosis.getId());
        responce.put("errors",errors);

        return responce;
    }



    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String, String> update(@RequestBody Diagnosis diagnosis) {

        HashMap<String, String> response = new HashMap<>();
        String errors = "";

        Diagnosis diagnosis1=  diagnosisdao.findByMyId(diagnosis.getId());


        if(diagnosis1!=null && diagnosis.getId()!=diagnosis1.getId())
            errors = errors+"<br> Existing Diagnosis ";


        if(errors=="") diagnosisdao.save(diagnosis);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(diagnosis.getId()));
        response.put("url","/diagnoses/"+diagnosis.getId());
        response.put("errors",errors);

        return response;

    }



    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Diagnosis diag1 = diagnosisdao.findByMyId(id);

        if(diag1==null)
            errors = errors+"<br> Diagnosis Related to this ID Does Not Existed";

        if(errors=="") diagnosisdao.delete(diag1);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(id));
        responce.put("url","/diagnoses/"+id);
        responce.put("errors",errors);

        return responce;
    }

}
