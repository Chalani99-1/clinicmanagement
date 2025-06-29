package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Patientattendence;
import lk.earth.earthuniversity.entity.Wardassignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface PatientattendenceDao extends JpaRepository<Patientattendence,Integer> {


    @Query("select pa from Patientattendence pa where pa.id=:id")
    Patientattendence findByMyId(@Param("id")Integer id);
}

