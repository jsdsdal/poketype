package org.example.poketype.repositories;

import org.example.poketype.model.Pokemon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PokemonRepository extends JpaRepository<Pokemon, String> {
}
