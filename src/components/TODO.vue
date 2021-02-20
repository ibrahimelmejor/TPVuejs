<template>

  <div class="todo"> 
    <tr>
        <th>Titre tache</th>
        <th>Etat tache</th>
        <th>Action</th>
      </tr> 
          <td><span @dblclick = "todo.edit = true">{{todo.title}}</span>
           <input v-show = "todo.edit == true" v-model = "todo.title"
            v-on:blur= "todo.edit=false; $emit('update')"
            @keyup.enter = "todo.edit=false; $emit('update')">
          </td>
        <td>{{todo.etat}}</td>
        <td @click="onClickDelete" >Supprimer</td>

  </div>

</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import Todo from './Todo';
  @Component({})
  export default class TodoComponent extends Vue {
    @Prop() private todo!: Todo;
    disabled: boolean = true;
  toggle()
  {
    console.log('from toggle')
  }
    mounted (){
      console.log('hello from app');
    }
      onClickDelete (event: Event) {
        this.$emit('clicked', this.todo)
      }
  }

</script>

<style scoped lang="scss">
  .todo {

  }
</style>
