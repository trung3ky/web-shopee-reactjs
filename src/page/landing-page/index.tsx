import { Navbar, Carousel } from '../../component';

export function LandingPage() {
    const image = [
        process.env.PUBLIC_URL + '../static/media/slider1.jpg',
        process.env.PUBLIC_URL + '../static/media/slider2.jpg',
        process.env.PUBLIC_URL + '../static/media/slider3.jpg',
    ];

    return (
        <div className='landing-page'>
            <Navbar />
            <Carousel slider={image} />
        </div>
    );
}
