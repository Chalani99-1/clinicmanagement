package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Employee;
import lk.earth.earthuniversity.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PatientDao extends JpaRepository<Patient,Integer> {

  @Query("select p from Patient p where p.nic=:nic")
  Patient findByNic(@Param("nic")String nic);

  @Query("select r from Patient r where r.regno=:regno")
  Patient findByRegno(@Param("regno")String regno);

  @Query("select p from Patient p where p.id=:id")
  Patient findByMyId(@Param("id")Integer id);

}

