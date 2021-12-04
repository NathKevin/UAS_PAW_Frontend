<template>
  <v-container>
    <v-toolbar class="yellow lighten-3" :src= imageBg>
        <h2>Cart</h2>    
    </v-toolbar>
    <br>
    <v-container>
        <v-list three-line elevation="10" dense>
            <v-list-item-group>
                <v-row>
                    <v-list-item disabled>
                        <v-card-text>
                            Gambar
                        </v-card-text>
                        <v-card-text>
                            Nama Produk
                        </v-card-text>
                        <v-card-text>
                            Jumlah Beli (gr)
                        </v-card-text>
                        <v-card-text>
                            Harga Total
                        </v-card-text>
                        <v-card-text>
                            Action
                        </v-card-text>
                    </v-list-item>
                </v-row>
                <v-divider></v-divider>
                <br>
                <v-row>
                    <v-list-item  v-for="cart in carts" :key="cart.produk_id" >
                        <v-img :src='getGambar(cart)' height="100px" width="100px" />
                        <v-card-text>
                            {{ getNamaProduk() }}
                        </v-card-text>
                        <v-card-text>
                            {{ cart.qty }} gr
                        </v-card-text>
                        <v-card-text>
                            {{ cart.harga_total }}
                        </v-card-text>
                        <v-cart-action>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialogConfirm = false" icon> <v-icon>mdi-delete</v-icon> </v-btn>
                        </v-cart-action>
                    </v-list-item>
                </v-row>
                <br>
            </v-list-item-group>

        </v-list>

    </v-container>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>

    <v-container>
      <v-btn color="success" larger style="float: right;">Go to payment</v-btn>
    </v-container>
  </v-container>
</template>

<script>
import bg from "../../assets/supamaketo.png"

  export default {
    name: 'Cart',
    data() {
      return {
        valid: true,
        load: false,
        snackbar: false,
        error_message: '',
        color: '',
        imageBg: bg,
        carts: [],
        produks: [],
        userId:'',
      }
    },

    methods: {
        readDataProduk(){
            var url = this.$api + '/produk';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.produks = response.data.data;
            })
        },

        readDataCart(){
            var url = this.$api + '/user_id/' + this.userId + '/checkout/' + 0;
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.carts = response.data.data;
            })
        },

        getGambar(cart){
            let temp;

            for(let i = 0; i < this.produks.length; i++){
                console.log(cart.produk_id);
                if(this.produks[i].id === cart.produk_id)
                    temp = this.produks[i].gambar; 
            }
            
            return temp;
        },

        getNamaProduk(){
            
        }
    },

    beforeMount(){
        this.userId = localStorage.getItem('id');
        this.readDataProduk();
        this.readDataCart();
    }
  }
</script>

<style>
</style>