import { useEffect, useState } from 'react';
import { PaginationModel } from '../../model';
import { useAppDispatch, useAppSelector, productList } from '../../state';
import {
    Navbar,
    SideBar,
    ContentItem,
    Pagination,
    Modal,
    Form,
    ContentView,
    Loader
} from '../../component';
import { getParamsUrl } from '../../service';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import './content-list-page.scss';

function showUiNoData(limit: number) {
    const load = [];

    for (let i = 0; i < limit; i++) {
        const data = {
            id: i, 
            image: 'loading', 
            star: 5, 
            name: 'loading', 
            'price-min': 
            'loading', 
            sold: 'loading' 
        }

        load.push(
            <ContentItem key={i}
                data={data}
            />
        );
    }

    return load;
}

export function ContentListPage() {
    const history = useHistory()
    const location = useLocation()
    const [loader, setLoader] = useState(true);
    const [idling, setIdling] = useState(true);
    const [error, setError] = useState<any>(undefined);
    const [panigation, setPanigation] = useState<PaginationModel>({
        _limit: 12,
        _page: 1,
        _totalRows: 0,
    });
    const [filter, setFilter] = useState<{ _limit: number; _page: number; name_like: any, category_like: any }>({
        _limit: 12,
        name_like: '',
        category_like: '',
        _page: 1,
    });
    const [hideModalForm, setHideModalForm] = useState(true);
    const [hideModalContent, setHideModalContent] = useState(true);
    const [idModalContent, setIdModalContent] = useState<number>(1)

    // get state from redux
    const state: any = useAppSelector((state) => state.productList);
    const dispatch = useAppDispatch();
    let { page = 1, search = '', category = '' } = getParamsUrl()
    let dataProductList: any = [];

    // get product item từ state theo itemIdData
    state.listIdData && state.listIdData.map((itemId: any) => {
        dataProductList.push(state.listData[itemId]);
        return ''
    });

    useEffect(() => {
        if(category !== '') {
            setFilter(prev => ({
                ...prev,
                _page: page,
                name_like: '',
                category_like: category,
            }))
        }else if(search !== '') {
            setFilter(prev => ({
                ...prev,
                _page: page,
                category_like: '',
                name_like: search
            }))
        }else {
            setFilter(prev => ({
                ...prev,
                _page: page,
                category_like: '',
                name_like: ''
            }))
        }

        setPanigation(prev => ({
            ...prev,
            _page: page,
            _totalRows: state.totalProduct
        }))
    }, [state, page, history, panigation._limit, search, location, category])
    
    useEffect(() => {
        let relevant = true;
        let promise: any
        const paramString = queryString.stringify(filter);

        setLoader(true);
        promise = dispatch(productList(paramString));
        promise.then(()=> {
            if (relevant) {
                setError(undefined);
                setPanigation((prev) => ({
                    ...prev,
                    ...filter,
                }));
                setLoader(false)
            }
        }).catch((error: any) => {
            if (relevant) {
                setIdling(false)
                setLoader(false)
                setError(error.message);
            }
        })

        return () => {
            relevant = false;
            promise.abort()
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter._page, filter.name_like, filter.category_like, location, dispatch]);

    function handlePageChange(newPage: any) {
        setFilter((prev) => ({
            ...prev,
            _page: newPage,
        }));

        if(search !== '') {
            history.push(`content-list?page=${newPage}&search=${filter.name_like}`)    
        }else if(category !== '') {
            history.push(`content-list?page=${newPage}&category=${filter.category_like}`)
        } else {
            history.push(`content-list?page=${newPage}`)
        }
    }

    function handleHideModalForm(hide: any) {
        setHideModalForm(hide);
    }

    function handleHideModalContent(hide: any, idModal: number) {
        setHideModalContent(hide);

        if(hide === false) {
            setIdModalContent(() => idModal)
            console.log(idModalContent)
        }
    }
    
    function clearSearchParamUrl() {
        history.push('content-list?page=1')

        setFilter( prev => ({
            ...prev,
            name_like: ''
        }))
    }

    return (
        <div className='content-list-page'>
            <SideBar />
            <div className='container'>
                <Navbar />
                <div className='container__right'>
                    <div className='container__wrapper'>
                        {search && (
                            <span className='container_keyword'>
                                kết quả tìm kiếm cho từ khóa
                                <span className='keyword'>
                                    {` '${search}'`}
                                </span>
                                <span className='clear-key-word' 
                                    onClick={clearSearchParamUrl}
                                >
                                    &times;
                                </span>
                            </span>
                        )}
                        <div className='container__title'>
                            <div>
                                <span className='overflow'>Gợi ý hôm nay</span>
                            </div>
                        </div>
                        <div className='container__wraper-list'>
                            {(!loader && !error && dataProductList.length === 0) && (
                                <div className='error'>không có dữ liệu</div>
                            )}
                            {loader && (<div className='loader'>
                                    <Loader color='red' height={100} width={100}/>
                                </div>
                            )}
                            <div className='container__list'>
                                {error && <div className='error'>{error}</div>}
                                {(!loader && !error && dataProductList.length !== 0) &&
                                    dataProductList.map((item: any) => {
                                        const { id } = item;
                                        return (
                                            <ContentItem key={id}
                                                data={item}
                                                showModal={handleHideModalContent}
                                            />
                                        );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='container__panigation'>
                        {!error && dataProductList.length !== 0 && panigation._totalRows > panigation._limit && (
                            <Pagination
                                panigation={panigation}
                                handlePageChange={handlePageChange}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className='btn--show-modal' 
                style={(loader || error ) 
                    ? {pointerEvents: 'none', opacity: '0.4'} 
                    : {}
                }
                onClick={() => setHideModalForm(false)}
            >
                <i className='fas fa-plus' />
            </div>
            {!hideModalForm && (
                <Modal
                    hanldeHide={handleHideModalForm}
                    title='Thêm sản phẩm'
                    className='add__product' 
                >
                    <Form type='add' 
                        handleHide={handleHideModalForm} 
                    />
                </Modal>
            )}
            {!hideModalContent && (
                <Modal
                    hanldeHide={handleHideModalContent}
                    title='Thông tin sản phẩm'
                    id={state.listData[idModalContent].id}
                >
                    <ContentView data={state.listData[idModalContent]}/>
                </Modal>
            )}
        </div>
    );
}
