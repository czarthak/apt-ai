package com.example.accessingdatamysql;


import org.springframework.beans.factory.annotation.Value;

public class Address {
    @Value("${custom.ip}")
    public static String address;
}
