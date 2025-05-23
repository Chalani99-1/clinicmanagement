package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Drugadverseeffect;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrugadverseeffectDao extends JpaRepository<Drugadverseeffect, Integer> {

    Drugadverseeffect findById(int id);

}
