import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './carousel.scss';

export function Carousel(props: { slider: any }) {
    const { slider } = props;
    const [inital, setInital] = useState<number>(0);

    function handlerClick(number: number): any {
        const length = slider.length;
        const newInital = inital + number;

        setInital((prev) => {
            if (newInital > length - 1) return 0;
            if (newInital < 0) return length - 1;
            return prev + number;
        });
    }

    function handlerClickDot(number: number) {
        setInital(number);
    }

    return (
        <div className='carousel__list'>
            {slider.map((item: any) => {
                return (
                    <div key={item}
                        className={classNames(
                            'carousel__item', 
                            {'active': item === slider[inital]}
                        )}
                    >
                        <div className='carousel__image'>
                            <img src={item} alt='slider' />
                        </div>
                        <div className='carousel__infor'>
                            <div className='title'>BEST DEAL !</div>
                            <div className='sub-title'>TOP HEADPHONE</div>
                            <div className='content'>Get up to 50% off Today Only</div>
                            <Link to='/content-list'>SHOP NOW</Link>
                        </div>
                    </div>
                );
            })}
            <div
                className='button button--prev'
                onClick={() => handlerClick(1)}
            >
                <i className='fas fa-chevron-right' />
            </div>
            <div
                className='button button--next'
                onClick={() => handlerClick(-1)}
            >
                <i className='fas fa-chevron-left' />
            </div>
            <div className='dot__list'>
                {slider.map((item: any, index: number) => {
                    return (
                        <div key={item}
                            className={classNames(
                                'dot__item', 
                                {'active': item === slider[inital]}
                            )}
                            onClick={() => handlerClickDot(index)}
                        />
                    );
                })}
            </div>
        </div>
    );
}
