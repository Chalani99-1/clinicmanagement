package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.EmployeeDao;
import lk.earth.earthuniversity.dao.PrescriptionDao;
import lk.earth.earthuniversity.entity.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/prescriptions")
public class PrescriptionController {

    @Autowired
    private PrescriptionDao prescriptiondao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('employee-select')")
    public List<Prescription> get(@RequestParam HashMap<String, String> params) {

        List<Prescription> prescriptions = this.prescriptiondao.findAll();

        if (params.isEmpty()) return prescriptions;


        String patientattendencestatusid = params.get("prescriptionstatusid");
        String employeeid = params.get("employeeid");
        String patientnic = params.get("patientnic");

        System.out.println(patientnic);

        Stream<Prescription> estream = prescriptions.stream();
        if (patientattendencestatusid != null) estream = estream.filter(e -> e.getPrescriptionstatus().getId() == Integer.parseInt(patientattendencestatusid));
        if (employeeid != null) estream = estream.filter(e -> e.getEmployee().getId() == Integer.parseInt(employeeid));
        if(patientnic!=null) estream = estream.filter(e -> e.getPatientattendence().getPatient().getNic().equals(patientnic));

        return estream.collect(Collectors.toList());

    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> add(@RequestBody Prescription prescription) {

        HashMap<String, String> responce = new HashMap<>();
        StringBuilder errors = new StringBuilder();

        for (Prescriptiondrug prescriptiondrug : prescription.getPrescriptiondrugs()) {
            prescriptiondrug.setPrescription(prescription);
        }

        if (errors.length() == 0) {
            prescription.setDate(new Timestamp(new Date().getTime()));
            prescriptiondao.save(prescription);
        } else {
            errors.insert(0, "Server Validation Errors: <br>");
        }

        responce.put("id", String.valueOf(prescription.getId()));
        responce.put("url", "/prescriptions/" + prescription.getId());
        responce.put("errors", errors.toString());

        return responce;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Employee-Update')")
    public HashMap<String, String> update(@RequestBody Prescription prescription) {
        HashMap<String, String> response = new HashMap<>();
        StringBuilder errors = new StringBuilder();

        Prescription extPrescription = prescriptiondao.findByMyId(prescription.getId());

        if (extPrescription != null){
            try {
                extPrescription.getPrescriptiondrugs().clear();
                prescription.getPrescriptiondrugs().forEach(newPrescriptiondrugs -> {
                    newPrescriptiondrugs.setPrescription(extPrescription);
                    extPrescription.getPrescriptiondrugs().add(newPrescriptiondrugs);
                    newPrescriptiondrugs.setPrescription(extPrescription);
                });

                BeanUtils.copyProperties(prescription, extPrescription, "id", "prescriptiondrugs");
                prescriptiondao.save(extPrescription);

                response.put("id", String.valueOf(prescription.getId()));
                response.put("url", "/prescriptions/" + prescription.getId());
                response.put("errors", errors.toString());

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return response;
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id){

//        System.out.println(id);

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Prescription pres = prescriptiondao.findByMyId(id);

        if(pres==null)
            errors = errors+"<br> Prescription Does Not Existed";

        if(errors=="") prescriptiondao.delete(pres);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(id));
        responce.put("url","/prescriptions/"+id);
        responce.put("errors",errors);

        return responce;
    }


}




