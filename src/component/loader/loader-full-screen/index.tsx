import ReactDOM from 'react-dom';
import { Loader } from '../loader-basic';
import './loader-full-screen.scss';

export function LoaderFullScreen() {
    return ReactDOM.createPortal(
        <div className='loader-full-screen'>
            <Loader color='red' height={150} width={150} />
        </div>,
        document.querySelector('body') as HTMLElement
    );
}
