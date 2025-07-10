package lk.earth.earthuniversity.report;

import lk.earth.earthuniversity.dao.DrugDao;
import lk.earth.earthuniversity.entity.Drug;
import lk.earth.earthuniversity.report.dao.*;
import lk.earth.earthuniversity.report.entity.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;

@CrossOrigin
@RestController
@RequestMapping(value = "/reports")

public class ReportController {
    @Autowired
    private CountByDesignaitonDao countbydesignaitondao;

    @Autowired
    private PatientCountByBloodgroupDao patientcountbybloodgroupdao;

    @Autowired
    private DoctorCountBySpecialityDao doctorcountbyspecialitydao;

    @Autowired
    private CountAllDoctorDao countAllDoctorDao;

    @Autowired
    private CountAllClinicByStsDao countAllClinicByStsDao;

    @Autowired
    private CountAllPatientByStsDao countAllPatientByStsDao;

    @Autowired
    private CountAllinvestigationByStsDao countAllinvestigationByStsDao;

    @Autowired
    private CountAllDrugByBrandAndStsDao countAllDrugByBrandAndStsDao;

    @Autowired
    private CountAllPatientByClinicDao countAllPatientByClinicDao;

    @Autowired
    private DrugDao drugDao;


    @GetMapping(path = "/countbydesignation", produces = "application/json")
    public List<CountByDesignation> get() {

        List<CountByDesignation> designations = this.countbydesignaitondao.countByDesignation();
        long totalCount = 0;

        for (CountByDesignation countByDesignation : designations) {
            totalCount += countByDesignation.getCount();
        }

        for (CountByDesignation countByDesignation : designations) {
            long count = countByDesignation.getCount();
            double percentage = (double) count / totalCount * 100;
            percentage = Math.round(percentage * 100.0) / 100.0;
            countByDesignation.setPercentage(percentage);
        }

        return designations;
    }


    @GetMapping(path = "/patientcountbybloodgroup", produces = "application/json")
    public List<PatientCountByBloodgroup> getCountByBloodgroup() {

        List<PatientCountByBloodgroup> patientCountByBloodgroups = this.patientcountbybloodgroupdao.countByBloodgroup();
        long totalCount = 0;

        for (PatientCountByBloodgroup patientCountByBloodgroup : patientCountByBloodgroups) {
            totalCount += patientCountByBloodgroup.getCount();
        }

        return patientCountByBloodgroups;
    }


    @GetMapping(path = "/doctorcountbyspeciality", produces = "application/json")
    public List<DoctorCountBySpeciality> getCountBySpeciality() {

        //        long totalCount = 0;

//        for (DoctorCountBySpeciality doctorCountBySpeciality : doctorCountBySpecialities) {
//            totalCount += doctorCountBySpeciality.getCount();
//        }

        return this.doctorcountbyspecialitydao.countBySpeciality();
    }

    @GetMapping(path = "/doctorscount", produces = "application/json")
    public Integer getCountByDoctor() {
        return this.countAllDoctorDao.countAllByDoctors();
    }

    @GetMapping(path = "/scheduledclinics", produces = "application/json")
    public Integer getScheduledClinic() {
        return this.countAllClinicByStsDao.countAllScheduledClinic();
    }

    @GetMapping(path = "/cacelledclinics", produces = "application/json")
    public Integer getCacelledClinic() {
        return this.countAllClinicByStsDao.countAllCancelledClinic();
    }

    @GetMapping(path = "/admittedpatients", produces = "application/json")
    public Integer getAdmittedPatients() {
        return this.countAllPatientByStsDao.countAllAdmittedPatient();
    }

    @GetMapping(path = "/criticalpatients", produces = "application/json")
    public Integer getCriticalPatients() {
        return this.countAllPatientByStsDao.countAllCriticalPatient();
    }

    @GetMapping(path = "/inprogressinvestigations", produces = "application/json")
    public Integer getInProgressInvestigations() {
        return this.countAllinvestigationByStsDao.countAllinProgressInvestigations();
    }

    @GetMapping(path = "/drugsbybrandandstatus", produces = "application/json")
    public List<DrugCountByBrandAndSts> getDrugsByBrandAndSts() {
        return this.countAllDrugByBrandAndStsDao.getAllDrugByBrandAndSts();
    }

    @GetMapping(path = "/patientbyclinics", produces = "application/json")
    public List<PatientCountByClinic> getPatientCountyClinics() {
        return this.countAllPatientByClinicDao.getAllPatientByClinic();
    }

    @GetMapping(path = "/patientbyclinicbytime", produces = "application/json")
    public List<PatientCountByClinic> getAllPatientByClinicByTime(
            @RequestParam String startdate, @RequestParam String enddate) {
        Timestamp startTimestamp;
        Timestamp endTimestamp;
        try {
            System.out.println(startdate +" " +enddate);
//            startdate ="2025-05-12";
//            enddate ="2025-12-12";
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date start = dateFormat.parse(startdate);
            Date end = dateFormat.parse(enddate);

            startTimestamp = new Timestamp(start.getTime());
            endTimestamp = new Timestamp(end.getTime());
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }

        List<PatientCountByClinic> results = countAllPatientByClinicDao.getAllPatientByClinicByTime(startTimestamp, endTimestamp);

        return results;
    }

    @GetMapping(path = "/drugbybrandgenericstatus", produces = "application/json")
    public List<DrugCountByBrandAndGenericAndStatus> getAllDrugByBrandAndGenericAndStatus(@RequestParam HashMap<String, String> params) {
        List<Drug> drugs = drugDao.findAll();
        Stream<Drug> estream = drugs.stream();
        String brandId = params.get("brandId");
        String genericId = params.get("genericId");
        String statusId = params.get("statusId");

        if (brandId != null) {
            int brandIdInt = Integer.parseInt(brandId);
            estream = estream.filter(e -> e.getBrand().getId() == brandIdInt);
        }
        if (genericId != null) {
            int genericIdInt = Integer.parseInt(genericId);
            estream = estream.filter(e -> e.getGeneric().getId() == genericIdInt);
        }
        if (statusId != null) {
            int statusIdInt = Integer.parseInt(statusId);
            estream = estream.filter(e -> e.getDrugstatus().getId() == statusIdInt);
        }

        List<Drug> filteredDrugs = estream.collect(Collectors.toList());

        Map<String, DrugCountByBrandAndGenericAndStatus> resultMap = new HashMap<>();
        for (Drug drug : filteredDrugs) {
            String key = drug.getBrand().getName() + "|" + drug.getGeneric().getName();
            DrugCountByBrandAndGenericAndStatus result = resultMap.get(key);
            if (result == null) {
                result = new DrugCountByBrandAndGenericAndStatus(
                        drug.getBrand().getName(),
                        drug.getGeneric().getName(),
                        0L
                );
                resultMap.put(key, result);
            }
            result.setCount(result.getCount() + 1);
        }

        return new ArrayList<>(resultMap.values());
    }
}







