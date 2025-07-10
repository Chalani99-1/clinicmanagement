package lk.earth.earthuniversity.report.dao;

import lk.earth.earthuniversity.report.entity.CountByDesignation;
import lk.earth.earthuniversity.report.entity.DrugCountByBrandAndSts;
import lk.earth.earthuniversity.report.entity.PatientCountByClinic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Time;
import java.util.Date;
import java.util.List;

public interface CountAllPatientByClinicDao extends JpaRepository<CountByDesignation,Integer> {

    @Query("SELECT New PatientCountByClinic ( ct.name , sum(c.patientcount)) FROM Clinic c, Clinictype ct where c.clinictype.id = ct.id group by ct.name")
    List<PatientCountByClinic> getAllPatientByClinic();

    // In repository
    @Query("SELECT new PatientCountByClinic(ct.name, SUM(c.patientcount)) " +
            "FROM Clinic c JOIN c.clinictype ct " +
            "WHERE c.date BETWEEN :startDate AND :endDate " +
            "GROUP BY ct.name")
    List<PatientCountByClinic> getAllPatientByClinicByTime(@Param("startDate") Date startDate,
                                                           @Param("endDate") Date endDate);



}

