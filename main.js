function generate_deeplink() {
    let deepLink = "dailyobjects://deeplink/";

    const url = window.location.pathname;
    const url_segments = url.split('/');

    const first_segment = url_segments[1];

    switch (first_segment) {
        case "":
            deepLink += "home";
            break;
        case "cart":
            deepLink += "cart";
            break;
        case "search":
            deepLink += "search?q=" + url_segments[2];
            break;
        default:
            if (document.getElementsByClassName("pdp-container").length >= 1)
                deepLink += "productDetails?productSlug=" + url_segments[1];
            else if (document.getElementsByClassName("products-wrapper").length >= 1)
                deepLink += "listing?categorySlug=" + url_segments[1] + "&brandSlug=" + url_segments[2] + "&modelSlug=" + url_segments[3];
            else 
                deepLink = "NULL";
            break;
    }

    const header_row_div = document.getElementsByClassName("header-row")[0];
    const node = document.createElement("p");
    const deeplink_text_node = document.createTextNode(deepLink);
    header_row_div.style.color = "white";
    node.appendChild(deeplink_text_node);
    const child_count = header_row_div.childElementCount;
    if (child_count >= 3)
        header_row_div.lastChild.replaceWith(node);
    else
        header_row_div.append(node);
    
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {        
            if (request.message === 'hello!') {
                    generate_deeplink();
            }
    });
