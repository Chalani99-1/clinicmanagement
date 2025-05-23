package lk.earth.earthuniversity.report.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class DoctorCountBySpeciality {

    @Id
    private Integer id;
    private String specialityname;
    private Long count;

    public DoctorCountBySpeciality() {  }

    public DoctorCountBySpeciality(String specialityname, Long count) {
        this.specialityname = specialityname;
        this.count = count;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSpecialityname() {
        return specialityname;
    }

    public void setSpecialityname(String specialityname) {
        this.specialityname = specialityname;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

}
