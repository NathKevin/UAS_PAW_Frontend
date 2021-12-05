<template>
    
    <v-container>
        <v-row>
            <v-col >
                <v-toolbar class="yellow lighten-3" :src= imageBg>
                    <h2>Products</h2>    
                </v-toolbar>
            </v-col>
        </v-row>
        <v-row>
            <v-col sm="6" md="4" v-for="produk in produks" :key="produk.name">
                <v-card outlined>
                    <v-img :src="produk.gambar" height="200px"/>
                    <v-card-title>{{ produk.name }}</v-card-title>
                    <v-card-subtitle>Rp.{{ produk.harga }}/{{ produk.berat }}gr</v-card-subtitle>
                    <v-card-actions>
                        <v-btn @click="searchCart(produk)" color="success" outlined>
                            <v-icon small left> mdi-plus</v-icon>
                            BUY
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </v-container>

</template>

<script>
import bg from "../../assets/supamaketo.png"

export default {
    name: 'store',
    data() {
        return {
            load: false,
            snackbar: false,
            error_message: '',
            color:'',
            idUser:'',
            produk: '',
            produks: [],
            imageBg: bg,
            cartForm:{
                user_id:'',
                produk_id:'',
                qty: 0,
                harga_total:'',
                checkout:''
            },
            qty: 0,
            total: 0,
            updateCart: {
                qty: 0,
                harga_total: 0
            },
            carts: [],
            cart : [],
            addQty: 100,
        }
        
    },

    methods: {
        readProduk(){
            var url = this.$api + '/produk';
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.produks = response.data.data
            })
        },

        searchCart(produk){
            var url = this.$api + '/user_id/' + this.idUser + '/produk_id/' + produk.id + '/checkout/' + 0;
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.carts = response.data.data;
                this.cartHandler(produk);
            })
        },

        cartHandler(produk){
            if(this.carts !== null){
                this.qty = this.carts.qty;
                this.total = this.carts.harga_total;
                this.carts.qty = this.qty + 100;
                this.carts.harga_total = this.total + produk.harga;
                this.qtyUpdate(produk);
            }else{
                this.cartForm.user_id = this.idUser;
                this.cartForm.produk_id = produk.id;
                this.cartForm.qty = 100;
                this.cartForm.harga_total = (produk.harga * this.cartForm.qty)/100;
                this.cartForm.checkout = 0;
                this.addToCart();
            }
            
        },

        addToCart(){
            var url = this.$api + '/cart'
            this.load = true;
            this.$http.post(url, this.cartForm, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },

        qtyUpdate(produk){
            var url = this.$api + '/user_id/' + this.idUser + '/produk_id/' + produk.id + '/checkout/' + 0;
            this.load = true;
            this.$http.put(url, this.carts, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = "Produk added" + response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.carts = [];
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },

        
        
    },

    beforeMount(){
        this.idUser = localStorage.getItem('id');
        this.readProduk();
    },
};
</script>
