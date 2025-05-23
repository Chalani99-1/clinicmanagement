package lk.earth.earthuniversity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class University {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "name")
    private String name;
    @JsonIgnore
    @OneToMany(mappedBy = "university")
    private Collection<Doctordegree> doctordegrees;
    @ManyToOne
    @JoinColumn(name = "country_id", referencedColumnName = "id", nullable = false)
    private Country country;
    @OneToMany(mappedBy = "university")
    private Collection<Degree> degrees;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        University that = (University) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }

    public Collection<Doctordegree> getDoctordegrees() {
        return doctordegrees;
    }

    public void setDoctordegrees(Collection<Doctordegree> doctordegrees) {
        this.doctordegrees = doctordegrees;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Collection<Degree> getDegrees() {
        return degrees;
    }

    public void setDegrees(Collection<Degree> degrees) {
        this.degrees = degrees;
    }
}
