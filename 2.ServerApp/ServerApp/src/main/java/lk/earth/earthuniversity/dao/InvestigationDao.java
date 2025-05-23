package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Investigation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InvestigationDao extends JpaRepository<Investigation,Integer> {
    @Query("select i from Investigation i where i.id=:id")
    Investigation findByMyId(@Param("id")Integer id);



}

