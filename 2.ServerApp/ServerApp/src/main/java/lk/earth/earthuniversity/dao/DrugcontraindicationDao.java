package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Drugcontraindication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrugcontraindicationDao extends JpaRepository<Drugcontraindication, Integer> {

    Drugcontraindication findById(int id);

}
