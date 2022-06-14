import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../model';
import { Star } from '../star';
import { LoaderFullScreen } from '../loader/loader-full-screen';
import { formatPrice } from '../../util';
import classNames from 'classnames';
import parse from 'html-react-parser';
import './content-view.scss';

export function ContentView(props: { data: Product }) {
    const { data } = props;
    const [color, setColor] = useState();
    const [size, setSize] = useState();
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);

    
    const CategoryList: any = {
        'thời trang': {
            title: 'Thời trang'
        },
        'giày dép': {
            title: 'Giày dép'
        },
        'điện thoại': {
            title: 'Điện thoại'
        },
        'laptop': {
            title: 'Máy tính và laptop'
        },
        'đồng hồ': {
            title: 'Đồng hồ'
        },
        'khác': {
            title: 'Khác'
        },
    }; 

    useEffect(() => {
        setQuantity(1);
    }, [data.quantity])

    function handleQuantity(n: number) {
        setQuantity((prev) => {
            const newQuantity = prev + n;
            if (newQuantity > data.quantity) return data.quantity;
            if (newQuantity < 1) return 1;
            return newQuantity;
        });
    }

    function handleClickBtn() {
        setLoading(true);
    }

    useEffect(() => {
        let sto: any;
        if(loading) {
            sto = setTimeout(() => {
                setLoading(false);
            }, 1000);
        }

        return () => {
            clearTimeout(sto);
        }
    }, [loading])

    return (
        <div className='content__view'>
            <span className='menu overflow'>
                <Link to='/' className='menu__home'>Shoppe</Link>
                &nbsp;&gt;&nbsp;
                <Link to={`/content-list?page=1&category=${data.category}`}>
                    {CategoryList[data.category].title}
                </Link>
                &nbsp;&gt;&nbsp;
                <span>{data.name}</span>
            </span>
            <div className='product'>
                <div className='product__image'>
                    <img src={data.image} alt='product' />
                </div>
                <div className='product__infor'>
                    <span className='infor__name'>{data.name}</span>
                    <div className='infor__review'>
                        <Star star={data.star} />
                        <div className='number--review'>
                            <span>{data.review}</span>&nbsp;
                            <span>Đánh giá</span>
                        </div>
                        <div className='number--buy'>
                            <span>{data.sold}</span>&nbsp;
                            <span>Đã bán</span>
                        </div>
                    </div>
                    <div className='infor__price'>
                        <span className='price--min'>
                            {`${formatPrice(Number(data['price-min']))}đ`}
                        </span>
                        <span>&nbsp;-&nbsp;</span>
                        <span className='price--max'>
                            {`${formatPrice(Number(data['price-max']))}đ`}
                        </span>
                    </div>
                    <div className='infor__color'>
                        <span>{data.color?.length > 0 ? 'Màu' : ''}</span>
                        <div className='color__list'>
                            {data.color &&
                                data.color.map((item: any) => {
                                    return (
                                        <div key={item}
                                            className={classNames(
                                                'color__item',
                                                {'active': color === item}
                                            )}
                                            onClick={() => setColor(item)}
                                        >
                                            {item}
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className='infor__size'>
                        <span>{data.size?.length > 0 ? 'Size' : ''}</span>
                        <div className='size__list'>
                            {data.size &&
                                data.size.map((item: any) => {
                                    return (
                                        <div key={item}
                                            className={classNames(
                                                'size__item',
                                                {'active': size === item}
                                            )}
                                            onClick={() => setSize(item)}
                                        >
                                            {item}
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className='infor__quantity'>
                        <span>Số lượng</span>
                        <div className='input'>
                            <div>
                                <button
                                    className={classNames( {'active': quantity <= 1} )}
                                    onClick={() => handleQuantity(-1)}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <input
                                    value={quantity}
                                    type='text'
                                    role='spinbutton'
                                    max={data.quantity}
                                    readOnly
                                />
                                <button
                                    className={classNames( {'active': quantity >= data.quantity} )}
                                    onClick={() => handleQuantity(1)}
                                    disabled={quantity >= data.quantity}
                                >
                                    +
                                </button>
                            </div>
                            <span className='overflow'>{`${data.quantity} sản phẩm có sẵn`}</span>
                        </div>
                    </div>
                    <div className='infor__wraper-button'>
                        <div
                            className={classNames('button__add')}
                            onClick={handleClickBtn}
                        >
                            <i className='fas fa-cart-plus' />
                            <span>Thêm vào giỏ hàng</span>
                        </div>
                        <div
                            className={classNames('button__buy')}
                            onClick={handleClickBtn}
                        >
                            Mua ngay
                        </div>
                        {loading && <LoaderFullScreen />}
                    </div>
                </div>
            </div>
            <div className='buyer'>
                <div className='buyer__image'>
                    <img src={data['image-shop']} alt='imageShop' />
                </div>
                <div className='buyer__infor'>
                    <span className='name'>{data['name-shop']}</span>
                    <span className='active'>online 1 giờ trước</span>
                </div>
            </div>
            <div className='description'>
                <span>{parse(data.description)}</span>
            </div>
        </div>
    );
}
