package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Riskfactor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RiskfactorDao extends JpaRepository<Riskfactor,Integer> {

       @Query("select rf from Riskfactor rf join Patientriskfactor prf on prf.riskfactor.id=rf.id join Patient p on prf.patient.id=p.id where p.name=:name")
       List<Riskfactor>findAllByRiskfactor(@Param("name")String name);

}

