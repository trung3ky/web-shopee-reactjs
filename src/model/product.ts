export type Product = {
    id: number;
    name: string;
    category: string;
    image: string;
    'price-min': string;
    'price-max': string;
    color?: any;
    size?: any;
    quantity: number;
    star: number;
    review?: string;
    sold?: string;
    like?: string;
    'name-shop': string;
    'image-shop': string;
    description: string;
};

export type shortProduct = Pick<Product, 'image' | 'name' | 'price-min' | 'sold' | 'id' | 'star'>;

export type PaginationModel = {
    _limit: number;
    _page: number;
    _totalRows: number;
};
