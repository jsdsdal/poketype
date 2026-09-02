package org.example.poketype.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PokeApiPokemonResponse {

    private String name;
    private List<PokeApiTypeSlot> types;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public List<PokeApiTypeSlot> getTypes() {
        return types;
    }
    public void setTypes(List<PokeApiTypeSlot> types) {
        this.types = types;
    }
}