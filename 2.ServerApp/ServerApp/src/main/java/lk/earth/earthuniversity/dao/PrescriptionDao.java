package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Doctor;
import lk.earth.earthuniversity.entity.Employee;
import lk.earth.earthuniversity.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PrescriptionDao extends JpaRepository<Prescription,Integer> {

    @Query("select p from Prescription p where p.id = :id")
    Prescription findByMyId(@Param("id") Integer id);

//    @Query("select pa from Prescription.patientattendence.patient.nic pa where pa.nic=:nic")
//    Prescription findByAttenId(@Param("name") String name);

}

