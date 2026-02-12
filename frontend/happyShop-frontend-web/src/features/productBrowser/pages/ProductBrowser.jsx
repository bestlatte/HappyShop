import ProductGrid from "../components/ProductGrid.jsx";
import {mockProducts} from "../../product/data/mockProducts.js";
import ProductBrowserSection from "../sections/ProductBrowserSection.jsx";
import {useOutletContext} from "react-router-dom";



export default function ProductBrowser() {

    const {active, setActive} = useOutletContext();

    return (

        <ProductBrowserSection active={active} setActive={setActive}></ProductBrowserSection>



    )




}