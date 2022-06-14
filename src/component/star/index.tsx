import classNames from 'classnames';
import './star.scss';

export function Star(props: { 
    star: number; 
    isNumberStar?: boolean 
}) {
    const { star, isNumberStar = true } = props;
    
    function handleNumberStar(numberStar: number) {
        const arr = [1, 2, 3, 4, 5];
        const newArr = arr.map((val) => {
            if (val <= Math.round(numberStar)) {
                return <i key={val} className='fas fa-star active' />;
            } else {
                return <i key={val} className='fas fa-star' />;
            }
        });
        
        return newArr;
    }

    return (
        <div className='number-star'>
            {isNumberStar && <span>{star}</span>}
            <div className={classNames( {'star-sm': !isNumberStar} )}>
                {handleNumberStar(star)}
            </div>
        </div>
    );
}
