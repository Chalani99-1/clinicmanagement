package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Degree;
import lk.earth.earthuniversity.entity.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MealDao extends JpaRepository<Meal,Integer> {

}

