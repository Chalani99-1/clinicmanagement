package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Drugindication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrugindicationDao extends JpaRepository<Drugindication, Integer> {

    Drugindication findById(int id);

}
