package lk.earth.earthuniversity.dao;


import lk.earth.earthuniversity.entity.Disease;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiseaseDao extends JpaRepository<Disease,Integer> {

}

