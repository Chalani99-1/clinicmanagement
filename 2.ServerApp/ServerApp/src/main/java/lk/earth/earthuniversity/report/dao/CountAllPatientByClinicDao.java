package lk.earth.earthuniversity.report.dao;

import lk.earth.earthuniversity.report.entity.CountByDesignation;
import lk.earth.earthuniversity.report.entity.DrugCountByBrandAndSts;
import lk.earth.earthuniversity.report.entity.PatientCountByClinic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Time;
import java.util.List;

public interface CountAllPatientByClinicDao extends JpaRepository<CountByDesignation,Integer> {

    @Query("SELECT New PatientCountByClinic ( ct.name , sum(c.patientcount)) FROM Clinic c, Clinictype ct where c.clinictype.id = ct.id group by ct.name")
    List<PatientCountByClinic> getAllPatientByClinic();

    @Query("SELECT NEW lk.earth.earthuniversity.report.entity.PatientCountByClinic(ct.name, SUM(c.patientcount), :stime, :etime) " +
            "FROM Clinic c JOIN Clinictype ct ON c.clinictype.id = ct.id " +
            "WHERE c.starttime BETWEEN :stime AND :etime " +
            "GROUP BY ct.name")
    List<PatientCountByClinic> getAllPatientByClinicByTime(@Param("stime") Time stime, @Param("etime") Time etime);


}

