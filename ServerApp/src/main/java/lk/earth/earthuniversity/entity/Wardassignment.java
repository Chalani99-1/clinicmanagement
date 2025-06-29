package lk.earth.earthuniversity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lk.earth.earthuniversity.util.RegexPattern;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.sql.Date;

@Entity
public class Wardassignment {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "description")
    @Pattern(regexp = "^.*$", message = "Invalid Description")
    private String description;
    @Basic
    @Column(name = "assignmentdate")
    private Date assignmentdate;
    @Basic
    @Column(name = "resignateddate")
    private Date resignateddate;
    @ManyToOne
    @JoinColumn(name = "ward_id", referencedColumnName = "id", nullable = false)
    private Ward ward;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "assignmentstatus_id", referencedColumnName = "id", nullable = false)
    private Assignmentstatus assignmentstatus;

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

    public Date getAssignmentdate() {
        return assignmentdate;
    }

    public void setAssignmentdate(Date assignmentdate) {
        this.assignmentdate = assignmentdate;
    }

    public Date getResignateddate() {
        return resignateddate;
    }

    public void setResignateddate(Date resignateddate) {
        this.resignateddate = resignateddate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Wardassignment that = (Wardassignment) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;
        if (assignmentdate != null ? !assignmentdate.equals(that.assignmentdate) : that.assignmentdate != null)
            return false;
        if (resignateddate != null ? !resignateddate.equals(that.resignateddate) : that.resignateddate != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (assignmentdate != null ? assignmentdate.hashCode() : 0);
        result = 31 * result + (resignateddate != null ? resignateddate.hashCode() : 0);
        return result;
    }

    public Ward getWard() {
        return ward;
    }

    public void setWard(Ward ward) {
        this.ward = ward;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Assignmentstatus getAssignmentstatus() {
        return assignmentstatus;
    }

    public void setAssignmentstatus(Assignmentstatus assignmentstatus) {
        this.assignmentstatus = assignmentstatus;
    }
}
