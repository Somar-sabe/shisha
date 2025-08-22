const HeaderMenu = [   
    {
        name: "menu.home", // Match this key to your JSON file
        url: "/",
        hasChildren: false,
    },
    {
        name: "menu.shop",
        url: "/shop",
        hasChildren: true,
        children: [
            {
                name: "menu.shisha_tobacco",
                url: "/shop?category=shisha-tobacco",
            },
            {
                name: "menu.shisha_water_pipe",
                url: "/shop?category=shisha-water-pipe",
            },
            {
                name: "menu.shisha_accessories",
                url: "/shop?category=shisha-accessories",
            }
        ]
    },
      {
        name: "menu.media",
        url: "https://www.dropbox.com/scl/fo/3ynitwi3rjq34osprt7ku/APtMMx_sxPLyIUTa8JxUVO8?rlkey=uijnl0a8sx7elq6qe9ae0c9na&e=1&st=yws9zjhq&dl=0",
        hasChildren: false,
    },
    {
        name: "menu.about",
        url: "/about",
        hasChildren: false,
    },
    {
        name: "menu.contact",
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
