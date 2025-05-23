package lk.earth.earthuniversity.report.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class PatientCountByBloodgroup {

    @Id
    private Integer id;
    private String name;
    private Long count;

    public PatientCountByBloodgroup() {  }

    public PatientCountByBloodgroup(String name, Long count) {
        this.name = name;
        this.count = count;
    }

    @Id
    public Integer getId() {return id;}
    public void setId(Integer id) {this.id = id;}

    public String getName() {return name;}
    public void setName(String name) {this.name = name;}
    public Long getCount() {
        return count;
    }
    public void setCount(Long count) {
        this.count = count;
    }



}
