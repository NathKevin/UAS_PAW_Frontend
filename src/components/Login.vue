<template>
    <main>
        <v-toolbar class="yellow lighten-4">
            <h3>SUUPAMAKETO</h3>
        </v-toolbar>
        <v-img src="https://images2.alphacoders.com/108/thumb-1920-1081105.jpg" dark aspect-ratio="2.175" ></v-img>
        <v-container fluid fill-height class="posisiCard">
            <v-layout flex align-center justify-center>
                <v-flex xs12 sm4 elevation-6>
                    <v-toolbar class="orange darken-3">
                        <v-toolbar-title class="black--text">
                            <h2>Login</h2>
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card>
                        <v-card-text class="pt-4">
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
                                    <v-text-field label="Password" v-model="password" type="password" min="8" :rules="passwordRules" counter required>
                                    </v-text-field>
                                    <v-layout justify-center>
                                        <v-btn  class="mr-2" @click="submit" :class="{ 'green darken-1 white--text' :valid, disabled: !valid }">Login</v-btn>
                                    </v-layout>
                                </v-form>
                                <h5 class="posisi">Tidak punya akun?</h5>
                                <router-link to="Register">Click Here</router-link>
                            </div>
                        </v-card-text>
                    </v-card>
                    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
                </v-flex>
            </v-layout>
        </v-container>
    </main>
</template>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Dongle&family=M+PLUS+2:wght@500&display=swap');
    .grey--text{
        font-family: 'M PLUS 2', sans-serif;
    }

    .posisiCard{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }

    .posisi{
        margin-top: 20px;
    }
</style>

<script>
export default {
    name: "Login",
    data() {
        return {
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            valid: false,
            password: '',
            passwordRules: [
                (v) => !!v || 'Password tidak boleh kosong',
            ],
            email: '',
            emailRules: [
                (v) => !!v || 'E-mail tidak boleh kosong',
            ]
        };
    },

    methods: {
        submit() {
            if(this.$refs.form.validate()) {
                //cek validasi data yang terkirim
                this.load = true;
                this.$http.post(this.$api + '/login', {
                    email: this.email,
                    password: this.password
                }).then(response => {
                    //simpan data id user yang diinput
                    localStorage.setItem('id',response.data.user.id);
                    localStorage.setItem('token',response.data.access_token);
                    localStorage.setItem('name',response.data.user.name);
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = false;
                    this.clear();
                    // this.$store.commit("setAuthentication", true);
                    if(response.data.user.id === 1){
                        this.$router.push({ name: "Produk",})
                    }
                    else if(response.data.user.id !== 1){
                        this.$router.push({ name: "Home",})
                    }
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    localStorage.removeItem('token');
                    this.load = false;
                })
            }
        },
        clear() {
            this.$refs.form.reset() //clear form login
        }
    },
};
</script>