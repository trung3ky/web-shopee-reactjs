import { Link } from 'react-router-dom';
import './not-found-page.scss';

export function NotFoundPage() {
    return (
        <div className='not-found-page'>
            <div className='not-found__infor'>
                <h1>404</h1>
                <span className='infor__title'>Sorry, Page Not Found</span>
                <span className='infor__sub-title'>The page you requested could not be found</span>
                <Link to='/'>
                    <button>GO BACK HOME</button>
                </Link>
            </div>
        </div>
    );
}
