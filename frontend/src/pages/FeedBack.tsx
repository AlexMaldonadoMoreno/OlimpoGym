import Header from '../components/layout/Header';
import Hero from '../components/Feedback/Hero';
import Forms from '../components/Feedback/Forms';
import Footer from '../components/layout/Footer';

const Home = () => {
    return (
        <div className="relative min-h-screen bg-black">
            <Header />

            <main>
                <Hero />
                <Forms />
            </main>

            <Footer />
        </div>
    );
};

export default Home;