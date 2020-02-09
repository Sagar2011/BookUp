package com.bookup.booking.service;

import com.bookup.booking.model.Payment;
import com.bookup.booking.repo.PayRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class PaymentService {

    @Autowired
    private PayRepo payRepo;


    public boolean paymentPost(Payment payment){
        try{
            payRepo.save(payment);
            return true;
        }catch (Exception ex){
            System.out.println("error");
            return false;
        }
    }

    public ArrayList<Payment> getPayments(){
        return (ArrayList<Payment>) payRepo.findAll();
    }


}
