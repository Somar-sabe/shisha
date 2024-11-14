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
                name: "Shisha Tobaco",
                url: "/shop?category=shisha-topaco", // Pass filterCategory in the URL
            },
            {
                name: "Shisha / Water Pipe",
                url: "/shop?category=shisha-water-pipe",
            },
            {
                name: "Shisha Accessories",
                url: "/shop?category=shisha-accssesores",
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
