package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Clinic;
import lk.earth.earthuniversity.entity.Drug;
import lk.earth.earthuniversity.entity.Employee;
import lk.earth.earthuniversity.entity.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.Optional;


public interface ClinicDao extends JpaRepository<Clinic,Integer> {

    Optional<Clinic> findById(Integer id);
    @Query("select c from Clinic c where c.id = :id")
    Clinic findByMyId(@Param("id") Integer id);
//    @Query("select c from Clinic c where c.clinictype.name = :name and c.date = :date")
//    List<Clinic> findByClinicByDate(@Param("name") String name, @Param("date") Date date);

    @Query("select c from Clinic c where c.clinicroom.name = :name and c.date = :date and c.starttime=:starttime and c.endtime=:endtime")
    List<Clinic> findByClinicByDate(@Param("name") String name, @Param("date") Date date, @Param("starttime") Time starttime ,@Param("endtime")Time endtime);




//    @Query(value = "select c  from Clinic c where c.date =:getdate")
//    Clinic findByClinicDate(@Param("getdate") String getdate);
//
//    @Query(value = "select c  from Clinic c where c.clinictype.name = :getname")
//    Clinic findByClinicName( @Param("getname") String getname);




//    @Query(value = "select c  from Clinic c where c.clinictype.name = :name   AND   c.date = :date")
//    Drug findByClinicNameDate(@Param("name") String code, @Param("date") String name  );


}

