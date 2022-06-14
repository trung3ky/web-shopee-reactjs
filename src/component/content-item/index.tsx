import { Link } from 'react-router-dom';
import { shortProduct } from '../../model';
import { formatPrice } from '../../util'
import { Star } from '../star';
import './content-item.scss';

export function ContentItem(props: {
    data: shortProduct, 
    showModal?: any
}) {
    const { image, id, name, sold, star } = props.data;
    const showModal = props.showModal
    const price = props.data['price-min'];

    function showModalContent() {
        if(name !== 'loading' && showModal) {
            showModal(false, id)
        }
    }

    return (
        <div className='content' 
            onClick={showModalContent}
        >
            <div className='content__link'>
                <div className='content__image'>
                    {image === 'loading' 
                    ? (
                        <div className='image__loader' />
                    ) 
                    : (
                        <img src={image} alt='product' />
                    )}
                </div>
                <div className='content__information'>
                    <Link className='content__name' 
                        to={name === 'loading' 
                            ? '#' 
                            : `/content-view?id=${id}`
                        }
                    >
                        {name === 'loading' ? 'loading...' : name}
                    </Link>
                    <Star star={star} 
                        isNumberStar={false} 
                    />
                    <div className='content__bottom'>
                        <span className='price overflow'>
                            {price === 'loading' 
                                ? 'loading...' 
                                : `${formatPrice(Number(price))}đ`
                            }
                        </span>
                        <span className='sale overflow'>
                            {sold === 'loading' 
                                ? 'loading...' 
                                : `đã bán ${sold}`
                            }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
