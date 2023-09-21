const headerData = {
    siteName: "MathGeniusMinds",
    homeLink: "index.html",
    menuItems: [
        { label: "Home", link: "index.html" },
        { label: "About", link: "about.html" },
        { label: "Courses", link: "course.html" },
        { label: "Blog", link: "blog.html" },
        { label: "Contact", link: "contact.html" },
        { label: "Login", link: "login.html" }
    ]
};

const headerTemplateSource = document.getElementById('header-template').innerHTML;
const headerTemplate = Handlebars.compile(headerTemplateSource);

const headerHtml = headerTemplate(headerData);
document.getElementById('header-container').innerHTML = headerHtml;

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
