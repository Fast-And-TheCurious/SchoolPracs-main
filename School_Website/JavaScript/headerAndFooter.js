function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return null;
  }

// Function to render header based on login status
function renderHeader() {
    // Check if user is logged in
    const userID = getCookie("userID");

    // Menu items based on login status
    const menuItems = [
        { label: "Home", link: "index.html" },
        { label: "About", link: '#about' },
        { label: "Courses", link: "course.html" },
        { label: "Blog", link: "blog.html" },
        { label: "Contact", link: "help.html" }
    ];

    if (userID) {
        // User logged in
        menuItems.push(
            { label: "Profile", link: "profileMe.html" }
        );
    } else {
        // User not logged in
        menuItems.push(
            { label: "Login", link: "login.html" }
        );
    }

    // Add to header data
    const headerData = {
        siteName: "MathGeniusMinds",
        homeLink: "index.html",
        menuItems: menuItems
    };
    // Compile and render the header template
    const headerTemplateSource = document.getElementById('header-template').innerHTML;
    const headerTemplate = Handlebars.compile(headerTemplateSource);
    const headerHtml = headerTemplate(headerData);

    // Insert header HTML into the DOM
    document.getElementById('header-container').innerHTML = headerHtml;
}
// Render the header after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', renderHeader);

/* Footer */

const footerData = {
    contactHeading: "Contact Us",
    columns: [
        {
            title: "Company",
            links: [
                { label: "About Us", url: "#" },
                { label: "Our Services", url: "#" }
            ]
        },
        {
            title: "Get Help",
            links: [
                { label: "FAQ", url: "#" },
                { label: "Get in Touch", url: "#" }
            ]
        },
        {
            title: "Our Blogs",
            links: [
                { label: "Blogs", url: "blogs.html" }
            ]
        }
    ],
    socialHeading: "Follow Us",
    socialIcons: [
        { iconClass: "fab fa-youtube", url: "#" },
        { iconClass: "fab fa-whatsapp", url: "#" }
    ]
};

const footerTemplateSource = document.getElementById('footer-template').innerHTML;
const footerTemplate = Handlebars.compile(footerTemplateSource);

const footerHtml = footerTemplate(footerData);
document.getElementById('footer-container').innerHTML = footerHtml;
