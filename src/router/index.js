import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/auth/Login.vue";
import ForgotPassword from "../views/auth/forgotpassword.vue";
import ResetPassword from "../views/auth/ResetPassword.vue";
import SignUpPage from "../views/auth/SignUp.vue";
import CreatePasswordPage from "../views/auth/CreatePassword.vue";
import Dashboard from "../views/dashboard/Dashboard.vue";
import ServiceRequest from "../views/service-requests/ServiceRequest.vue";
import PrivateLayout from "@/components/PrivateLayout.vue";
import { requireAuth } from "@/utils/auth";
import Applications from "@/views/tenancy-applications/Applications.vue";
import Tenants from "@/views/tenants/Tenants.vue";
import Payments from "@/views/payments/PaymentsDue.vue";
import nprogress from "nprogress";
import AddProperties from "@/views/properties/AddProperties.vue";
import ViewProperties from "@/views/properties/ViewProperties.vue";
import LeaseManagement from "@/views/tenants/LeaseManagement.vue";
import Landlord from "@/views/users/Landlord.vue";
import Admin from "@/views/users/Admin.vue";
import RegisterAdmin from "@/views/users/RegisterAdmin.vue";
import AddRoles from "@/views/roles/AddRoles.vue";
import ViewRoles from "@/views/roles/ViewRoles.vue";
import { useUserStore } from "@/store";
import EditLandlord from "@/views/users/EditLandlord.vue";
import EditAdmin from "@/views/users/EditAdmin.vue";
import PendingLease from "@/views/tenants/PendingLease.vue";
import Property from "@/views/properties/Property.vue";
import Amenities from "@/views/amenities/Amenities.vue";
import RentPayment from "../views/payments/RentPayment.vue";
import UtilityPayment from "../views/payments/UtilityPayment.vue";
import Details from "../views/tenancy-applications/Details.vue";
import Verification from "@/views/properties/Verification.vue";
import SetUpProperties from "@/views/properties/SetUpProperties.vue";
import Audit from "@/views/Logs/Audit.vue";
import Otp from "@/views/auth/otp.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "login",
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/otp",
      name: "otp",
      component: () => Otp,
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPassword,
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: CreatePasswordPage,
    },
    {
      path: "/reset-forgot-password/:userId/:token",
      name: "reset-forgot-password",
      component: ResetPassword,
    },
    {
      path: "/create-password/:userId/:token",
      name: "create-password",
      component: CreatePasswordPage,
    },
    {
      path: "/register",
      name: "register",
      component: SignUpPage,
    },
    {
      path: "/app",
      name: "10ants-admin",
      component: PrivateLayout,
      beforeEnter: requireAuth,
      children: [
        {
          path: "/dashboard",
          name: "admin-dashboard",
          component: Dashboard,
        },
        {
          path: "/service-requests",
          name: "service-requests",
          component: ServiceRequest,
        },
        {
          path: "/amenities",
          name: "amenities",
          component: Amenities,
        },
        {
          path: "/applications",
          name: "admin-applications",
          component: Applications,
        },
        {
          path: "/property/verification",
          name: "property-verification",
          component: Verification,
        },
        {
          path: "/applications/:id",
          name: "details",
          component: Details,
        },
        {
          path: "/properties",
          name: "admin-properties",
          component: ViewProperties,
        },
        {
          path: "/properties",
          name: "setup-properties",
          component: SetUpProperties,
        },
        {
          path: "/properties/:id",
          name: "admin-property",
          component: Property,
        },
        {
          path: "/properties/add/:id?",
          name: "add-admin-properties",
          component: AddProperties,
        },
        {
          path: "/tenants",
          name: "admin-tenants",
          component: Tenants,
        },
        {
          path: "/tenants/lease",
          name: "admin-tenants-lease",
          component: LeaseManagement,
        },
        {
          path: "/tenants/lease/pending",
          name: "admin-pending-lease",
          component: PendingLease,
        },
        {
          path: "/payments/due",
          name: "admin-payments-due",
          component: Payments,
        },
        {
          path: "/payments/rent",
          name: "admin-payments-rent",
          component: RentPayment,
        },
        {
          path: "/payments/utility",
          name: "admin-payments-utility",
          component: UtilityPayment,
        },
        {
          path: "/payments/deposit",
          name: "admin-payments-deposit",
          component: Payments,
        },
        {
          path: "/payments/maintenance",
          name: "admin-payments-maintenance",
          component: Payments,
        },
        {
          path: "/users/landlord",
          name: "admin-users-landlord",
          component: Landlord,
        },
        {
          path: "/users/landlord/edit",
          name: "edit-users-landlord",
          component: EditLandlord,
        },
        {
          path: "/users/admin",
          name: "admin-users-admin",
          component: Admin,
        },
        {
          path: "/users/admin/edit",
          name: "edit-users-admin",
          component: EditAdmin,
        },
        {
          path: "/users/register",
          name: "admin-users-register",
          component: RegisterAdmin,
        },
        {
          path: "/users/roles",
          name: "admin-users-roles",
          component: ViewRoles,
        },
        {
          path: "/users/roles/add",
          name: "admin-users-add-roles",
          component: AddRoles,
        },
        {
          path: "/notification",
          name: "admin-users-notification",
          component: Dashboard,
        },
        {
          path: "/audit-logs",
          name: "audit-logs",
          component: Audit,
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

router.beforeEach((to) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const store = useUserStore();

  if (to.meta.requiresAuth && !store.isLoggedIn) return "/";
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    nprogress.start();
  }
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  nprogress.done();
});

export default router;
