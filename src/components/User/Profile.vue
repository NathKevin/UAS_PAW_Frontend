<template>
    <v-container>
        <v-toolbar>
                <h2>Profile</h2>    
                <v-spacer></v-spacer>
                <v-btn class="mr-2 blue darken-1 white--text" @click="editHandler()">Edit</v-btn>
            </v-toolbar>
            <br>
        <v-card>
            <v-card-text class="pt-4">
                <v-form v-model="valid" ref="form">
                    <v-text-field :disabled="disabled === 1"  dense label="Name" v-model="form.name" :rules="nameRules" required ></v-text-field>
                    <v-text-field :disabled="disabled === 1" dense label="No Telp" v-model="form.noTelp" :rules="noTelpRules" required></v-text-field>
                    <v-text-field :disabled="disabled === 1" dense label="Alamat" v-model="form.alamat" :rules="alamatRules" required></v-text-field>
                    <br>
                    <v-text-field :disabled="disabled === 1" dense label="Confirmation Password" v-model="password" type="password" min="8" :rules="passwordRules" counter required>
                    </v-text-field>
                    <v-layout justify-center>
                        <v-btn :disabled="disabled === 1" class="mr-2" @click="editHandler" :class="{ 'green darken-1 white--text' :valid, disabled: !valid }">SAVE</v-btn>
                        <v-btn :disabled="disabled === 1" class="mr-2" @click="editHandler" :class="{ 'white black--text' :valid, disabled: !valid }">Clear</v-btn>
                    </v-layout>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        return{
            user: '',
            disabled:1,
            valid: false,
            idEdit: '',
            form: {
                name:'',
                noTelp:'',
                alamat: '',
            },
        }
    },

    methods: {
        getUser(){
            var url = this.$api + '/user' + this.idEdit;
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.user = response.data.data;
            })
        },

        editHandler(){
            this.form.name = this.user.name;
            this.form.noTelp = this.user.noTelp;
            this.form.alamat = this.user.alamat;
            this.disabled = (this.disabled + 1) % 2
        },

        openEdit(){
            this.disabled = true;
        }
    },

    beforeMount(){
        this.idEdit = localStorage.getItem('id');
        this.getUser();
    },
};
</script>
