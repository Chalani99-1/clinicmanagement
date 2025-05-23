package lk.earth.earthuniversity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lk.earth.earthuniversity.util.RegexPattern;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.sql.Date;
import java.sql.Time;
import java.util.Collection;

@Entity
public class Clinic {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "date")
    @RegexPattern(reg = "^\\d{2}/\\d{2}/\\d{2}$", msg = "Invalid Date Format")
    private Date date;
    @Basic
    @Column(name = "starttime")
    @RegexPattern(reg = "^(?:[0-5][0-9]):(?:[0-5][0-9]):(?:[0-5][0-9])$",msg = "Invalid Time Format")
    private Time starttime;
    @Basic
    @Column(name = "endtime")
    @RegexPattern(reg = "^(?:[0-5][0-9]):(?:[0-5][0-9]):(?:[0-5][0-9])$",msg = "Invalid Time Format")
    private Time endtime;
    @Basic
    @Column(name = "description")
    @RegexPattern(reg = "^.*$", msg = "Invalid Description")
    private String description;
    @Basic
    @Column(name = "patientcount")
    @RegexPattern(reg = "^\\d{1,4}$", msg = "Invalid Patient Count")
    private Integer patientcount;

    @Basic
    @Column(name = "dopublish")
    @RegexPattern(reg = "^\\d{2}/\\d{2}/\\d{2}$", msg = "Invalid Date Format")
    private Date dopublish;
    @ManyToOne
    @JoinColumn(name = "clinictype_id", referencedColumnName = "id", nullable = false)
    private Clinictype clinictype;
    @ManyToOne
    @JoinColumn(name = "ward_id", referencedColumnName = "id")
    private Ward ward;
    @ManyToOne
    @JoinColumn(name = "clinicstatus_id", referencedColumnName = "id", nullable = false)
    private Clinicstatus clinicstatus;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;
    @ManyToOne
    @JoinColumn(name = "clinicroom_id", referencedColumnName = "id", nullable = false)
    private Clinicroom clinicroom;

    @JsonIgnore
    @OneToMany(mappedBy = "clinic")
    private Collection<Patientattendence> patientattendences;
    @JsonIgnore
    @OneToMany(mappedBy = "clinic")
    private Collection<Clinicattendence> clinicattendences;

    public Clinic(){}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getStarttime() {
        return starttime;
    }

    public void setStarttime(Time starttime) {
        this.starttime = starttime;
    }

    public Time getEndtime() {
        return endtime;
    }

    public void setEndtime(Time endtime) {
        this.endtime = endtime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPatientcount() {
        return patientcount;
    }

    public void setPatientcount(Integer patientcount) {
        this.patientcount = patientcount;
    }

    public Date getDopublish() {
        return dopublish;
    }

    public void setDopublish(Date dopublish) {
        this.dopublish = dopublish;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Clinic clinic = (Clinic) o;

        if (id != null ? !id.equals(clinic.id) : clinic.id != null) return false;
        if (date != null ? !date.equals(clinic.date) : clinic.date != null) return false;
        if (starttime != null ? !starttime.equals(clinic.starttime) : clinic.starttime != null) return false;
        if (endtime != null ? !endtime.equals(clinic.endtime) : clinic.endtime != null) return false;
        if (description != null ? !description.equals(clinic.description) : clinic.description != null) return false;
        if (patientcount != null ? !patientcount.equals(clinic.patientcount) : clinic.patientcount != null)
            return false;
        if (dopublish != null ? !dopublish.equals(clinic.dopublish) : clinic.dopublish != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + (starttime != null ? starttime.hashCode() : 0);
        result = 31 * result + (endtime != null ? endtime.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (patientcount != null ? patientcount.hashCode() : 0);
        result = 31 * result + (dopublish != null ? dopublish.hashCode() : 0);
        return result;
    }

    public Clinictype getClinictype() {
        return clinictype;
    }

    public void setClinictype(Clinictype clinictype) {
        this.clinictype = clinictype;
    }

    public Ward getWard() {
        return ward;
    }

    public void setWard(Ward ward) {
        this.ward = ward;
    }

    public Clinicstatus getClinicstatus() {
        return clinicstatus;
    }

    public void setClinicstatus(Clinicstatus clinicstatus) {
        this.clinicstatus = clinicstatus;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Clinicroom getClinicroom() {
        return clinicroom;
    }

    public void setClinicroom(Clinicroom clinicroom) {
        this.clinicroom = clinicroom;
    }

    public Collection<Patientattendence> getPatientattendences() {
        return patientattendences;
    }

    public void setPatientattendences(Collection<Patientattendence> patientattendences) {
        this.patientattendences = patientattendences;
    }

    public Collection<Clinicattendence> getClinicattendences() {
        return clinicattendences;
    }

    public void setClinicattendences(Collection<Clinicattendence> clinicattendences) {
        this.clinicattendences = clinicattendences;
    }
}
