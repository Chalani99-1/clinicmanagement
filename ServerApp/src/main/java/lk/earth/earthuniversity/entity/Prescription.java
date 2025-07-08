package lk.earth.earthuniversity.entity;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.sql.Timestamp;
import java.util.Collection;

@Entity
public class Prescription {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @Basic
    @Column(name = "description")
    private String description;
    @Basic
    @Column(name = "date")
    private Timestamp date;
    @ManyToOne
    @JoinColumn(name = "patientattendence_id", referencedColumnName = "id", nullable = false)
    private Patientattendence patientattendence;
    @ManyToOne
    @JoinColumn(name = "prescriptionstatus_id", referencedColumnName = "id", nullable = false)
    private Prescriptionstatus prescriptionstatus;
    @OneToMany(mappedBy = "prescription", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private Collection<Prescriptiondrug> prescriptiondrugs;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
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

        Prescription that = (Prescription) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (date != null ? !date.equals(that.date) : that.date != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (date != null ? date.hashCode() : 0);
        return result;
    }

    public Patientattendence getPatientattendence() {
        return patientattendence;
    }

    public void setPatientattendence(Patientattendence patientattendence) {
        this.patientattendence = patientattendence;
    }

    public Prescriptionstatus getPrescriptionstatus() {
        return prescriptionstatus;
    }

    public void setPrescriptionstatus(Prescriptionstatus prescriptionstatus) {
        this.prescriptionstatus = prescriptionstatus;
    }

    public Collection<Prescriptiondrug> getPrescriptiondrugs() {
        return prescriptiondrugs;
    }

    public void setPrescriptiondrugs(Collection<Prescriptiondrug> prescriptiondrugs) {
        this.prescriptiondrugs = prescriptiondrugs;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
