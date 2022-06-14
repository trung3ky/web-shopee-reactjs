import { useState, useEffect } from 'react';
import { Navbar, SideBar, ContentView, Loader, Modal, Form } from '../../component';
import { getParamsUrl } from '../../service';
import { item, productItem, useAppDispatch, useAppSelector } from '../../state';
import './content-page.scss';

export function ContentPage() {
    const [loader, setLoader] = useState(false);
    const [idling, setIdling] = useState(false);
    const [error, setError] = useState<any>(undefined);
    const [hide, setHide] = useState(true);
    const dispatch = useAppDispatch();

    // get state từ redux
    const state: any = useAppSelector((state) => state.productList);
    
    // get id của sản phẩm từ url
    const { id } = getParamsUrl();

    // get product item từ state theo itemIdData
    const product = state.listData[state.itemIdData];

    useEffect(() => {
        let relevant = true;

        (async () => {
            try {
                setLoader(true);

                //kiểm tra xem có item trong listData chưa, có thì lấy trong redux, không thì query
                if (state.listData[id]) {
                    dispatch(item(Number(id)));
                } else {
                    const actionGetItem = productItem(Number(id));

                    await dispatch(actionGetItem);
                    if (relevant) {
                        setError(undefined);
                    }
                }
            } catch (error: any) {
                if (relevant) setError(error.message);
            } finally {
                if (relevant) {
                    setLoader(false);
                    setIdling(false);
                }
            }
        })();

        return () => {
            relevant = false;
        };
    }, [id]);

    function handleHide(hide: any) {
        setHide(hide);
    }

    return (
        <div className='content-page'>
            <SideBar />
            <div className='container'>
                <Navbar />
                <div className='container__right'>
                    {loader && (
                        <div className='loader'>
                            <Loader color='red' height={50} width={50} />
                        </div>
                    )}
                    {error && <div className='error'>{error}</div>}
                    {!loader && !error && !idling && product && (
                        <ContentView data={product} />
                    )}
                </div>
            </div>
            <div className='btn--show-modal' 
                style={(loader || error ) 
                    ? {pointerEvents: 'none', opacity: '0.4'} 
                    : {}
                }
                onClick={() => setHide(false)}>
                <i className='far fa-edit' />
            </div>
            {!hide && (
                <Modal
                    hanldeHide={handleHide}
                    title='Chỉnh sửa sản phẩm'
                >
                    <Form type='edit' 
                        handleHide={handleHide} 
                        data={product}
                    />
                </Modal>
            )}
        </div>
    );
}
