package com.example.accessingdatamysql.list;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "listing")
public class Listing {

    @NotNull
    private String email;


    private String description;

    @Column(name = "id")
    private String id;

    public String getDb_id() {
        return db_id;
    }

    public void setDb_id(String db_id) {
        this.db_id = db_id;
    }

    public Integer getPeople() {
        return people;
    }

    public void setPeople(Integer people) {
        this.people = people;
    }

    public Integer getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(Integer bathrooms) {
        this.bathrooms = bathrooms;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Listing(String email, String description, String id, String db_id, Integer people, Integer bathrooms, Double price) {
        this.email = email;
        this.description = description;
        this.id = id;
        this.db_id = db_id;
        this.people = people;
        this.bathrooms = bathrooms;
        this.price = price;
    }

    @Id
    @Column(name = "db_id")
    private String db_id;
   
    @Column(name = "people")
    private Integer people;

    @Column(name = "bathrooms")
    private Integer bathrooms;

    @Column(name = "price")
    private Double price;

    public enum pets
    {
        YES,
        SERVICE,
        NO
    }

    public enum sex
    {
        MALE,
        FEMALE,
        EITHER
    }




    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
