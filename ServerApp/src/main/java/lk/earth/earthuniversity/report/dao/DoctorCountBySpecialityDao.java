package lk.earth.earthuniversity.report.dao;

import lk.earth.earthuniversity.report.entity.CountByDesignation;
import lk.earth.earthuniversity.report.entity.DoctorCountBySpeciality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DoctorCountBySpecialityDao extends JpaRepository<DoctorCountBySpeciality,Integer> {

    @Query("SELECT NEW DoctorCountBySpeciality (s.name, COUNT(*)) FROM Doctor d, Employee e, Speciality s WHERE d.employee.id = e.id and d.speciality.id = s.id GROUP BY s.id")
    List<DoctorCountBySpeciality> countBySpeciality();

}

