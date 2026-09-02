package org.example.poketype.restcontroller;

import org.example.poketype.model.Pokemon;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.example.poketype.repositories.PokemonRepository;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
public class PokemonRestController {

    private final PokemonRepository pokemonRepository;
    private final Random random = new Random();

    public PokemonRestController(PokemonRepository pokemonRepository) {
        this.pokemonRepository = pokemonRepository;
    }

    @GetMapping("/pokemon/random")
    public Pokemon showRandomPokemon() {
        List<Pokemon> allPokemon = pokemonRepository.findAll();
        int randomIndex = random.nextInt(allPokemon.size());
        return allPokemon.get(randomIndex);
    }

  @GetMapping("/pokemon/{id}")
  public Pokemon getPokemon(@PathVariable String id) {
      Optional<Pokemon> pokemon = pokemonRepository.findById(id);
      return pokemon.orElse(null);
  }

}