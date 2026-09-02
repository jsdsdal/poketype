package org.example.poketype.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Pokemon {

    @Id
    @Column(length = 3)
    private String pokedex;
    private String name;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private List<Type> type;

    public String getPokedex() {
        return pokedex;
    }
    public void setPokedex(String pokedex) {
        this.pokedex = pokedex;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public List<Type> getType() {
        return type;
    }
    public void setType(List<Type> type) {
        this.type = type;
    }

    @Transient
    public String getSpriteUrl() {
        return "https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/dream-world/"
                + pokedex + ".svg";
    }

}
