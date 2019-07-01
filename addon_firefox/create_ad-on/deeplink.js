function myFun()
{    
        var link;
        const metas= document.getElementsByTagName('meta')
        for (let i = 0; i < metas.length; i++) {
                if (metas[i].getAttribute('property') === 'og:url') {
                   link = (metas[i].getAttribute('content'));
                }
        }
        var url = new URL(link);                      
        var result = url.pathname;
        arr = result.split('/');
        var deepLink;

        if(arr[1]=="")
        deepLink="dailyobjects://deeplink"
        
        else if(document.getElementsByClassName("pdp-container").length>=1)
        deepLink="dailyobjects://deeplink/productDetails?productSlug=" + arr[1];

        else if(document.getElementsByClassName("products-wrapper").length>=1)
        deepLink="dailyobjects://deeplink/listing?categorySlug=" + arr[1] +"&brandSlug=" + arr[2] + "&modelSlug=" + arr[3];
        // deepLink_listing = dailyobjects://deeplink/listing?categorySlug=designer-cases&brandSlug=apple&modelSlug=iphone-x&title=iPhone+X&filters=[{\"filterType\":\"filterJson\",\"filterKey\":\"subProducts.buildOptions.ca seType\",\"filterValue\":\"designer-glass\"}]

        else if(arr[1]=='cart')
        deepLink="dailyobjects://deeplink/cart";             

        else if(arr[1]=="search")
        deepLink="dailyobjects://deeplink/search?q=" + arr[2];

        else
        deepLink="NULL";
        // div = document.getElementsByClassName("header-row")[0];

        var div = document.getElementsByClassName("header-row")[0];
        var node = document.createElement("P");
        if (div.childElementCount === 3) 
                div.removeChild(div.lastChild);     
        var t = document.createTextNode(deepLink);
        node.appendChild(t);
        div.appendChild(node);
              
        

}
document.addEventListener("click", function(){ myFun() });