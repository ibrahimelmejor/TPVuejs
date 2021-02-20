<template>
  <div class="todos">
    <table class = "center" border = "1px solid black"> 
    
      
      <tr v-bind:key = "todo.key" v-for = "todo in todosCopy">    
          <TodoComponent :todo="todo" @clicked="onClickChild"></TodoComponent> 
      </tr>

      <tr>
        <td colspan = "3">
          <select v-model="selectTodo" @change="onChange()" >
            <option>All</option>
            <option>Suspendu</option>
            <option>A faire</option>
            <option>En cours</option>
            <option>Fait</option>

          </select>
        </td>
      </tr>
      <tr><td @click="deleteAllFinishedTodos" colspan = "3">Supprimer toutes les taches faites</td></tr>
      <tr><td @click="deleteAllTodos" colspan = "3">Supprimer toutes les taches</td></tr>
    </table>
      <input required type = "text" v-model = "nouvelleTache.title">
      <button v-on:click = "ajouterTache">Créer la tache</button>
      <footer>
        <span v-if="countTodo>=1">
           Nombre de taches à faire: {{countTodo}}
        </span>
      </footer>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Todo from './Todo';
  import TodoComponent from './TODO.vue';
  import { etat } from './enum';
  @Component({
      components: {
   TodoComponent
  },
  })
  export default class TodosComponent extends Vue {
    countTodo: number = 0;
    selectTodo: string = "All";
    todos: Todo[] = [
                    new Todo(0, "todo0", etat.AFaire, false), 
                    new Todo(1, "todo1", etat.Fait, false),
                    new Todo(2, "todo2", etat.AFaire, false),
                    new Todo(3, "todo3", etat.Fait, false),
                    new Todo(4, "todo4", etat.AFaire, false),
                    new Todo(5, "todo5", etat.Fait, false),
                    new Todo(6, "todo6", etat.EnCours, false),
                    new Todo(7, "todo7", etat.EnCours, false),
                    new Todo(8, "todo8", etat.Fait, false),
                    new Todo(9, "todo9", etat.EnCours, false),
                    new Todo(10, "todo10", etat.AFaire, false),
                    ];
    todosCopy: Todo[] = this.todos;       
    key: number = this.todos[this.todos.length-1].key + 1;
    nouvelleTache: Todo = new Todo(this.key, "", etat.AFaire, false);
     
    mounted (){
      console.log('hello from app');
      this.countTodoStates();
    }
    countTodoStates()
    {  
      this.todosCopy.forEach((todo: Todo) => {
        if(todo.etat == etat.AFaire)
          this.countTodo += 1;
      });
      return this.countTodo;
    }
    onClickChild (value: Todo) {
      const index = this.todosCopy.indexOf(value);
      if (index > -1) {
        this.todosCopy.splice(index, 1);
        if(value.etat == etat.AFaire)
        {
          this.countTodo--;
        }
      }
    }
    onChange()
    {
      if(this.selectTodo == "All")
      {
        this.todosCopy = this.todos;
      }
      else if(this.selectTodo == "Suspendu")
      {
        this.todosCopy = this.todos.filter(todo => todo.etat == etat.Suspendu);
      }
      else if(this.selectTodo == "A faire")
      {
        this.todosCopy = this.todos.filter(todo => todo.etat == etat.AFaire);
      }
      else if(this.selectTodo == "En cours")
      {
        this.todosCopy = this.todos.filter(todo => todo.etat == etat.EnCours);
      }
      else
      {
        this.todosCopy = this.todos.filter(todo => todo.etat == etat.Fait);
      }
    }
    deleteAllTodos()
    {
      this.todosCopy = [];
      this.countTodo = 0;
    }
    deleteAllFinishedTodos()
    {
      this.todosCopy = this.todosCopy.filter(todo => todo.etat != etat.Fait);
    }
    ajouterTache()
    {
      this.todos.push(new Todo(this.key, this.nouvelleTache.title, this.nouvelleTache.etat, this.nouvelleTache.edit));
      this.todosCopy = this.todos;
      if(this.nouvelleTache.etat == etat.AFaire)
      {
        this.countTodo +=1;
      }
    }
  }
</script>

<style scoped lang="scss">
  .todos {

  }
  .center {
  margin-left: auto;
  margin-right: auto;
}
</style>
