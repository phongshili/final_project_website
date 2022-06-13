<template>
  <div class="_container">
<div id="demo">
  <div class="w-full flex justify-center">
    <input
      placeholder="Enter Pokemon here"
      type="text"
      class="mt-10 p-2 border-blue-500 border-2"
      v-model="text"
    />
  </div>
  <input type="text" v-model="queryText">
  <button @click="queryData('pending')">Pending</button>
  <button @click="queryData(queryText)">query</button>
  <div class="mt-10 p-4 flex flex-wrap justify-center">
    <div
      class="ml-4 text-2xl text-blue-400"
      v-for="(pokemon, i) in pokemons"
      :key="i"
    >
    <p>{{ pokemon.employeeName}}</p>
                          <!-- // 👇 call function to get index -->
      <router-link :to="`/about/${getPokemonId(pokemon.employeeName)}`">
        {{ pokemon.employeeName }} - id {{ getPokemonId(pokemons.employeeName) }}
      </router-link>
    </div>
  </div>
</div>
  </div>
</template>
<script>
import { ref,reactive ,toRefs,computed} from "vue";
import Swal from "sweetalert2";
import axios from 'axios';
export default {

 setup() {
     let queryText = ref('')
    const state = reactive({
      pokemons: [],
      filteredPokemon: computed(() => updatePokemon()),
      text: "",
      urlIdLookup: {},
    });

    const fetchPokemon = () => {
      axios
        .get("http://127.0.0.1:4000/admin-api/payment-get?status="+queryText.value)
        .then((response) => {
          state.pokemons = response.data.mapPayment; // 👈 get just results
        });
    };

    fetchPokemon();
    
    const queryData=(val)=>{
 
         queryText.value = val;

         fetchPokemon();
    }
  
    // 👇 function to get index
    const getPokemonId = (item) => {
      return state.pokemons.findIndex((p) => p.employeeName === item);
    };

    function updatePokemon() {
      if (!state.text) {
        return [];
      }
      return state.pokemons.filter((pokemon) =>
        pokemon.employeeName.includes(state.text)
      );
    }
                                                        // 👇 return new function
    return { ...toRefs(state), fetchPokemon, updatePokemon, getPokemonId ,queryText,queryData };
  },
};
</script>

<style lang="scss" scoped>
._container {
  margin-left: 340px;
  color: $font-color;
}
</style>