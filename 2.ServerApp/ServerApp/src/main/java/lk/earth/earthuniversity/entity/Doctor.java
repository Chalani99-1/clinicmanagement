package lk.earth.earthuniversity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.sql.Date;
import java.time.Year;
import java.util.Collection;

@Entity
public class Doctor {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "description")
    @Pattern(regexp = "^.*$", message = "Invalid Description")
    private String description;
    @Basic
    @Column(name = "slmcregno")
    @Pattern(regexp = "^SLMC\\/\\d+\\/\\d{4}$", message = "Invalid SLMC number")
    private String slmcregno;
    @Basic
    @Column(name = "doslmcregisterd")
    private Date doslmcregisterd;
    @Basic
    @Column(name = "foreigntraining")
    @Pattern(regexp = "^.*$", message = "Invalid Description")
    private String foreigntraining;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;
    @ManyToOne
    @JoinColumn(name = "speciality_id", referencedColumnName = "id", nullable = false)
    private Speciality speciality;
    @ManyToOne
    @JoinColumn(name = "doctorgrade_id", referencedColumnName = "id", nullable = false)
    private Doctorgrade doctorgrade;
    @ManyToOne
    @JoinColumn(name = "degreedcountry_id", referencedColumnName = "id")
    private Country country;

    @JsonManagedReference
    @OneToMany(mappedBy = "doctor",fetch = FetchType.EAGER,cascade = CascadeType.ALL, orphanRemoval = true)
    private Collection<Doctordegree> doctordegrees;

    @Basic
    @Column(name = "degreeyear")
    private String degreeyear;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSlmcregno() {
        return slmcregno;
    }

    public void setSlmcregno(String slmcregno) {
        this.slmcregno = slmcregno;
    }

    public Date getDoslmcregisterd() {
        return doslmcregisterd;
    }

    public void setDoslmcregisterd(Date doslmcregisterd) {
        this.doslmcregisterd = doslmcregisterd;
    }

    public String getForeigntraining() {
        return foreigntraining;
    }

    public void setForeigntraining(String foreigntraining) {
        this.foreigntraining = foreigntraining;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Doctor doctor = (Doctor) o;

        if (id != null ? !id.equals(doctor.id) : doctor.id != null) return false;
        if (description != null ? !description.equals(doctor.description) : doctor.description != null) return false;
        if (slmcregno != null ? !slmcregno.equals(doctor.slmcregno) : doctor.slmcregno != null) return false;
        if (doslmcregisterd != null ? !doslmcregisterd.equals(doctor.doslmcregisterd) : doctor.doslmcregisterd != null)
            return false;
        if (foreigntraining != null ? !foreigntraining.equals(doctor.foreigntraining) : doctor.foreigntraining != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (slmcregno != null ? slmcregno.hashCode() : 0);
        result = 31 * result + (doslmcregisterd != null ? doslmcregisterd.hashCode() : 0);
        result = 31 * result + (foreigntraining != null ? foreigntraining.hashCode() : 0);
        return result;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Speciality getSpeciality() {
        return speciality;
    }

    public void setSpeciality(Speciality speciality) {
        this.speciality = speciality;
    }

    public Doctorgrade getDoctorgrade() {
        return doctorgrade;
    }

    public void setDoctorgrade(Doctorgrade doctorgrade) {
        this.doctorgrade = doctorgrade;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Collection<Doctordegree> getDoctordegrees() {
        return doctordegrees;
    }

    public void setDoctordegrees(Collection<Doctordegree> doctordegrees) {
        this.doctordegrees = doctordegrees;
    }

    public String getDegreeyear() {
        return degreeyear;
    }

    public void setDegreeyear(String degreeyear) {
        this.degreeyear = degreeyear;
    }
}
