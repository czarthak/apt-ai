package com.example.accessingdatamysql.list;

import org.springframework.stereotype.Repository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CustomListingRepository {
    @Autowired
    private EntityManager entityManager;

    @Transactional
    public Object createListing(Map<String, Object> json)
    {
        // Extract parameters from the JSON map
        Integer people;
        if (json.get("people") instanceof Integer)
            people = (Integer) json.get("people");
        else {
            people = Integer.parseInt((String)json.get("people"));
        }
        Integer bathrooms;
        if (json.get("bathrooms") instanceof Integer)
            bathrooms = (Integer) json.get("bathrooms");
        else {
            bathrooms = Integer.parseInt((String)json.get("bathrooms"));
        }
        Double price;
        if (json.get("price") instanceof Double)
            price = (Double) json.get("price");
        else {
            price = Double.parseDouble((String)json.get("price"));
        }
        String email = (String) json.get("email");
        String description = (String) json.get("description");
        String id = (String) json.get("id");
        String pets = (String) json.get("pets");
        String sex = (String) json.get("sex");
        // Use native SQL query with EntityManager to create a new listing
        String nativeQuery = "INSERT INTO listing (email, description, people, bathrooms, price, pets, sex, id) " +
                "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter(1, email)
                .setParameter(2, description)
                .setParameter(3, people)
                .setParameter(4, bathrooms)
                .setParameter(5, price)
                .setParameter(6, pets)
                .setParameter(7, sex)
                .setParameter(8, id);
        int updatedRows = query.executeUpdate();
        return updatedRows > 0;
    }

    @Transactional
    public Object getListing(Integer dbId)
    {
        try
        {
            String nativeQuery = "SELECT L.email, L.description, L.pets, L.sex, L.price, L.id, L.people, L.bathrooms FROM listing L WHERE L.dbId = :dbId";
            Query query = entityManager.createNativeQuery(nativeQuery)
                    .setParameter("dbId", dbId);
            return query.getSingleResult();
        }
        catch (Exception e)
        {
            return "Listing Not Found";
        }
    }


    @Transactional
    public Object updateListing(Map<String, Object> json)
    {
        // Extract parameters from the JSON map
        Integer people;
        if (json.get("people") instanceof Integer)
            people = (Integer) json.get("people");
        else {
            people = Integer.parseInt((String)json.get("people"));
        }
        Integer dbId;
        if (json.get("dbId") instanceof Integer)
            dbId = (Integer) json.get("dbId");
        else {
            dbId = Integer.parseInt((String)json.get("dbId"));
        }
        Integer bathrooms;
        if (json.get("bathrooms") instanceof Integer)
            bathrooms = (Integer) json.get("bathrooms");
        else {
            bathrooms = Integer.parseInt((String)json.get("bathrooms"));
        }
        Double price;
        if (json.get("price") instanceof Double)
            price = (Double) json.get("price");
        else {
            price = Double.parseDouble((String)json.get("price"));
        }
        String email = (String) json.get("email");
        String description = (String) json.get("description");
        String id = (String) json.get("id");
        String pets = (String) json.get("pets");
        String sex = (String) json.get("sex");
        // Use native SQL query with EntityManager to update the listing
        String nativeQuery = "UPDATE listing SET email = ?1, description = ?2, people = ?3, bathrooms = ?4, price = ?5, pets = ?6, sex = ?7, id =?8 WHERE dbId = ?9";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter(1, email)
                .setParameter(2, description)
                .setParameter(3, people)
                .setParameter(4, bathrooms)
                .setParameter(5, price)
                .setParameter(6, pets)
                .setParameter(7, sex)
                .setParameter(8, id)
                .setParameter(9, dbId);
        int updatedRows = query.executeUpdate();
        return updatedRows > 0;
    }

    @Transactional
    public Object deleteListing(Map<String, Object> json)
    {

        Integer dbId;
        if (json.get("dbId") instanceof Integer)
            dbId = (Integer) json.get("dbId");
        else {
            dbId = Integer.parseInt((String)json.get("dbId"));
        }
        String email = (String) json.get("email");
        // Use native SQL query with EntityManager to update the listing
        String nativeQuery = "DELETE FROM listing L WHERE L.email = ?1 AND L.dbId = ?2";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter(1, email)
                .setParameter(2, dbId);
        int updatedRows = query.executeUpdate();
        return updatedRows > 0;
    }

}
