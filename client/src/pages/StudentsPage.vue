<template>
    <div>
        <h1>Alunos</h1>
        <div class="d-flex">
            <v-text-field class="pt-5 mr-2" placeholder="Digite sua busca" outlined clearable></v-text-field>
            <v-btn dark x-large color="primary">Pesquisar</v-btn>
        </div>
        
        <v-data-table
            :headers="headers"
            :items="students"
            sort-by="name"
            class="elevation-1"
        >
            <template v-slot:top>

            <v-toolbar flat>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                

                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">Tem certeza que deseja cancelar esse item?</v-card-title>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">Salvar</v-btn>
                        <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
            </template>
            
        </v-data-table>

    </div>
</template>

<script>

import { ENV_URL } from '../env'
import axios from 'axios';

export default {

    data(){
        return{
            dialog: false,
            dialogDelete: false,
            loading: false,
            headers: [
                { text: 'Nome', value: 'name' },
                { text: 'Registro academico', value: 'ra' },
                { text: 'CPF', value: 'cpf' },
                { text: 'Açoes', value: 'actions', sortable: false },
            ],
            students: [],
            editedIndex: -1,
            editedItem: {
                id: 0,
                name: '',
                ra: '',
                cpf: ''
            },
            defaultItem: {
                id: 0,
                name: '',
                ra: '',
                cpf: ''
            },
        }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Cadastrar aluno' : 'Editar aluno'
      },
    },

    created(){
        this.get_students()
    },
        
    methods: {

        get_students(){
            axios.get(ENV_URL+'/api/students').then(response => {
                this.students = response.data
            }).catch(e => {
                console.log(e)
            })
        },

        editItem (item) {
            this.editedIndex = this.students.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.students.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.students.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        save () {
            if (this.editedIndex > -1) {
            Object.assign(this.students[this.editedIndex], this.editedItem)
            } else {
            this.students.push(this.editedItem)
            }
            this.close()
        }

    }

}

</script>

<style scoped>
    .d-flex{
        align-items: baseline;
    }
</style>
