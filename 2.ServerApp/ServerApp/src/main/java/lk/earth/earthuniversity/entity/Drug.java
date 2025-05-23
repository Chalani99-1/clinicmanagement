package lk.earth.earthuniversity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lk.earth.earthuniversity.util.RegexPattern;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.Arrays;
import java.util.Collection;

@Entity
public class Drug {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "strength")
    private String strength;
    @Basic
    @Column(name = "code")
    @RegexPattern(reg = "^[D]\\d{4}$", msg = "Invalid Code")
    private String code;
    @Basic
    @Column(name = "name")
    private String name;
    @Basic
    @Column(name = "photo")
    private byte[] photo;
    @Basic
    @Column(name = "qoh")
    //@RegexPattern(reg = "^-?\\d+$", msg = "Invalid Quantity")

    private Integer qoh;
    @Basic
    @Column(name = "rop")
    @RegexPattern(reg = "^-?\\d+$", msg = "Invalid Reorder Point")
    private Integer rop;
    @Basic
    @Column(name = "dointroduced")
    private Date dointroduced;
    @ManyToOne
    @JoinColumn(name = "generic_id", referencedColumnName = "id", nullable = false)
    private Generic generic;
    @ManyToOne
    @JoinColumn(name = "brand_id", referencedColumnName = "id", nullable = false)
    private Brand brand;
    @ManyToOne
    @JoinColumn(name = "drugform_id", referencedColumnName = "id", nullable = false)
    private Drugform drugform;
    @ManyToOne
    @JoinColumn(name = "drugroute_id", referencedColumnName = "id", nullable = false)
    private Drugroute drugroute;
    @ManyToOne
    @JoinColumn(name = "drugstatus_id", referencedColumnName = "id", nullable = false)
    private Drugstatus drugstatus;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;
    @OneToMany(mappedBy = "drug")
    private Collection<Drugadverseeffect> drugadverseeffects;
    @OneToMany(mappedBy = "drug")
    private Collection<Drugcontraindication> drugcontraindications;
    @OneToMany(mappedBy = "drug")
    private Collection<Drugindication> drugindications;
    @JsonIgnore
    @OneToMany(mappedBy = "drug")
    private Collection<Prescriptiondrug> prescriptiondrugs;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStrength() {
        return strength;
    }

    public void setStrength(String strength) {
        this.strength = strength;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public Integer getQoh() {
        return qoh;
    }

    public void setQoh(Integer qoh) {
        this.qoh = qoh;
    }

    public Integer getRop() {
        return rop;
    }

    public void setRop(Integer rop) {
        this.rop = rop;
    }

    public Date getDointroduced() {
        return dointroduced;
    }

    public void setDointroduced(Date dointroduced) {
        this.dointroduced = dointroduced;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Drug drug = (Drug) o;

        if (id != null ? !id.equals(drug.id) : drug.id != null) return false;
        if (strength != null ? !strength.equals(drug.strength) : drug.strength != null) return false;
        if (code != null ? !code.equals(drug.code) : drug.code != null) return false;
        if (name != null ? !name.equals(drug.name) : drug.name != null) return false;
        if (!Arrays.equals(photo, drug.photo)) return false;
        if (qoh != null ? !qoh.equals(drug.qoh) : drug.qoh != null) return false;
        if (rop != null ? !rop.equals(drug.rop) : drug.rop != null) return false;
        if (dointroduced != null ? !dointroduced.equals(drug.dointroduced) : drug.dointroduced != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (strength != null ? strength.hashCode() : 0);
        result = 31 * result + (code != null ? code.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + Arrays.hashCode(photo);
        result = 31 * result + (qoh != null ? qoh.hashCode() : 0);
        result = 31 * result + (rop != null ? rop.hashCode() : 0);
        result = 31 * result + (dointroduced != null ? dointroduced.hashCode() : 0);
        return result;
    }

    public Generic getGeneric() {
        return generic;
    }

    public void setGeneric(Generic generic) {
        this.generic = generic;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public Drugform getDrugform() {
        return drugform;
    }

    public void setDrugform(Drugform drugform) {
        this.drugform = drugform;
    }

    public Drugroute getDrugroute() {
        return drugroute;
    }

    public void setDrugroute(Drugroute drugroute) {
        this.drugroute = drugroute;
    }

    public Drugstatus getDrugstatus() {
        return drugstatus;
    }

    public void setDrugstatus(Drugstatus drugstatus) {
        this.drugstatus = drugstatus;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Collection<Drugadverseeffect> getDrugadverseeffects() {
        return drugadverseeffects;
    }

    public void setDrugadverseeffects(Collection<Drugadverseeffect> drugadverseeffects) {
        this.drugadverseeffects = drugadverseeffects;
    }

    public Collection<Drugcontraindication> getDrugcontraindications() {
        return drugcontraindications;
    }

    public void setDrugcontraindications(Collection<Drugcontraindication> drugcontraindications) {
        this.drugcontraindications = drugcontraindications;
    }

    public Collection<Drugindication> getDrugindications() {
        return drugindications;
    }

    public void setDrugindications(Collection<Drugindication> drugindications) {
        this.drugindications = drugindications;
    }

    public Collection<Prescriptiondrug> getPrescriptiondrugs() {
        return prescriptiondrugs;
    }

    public void setPrescriptiondrugs(Collection<Prescriptiondrug> prescriptiondrugs) {
        this.prescriptiondrugs = prescriptiondrugs;
    }
}
