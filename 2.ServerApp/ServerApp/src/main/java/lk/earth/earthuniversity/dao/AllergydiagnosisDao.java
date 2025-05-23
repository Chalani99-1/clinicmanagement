package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Allergydiagnosis;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AllergydiagnosisDao extends JpaRepository<Allergydiagnosis, Integer> {

    Allergydiagnosis findById(int id);

}
