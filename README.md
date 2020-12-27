# vue-pokedex

a simple pokedex to consult the first generation of pokemon's

<!---
http://dontpad.com/vuejs/pokerafa
refactoring code

*componenting*

---------------- App.vue => consuming/fetching data from PokeAPI

----- Pokemon.vue  #renaming to PokeCard.vue => getting with props the data from App.vue, wich has the most features to mount pokemon card
----- SearchList.vue => getting the pokemon.name array to make a search an return just the available cards
----- PokeDetail.vue => create a page view for pokemons details. probably consuming with props from pokemon.vue

*doing*

--- reorganize Pokemon.vue and App.vue using axios to get pokeAPI data.
--- call the needed information on PokeCard and SearchList
--- create a method to:
	- find matches with the pokemon and id searched
	- showing card results to screen

*main troubles*

--- pass data to SearchList without repeating the template
--- fully understand props and work betther with
--- mounting filtered cards

--->
