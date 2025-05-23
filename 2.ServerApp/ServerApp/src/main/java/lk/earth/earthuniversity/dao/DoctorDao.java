package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Doctor;
import lk.earth.earthuniversity.entity.Employee;
import lk.earth.earthuniversity.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DoctorDao extends JpaRepository<Doctor,Integer> {

    @Query("select d from Doctor d where d.slmcregno=:slmcregno")
    Doctor findBySlmcregno(@Param("slmcregno")String slmcregno);

    @Query("select e from Employee e where e.number=:number")
    Employee findByEmpNo(@Param("number")String number);

    @Query("select d from Doctor d where d.employee.id=:employeeid")
    Doctor findByEmployeeid(@Param("employeeid")Integer employeeid);

    @Query("select d from Doctor d where d.id=:id")
    Doctor findByMyId(@Param("id")Integer id);

}

