package com.example.accessingdatamysql.apt;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "apt")
public class Apt {

    @NotNull
    private String email;


    private String description;

    @Column(name = "id")
    private String id;

    @Id
    @Column(name = "db_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer db_id;
   
    public Apt() {
    }

    public Apt(String email, String description, String id) {
        this.email = email;
        this.description = description;
        this.id = id;
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
