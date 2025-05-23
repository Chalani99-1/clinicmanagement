package lk.earth.earthuniversity.report.dao;

import lk.earth.earthuniversity.report.entity.CountByDesignation;
import lk.earth.earthuniversity.report.entity.DrugCountByBrandAndSts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CountAllDrugByBrandAndStsDao extends JpaRepository<CountByDesignation,Integer> {

    @Query("SELECT NEW DrugCountByBrandAndSts(concat(b.name, '_', g.name), ds.name, COUNT(d)) FROM Drug d JOIN d.generic g JOIN d.brand b JOIN d.drugstatus ds GROUP BY b.name, g.name, ds.name ORDER BY b.name, ds.name")
    List<DrugCountByBrandAndSts> getAllDrugByBrandAndSts();


}

