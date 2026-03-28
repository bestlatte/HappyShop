import {apiRequest} from "../../../app/api/apiClient.js";


function normalizeProduct(raw = {}){
    return {
        id: raw.id,
        title: raw.title,
        imageKey: raw.imageKey ?? raw.imageUrl ?? "",
        price: raw.price,
        salePrice: raw.salePrice,
        promoTop: raw.promoTop,
        promoTag: raw.promoTag,
        badge: raw.badge,
        category: raw.category,
    };

}

export   async  function  fetchProductsCategory ({nav , category , signal}={}){
    const payload = await  apiRequest("/product",{
        method :"get",
        query : {nav , category},
        signal,
    } )


    //後端回傳payload 然後判斷是不是陣列 不是就去看payload.item裡面的value
    const products = Array.isArray(payload)? payload : (payload.items ?? []);//未來後端應該會統一.items進行
    return products.map((item)=> normalizeProduct(item)) ;

}