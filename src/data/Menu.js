const HeaderMenu = [
    {
        name: "Home",
        url: "/",
        hasChildren: false,
    },
    {
        name: "Shop",
        url: "/shop",
        hasChildren: true,
        children: [
            {
                name: "Shisha Tobacco",
                url: "/shop",
                filterCategory: "shisha-tobacco", // category filter value
            },
            {
                name: "Shisha / Water Pipe",
                url: "/shop",
                filterCategory: "shisha-water-pipe", // category filter value
            },
            {
                name: "Shisha Accessories",
                url: "/shop",
                filterCategory: "shisha-accessories", // category filter value
            }
        ]
    },
    {
        name: "About",
        url: "/about",
        hasChildren: false,
    },
    {
        name: "Contact",
        url: "/contact",
        hasChildren: false,
    },
];

const DashboardAsideMenu = [
    {
        icon: "fas fa-th-large",
        name: "Dashboard",
        slug: ""
    },
    {
        icon: "fas fa-shopping-basket",
        name: "Orders",
        slug: "orders"
    },
    {
        icon: "fas fa-home",
        name: "Addresses",
        slug: "addresses-edit"
    },
    {
        icon: "fas fa-user",
        name: "Account Details",
        slug: "account-details" 
    }
];

export { HeaderMenu, DashboardAsideMenu };
