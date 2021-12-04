<template>
    <div class="dashboard">
        
        <v-toolbar class="yellow lighten-4" >
            <v-toolbar-title> <h4 class="mr-4">SUUPAMAKETO</h4> </v-toolbar-title>
            
            <v-toolbar-items>
                <v-btn text router :to="{name: 'Home'}"> Home</v-btn>
            </v-toolbar-items>
            <v-toolbar-items>
                <v-btn text router :to="{name: 'Profile'}" class="yellow lighten-3"> Profile</v-btn>
            </v-toolbar-items>
            <v-toolbar-items>
                <v-btn text router  :to="{name: 'Store'}">Store</v-btn>
            </v-toolbar-items>
            
            <v-spacer></v-spacer>

            <v-toolbar-items> 
                <v-btn flat :to="{name: 'Cart'}" class="orange lighted-2">
                  <v-icon>mdi-cart</v-icon>   
                </v-btn>
            </v-toolbar-items>
            <v-toolbar-items>
                <v-btn text router @click="logout"> <v-icon>mdi-power</v-icon> </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <div class="fullheight pa-5">
            <router-view></router-view>
        </div>
        <v-footer
            dark
            padless
        >
            <v-card
            class="flex"
            flat
            tile
            >
            <v-card-title class="yellow darken-2">
                <strong class="subheading">Get connected with us on social networks!</strong>

                <v-spacer></v-spacer>

                <v-btn
                v-for="icon in icons"
                :key="icon"
                class="mx-4"
                dark
                icon
                >
                <v-icon size="24px">
                    {{ icon }}
                </v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text class="py-2 white--text text-center">
                {{ new Date().getFullYear() }} — <strong>SUUPAMAKETO</strong>
            </v-card-text>
            </v-card>
        </v-footer>
    </div>

    
</template>

<script>
export default {
    name: "Dashboard",
    data() {
        return{
            drawer: false, 
            items: [
                {title: "Home", to: "/home"},
                {title: "Store", to: "/store"},
                {title: "Profile", to: "/profile"},
                {title: "Cart", to: "/cart"},
            ],
            icons: [
                'mdi-facebook',
                'mdi-twitter',
                'mdi-linkedin',
                'mdi-instagram',
            ],
        };
    },

    methods: {
        logout(){
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            this.$router.push({
                name: 'Login',
            });
        }
    }
};
</script>

<style>
.fullheight{
    min-height: 100vh !important;
}

.router{
    text-decoration: none;
    color: black;
}
</style>

