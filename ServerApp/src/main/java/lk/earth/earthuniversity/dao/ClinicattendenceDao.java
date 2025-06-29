package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Clinicattendence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;



public interface ClinicattendenceDao extends JpaRepository<Clinicattendence,Integer> {


    @Query("select ca from Clinicattendence ca where ca.id = :id")
    Clinicattendence findByMyId(@Param("id") Integer id);


}

