import { useRef } from 'react';
import classNames from 'classnames';
import './pagination.scss';

function createArrayNumberPage(arr: number) {
    const newArr = [];

    for (let i = 1; i <= arr; i++) {
        newArr.push(i);
    }

    return newArr;
}

export function Pagination(props: { 
    panigation: any; 
    handlePageChange: any 
}) {
    const { panigation, handlePageChange } = props;
    const { _page, _limit, _totalRows } = panigation;
    const positionPage = useRef(1);
    const totalPage = Math.ceil(_totalRows / _limit);
    const numberPageList = createArrayNumberPage(totalPage);

    function handleClickButton(newPage: any): any {
        if (handlePageChange) {
            if (newPage > totalPage) {
                positionPage.current = totalPage;
                handlePageChange(totalPage);
            }
            if (newPage < 1) {
                positionPage.current = 1;
                handlePageChange(1);
            }
            if (newPage <= totalPage && newPage > 0) {
                positionPage.current = newPage;
                handlePageChange(newPage);
            }
        }
    }

    function handleClickNumber(number: number) {
        handleClickButton(number);
    }

    return (
        <div className='pagination'>
            <button
                className={classNames(
                    'pagination__btn--prev', 
                    {'active': Number(_page) <= 1}
                )}
                disabled={Number(_page) <= 1}
                onClick={() => handleClickButton(Number(_page) - 3)}
            >
                <i className='fas fa-angle-double-left' />
            </button>
            <button
                className={classNames(
                    'pagination__btn--prev', 
                    {'active': Number(_page) <= 1}
                )}
                disabled={Number(_page) <= 1}
                onClick={() => handleClickButton(Number(_page) - 1)}
            >
                <i className='fas fa-chevron-left' />
            </button>
            {numberPageList.map((number) => {
                if (number === Number(_page)) {
                    return (
                        <div key={number}
                            className={classNames(
                                'pagination__number', 
                                {'active': number === Number(_page)}
                            )}
                            onClick={() => handleClickNumber(number)}
                        >
                            {number}
                        </div>
                    );
                }
                if (number === totalPage || 
                    (number === 1 && Number(_page) === totalPage)
                ) {
                    return (
                        <div key={number}
                            className='pagination__number'
                            onClick={() => handleClickNumber(number)}
                        >
                            {number}
                        </div>
                    );
                }
                if ((number === Number(_page) + 1 ||
                    (number === totalPage - 2 && Number(_page) > totalPage - 2)) &&
                    numberPageList.length > 3
                ) {
                    return (
                        <div key={number}
                            className='pagination__number pagination__dot'
                        >
                            ...
                        </div>
                    );
                }
                if(numberPageList.length < 4) {
                    return (
                        <div key={number}
                            className='pagination__number'
                            onClick={() => handleClickNumber(number)}
                        >
                            {number}
                        </div>
                    );
                }
                return '';
            })}
            <button
                className={classNames(
                    'pagination__btn--next', 
                    {'active': Number(_page) >= totalPage}
                )}
                disabled={Number(_page) >= totalPage}
                onClick={() => handleClickButton(Number(_page) + 1)}
            >
                <i className='fas fa-chevron-right' />
            </button>
            <button
                className={classNames(
                    'pagination__btn--next', 
                    {'active': Number(_page) >= totalPage}
                )}
                disabled={Number(_page) >= totalPage}
                onClick={() => handleClickButton(Number(_page) + 3)}
            >
                <i className='fas fa-angle-double-right' />
            </button>
        </div>
    );
}
