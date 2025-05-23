package lk.earth.earthuniversity.report.dao;

import lk.earth.earthuniversity.report.entity.PatientCountByBloodgroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PatientCountByBloodgroupDao extends JpaRepository<PatientCountByBloodgroup,Integer> {

    @Query(value = "SELECT NEW PatientCountByBloodgroup (b.name, COUNT(*)) FROM Patient p, Bloodgroup b WHERE p.bloodgroup.id = b.id GROUP BY b.id")
    List<PatientCountByBloodgroup> countByBloodgroup();

}

