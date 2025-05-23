package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Drug;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DrugDao extends JpaRepository<Drug,Integer> {

  @Query("select d from Drug d where d.id=:id")
  Drug findByMyId(@Param("id")Integer id);

  @Query("select d from Drug d where d.code=:code")
  Drug findByCode(@Param("code")String id);

//  @Query("select d from Drug d where d.name=:name")
//  Drug findByName(@Param("name")String id);
}

