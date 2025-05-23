package lk.earth.earthuniversity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lk.earth.earthuniversity.util.RegexPattern;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;
import java.util.Collection;

@Entity
public class Patientattendence {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "date")
   // @RegexPattern(reg = "^\\d{2}/\\d{2}/\\d{2}$", msg = "Invalid Date Format")
    private Date date;
    @Basic
    @Column(name = "timein")
    @RegexPattern(reg = "^(?:[0-5][0-9]):(?:[0-5][0-9]):(?:[0-5][0-9])$",msg = "Invalid Time Format")
    private Time timein;
    @Basic
    @Column(name = "timeout")
    @RegexPattern(reg = "^(?:[0-5][0-9]):(?:[0-5][0-9]):(?:[0-5][0-9])$",msg = "Invalid Time Format")
    private Time timeout;
    @Basic
    @Column(name = "description")
    @RegexPattern(reg = "^.*$", msg = "Invalid Description")
    private String description;
    @ManyToOne
    @JoinColumn(name = "clinic_id", referencedColumnName = "id", nullable = false)
    private Clinic clinic;
    @ManyToOne
    @JoinColumn(name = "patient_id", referencedColumnName = "id", nullable = false)
    private Patient patient;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;
    @ManyToOne
    @JoinColumn(name = "patientattendencestatus_id", referencedColumnName = "id", nullable = false)
    private Patientattendencestatus patientattendencestatus;
    @JsonIgnore
    @OneToMany(mappedBy = "patientattendence")
    private Collection<Prescription> prescriptions;
    @JsonIgnore
    @OneToMany(mappedBy = "patientattendence")
    private Collection<Investigation> investigations;

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

    public Time getTimein() {
        return timein;
    }

    public void setTimein(Time timein) {
        this.timein = timein;
    }

    public Time getTimeout() {
        return timeout;
    }

    public void setTimeout(Time timeout) {
        this.timeout = timeout;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Patientattendence that = (Patientattendence) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (date != null ? !date.equals(that.date) : that.date != null) return false;
        if (timein != null ? !timein.equals(that.timein) : that.timein != null) return false;
        if (timeout != null ? !timeout.equals(that.timeout) : that.timeout != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + (timein != null ? timein.hashCode() : 0);
        result = 31 * result + (timeout != null ? timeout.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        return result;
    }

    public Clinic getClinic() {
        return clinic;
    }

    public void setClinic(Clinic clinic) {
        this.clinic = clinic;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Patientattendencestatus getPatientattendencestatus() {
        return patientattendencestatus;
    }

    public void setPatientattendencestatus(Patientattendencestatus patientattendencestatus) {
        this.patientattendencestatus = patientattendencestatus;
    }

    public Collection<Prescription> getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(Collection<Prescription> prescriptions) {
        this.prescriptions = prescriptions;
    }

    public Collection<Investigation> getInvestigations() {
        return investigations;
    }

    public void setInvestigations(Collection<Investigation> investigations) {
        this.investigations = investigations;
    }
}
