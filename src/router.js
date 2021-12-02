import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path) {
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes: [
        //Login
        {
            path: '/login',
            name: 'Login',
            meta: { title: 'Login' },
            component: importComponent("Login"),
        },
        //Register
        {
            path: '/register',
            name: 'Register',
            meta: { title: 'Register' },
            component: importComponent("Register"),
        },

        //Admin
        {
            path: "/admin",
            name: "Admin",
            component: importComponent("Admin/DashboardLayoutAdmin"),
            children: [
                //Produk
                {
                    path: "/produk",
                    name: "Produk",
                    meta: {title: 'Produk'},
                    component: importComponent("Admin/Produk"),
                },
                //Karyawan
                {
                    path: "/karyawan",
                    name: "Karyawan",
                    meta: {title: 'Karyawan'},
                    component: importComponent("Admin/Karyawan"),
                },
            ],
        },

        //User
        {
            path: "/",
            name: "User",
            component: importComponent("User/DashboardLayoutUser"),
            children:[
                //Home
                {
                    path: "/home",
                    name: "Home",
                    meta: {title: 'Home'},
                    component: importComponent("User/Home"),
                },
                //StorePage
                {
                    path: "/store",
                    name: "Store",
                    meta: {title: 'Store'},
                    component: importComponent("User/Store"),
                },
                //Profile
                {
                    path: "/profile",
                    name: "Profile",
                    meta: {title: 'Profile'},
                    component: importComponent("User/Profile"),
                },
                //Cart
                {
                    path: "/cart",
                    name: "Cart",
                    meta: {title: 'Cart'},
                    component: importComponent("User/Cart"),
                },
            ],
        },

        {
            path: '/',
            redirect: '/login'
        },
    ],
});

//Set Judul & Router pertama kali web dibuka
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    if(to.name !== 'Login' && localStorage.getItem("token")===null && to.name !== 'Register'){
        next({ name: 'Login'});
    }else next();
});

// router.beforeEnter((to, from, next) => {
//     document.title = to.meta.title;
//     if(to.name !== 'Login' && localStorage.getItem("token")===null && to.name !== 'Register'){
//         next({ name: 'Login'});
//     }else next();
// });

export default router;