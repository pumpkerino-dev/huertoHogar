package com.huertohogar.backend.dto;

import java.util.List;

public record OrdenRequest(List<Item> items, String fechaEntrega, boolean simularFallo) {

    public record Item(String codigo, Integer cantidad) {
    }
}
