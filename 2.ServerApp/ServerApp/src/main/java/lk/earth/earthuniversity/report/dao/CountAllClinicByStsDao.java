package lk.earth.earthuniversity.report.dao;

import lk.earth.earthuniversity.report.entity.CountByDesignation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CountAllClinicByStsDao extends JpaRepository<CountByDesignation,Integer> {

    @Query("SELECT count(c.id) as count FROM Clinic c where c.clinicstatus.id = 1")
    Integer countAllScheduledClinic();

    @Query("SELECT count(c.id) as count FROM Clinic c where c.clinicstatus.id = 2")
    Integer countAllCancelledClinic();

}

