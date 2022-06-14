import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { getParamsUrl } from '../../service';
import classNames from 'classnames';
import './sidebar.scss';

export function SideBar() {
    const history = useHistory()
    const categoryList = [
        {
            src: process.env.PUBLIC_URL + '../static/media/fashion.png',
            title: 'Thời trang',
            category: 'thời trang'
        },
        {
            src: process.env.PUBLIC_URL + '../static/media/shoe.png',
            title: 'Giày dép',
            category: 'giày dép'
        },
        {
            src: process.env.PUBLIC_URL + '../static/media/phone.png',
            title: 'Điện thoại',
            category: 'điện thoại'
        },
        {
            src: process.env.PUBLIC_URL + '../static/media/laptop.png',
            title: 'Máy tính và laptop',
            category: 'laptop'
        },
        {
            src: process.env.PUBLIC_URL + '../static/media/watch.png',
            title: 'Đồng hồ',
            category: 'đồng hồ'
        },
        {
            src: 'https://www.svgimages.com/svg-image/s9/settings-icon-vector-256x256.png',
            title: 'khác',
            category: 'khác'
        },
    ];
    const { category } = getParamsUrl()

    function handleClickCategory(category: string) {
        history.push(`content-list?page=1&category=${category}`)
    }

    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <Link className='header__logo' to='/'>
                    <img
                        className='logo'
                        src='../static/media/logo.png'
                        alt='logo'
                    />
                </Link>
            </div>
            <div className='sidebar__category'>
                <h1>Danh mục sản phẩm</h1>
                <ul className='category__list'>
                    {categoryList.map((item) => {
                        return (
                            <div key={item.title}
                                className={classNames(
                                    'category__link', 
                                    {'active': category === item.category}
                                )}
                                onClick={() => handleClickCategory(item.category)}
                            >
                                <li>
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                    />
                                    <span className='overflow'>{item.title}</span>
                                </li>
                            </div>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
