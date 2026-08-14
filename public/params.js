// Get which page the user wants from the URL
var queryString = window.location.search;
var urlParams = new URLSearchParams( queryString );
var page = urlParams.get( "page" );
var pageid = urlParams.get( "id" );
var pageContent = null;

// Delcare some safe pages
var safePages = [
    "home",
    "mountainsquartet"
];

// If the page the user wants isn't a safe one, just load the home page
// ...Or you can disable it! >:3

/*if( safePages.indexOf( page ) == -1 )
{
    page = "home";
}*/

if (page != null && page.match("^[a-z0-9]*$") == null) { //Important safety guard if you're not gonna use "safe pages," since it'll help prevent people from sending stupids into an http request link.
    //I, uh, don't actually know how helpful this is, but. I hope it does its job good enough.
    page = "not_found";
}

if (pageid != null) { //Allows for convenient file naming and organisation for certain pages.
    if (pageid.match("^[0-9]*$") == null) {
        pageid = null;
        page = "not_found";
    } else {
        if (page == "projects") {
            page = "projects/" + pageid;
        } else if (page == "hobbies") {
            page = "hobbies/" + pageid;
        } else if (page == "posts") {
            page = "posts/" + pageid;
        } else { //Joke page. I know, how funny.
            pageContent = `<h1>Alright, here's your id&colon;</h1>
            <p style="text-align: center;">` + pageid + `</p>`;
        }
    }
}

if (page == "navigation") {//Generate navigation page from index.html
    var request = new XMLHttpRequest();
    request.open( "GET", "/index.html", false);
    request.send( null );
    pageContent = request.responseText.split("<aside id=\"divas\">").pop().split("</aside>").shift();
} else if (page == "index") { //prevents recursive loading of index. The FireFox console called it speculative parsing, idk why.
    pageContent = "<p>bro wtf don't do that &colon;sob&colon;</p>";
}

if (pageContent == null && page == null) {//if no page or pageid is provided in the link and pageContent is empty.
    page = "home";
}

// Load the page and write it to the HTML
function writePageContent() {
    // Load the page

    if (pageContent == null) { //load html file and copy it into pageContent, assuming that pageContent is null (this only exists so I can make one singular joke.)
        var request = new XMLHttpRequest();
        request.open( "GET", "/" + page + ".html", false);
        request.send( null );
        if (request.status == 404) { //grab the 404 page if page fails to load.
            request.open( "GET", "/not_found.html", false);
            request.send( null );
        }
        pageContent = request.responseText.split("</head>").pop();
    }

    // Write the page to the HTML
    document.write( pageContent );
}
