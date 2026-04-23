import Header from '../components/layout/Header';
import Hero from '../components/home/Hero';
import Pilares from '../components/home/Pilares';
import Suscripciones from "../components/home/Suscripciones";
import Productos from "../components/home/Productos";
import Resenas from "../components/home/Resenas";
import Footer from '../components/layout/Footer';

const Home = () => {
    return (
        // Contenedor principal de la página
        <div className="relative min-h-screen bg-black">
            <Header />

            <main>
                <Hero />
                <Pilares/>
                <Suscripciones/>
                <Productos/>
                <Resenas/>
            </main>

            <Footer />
        </div>
    );
};

export default Home;