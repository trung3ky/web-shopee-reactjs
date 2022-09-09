import { Link } from 'react-router-dom';
import './modal.scss';

export function Modal(props : {
    hanldeHide: any, 
    title: any, 
    id?: any, 
    children: React.ReactNode
    className?: string
}) {
    const { hanldeHide, title, id, children, className} = props;
    
    function closeModal(e: any) {
        if (hanldeHide) {
            hanldeHide(true);
        }
    }

    return (
        <div className='modal' onClick={closeModal}>
            <div className={`modal__box ${className}`}
                onClick={(e) => {e.stopPropagation()}}
            >
                <div className='modal__header'>
                    <span>{title}</span>
                    <i className='fas fa-times' 
                        onClick={closeModal} 
                    />
                </div>
                <div className='modal__body'>
                    {children}
                </div>
                {id && (
                    <div className='modal__footer'>
                        <Link className='footer__btn' 
                            to={`content-view?id=${id}`}
                        >
                            Xem chi tiết
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
