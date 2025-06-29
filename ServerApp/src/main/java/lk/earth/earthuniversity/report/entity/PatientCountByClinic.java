package lk.earth.earthuniversity.report.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Date;
import java.sql.Time;

@Entity
public class PatientCountByClinic {

    @Id
    private Integer id;
    private String clinic;
    private Long patients;
    private Time stime;
    private Time etime;

    public PatientCountByClinic() {  }
    public PatientCountByClinic(String clinic, Long patients) {
        this.clinic = clinic;
        this.patients = patients;
    }
    public PatientCountByClinic(String clinic, Long patients, Time stime, Time etime) {
        this.clinic = clinic;
        this.patients = patients;
        this.stime = stime;
        this.etime = etime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getClinic() {
        return clinic;
    }

    public void setClinic(String clinic) {
        this.clinic = clinic;
    }

    public Long getPatients() {
        return patients;
    }

    public void setPatients(Long patients) {
        this.patients = patients;
    }

    public Time getStime() {
        return stime;
    }

    public void setStime(Time stime) {
        this.stime = stime;
    }

    public Time getEtime() {
        return etime;
    }

    public void setEtime(Time etime) {
        this.etime = etime;
    }


}
