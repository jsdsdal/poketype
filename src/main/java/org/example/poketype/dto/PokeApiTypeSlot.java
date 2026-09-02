package org.example.poketype.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PokeApiTypeSlot {

    private PokeApiType type;

    public PokeApiType getType() {
        return type;
    }
    public void setType(PokeApiType type) {
        this.type = type;
    }
}