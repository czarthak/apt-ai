package com.example.accessingdatamysql.list;

import org.springframework.stereotype.Repository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Repository
public class CustomListingRepository {
    @Autowired
    private EntityManager entityManager;

    @Transactional
    public Map<String, Object> createListing(Map<String, Object> json) {
        // Extract parameters from the JSON map
        Integer people;
        if (json.get("people") instanceof Integer)
            people = (Integer) json.get("people");
        else {
            people = Integer.parseInt((String) json.get("people"));
        }
        Integer bathrooms;
        if (json.get("bathrooms") instanceof Integer)
            bathrooms = (Integer) json.get("bathrooms");
        else {
            bathrooms = Integer.parseInt((String) json.get("bathrooms"));
        }
        Double price;
        if (json.get("price") instanceof Double)
            price = (Double) json.get("price");
        else {
            price = Double.parseDouble((String) json.get("price"));
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
        query.executeUpdate();

        // Retrieve the primary key of the last inserted row
        Query lastInsertIdQuery = entityManager.createNativeQuery("SELECT LAST_INSERT_ID()");
        Integer newDbId = ((Number) lastInsertIdQuery.getSingleResult()).intValue();

        // Fetch the newly created listing
        Query fetchQuery = entityManager.createNativeQuery("SELECT email, description, people, bathrooms, price, pets, sex, id, dbid FROM listing WHERE dbid = ?1")
                .setParameter(1, newDbId);
        Object[] result = (Object[]) fetchQuery.getSingleResult();

        // Map the result to a Map<String, Object>
        Map<String, Object> listing = new HashMap<>();
        listing.put("email", result[0]);
        listing.put("description", result[1]);
        listing.put("people", result[2]);
        listing.put("bathrooms", result[3]);
        listing.put("price", result[4]);
        listing.put("pets", result[5]);
        listing.put("sex", result[6]);
        listing.put("id", result[7]);
        listing.put("dbid", result[8]);

        return listing;
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

    @Transactional
    public List<Object[]> getAllListings()
    {
        String nativeQuery = "SELECT * FROM listing";
        Query query = entityManager.createNativeQuery(nativeQuery);
        @SuppressWarnings("unchecked")
        List<Object[]> resultList = query.getResultList();
        return resultList;
    }

}
