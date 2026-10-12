import BrandIntro from "./brandIntro.jsx";
import ChefSection from "./chefSection.jsx";
import Doctor from "./doctor.jsx";
import GradeSelector from "./gradeSelector.jsx";
import Hero from "./hero.jsx";
import Navbar from "./navbar.jsx";
import ProductSection from "./productSection.jsx";
import WhyBest from "./whyBest.jsx";
import WorldBestCardamom from "./worldBestCardmon.jsx";
import OriginShagun from "./originShagun.jsx";
import Recipe from "./recipe.jsx";
import Newsletter from "./newsLetter.jsx";
import Journey from "./journey.jsx";
import Footer from "./footer.jsx";

const Home = () => {
    return (
        <>
            <Navbar />
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
            <Footer/>
        </>
    );
};

export default Home;