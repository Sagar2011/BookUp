package com.bookup.booking.model

import org.springframework.stereotype.Component

@Component
enum class PaymentStatus {
    PENDING,
    SUCCESS,
    FAILED,
}