import { useEffect, useRef, useState } from 'react';
import { query } from '../../access';
import { getParamsUrl } from '../../service';
import { Product } from '../../model';
import { LoaderFullScreen } from '../../component';
import { productItem, productList, useAppDispatch } from '../../state';
import { useHistory } from 'react-router';
import ReactQuill from 'react-quill';
import classNames from 'classnames';
import './form.scss';
import 'react-quill/dist/quill.snow.css';

export function Form(props: { 
    handleHide: any,
    data?: any,
    type: any 
}) {
    const { handleHide, data, type } = props;
    const history = useHistory()
    const dispatch = useAppDispatch();
    const errorEditorRef = useRef<any>(false);
    const editorRef = useRef<any>(null);
    const [error, setError] = useState<any>({
        name: '',
        'price-min': '',
        'price-max': '',
        quantity: '',
        image: '',
        description: '',
        category: ''
    });
    const [dataForm, setDataForm] = useState<any>({
        name: '',
        'price-min': '',
        'price-max': '',
        quantity: '',
        image: '',
        description: '',
        category: ''
    });
    const [loading, setLoading] = useState(false);

    // list các input
    const fieldList = [
        {
            name: 'name',
            title: 'Tên sản phẩm',
            hint: 'Nhập tên sản phẩm',
        },
        {
            name: 'price-min',
            title: 'Giá sản phẩm nhỏ nhất (lớn hơn 10.000đ)',
            hint: 'Nhập giá sản phẩm nhỏ nhất',
        },
        {
            name: 'price-max',
            title: 'Giá sản phẩm lớn nhất',
            hint: 'Nhập giá sản phẩm lớn nhất',
        },
        {
            name: 'quantity',
            title: 'Số lượng sản phẩm',
            hint: 'Nhập số lượng sản phẩm',
        },
        {
            name: 'image',
            title: 'Ảnh sản phẩm (link)',
            hint: 'Nhập đường dẫn ảnh',
        },
    ];
    const categoryList = [
        'thời trang', 
        'giày dép', 
        'điện thoại', 
        'laptop', 
        'đồng hồ', 
        'khác'
    ]

    // cấu hình react quill
    const modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[
				{ list: 'ordered' },
				{ list: 'bullet' },
				{ indent: '-1' },
				{ indent: '+1' },
			],
			['link', 'image'],
			['clean'],
		],
	};
	const formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
	];
    
    const { id: idUrl } = getParamsUrl();
    const actionGetList = productList('_limit=12&_page=1');
    const actionGetItem = productItem(Number(idUrl));
    

    useEffect(() => {
        if (data) {
            setDataForm((prev: any) => ({
                ...prev,
                name: data.name,
                'price-min': data['price-min'],
                'price-max': data['price-max'],
                quantity: data.quantity,
                image: data.image,
                description: data.description,
                category: data.category,
            }));
        }  
    }, [data]);

    function handleChange(e: any) {
        if (e.target.value.trim().length > 0) {
            setError((prev: any) => ({
                ...prev,
                [e.target.name]: '',
            }));
        }

        setDataForm((prev: any) => ({
            ...prev,
            [e.target.name]: e.target.value.trim()
        })) 
    }

    function handleBlur(e: any, message: string = 'Vui lòng nhập trường này') {
        const reNumber = /^[0-9]+$/;

        // field có data thì không set error và ngược lại
        if (e.target.value.trim().length > 0) {
            setError((prev: any) => ({
                ...prev,
                [e.target.name]: '',
            }));
        } else {
            setError((prev: any) => ({
                ...prev,
                [e.target.name]: message,
            }));
        }

        // check field price-min và price-max có phải là numeber hay không
        if ((e.target.name === 'price-min' || e.target.name === 'price-max') &&
            e.target.value.trim().length > 0 &&
            !reNumber.test(String(e.target.value).toLowerCase())
        ) {
            setError((prev: any) => ({
                ...prev,
                [e.target.name]: 'Trường này là số',
            }));
        }

        if ((e.target.name === 'price-min' || e.target.name === 'price-max') &&
            e.target.value.trim().length > 0 &&
            reNumber.test(String(e.target.value).toLowerCase())
        ) {

            // số tiền k lớn hơn 6 số
            if (e.target.value.trim().length > 6) {
                setError((prev: any) => ({
                    ...prev,
                    [e.target.name]: 'Số tiền quá 6 con số',
                }));
            }

            // check price-min không lớn hơn price-max
            if (e.target.name === 'price-min' &&
                dataForm['price-max'] !== '' &&
                reNumber.test(dataForm['price-max']) &&
                Number(e.target.value) >= Number(dataForm['price-max'])
            ) {
                setError((prev: any) => ({
                    ...prev,
                    [e.target.name]: 'Trường này có số tiền lớn hơn hoặc bằng trường PriceMax',
                }));
            }

            //hủy error price max nếu price-min nhỏ hơn price-max
            if (dataForm['price-max'] !== '' &&
                reNumber.test(dataForm['price-max']) &&
                Number(e.target.value) < Number(dataForm['price-max'])
            ) {
                setError((prev: any) => ({
                    ...prev,
                    ['price-max']: '',
                }));
            }

            // check price-max không lớn hơn price-min
            if (e.target.name === 'price-max' &&
                dataForm['price-min'] !== '' &&
                reNumber.test(dataForm['price-min']) &&
                Number(e.target.value) <= Number(dataForm['price-min'])
            ) {
                setError((prev: any) => ({
                    ...prev,
                    [e.target.name]: 'Trường này có số tiền nhỏ hơn hoặc bằng trường PriceMin',
                }));
            }

            //hủy error price min nếu price-max lơn hơn price-min
            if (dataForm['price-min'] !== '' &&
                reNumber.test(dataForm['price-min']) &&
                Number(e.target.value) > Number(dataForm['price-min'])
            ) {
                setError((prev: any) => ({
                    ...prev,
                    ['price-min']: '',
                }));
            }
        }

        // check field quantity là number
        if (e.target.name === 'quantity' &&
            e.target.value.trim().length > 0 &&
            !reNumber.test(String(e.target.value).toLowerCase())
        ) {
            setError((prev: any) => ({
                ...prev,
                [e.target.name]: 'Trường này là số',
            }));
        }
        
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        const { name, image, description, quantity, category } = dataForm;
        const {
            name: nameError,
            image: imageError,
            description: descriptionError,
            quantity: quantityError,
            category: categoryError
        } = error;
        const errorList: any = {};

        // do chỉ có check người dùng có nhập hay không mới làm cách này cho ngắn
        // validation very basic ;v
        for (let item in dataForm) {
            if (dataForm[item] === '') {
                errorList[item] = 'vui lòng nhập trường này';
            }
            if(dataForm['description'] === '' || dataForm['description'] === '<p><br></p>') {
                editorRef.current.editor.root.classList.add('active')
                dataForm['description'] = ''
                errorList['description'] = 'vui lòng nhập trường này';
            }
        }

        setError((prev: any) => ({
            ...prev,
            ...errorList,
        }));

        // submit nếu có data và không có error
        if (name !== '' &&
            dataForm['price-min'] !== '' &&
            dataForm['price-max'] !== '' &&
            image !== '' &&
            description !== '' &&
            quantity !== '' &&
            category !== '' &&
            nameError === '' &&
            error['price-min'] === '' &&
            error['price-max'] === '' &&
            imageError === '' &&
            descriptionError === '' &&
            quantityError === '' &&
            categoryError === ''
        ) {
            const date = new Date();

            // tạo id tăng dần theo năm tháng ngày giờ phút giây
            const id = `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`;
            const product: Product = {
                id: Number(id),
                name: name,
                category: category,
                'price-min': dataForm['price-min'],
                'price-max': dataForm['price-max'],
                quantity: quantity,
                image: image,
                description: description,
                color: [
                    'Nỉ bông đen',
                    'Nỉ bông trắng',
                    'Nỉ bông vàng',
                    'Nỉ bông xanh',
                    'Nỉ bông đỏ dô',
                ],
                size: ['M', 'L', 'XL', 'XXL', 'XXXL'],
                star: Number(4.9),
                review: '8,6k',
                sold: '19,5k',
                like: '15,5k',
                'name-shop': 'luongkimhoa2901',
                'image-shop':
                    'https://cf.shopee.vn/file/607ada035c629a034173766064a73af1_tn',
            };

            (async () => {
                try {
                    setLoading(true);
                    if (type === 'add') {
                        const result = await query.product.add(product);

                        if (result.data) {
                            setLoading(false);
                            handleHide(true);
                            dispatch(actionGetList);
                        }
                        history.push(`/web-shopee-reactjs/content-list?page=1`)
                    }
                    if (type === 'edit') {
                        const result = await query.product.update(
                            Number(idUrl),
                            product
                        );

                        if (result.data) {
                            setLoading(false);
                            handleHide(true);
                            dispatch(actionGetItem);
                        }
                    }
                } catch (error) {
                    setLoading(false)
                    alert(error);
                }
            })();
        }
    }

    function handleChangeEditor(content: any, delta: any, source: any, editor: any) {
        errorEditorRef.current = false
        dataForm['description'] = content;
        editorRef.current && editorRef.current.editor.root.classList.remove('active')

        setError((prev: any) => ({
            ...prev,
            description: ''
        }))

        if(editor.getText().trim() === '') {
            dataForm['description'] = '';
        }    
    }

    function handleBlurEditor(index:any, source: any, quill: any) {
        if(quill.getText().trim().length === 0) {
            errorEditorRef.current = true
            editorRef.current.editor.root.classList.add('active')

            setError((prev: any) => ({
                ...prev,
                description: 'vui lòng nhập trường này'
            }))
        }
    }

    function handleChangeCategory(e: any) {
        if(e.target.value === ''){
            setError((prev: any) => ({
                ...prev,
                category: 'vui lòng chọn loại sản phẩm'
            }));
        }else {
            setError((prev: any) => ({
                ...prev,
                category: ''
            }));
        }

        dataForm.category = e.target.value
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='form'>
                <div className={classNames(
                        'form__group', 
                        {'active': error.category !== ''}
                    )}
                >
                    <label>Loại sản phẩm</label>
                    <select className='form__group'
                        name='category'
                        onChange={handleChangeCategory}
                    >
                        <option value=''>Vui lòng chọn loại sản phẩm</option>
                        {categoryList.map(item => {
                                return (
                                    <option selected={dataForm.category === item}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <span className='error'>
                        {error.category !== '' && error.category}
                    </span>
                </div>
                {fieldList.map((item: any) => {
                    return (
                        <div key={item.name}
                            className={classNames(
                                'form__group', 
                                {'active': error[item.name] !== ''
                            })}
                        >
                            <label>{item.title}</label>
                            <input
                                type='text'
                                name={item.name}
                                defaultValue={data && data[item.name]}
                                placeholder={item.hint}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <span className='error'>
                                {error[item.name] !== '' && error[item.name]}
                            </span>
                        </div>
                    );
                })}
                <div
                    className={classNames(
                        'form__group', 
                        {'active': error.description !== ''}
                    )}
                >
                    <label>Mô tả sản phẩm</label>
                    <ReactQuill ref={editorRef}
                        defaultValue={data && data.description}
                        placeholder='Nhập mô tả sản phẩm'
                        onChange={handleChangeEditor}
                        onBlur={handleBlurEditor}
                        modules={modules}
                        formats={formats}
                    />
                    <span ref={errorEditorRef}
                        className={classNames(
                            'error', 
                            {'active': errorEditorRef}
                        )}
                    >
                        {error.description !== '' && error.description}
                    </span>
                </div>
            </div>
            <div className='form__btn'>
                <button className='btn--add'>
                    {type === 'add' 
                        ? 'Thêm' 
                        : 'Lưu'
                    }
                </button>
            </div>
            {loading && <LoaderFullScreen />}
        </form>
    );
}
