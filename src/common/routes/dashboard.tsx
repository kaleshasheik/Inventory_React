// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Home from "@material-ui/icons/Home";
import Devices from "@material-ui/icons/Devices"
import QuestionAnswer from '@material-ui/icons/QuestionAnswer'

export const managerDashboardRoutes = [
  
  {
    path: "/userDashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    
  },
  {
    path: "/requestInventory",
    sidebarName: "Request Inventory",
    navbarName: "Request Inventory",
    icon: LibraryBooks,
    
  },

  {  path: "/user",
    sidebarName: "Users",
    navbarName: "Users ",
    icon: Person,
   
  },
  {
    path: "/requests",
    sidebarName: "Requests",
    navbarName: "Requests",
    icon: QuestionAnswer,
    
  },
 
  
  
  { redirect: true, path: "/", to: "/", navbarName: "Redirect" }
];


export const dashboardRoutes = [
  
  {
    path: "/userDashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    
  },
  {
    path: "/requestInventory",
    sidebarName: "Request Inventory",
    navbarName: "Request Inventory",
    icon: LibraryBooks,
    
  },

   
  
  { redirect: true, path: "/", to: "/", navbarName: "Redirect" }
];


export const adminDashboardRoutes = [
  
  {
    path: "/userDashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    
  },

  {
    path: "/inventory",
    sidebarName: "Inventory",
    navbarName: "Inventory",
    icon: Devices,
    
  },
  {
    path: "/requests",
    sidebarName: "Requests",
    navbarName: "Requests",
    icon: QuestionAnswer,
    
  },
  
  
  { redirect: true, path: "/", to: "/", navbarName: "Redirect" }
];

export const homeRoutes = [
  
  {
    path: "/",
    sidebarName: "Home",
    navbarName: "Home",
    icon: Home,
    
  },
  
  { redirect: true, path: "/", to: "/", navbarName: "Redirect" }
];
