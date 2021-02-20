<template>
  <div class="home">
    <p v-if="visible">Maintenant vous me voyez {{message}}</p>
    <button v-on:click="foo()">
      ok
    </button>
    <TodosComponent></TodosComponent>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodosComponent from '../components/todos.vue';
@Component({
  components: {
   TodosComponent
  },
})
export default class Home extends Vue {

    message= 'test';
    visible = true;
    foo(){
      this.visible = !this.visible;
    }
}
</script>