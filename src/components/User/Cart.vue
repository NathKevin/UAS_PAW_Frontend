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
                    <v-list-item disabled dense>
                        <v-col cols="3">
                            Gambar
                        </v-col>
                        <v-col cols="2">
                            Nama Produk
                        </v-col>
                        <v-col cols="4">
                            Jumlah Beli (gr)
                        </v-col>
                        <v-col >
                            Harga Total
                        </v-col>
                        <v-col >
                            Action
                        </v-col>
                    </v-list-item>
                </v-row>
                <v-divider></v-divider>
                <br>
                <v-card-title v-if="empty == true" class="justify-center">
                    Cart Empty
                </v-card-title>
                <v-row>
                    <v-list-item  v-for="cart in carts" :key="cart.produk_id" >
                        <v-col>
                            <div class="subheading pt-4">
                                <v-img :src='getGambar(cart)' height="150px" width="150px" max-width="150px" />
                            </div>
                        </v-col>
                            <v-col>
                                {{ getNamaProduk(cart) }}
                            </v-col>
                            <v-col>
                                {{ cart.qty }} gr
                            </v-col>
                            <v-col>
                                Rp.{{ cart.harga_total }}
                            </v-col>
                            <v-col cols="1">
                                <v-list-item-action>
                                    <v-row>
                                        <v-btn small @click="minusHandler(cart)" icon class="red lighten-3"> <v-icon>mdi-minus</v-icon> </v-btn>
                                        <v-btn small @click="plusHandler(cart)" icon class="green lighten-3"><v-icon>mdi-plus</v-icon></v-btn>
                                    </v-row>
                                    <br>
                                    <br>
                                    <br>
                                    <v-btn small color="red darken-1" text @click="deleteHandler(cart)" icon> <v-icon>mdi-delete</v-icon>DELETE </v-btn>
                                </v-list-item-action>
                            </v-col>
                    </v-list-item>
                </v-row>
                <br>
            </v-list-item-group>

        </v-list>

        <v-toolbar>
            <strong>
                <h2>Harga Total :</h2>
            </strong>
            <v-spacer></v-spacer>
            <strong>
                <h2>Rp.{{ hargaTotal }}</h2>
            </strong>
        </v-toolbar>

    </v-container>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>

    <v-container>
      <v-btn :disabled="disabled === 1" color="success" larger style="float: right;" @click="checkoutHandler()">Go to payment</v-btn>
    </v-container>

    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-toolbar class="yellow darken-3">
            <span class="headline">Checkout Form</span>
        </v-toolbar>
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-select
                            v-model="form.paymentMethod"
                            :items="paymentItems"
                            label="Metode Pembayaran"
                            solo
                        ></v-select>
                        <v-select
                            v-model="form.mitra"
                            v-if="callMitra()"
                            :items="paymentPartner"
                            label="Mitra pembayaran"
                            solo
                        ></v-select>
                        <v-text-field
                            v-model="form.address"
                            label="Alamat kirim"
                            required
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="form.phone"
                            label="No Telepon"
                            required
                        >
                        </v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="cancelCheckout()"> Cancel </v-btn>
                    <v-btn color="green darken-1" text @click="checkout()"> Confirm Payment </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
  </v-container>
</template>

<script>
import bg from "../../assets/supamaketo.png"

  export default {
    name: 'Cart',
    data() {
      return {
        empty:true,
        disabled: 1,
        debitCard: false,
        dialog: false,
        valid: true,
        load: false,
        snackbar: false,
        error_message: '',
        color: '',
        imageBg: bg,
        carts: [],
        produks: [],
        userId:'',
        cartUpdate: [],
        qty:'',
        total:'',
        harga:'',
        messageUpdate:'',
        deleteId:'',
        form: {
            paymentMethod:null,
            address: null,
            phone: null,
            mitra: null,
        },
        paymentItems: [
            {
                text: "Debit"
            },
            {
                text: "Cash"
            }
        ],
        paymentPartner: [
            {
                text: "BCA"
            },
            {
                text: "BNI"
            },
            {
                text: "BRI"
            }
        ]
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
                if(this.carts !== null){
                    this.disabled = 0;
                    this.empty = false;
                }else{
                    this.disabled = 1;
                    this.empty = true;
                }
                
            })
        },

        getGambar(cart){
            let temp;

            for(let i = 0; i < this.produks.length; i++){
                if(this.produks[i].id === cart.produk_id)
                    temp = this.produks[i].gambar; 
            }
            
            return temp;
        },

        getNamaProduk(cart){
            let temp;

            for(let i = 0; i < this.produks.length; i++){
                if(this.produks[i].id === cart.produk_id)
                    temp = this.produks[i].name; 
            }
            
            return temp;
        },

        plusHandler(cart){
            this.cartUpdate = cart;
            this.harga = (this.cartUpdate.harga_total / this.cartUpdate.qty)*100;
            console.log(this.harga);
            this.qty = this.cartUpdate.qty;
            this.total = this.cartUpdate.harga_total;
            this.messageUpdate = "Produk Added ";
            this.cartUpdate.qty = this.qty + 100;
            this.cartUpdate.harga_total = this.total + this.harga;
            this.updateItemCart(cart);
        },

        minusHandler(cart){
            this.cartUpdate = cart;
            if(this.cartUpdate.qty !== 100){
                this.harga = (this.cartUpdate.harga_total / this.cartUpdate.qty)*100;
                this.qty = this.cartUpdate.qty;
                this.total = this.cartUpdate.harga_total;
                this.messageUpdate = "Produk Reduced ";
                this.cartUpdate.qty = this.qty - 100;
                this.cartUpdate.harga_total = this.total - this.harga;
                this.updateItemCart(cart);
            }else{
                this.error_message = "Minimun quantity, please delete item";
                this.color = 'yellow darken-4'
                this.snackbar= true;
            }
        },

        updateItemCart(cart){
            var url = this.$api + '/user_id/' + this.userId + '/produk_id/' + cart.produk_id + '/checkout/' + 0;
            this.load = true;
            this.$http.put(url, this.cartUpdate, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = this.messageUpdate + response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.cartUpdate = [];
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },

        getHargaTotal(){
            let temp;
            this.harga_total = '';
             for(let i = 0; i < this.carts.length; i++){
                temp = this.harga_total;
                this.harga_total = parseInt(temp + this.carts[i].harga_total);
            }
        },

        deleteData() {
            //menghapus data
            var url = this.$api + '/cart/destroy/' + this.deleteId;
            this.load = true;
            this.$http.delete(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.readDataCart();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },

        deleteHandler(cart){
            this.deleteId = cart.id;
            this.deleteData();
        },

        checkoutHandler(){
            this.dialog = true;
        },

        cancelCheckout(){
            this.form.paymentMethod = null,
            this.form.address = null,
            this.form.phone = null,
            this.form.mitra = null,
            this.dialog = false;
        },

        
        callMitra(){
            if( this.form.paymentMethod === "Debit"){
                return true;
            }else{
                this.form.mitra = "none";
                return false;
            }
        },

        checkout(){
            if(this.form.address === null || this.form.phone === null || this.form.paymentMethod === null || this.form.mitra === null){
                this.error_message = "Data belum lengkap"
                this.color = "yellow darken-2"
                this.snackbar = true;
            }else{
                this.pay();
            }
        },

        pay(){
            for(let i=0; i< this.carts.length; i++){
                this.carts[i].checkout = 1;
                var url = this.$api + '/user_id/' + this.userId + '/checkout/' + 0;
                this.load = true;
                this.$http.put(url, this.carts[i], {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = true;
                    this.cancelCheckout();
                    this.carts = [];
                    this.readDataCart();
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            }
        }

    },

    beforeMount(){
        this.userId = localStorage.getItem('id');
        this.readDataProduk();
        this.readDataCart();
    },

    computed:{
        hargaTotal(){
            let temp;
            let totalTemp = 0;

            if(this.carts !== null){
                for(let i = 0; i < this.carts.length; i++){
                   temp = totalTemp;
                   totalTemp = parseInt(temp + this.carts[i].harga_total);
               }
            }
            return totalTemp;
        },
    }
  }
</script>

<style>
</style>