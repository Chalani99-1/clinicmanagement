package lk.earth.earthuniversity.report.dao;

import lk.earth.earthuniversity.report.entity.CountByDesignation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CountAllPatientByStsDao extends JpaRepository<CountByDesignation,Integer> {

    @Query("SELECT count(p.id) as admittedpatientcount FROM Patient p , Patientstatus ps where p.patientstatus.id = ps.id and ps.name = 'Admitted'")
    Integer countAllAdmittedPatient();

    @Query("SELECT count(p.id) as admittedpatientcount FROM Patient p , Patientstatus ps where p.patientstatus.id = ps.id and ps.name = 'Critical'")
    Integer countAllCriticalPatient();

}

