package lk.earth.earthuniversity.report.dao;

import lk.earth.earthuniversity.report.entity.CountByDesignation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CountAllinvestigationByStsDao extends JpaRepository<CountByDesignation,Integer> {

    @Query("SELECT count(i.id) as progressinvs FROM Investigation i , Investigationstatus invs where i.investigationstatus.id = invs.id and invs.name = 'In progress'")
    Integer countAllinProgressInvestigations();

}

