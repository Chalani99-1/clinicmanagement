package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Doctor;
import lk.earth.earthuniversity.entity.Employee;
import lk.earth.earthuniversity.entity.Wardassignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WardassignmentDao extends JpaRepository<Wardassignment,Integer> {
    @Query("select wa from Wardassignment wa where wa.id=:id")
    Wardassignment findByMyId(@Param("id")Integer id);

    @Query("select e from Employee e where e.number = :number")
    Employee findByMyEmpId(@Param("number") String number);

    @Query("select wa from Wardassignment wa where wa.employee.id = :empid and wa.ward.id=:wardid")
    List<Wardassignment> findDoctorInAnotherWard(@Param("empid")Integer id, @Param("wardid") Integer id1);
}

