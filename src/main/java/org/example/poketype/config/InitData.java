package org.example.poketype.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.example.poketype.repositories.PokemonRepository;
import org.example.poketype.service.PokeApiService;

@Component
public class InitData implements CommandLineRunner {

    private final PokemonRepository pokemonRepository;
    private PokeApiService pokeApiService;

    public InitData(PokemonRepository pokemonRepository, PokeApiService pokeApiService) {
        this.pokemonRepository = pokemonRepository;
        this.pokeApiService = pokeApiService;
    }

    @Override
    public void run(String... args) {
        if (pokemonRepository.count() > 0) return; // undgå at seede igen ved hver opstart

        for (int id = 1; id <= 151; id++) {
            pokeApiService.fetchAndSavePokemon(id);        }
    }
}
