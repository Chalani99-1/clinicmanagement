package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Symptomdiagnosis;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SymptomdiagnosisDao extends JpaRepository<Symptomdiagnosis, Integer> {

    Symptomdiagnosis findById(int id);

}
