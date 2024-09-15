package com.example.accessingdatamysql.list;


import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ListingRepository extends CrudRepository<Listing, Integer> {

}
