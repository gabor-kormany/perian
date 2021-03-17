<template>
  <div>
    <div class="q-pa-md row">
      <q-select
        filled
        v-model="selectedCharacters"
        label="Select character(s)"
        use-input
        use-chips
        multiple
        input-debounce="0"
        @filter="typeAhead"
        :options="options"
      />
      <q-btn icon="search" color="primary" @click="search()" :disabled="isLoading"/>
    </div>
    <div v-if="results.length" class="q-pa-md">
      List of matching episodes
      <ul>
        <li v-for="result in results" :key="result">
          {{ result }}
        </li>
      </ul>
    </div>
    <div v-else class="q-pa-md">
      No episodes matches the criteria 😭😭
    </div>
  </div>
</template>

<script>
import {breakingBad, characters} from '../services/breakingBad'
import {ref, reactive} from 'vue'

export default {
  name: 'App',
  setup() {
    let results = reactive([]),
        selectedCharacters = ref([])
    ;

    const options = ref(characters),
          isLoading = ref(false)
    ;

    async function search() {
      isLoading.value = true;
      let data = await breakingBad(selectedCharacters.value);

      results.splice.apply(results, [0, results.length].concat(data));
      isLoading.value = false;
    }

    function typeAhead(val, update) {
      update(() => {
        if (val === '') {
          options.value = characters;
          return;
        }

        options.value = characters.filter((character) => {
          return character.toLowerCase().search(val.toLowerCase()) !== -1;
        })
      })
    }

    return {results, search, options, selectedCharacters, typeAhead}
  }
}
</script>

<style>
</style>
