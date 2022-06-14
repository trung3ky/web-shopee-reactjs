import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getParamsUrl } from '../../service';
import './navbar.scss';

export function Navbar() {
    const [textInput, setTextInput] = useState<string>('')
    const history = useHistory()
    const { id } = getParamsUrl()

    function handleSearch() {
        if(textInput.trim() !== ''){
            history.push(`content-list?page=1&search=${textInput}`)
            setTextInput('')
        }
    }

    function handleChangeInput(e: any) {
        setTextInput(e.target.value)
    }

    function handleKeyUp(e: any) {
        if (e.keyCode === 13) {
            handleSearch()
        }
    }

    return (
        <div className='navbar'>
            <Link className='navbar__logo' to='/'>
                <img
                    className='logo'
                    src={process.env.PUBLIC_URL + '/static/media/logo.png'}
                    alt='logo'
                />
            </Link>
            <div className='navbar__right'>
                <div className='navbar__search'>
                    <div className='search__wrapper'>
                        <input
                            value={textInput}
                            type='text'
                            placeholder='Nhập sản phẩm cần tìm...'
                            onChange={handleChangeInput}
                            onKeyUp={handleKeyUp}
                        />
                        <div
                            className='search__button'
                            onClick={handleSearch}
                        >
                            <i className='fas fa-search' />
                        </div>
                    </div>
                    <nav>
                        <ul>
                            <Link to='/'>
                                <li className='overflow'>Home</li>
                            </Link>
                            <Link to='/content-list?page=1'>
                                <li className='overflow'>Products</li>
                            </Link>
                            <Link to={id 
                                    ? `content-view?id=${id}` 
                                    : '/content-view?id=1'
                                }
                            >
                                <li className='overflow'>Detail</li>
                            </Link>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
