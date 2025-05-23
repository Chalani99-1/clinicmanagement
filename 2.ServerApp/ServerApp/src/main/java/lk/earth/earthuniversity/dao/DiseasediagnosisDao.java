package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Diseasediagnosis;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiseasediagnosisDao extends JpaRepository<Diseasediagnosis, Integer> {

    Diseasediagnosis findById(int id);

}
