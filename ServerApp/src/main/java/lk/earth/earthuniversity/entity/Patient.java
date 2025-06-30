package lk.earth.earthuniversity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.parameters.P;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.sql.Date;
import java.util.Arrays;
import java.util.Collection;

@Entity
public class Patient {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @Basic
    @Column(name = "name")
    @Pattern(regexp = "^[A-Z][a-z]+\\s[A-z][a-z]+(?:\\s[A-z][a-z]+)?$",message = "Invalid Name")
    private String name;
    @Basic
    @Column(name = "dob")
    @Pattern(regexp ="^\\d{4}/\\d{2}/\\d{2}$",message = "Invalid Date Format")
    private Date dob;
    @Basic
    @Column(name = "nic")
    @Pattern(regexp = "^(([\\d]{9}[vVxX])|([\\d]{12}))$", message = "Invalid NIC")
    private String nic;
    @Basic
    @Column(name = "photo")
    private byte[] photo;
    @Basic
    @Column(name = "address")
    @Pattern(regexp = "^([\\w\\/\\-,\\s]{2,})$", message = "Invalid Address")
    private String address;
    @Basic
    @Column(name = "contactnumber")
    @Pattern(regexp = "^0\\d{9}$", message = "Invalid Mobile Number")
    private String contactnumber;

    @Basic
    @Column(name = "guardianname")
    @Pattern(regexp = "^[A-Z][a-z]+\\s[A-z][a-z]+(?:\\s[A-z][a-z]+)?$",message = "Invalid Guardian Name")
    private String guardianname;
    @Basic
    @Column(name = "guardiancontact")
    @Pattern(regexp = "^0\\d{9}$",message = "Invalid Mobile")
    private String guardiancontact;
    @Basic
    @Column(name = "description")
    @Pattern(regexp = "^.*$", message = "Invalid Description")
    private String description;
    @ManyToOne
    @JoinColumn(name = "gender_id", referencedColumnName = "id", nullable = false)
    private Gender gender;
    @ManyToOne
    @JoinColumn(name = "district_id", referencedColumnName = "id", nullable = false)
    private District district;
    @ManyToOne
    @JoinColumn(name = "bloodgroup_id", referencedColumnName = "id", nullable = false)
    private Bloodgroup bloodgroup;
    @ManyToOne
    @JoinColumn(name = "patientstatus_id", referencedColumnName = "id", nullable = false)
    private Patientstatus patientstatus;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;
    @OneToMany(mappedBy = "patient",fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private Collection<Patientriskfactor> patientriskfactors;
    @JsonIgnore
    @OneToMany(mappedBy = "patient")
    private Collection<Patientattendence> patientattendences;
    @JsonIgnore
    @OneToMany(mappedBy = "patient")
    private Collection<Diagnosis> diagnoses;
    @Basic
    @Column(name = "regno")
    private String regno;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactnumber() {
        return contactnumber;
    }

    public void setContactnumber(String contactnumber) {
        this.contactnumber = contactnumber;
    }

    public String getGuardianname() {
        return guardianname;
    }

    public void setGuardianname(String guardianname) {
        this.guardianname = guardianname;
    }

    public String getGuardiancontact() {
        return guardiancontact;
    }

    public void setGuardiancontact(String guardiancontact) {
        this.guardiancontact = guardiancontact;
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

        Patient patient = (Patient) o;

        if (id != null ? !id.equals(patient.id) : patient.id != null) return false;
        if (name != null ? !name.equals(patient.name) : patient.name != null) return false;
        if (dob != null ? !dob.equals(patient.dob) : patient.dob != null) return false;
        if (nic != null ? !nic.equals(patient.nic) : patient.nic != null) return false;
        if (!Arrays.equals(photo, patient.photo)) return false;
        if (address != null ? !address.equals(patient.address) : patient.address != null) return false;
        if (contactnumber != null ? !contactnumber.equals(patient.contactnumber) : patient.contactnumber != null)
            return false;
        if (guardianname != null ? !guardianname.equals(patient.guardianname) : patient.guardianname != null)
            return false;
        if (guardiancontact != null ? !guardiancontact.equals(patient.guardiancontact) : patient.guardiancontact != null)
            return false;
        if (description != null ? !description.equals(patient.description) : patient.description != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (dob != null ? dob.hashCode() : 0);
        result = 31 * result + (nic != null ? nic.hashCode() : 0);
        result = 31 * result + Arrays.hashCode(photo);
        result = 31 * result + (address != null ? address.hashCode() : 0);
        result = 31 * result + (contactnumber != null ? contactnumber.hashCode() : 0);
        result = 31 * result + (guardianname != null ? guardianname.hashCode() : 0);
        result = 31 * result + (guardiancontact != null ? guardiancontact.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        return result;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public Bloodgroup getBloodgroup() {
        return bloodgroup;
    }

    public void setBloodgroup(Bloodgroup bloodgroup) {
        this.bloodgroup = bloodgroup;
    }

    public Patientstatus getPatientstatus() {
        return patientstatus;
    }

    public void setPatientstatus(Patientstatus patientstatus) {
        this.patientstatus = patientstatus;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Collection<Patientriskfactor> getPatientriskfactors() {
        return patientriskfactors;
    }

    public void setPatientriskfactors(Collection<Patientriskfactor> patientriskfactors) {
        this.patientriskfactors = patientriskfactors;
    }

    public Collection<Patientattendence> getPatientattendences() {
        return patientattendences;
    }

    public void setPatientattendences(Collection<Patientattendence> patientattendences) {
        this.patientattendences = patientattendences;
    }

    public Collection<Diagnosis> getDiagnoses() {
        return diagnoses;
    }

    public void setDiagnoses(Collection<Diagnosis> diagnoses) {
        this.diagnoses = diagnoses;
    }

    public String getRegno() {
        return regno;
    }

    public void setRegno(String regno) {
        this.regno = regno;
    }
}
