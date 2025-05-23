package lk.earth.earthuniversity.report.dao;

import lk.earth.earthuniversity.report.entity.DrugCountByBrandAndGenericAndStatus;
import lk.earth.earthuniversity.report.entity.PatientCountByBloodgroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DrugCountByBrandAndGenericDao extends JpaRepository<PatientCountByBloodgroup,Integer> {

//    @Query("SELECT NEW DrugCountByBrandAndGenericAndStatus (b.name, g.name ,COUNT(d.id)) FROM Drug d JOIN Brand b ON d.brand.id = b.id JOIN Generic g ON d.generic.id = g.id GROUP BY b.name, g.name")
//    List<DrugCountByBrandAndGenericAndStatus> countAllDrugByBrandAndGeneric();

}

