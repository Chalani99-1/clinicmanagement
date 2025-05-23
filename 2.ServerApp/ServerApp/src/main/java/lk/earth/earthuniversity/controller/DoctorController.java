package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.DoctorDao;
import lk.earth.earthuniversity.entity.Doctor;
import lk.earth.earthuniversity.entity.Doctordegree;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import java.sql.Time;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Year;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@CrossOrigin
@RestController
@RequestMapping(value = "/doctors")
public class DoctorController {

    @Autowired
    private DoctorDao doctordao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('employee-select')")
    public List<Doctor> get(@RequestParam HashMap<String,String> params) {
        List<Doctor> doctors= this.doctordao.findAll();

        if(params.isEmpty()) return doctors;

        String fullname = params.get("fullname");
        String nic = params.get("nic");
        String slmcregno = params.get("slmcregno");
        String specialityid = params.get("specialityid");
        String countryid = params.get("countryid");
        String employeeid = params.get("employeeid");

        Stream<Doctor> dstream = doctors.stream();

        if(fullname!=null) dstream = dstream.filter(d->d.getEmployee().getFullname().equals(fullname));
        System.out.println(fullname);
        if(nic!=null) dstream = dstream.filter(d->d.getEmployee().getNic().equals(nic));
        System.out.println(nic);
        if(slmcregno!=null) dstream = dstream.filter(d->d.getSlmcregno().equals(slmcregno));
        if(specialityid!=null) dstream = dstream.filter(d->d.getSpeciality().getId()==Integer.parseInt(specialityid));
        if(countryid!=null) dstream = dstream.filter(d->d.getDoctorgrade().getId()==Integer.parseInt(countryid));
        if(employeeid!=null) dstream = dstream.filter(d->d.getEmployee().getId()==Integer.parseInt(employeeid));

        return dstream.collect(Collectors.toList());

    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
// @PreAuthorize("hasAuthority('Employee-Insert')")
    public HashMap<String, String> add(@RequestBody Doctor doctor) {

        System.out.println("DgYear" + doctor.getDegreeyear());
        HashMap<String, String> response = new HashMap<>();
        StringBuilder errors = new StringBuilder();

        if (doctor.getDoctordegrees() != null) {
            for (Doctordegree doctordegree : doctor.getDoctordegrees()) {
                if (doctordegree.getDoctor() == null) {
                    errors.append("Doctor object is null.<br>");
                } else {
                    System.out.println("Doctor ID: " + doctordegree.getDoctor().getId());
                }

                if (doctordegree.getDegree() == null) {
                    errors.append("Degree object is null.<br>");
                } else {
                    System.out.println("Degree ID: " + doctordegree.getDegree().getId());
                }

                if (doctordegree.getUniversity() == null) {
                    errors.append("University object is null.<br>");
                } else {
                    System.out.println("University ID: " + doctordegree.getUniversity().getId());
                }

                if (doctordegree.getYear() == null) {
                    errors.append("Year is null.<br>");
                } else {
                    System.out.println("Year: " + doctordegree.getYear());
                }
                doctordegree.setDoctor(doctor);
            }
        } else {
            errors.append("Doctor degrees array is null.<br>");
        }

        if (errors.length() == 0) {
            doctordao.save(doctor);
        } else {
            errors.insert(0, "Server Validation Errors: <br>");
        }
        response.put("id", String.valueOf(doctor.getId()));
        response.put("url", "/doctors/" + doctor.getId());
        response.put("errors", errors.toString());

        return response;
    }


    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Employee-Update')")
    public HashMap<String,String> update(@RequestBody Doctor doctor){

        HashMap<String, String> response = new HashMap<>();
        StringBuilder errors = new StringBuilder();

        Doctor extDoctor = doctordao.findByMyId(doctor.getId());

        if (extDoctor != null){
            try {
                extDoctor.getDoctordegrees().clear();
                doctor.getDoctordegrees().forEach(newDoctorDegrees -> {
                    newDoctorDegrees.setDoctor(extDoctor);
                    extDoctor.getDoctordegrees().add(newDoctorDegrees);
                    newDoctorDegrees.setDoctor(extDoctor);
                });

                BeanUtils.copyProperties(doctor,extDoctor,"id","doctordegrees");
                doctordao.save(extDoctor);

                response.put("id", String.valueOf(doctor.getId()));
                response.put("url", "/doctors/" + doctor.getId());
                response.put("errors", errors.toString());

            }catch (Exception e){
                e.printStackTrace();
            }
        }

        return response;
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id){

        System.out.println(id);

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Doctor dctr1 = doctordao.findByMyId(id);

        if(dctr1==null)
            errors = errors+"<br> Doctor Does Not Existed";

        if(errors=="") doctordao.delete(dctr1);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(id));
        responce.put("url","/doctors/"+id);
        responce.put("errors",errors);

        return responce;
    }
}




