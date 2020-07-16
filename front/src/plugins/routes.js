import Register from "../views/Register";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import Home from "../views/Home";

const routes = [
    { path: '/register', component: Register, name: 'register' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/dashboard', component: Dashboard, name: 'dashboard' },
    { path: '/', component: Home, name: 'home' },
];

export default routes;