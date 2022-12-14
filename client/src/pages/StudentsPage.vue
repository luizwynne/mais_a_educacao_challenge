<template>
    <div>

        <v-alert
            dense
            text
            type="success"
            v-if="showCreatedMessage"
        >
           {{apiResponse}}
        </v-alert>

        <h1>Alunos</h1>
        <div class="d-flex">
            <v-text-field v-model="filterValue" class="pt-5 mr-2" placeholder="Digite sua busca" outlined clearable></v-text-field>
        </div>
        
        <v-data-table
            :headers="headers"
            :items="searchStudents()"
            sort-by="name"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-dialog v-model="dialogDelete" max-width="600px">
                        <v-card>
                            <v-card-title class="text-h5 v-card-title">Tem certeza que deseja cancelar esse item?</v-card-title>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">Deletar</v-btn>
                            <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
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
            apiResponse: '',
            showCreatedMessage: false,
            headers: [
                { text: 'Nome', value: 'name' },
                { text: 'Registro academico', value: 'ra' },
                { text: 'CPF', value: 'cpf' },
                { text: 'A??oes', value: 'actions', sortable: false },
            ],
            students: [],
            students_backup: [],
            filterValue : '',
            itemIndex: -1,
            itemItemId: null
        }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      }
    },

    created(){
        this.get_students()
    },
        
    methods: {

        get_students(){
            axios.get(ENV_URL+'/api/students').then(response => {
                this.students = response.data
                this.students_backup = this.students
            }).catch(e => {
                console.log(e)
            })
        },

        searchStudents(){
            
            let result = this.students
                
            if (this.filterValue === ''){
                return result
            }
                
            const filterValue = this.filterValue.toLowerCase()
                
            let new_students = this.students.filter(student => {
                return student.name.toLowerCase().includes(filterValue) ||
                       student.ra.toLowerCase().includes(filterValue) ||
                       student.cpf.toLowerCase().includes(filterValue)
            })
                
            return new_students   
            
        },

        editItem (item) {
            this.$router.push('/editar/'+item.id)
        },

        deleteItem (item) {
            this.itemIndex = this.students.indexOf(item)
            this.itemItemId = item.id
            this.dialogDelete = true
        },

        deleteItemConfirm () {

            axios.delete(ENV_URL+'/api/students/'+this.itemItemId).then(response => {

                this.students.splice(this.itemIndex, 1)
                this.closeDelete()
                this.apiResponse = response.data.message
                this.showCreatedMessage = true

                setTimeout(() => {
                    this.showCreatedMessage = false
                    this.apiResponse = ''
                }, 5000)
            })
            
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.itemIndex = -1
            })
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.itemIndex = -1
            })
        }

    }

}

</script>

<style scoped>

    .d-flex{
        align-items: baseline;
    }
    .v-card-title{
        justify-content: center;
    }

</style>
