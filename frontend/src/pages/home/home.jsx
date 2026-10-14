import BrandIntro from "../../components/home/brandIntro.jsx";
import ChefSection from "../../components/home/chefSection.jsx";
import Doctor from "../../components/home/doctor.jsx";
import GradeSelector from "../../components/home/gradeSelector.jsx";
import Hero from "../../components/home/hero.jsx";
import ProductSection from "../../components/home/productSection.jsx";
import WhyBest from "../../components/home/whyBest.jsx";
import WorldBestCardamom from "../../components/home/worldBestCardamom.jsx";
import OriginShagun from "../../components/home/originShagun.jsx";
import Recipe from "../../components/home/recipe.jsx";
import Newsletter from "../../components/home/newsLetter.jsx";
import Journey from "../../components/home/journey.jsx";

const Home = () => {
    return (
        <>   
            <Hero/>
            <BrandIntro/>
            <ProductSection/>
            <ChefSection/>
            <GradeSelector/>
            <WorldBestCardamom/>
            <WhyBest/>
            <Doctor/>
            <OriginShagun/>
            <Recipe/>
            <Journey/>
            <Newsletter/>
        </>
    );
};

export default Home;