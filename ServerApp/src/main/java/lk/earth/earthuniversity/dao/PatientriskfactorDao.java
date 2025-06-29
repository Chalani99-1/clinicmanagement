package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Patientriskfactor;
import lk.earth.earthuniversity.entity.Userrole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientriskfactorDao extends JpaRepository<Patientriskfactor,Integer> {
    Patientriskfactor findById(int id);
}

