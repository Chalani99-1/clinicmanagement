package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Degree;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DegreeDao extends JpaRepository<Degree,Integer> {
    @Query("SELECT d from Degree d where d.university.id = :id")
    List<Degree>findAllByDegree(@Param("id")Integer id);
}

