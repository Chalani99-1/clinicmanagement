package lk.earth.earthuniversity.report.dao;

import lk.earth.earthuniversity.report.entity.CountByDesignation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CountAllDoctorDao extends JpaRepository<CountByDesignation,Integer> {

    @Query(value = "SELECT count(d.id) as docotrcount FROM Doctor d")
    Integer countAllByDoctors();

}

