function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }

async function generate_deeplink() {
    let deepLink = "dailyobjects://deeplink/";

    const url = window.location.pathname;
    const url_segments = url.split('/');
    const first_segment = url_segments[1];
    const third_segment = url_segments[3];
    const title = "DailyObjects";

    switch (first_segment) {
        case "":
            deepLink += "home";
            break;
        case "cart":
            deepLink += "cart";
            break;
        case "designer-cases":
            deepLink += "listing?categorySlug=" + first_segment;
            break;
        case "search":
            deepLink += "search?q=" + url_segments[2];
            break;
        case "sleeves":
            deepLink += "genericPage?title=DailyObjects&forwardingQuery=?categorySlug=bags-and-sleeves%26deviceSlug=laptop";
            break;
        case "wallets":
            deepLink += "genericPage?title=DailyObjects&forwardingQuery=?categorySlug=bags-and-sleeves%26deviceSlug=wallet";
            break;        
        default:        
            await sleep(2000);                                  
            if (document.getElementsByClassName("pdp-container").length >= 1)
                deepLink += "productDetails?productSlug=" + url_segments[1];
            else if (document.getElementsByClassName("products-wrapper").length >= 1)
                deepLink += "listing?categorySlug=" + url_segments[1] + "&brandSlug=" + url_segments[2] + "&modelSlug=" + url_segments[3];            
            else if (document.getElementsByClassName("case-collection-intermediate-page").length >= 1)
                deepLink += "genericPage?title=" + title + "&forwardingQuery=?categorySlug=" + "designer-cases" + "%26brandSlug=" + url_segments[2] + "%26modelSlug=" + url_segments[3];        
            else if (url_segments[3]=="eyewear-case")
                deepLink += "genericPage?title=" + title + "&forwardingQuery=?categorySlug=travel%26deviceSlug=eyewear";
            else if (url_segments[3]=="notebooks")
                deepLink += "genericPage?title=" + title + "&forwardingQuery=?categorySlug=stationery%26deviceSlug=notebook";
            else if (url_segments[3]=="airpods-case-cover")
                deepLink += "genericPage?title=" + title + "&forwardingQuery=?categorySlug=" + "mobile-accessories" + "%26modelSlug=" + url_segments[3];
            else if (document.getElementsByClassName("intermediate-page-container").length >= 1 )          
                deepLink += "genericPage?title=" + title + "&forwardingQuery=?categorySlug=" + "bags-and-sleeves" + "%26brandSlug=" + url_segments[2] + "%26modelSlug=" + url_segments[3];                
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