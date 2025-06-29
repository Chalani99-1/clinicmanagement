package lk.earth.earthuniversity.dao;


import lk.earth.earthuniversity.entity.Diagnosis;
import lk.earth.earthuniversity.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface DiagnosisDao extends JpaRepository<Diagnosis,Integer> {

    @Query("select d from Diagnosis d where d.id = :id")
    Diagnosis findByMyId(@Param("id") Integer id);

    @Query("select p from Patient p where p.nic = :nic")
    Patient findByPatientNic(@Param("nic") String nic);
}
