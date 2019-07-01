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
            break;
    }

    const header_row_div = document.getElementsByClassName("header-row")[0];
    const node = document.createElement("p");
    const deeplink_text_node = document.createTextNode(deepLink);
    node.appendChild(deeplink_text_node);

    const child_count = header_row_div.childElementCount;
    if (child_count >= 3)
        header_row_div.lastChild.replaceWith(node);
    else
        header_row_div.append(node);
}

document.addEventListener("click", function () {
    generate_deeplink()
});