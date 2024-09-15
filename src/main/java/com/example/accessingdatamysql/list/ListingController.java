package com.example.accessingdatamysql.list;

import com.example.accessingdatamysql.User;
import com.example.accessingdatamysql.auth.AuthController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController // This means that this class is a Controller
@RequestMapping(path="/listing") // This means URL's start with /demo (after Application path)
public class ListingController {
    
    @Autowired
    private ListingRepository ListingRepository;

    @Autowired
    private CustomListingRepository customListingRepository;
    @PostMapping(path="/user/add")
    public @ResponseBody Map<String, Object> addUserApt(@RequestBody Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("jwt"))
        {
            response.put("result", "failed = bad request");
        }
        AuthController au = new AuthController();
        Map<String, String> res = au.verify(json); // if the jwt token could not be verified
        if (res.containsKey("login") && res.get("login").equals("failed"))
        {
            response.put("result", "failed = bad token");
            return response;
        }
        try
        {
            // customListingRepository.createListing(json);
            response.put("data", customListingRepository.createListing(json));
            response.put("result", "success");
        }
        catch (Exception e)
        {
            System.out.println("Likely tried saving duplicate listing id Exception: " + e);
            response.put("result", "failure");
        }
        return response;
    }

    @PostMapping(path="/onelisting")
    public @ResponseBody Map<String, Object> getItemToken(@RequestBody Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("dbId"))
        {
            response.put("result", "failure - bad request");
            return response;
        }
        response.put("result", "success");
        response.put("data", ListingRepository.findById((Integer.parseInt((String)json.get("dbId")))));
//        response.put("data", customListingRepository.getListing((Integer.parseInt((String)json.get("dbId")))));
        return response;
    }

    @PostMapping(path="/onelisting/modify")
    public @ResponseBody Map<String, Object> updateListing(@RequestBody Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("dbId"))
        {
            response.put("result", "failure - bad request");
            return response;
        }
        try
        {
            customListingRepository.updateListing(json);
            response.put("result", "success");
        }
        catch (Exception e)
        {
            System.out.println("Something went wrong, Exception: " + e);
            response.put("result", "failure");
        }
        return response;
    }

    @PostMapping(path="/onelisting/delete")
    public @ResponseBody Map<String, Object> deleteListing(@RequestBody Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("jwt"))
        {
            response.put("result", "failed = bad request");
        }
        AuthController au = new AuthController();
        Map<String, String> res = au.verify(json); // if the jwt token could not be verified
        if (res.containsKey("login") && res.get("login").equals("failed"))
        {
            response.put("result", "failed = bad token");
            return response;
        }
        try
        {
            customListingRepository.deleteListing(json);
            response.put("result", "success");
        }
        catch (Exception e)
        {
            System.out.println("Could not delete, probably cause it does not exist or you aren't the owner Exception: " + e);
            response.put("result", "failure");
        }
        return response;
    }

    @PostMapping(path="/all")
    public @ResponseBody Map<String, Object> getItems()
    {
        Map<String, Object> response = new HashMap<>();
        try
        {
            response.put("data", customListingRepository.getAllListings());
            response.put("result", "success");
        }
        catch (Exception e)
        {
            System.out.println("Could not get everything, maybe the table is empty Exception: " + e);
            response.put("result", "failure");
        }
        return response;
    }

    @PostMapping(path="/user/all")
    public @ResponseBody Map<String, Object> getItems(@RequestBody Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("email"))
        {
            response.put("result", "failure - bad request");
            return response;
        }
        try
        {
            response.put("data", customListingRepository.getAllUserListings((String) json.get("email")));
            response.put("result", "success");
        }
        catch (Exception e)
        {
            System.out.println("Could not get entries, maybe cause email not found? Exception: " + e);
            response.put("result", "failure");
        }
        return response;
    }

}
