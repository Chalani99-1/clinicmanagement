package lk.earth.earthuniversity.controller;

//import com.sun.org.apache.xpath.internal.operations.And;

import lk.earth.earthuniversity.dao.ClinicDao;
import lk.earth.earthuniversity.entity.Clinic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@CrossOrigin
@RestController
@RequestMapping(value = "/clinics")
public class ClinicController {

    @Autowired
    private ClinicDao clinicdao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('employee-select')")
    public List<Clinic> get(@RequestParam HashMap<String, String> params) {
        List<Clinic> clinics = this.clinicdao.findAll();

        if (params.isEmpty()) return clinics;

        String clinictypeid = params.get("clinictypeid");
        String clinicstatuseid = params.get("clinicstatusid");
        String wardid = params.get("wardid");


        Stream<Clinic> cstream = clinics.stream();

        if (clinictypeid != null)
            cstream = cstream.filter(c -> c.getClinictype().getId() == Integer.parseInt(clinictypeid));
        if (clinicstatuseid != null)
            cstream = cstream.filter(c -> c.getClinicstatus().getId() == Integer.parseInt(clinicstatuseid));
        if (wardid != null) cstream = cstream.filter(c -> c.getWard().getId() == Integer.parseInt(wardid));

        return cstream.collect(Collectors.toList());
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)

    public HashMap<String, String> add(@RequestBody Clinic clinic) {

        HashMap<String, String> responce = new HashMap<>();
        String errors = "";

        //busines logic
        //check if clinic type is already associated with a time slot on same date
//        System.out.println(clinic.toString());
        List<Clinic> extClinic = clinicdao.
                findDuplicateClinicByTimeSlot(
                        clinic.getClinictype().getId(),
                        clinic.getClinicroom().getId(),
                        clinic.getDate(),
                        clinic.getStarttime(),
                        clinic.getEndtime());
//        System.out.println(Arrays.toString(extClinic.toArray()));

        //List<Clinic> extClinic = clinicdao.findByClinicByDate(clinic.getClinictype().getName(), clinic.getDate());
//        List<Clinic> extClinic = clinicdao.findByClinicByDate(clinic.getClinicroom().getName(),clinic.getDate(),clinic.getStarttime(),clinic.getEndtime());

        if (!extClinic.isEmpty()) {
            errors = "Clinic already scheduled at this clinic room at this time <br> " + errors;
        }

        if (errors == "")


            clinicdao.save(clinic);

        else
            errors = "Server Validation Errors : <br> " + errors;

        responce.put("id", String.valueOf(clinic.getId()));
        responce.put("url", "/clinics/" + clinic.getId());
        responce.put("errors", errors);

        return responce;
    }


    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Employee-Update')")
    public HashMap<String, String> update(@RequestBody Clinic clinic) {

        HashMap<String, String> responce = new HashMap<>();
        String errors = "";

        List<Clinic> extClinic = clinicdao.
                findDuplicateClinicByTimeSlot(
                        clinic.getClinictype().getId(),
                        clinic.getClinicroom().getId(),
                        clinic.getDate(),
                        clinic.getStarttime(),
                        clinic.getEndtime());

        if (!extClinic.isEmpty()) {
            errors = "Clinic already scheduled at this clinic room at this time <br> " + errors;
        }


        if (errors == "") clinicdao.save(clinic);
        else errors = "Server Validation Errors : <br> " + errors;

        responce.put("id", String.valueOf(clinic.getId()));
        responce.put("url", "/clinics/" + clinic.getId());
        responce.put("errors", errors);

        return responce;
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String, String> delete(@PathVariable Integer id) {

        System.out.println(id);

        HashMap<String, String> responce = new HashMap<>();
        String errors = "";

        Clinic clnc = clinicdao.findByMyId(id);

        if (clnc == null)
            errors = errors + "<br> Clinic Does Not Existed";

        if (errors == "") clinicdao.delete(clnc);
        else errors = "Server Validation Errors : <br> " + errors;

        responce.put("id", String.valueOf(id));
        responce.put("url", "/clinics/" + id);
        responce.put("errors", errors);

        return responce;
    }

}




