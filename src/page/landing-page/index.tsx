import { Navbar, Carousel } from '../../component';

export function LandingPage() {
    const image = [
        '../static/media/slider1.jpg',
        '../static/media/slider2.jpg',
        '../static/media/slider3.jpg',
    ];

    return (
        <div className='landing-page'>
            <Navbar />
            <Carousel slider={image} />
        </div>
    );
}
