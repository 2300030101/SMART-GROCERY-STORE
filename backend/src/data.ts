
import { Product, Customer, User } from './types';

export const CATEGORIES = ["All", "Vegetables", "Snacks", "Beverages", "Staples", "Household", "Stationery"];

export const INITIAL_USERS: User[] = [
  { username: 'admin', password: '123', role: 'admin', name: 'Store Owner', phone: '0000000000' },
  { username: 'staff', password: '123', role: 'staff', name: 'Staff Member', phone: '0000000000' }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Rahul Sharma', phone: '9876543210', debt: 500, lastVisit: '2024-03-10' },
  { id: 'c2', name: 'Priya Patel', phone: '9898989898', debt: 0, lastVisit: '2024-03-12' },
  { id: 'c3', name: 'Amit Singh', phone: '9988776655', debt: 1200, lastVisit: '2024-03-08' },
];

export const INITIAL_PRODUCTS: Product[] = [
  // --- Vegetables ---
  {
    id: '1',
    name: 'Fresh Tomato',
    category: 'Vegetables',
    price: 40,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: '2',
    name: 'Potato',
    category: 'Vegetables',
    price: 30,
    stock: 200,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: '3',
    name: 'Red Onion',
    category: 'Vegetables',
    price: 60,
    stock: 150,
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'v4',
    name: 'Cauliflower',
    category: 'Vegetables',
    price: 45,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'v5',
    name: 'Green Cabbage',
    category: 'Vegetables',
    price: 35,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1550953613-2d1d07817576?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'v6',
    name: 'Brinjal (Eggplant)',
    category: 'Vegetables',
    price: 50,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1623428454614-abaf00244e52?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'v7',
    name: 'Lady Finger (Okra)',
    category: 'Vegetables',
    price: 60,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1425543103437-43a85a8a5293?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'v8',
    name: 'Carrot',
    category: 'Vegetables',
    price: 55,
    stock: 80,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'v9',
    name: 'Green Chili',
    category: 'Vegetables',
    price: 80,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'v10',
    name: 'Cucumber',
    category: 'Vegetables',
    price: 30,
    stock: 70,
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'v11',
    name: 'Spinach (Palak)',
    category: 'Vegetables',
    price: 25,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'v12',
    name: 'Capsicum',
    category: 'Vegetables',
    price: 65,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdf5dbc240?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'v13',
    name: 'Ginger',
    category: 'Vegetables',
    price: 120,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'v14',
    name: 'Garlic',
    category: 'Vegetables',
    price: 150,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1540148426945-6cf99a690f8b?auto=format&fit=crop&q=80&w=500'
  },

  // --- Snacks ---
  { id: 's1', name: 'Lays Chips', category: 'Snacks', price: 20, stock: 50, image: 'https://images.unsplash.com/photo-1566478919030-26d9c286df9c?auto=format&fit=crop&q=80&w=500' },
  { id: 's2', name: 'Kurkure', category: 'Snacks', price: 20, stock: 50, image: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&q=80&w=500' },
  { id: 's3', name: 'Bingo Chips', category: 'Snacks', price: 20, stock: 45, image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&q=80&w=500' },
  { id: 's4', name: 'Haldiram Mixture', category: 'Snacks', price: 50, stock: 30, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=500' },
  { id: 's5', name: 'Bhujia Sev', category: 'Snacks', price: 45, stock: 40, image: 'https://images.unsplash.com/photo-1606491956689-2ea28c674675?auto=format&fit=crop&q=80&w=500' },
  { id: 's6', name: 'Moong Dal', category: 'Snacks', price: 25, stock: 35, image: 'https://images.unsplash.com/photo-1629859550346-a4c3f56e9c98?auto=format&fit=crop&q=80&w=500' },
  { id: 's7', name: 'Banana Chips', category: 'Snacks', price: 60, stock: 25, image: 'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?auto=format&fit=crop&q=80&w=500' },
  { id: 's8', name: 'Chana Jor Garam', category: 'Snacks', price: 30, stock: 20, image: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&q=80&w=500' },
  { id: 's9', name: 'Masala Peanuts', category: 'Snacks', price: 35, stock: 30, image: 'https://images.unsplash.com/photo-1627255909188-724d271f83c5?auto=format&fit=crop&q=80&w=500' },
  { id: 's10', name: 'Parle-G', category: 'Snacks', price: 10, stock: 100, image: 'https://images.unsplash.com/photo-1590080874088-e564811bd9e8?auto=format&fit=crop&q=80&w=500' },
  { id: 's11', name: 'Good Day Cookies', category: 'Snacks', price: 25, stock: 60, image: 'https://images.unsplash.com/photo-1499636138143-bd649043ea52?auto=format&fit=crop&q=80&w=500' },
  { id: 's12', name: 'Oreo', category: 'Snacks', price: 40, stock: 50, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=500' },
  { id: 's13', name: 'Marie Gold', category: 'Snacks', price: 25, stock: 40, image: 'https://images.unsplash.com/photo-1557089409-76077759d57a?auto=format&fit=crop&q=80&w=500' },
  { id: 's14', name: '50-50 Biscuits', category: 'Snacks', price: 20, stock: 40, image: 'https://images.unsplash.com/photo-1623086940842-894d76f827d0?auto=format&fit=crop&q=80&w=500' },
  { id: 's15', name: 'Milk Bikis', category: 'Snacks', price: 20, stock: 40, image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=500' },
  { id: 's16', name: 'Maggi', category: 'Snacks', price: 14, stock: 150, image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=500' },
  { id: 's17', name: 'Yippee Noodles', category: 'Snacks', price: 12, stock: 100, image: 'https://images.unsplash.com/photo-1591814468924-442d840dd672?auto=format&fit=crop&q=80&w=500' },
  { id: 's18', name: 'Cup Noodles', category: 'Snacks', price: 50, stock: 30, image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=500' },
  { id: 's19', name: 'Dairy Milk', category: 'Snacks', price: 40, stock: 80, image: 'https://images.unsplash.com/photo-1623356300958-f9b6a12b97c4?auto=format&fit=crop&q=80&w=500' },
  { id: 's20', name: 'KitKat', category: 'Snacks', price: 30, stock: 70, image: 'https://images.unsplash.com/photo-1524316104271-46f912e7534c?auto=format&fit=crop&q=80&w=500' },
  { id: 's21', name: 'Perk', category: 'Snacks', price: 10, stock: 100, image: 'https://images.unsplash.com/photo-1616031037011-087000171abe?auto=format&fit=crop&q=80&w=500' },
  { id: 's22', name: 'Pulse Candy', category: 'Snacks', price: 2, stock: 500, image: 'https://images.unsplash.com/photo-1582058928232-216836923204?auto=format&fit=crop&q=80&w=500' },
  { id: 's23', name: 'Alpenliebe', category: 'Snacks', price: 2, stock: 500, image: 'https://images.unsplash.com/photo-1575224300306-1b8da36134ec?auto=format&fit=crop&q=80&w=500' },
  { id: 's24', name: 'Rusk Toast', category: 'Snacks', price: 40, stock: 40, image: 'https://images.unsplash.com/photo-1589146141075-814c81048b61?auto=format&fit=crop&q=80&w=500' },
  { id: 's25', name: 'Bakery Puff', category: 'Snacks', price: 15, stock: 20, image: 'https://images.unsplash.com/photo-1563229712-4c6e93081e6e?auto=format&fit=crop&q=80&w=500' },

  // --- Beverages ---
  { id: 'b1', name: 'Coca-Cola (500ml)', category: 'Beverages', price: 45, stock: 50, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=500' },
  { id: 'b2', name: 'Sprite (500ml)', category: 'Beverages', price: 45, stock: 50, image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&q=80&w=500' },
  { id: 'b3', name: 'Thums Up (500ml)', category: 'Beverages', price: 45, stock: 50, image: 'https://images.unsplash.com/photo-1629203851288-7ececa5f0535?auto=format&fit=crop&q=80&w=500' },
  { id: 'b4', name: 'Fanta (500ml)', category: 'Beverages', price: 45, stock: 40, image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&q=80&w=500' },
  { id: 'b5', name: 'Pepsi (500ml)', category: 'Beverages', price: 45, stock: 50, image: 'https://images.unsplash.com/photo-1531384698654-7f6e477ca221?auto=format&fit=crop&q=80&w=500' },
  { id: 'b6', name: 'Mountain Dew', category: 'Beverages', price: 45, stock: 40, image: 'https://images.unsplash.com/photo-1625740822008-e45a90961b7d?auto=format&fit=crop&q=80&w=500' },
  { id: 'b7', name: 'Frooti', category: 'Beverages', price: 20, stock: 60, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=80&w=500' },
  { id: 'b8', name: 'Appy Fizz', category: 'Beverages', price: 25, stock: 40, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=500' },
  { id: 'b9', name: 'Maaza', category: 'Beverages', price: 40, stock: 50, image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&q=80&w=500' },
  { id: 'b10', name: 'Real Juice (1L)', category: 'Beverages', price: 110, stock: 20, image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=500' },
  { id: 'b11', name: 'Tropicana (1L)', category: 'Beverages', price: 110, stock: 20, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=500' },
  { id: 'b12', name: 'Red Bull', category: 'Beverages', price: 125, stock: 30, image: 'https://images.unsplash.com/photo-1551500226-b50b653e33e8?auto=format&fit=crop&q=80&w=500' },
  { id: 'b13', name: 'Slice', category: 'Beverages', price: 40, stock: 30, image: 'https://images.unsplash.com/photo-1594910075849-c1676d917865?auto=format&fit=crop&q=80&w=500' },
  { id: 'b14', name: 'Limca', category: 'Beverages', price: 45, stock: 30, image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&q=80&w=500' },
  { id: 'b15', name: 'Gatorade', category: 'Beverages', price: 60, stock: 25, image: 'https://images.unsplash.com/photo-1622483767128-342797152661?auto=format&fit=crop&q=80&w=500' },
  { id: 'b16', name: 'Bisleri Water (1L)', category: 'Beverages', price: 20, stock: 100, image: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&q=80&w=500' },
  { id: 'b17', name: 'Kinley Water (1L)', category: 'Beverages', price: 20, stock: 80, image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=500' },
  { id: 'b18', name: 'Soda', category: 'Beverages', price: 15, stock: 60, image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=500' },

  // --- Staples ---
  { id: 'st1', name: 'Rice (1kg)', category: 'Staples', price: 60, stock: 100, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=500' },
  { id: 'st2', name: 'Wheat Flour (Atta 1kg)', category: 'Staples', price: 45, stock: 80, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=500' },
  { id: 'st3', name: 'Sugar (1kg)', category: 'Staples', price: 44, stock: 90, image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&q=80&w=500' },
  { id: 'st4', name: 'Salt (1kg)', category: 'Staples', price: 25, stock: 100, image: 'https://images.unsplash.com/photo-1518110925495-5c9ebdb14902?auto=format&fit=crop&q=80&w=500' },
  { id: 'st5', name: 'Toor Dal (1kg)', category: 'Staples', price: 140, stock: 50, image: 'https://images.unsplash.com/photo-1585996656736-2580795c4791?auto=format&fit=crop&q=80&w=500' },
  { id: 'st6', name: 'Urad Dal (1kg)', category: 'Staples', price: 130, stock: 40, image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&q=80&w=500' },
  { id: 'st7', name: 'Moong Dal (1kg)', category: 'Staples', price: 120, stock: 45, image: 'https://images.unsplash.com/photo-1599579062337-640a33a59533?auto=format&fit=crop&q=80&w=500' },
  { id: 'st8', name: 'Chana Dal (1kg)', category: 'Staples', price: 90, stock: 50, image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&q=80&w=500' },
  { id: 'st9', name: 'Masoor Dal (1kg)', category: 'Staples', price: 100, stock: 40, image: 'https://images.unsplash.com/photo-1558223685-6101c7844066?auto=format&fit=crop&q=80&w=500' },
  { id: 'st10', name: 'Groundnut Oil (1L)', category: 'Staples', price: 190, stock: 30, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=500' },
  { id: 'st11', name: 'Sunflower Oil (1L)', category: 'Staples', price: 160, stock: 40, image: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&q=80&w=500' },
  { id: 'st12', name: 'Mustard Oil (1L)', category: 'Staples', price: 170, stock: 35, image: 'https://images.unsplash.com/photo-1627995393665-385038c35f79?auto=format&fit=crop&q=80&w=500' },
  { id: 'st13', name: 'Ghee (500ml)', category: 'Staples', price: 600, stock: 20, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=500' },
  { id: 'st14', name: 'Turmeric Powder', category: 'Staples', price: 35, stock: 60, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=500' },
  { id: 'st15', name: 'Chilli Powder', category: 'Staples', price: 40, stock: 60, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=500' },
  { id: 'st16', name: 'Coriander Powder', category: 'Staples', price: 30, stock: 50, image: 'https://images.unsplash.com/photo-1599818815124-7ee57c4bd674?auto=format&fit=crop&q=80&w=500' },
  { id: 'st17', name: 'Garam Masala', category: 'Staples', price: 50, stock: 40, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=500' },
  { id: 'st18', name: 'Jeera (Cumin)', category: 'Staples', price: 60, stock: 40, image: 'https://images.unsplash.com/photo-1599940824399-b87987ce0799?auto=format&fit=crop&q=80&w=500' },
  { id: 'st19', name: 'Rava (Sooji)', category: 'Staples', price: 40, stock: 40, image: 'https://images.unsplash.com/photo-1582239339316-11f8b3c3b473?auto=format&fit=crop&q=80&w=500' },
  { id: 'st20', name: 'Maida', category: 'Staples', price: 35, stock: 40, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=500' },
  { id: 'st21', name: 'Poha', category: 'Staples', price: 45, stock: 40, image: 'https://images.unsplash.com/photo-1615887023516-9dc8d752db28?auto=format&fit=crop&q=80&w=500' },
  { id: 'st22', name: 'Sabudana', category: 'Staples', price: 70, stock: 30, image: 'https://images.unsplash.com/photo-1629859550346-a4c3f56e9c98?auto=format&fit=crop&q=80&w=500' },
  { id: 'st23', name: 'Tea Powder', category: 'Staples', price: 120, stock: 60, image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=500' },
  { id: 'st24', name: 'Coffee Powder', category: 'Staples', price: 150, stock: 50, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=500' },

  // --- Household ---
  { id: 'h1', name: 'Detergent Powder', category: 'Household', price: 90, stock: 40, image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&q=80&w=500' },
  { id: 'h2', name: 'Detergent Liquid', category: 'Household', price: 200, stock: 30, image: 'https://images.unsplash.com/photo-1611075385680-3c72b2605963?auto=format&fit=crop&q=80&w=500' },
  { id: 'h3', name: 'Dishwash Gel', category: 'Household', price: 110, stock: 35, image: 'https://images.unsplash.com/photo-1585832047055-e7a8e8331182?auto=format&fit=crop&q=80&w=500' },
  { id: 'h4', name: 'Dishwash Bar', category: 'Household', price: 20, stock: 50, image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=500' },
  { id: 'h5', name: 'Phenyl', category: 'Household', price: 40, stock: 40, image: 'https://images.unsplash.com/photo-1528731708534-816fe59f90cb?auto=format&fit=crop&q=80&w=500' },
  { id: 'h6', name: 'Floor Cleaner', category: 'Household', price: 80, stock: 40, image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=500' },
  { id: 'h7', name: 'Toilet Cleaner', category: 'Household', price: 90, stock: 40, image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&q=80&w=500' },
  { id: 'h8', name: 'Harpic', category: 'Household', price: 95, stock: 40, image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&q=80&w=500' },
  { id: 'h9', name: 'Lizol', category: 'Household', price: 99, stock: 40, image: 'https://images.unsplash.com/photo-1626135028670-4f519e48b813?auto=format&fit=crop&q=80&w=500' },
  { id: 'h10', name: 'Bath Soap', category: 'Household', price: 35, stock: 100, image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=500' },
  { id: 'h11', name: 'Shampoo (200ml)', category: 'Household', price: 150, stock: 50, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=500' },
  { id: 'h12', name: 'Toothpaste', category: 'Household', price: 65, stock: 60, image: 'https://images.unsplash.com/photo-1559591937-e1dc3771a2e1?auto=format&fit=crop&q=80&w=500' },
  { id: 'h13', name: 'Toothbrush', category: 'Household', price: 30, stock: 80, image: 'https://images.unsplash.com/photo-1629219356834-8b1e4f451475?auto=format&fit=crop&q=80&w=500' },
  { id: 'h14', name: 'Handwash', category: 'Household', price: 85, stock: 40, image: 'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?auto=format&fit=crop&q=80&w=500' },
  { id: 'h15', name: 'Sanitizer', category: 'Household', price: 50, stock: 100, image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&q=80&w=500' },
  { id: 'h16', name: 'Tissue Paper', category: 'Household', price: 40, stock: 60, image: 'https://images.unsplash.com/photo-1584473335048-52ae64943f67?auto=format&fit=crop&q=80&w=500' },
  { id: 'h17', name: 'Garbage Bags', category: 'Household', price: 60, stock: 60, image: 'https://images.unsplash.com/photo-1621256038479-7a55d4c965c2?auto=format&fit=crop&q=80&w=500' },
  { id: 'h18', name: 'Matchbox', category: 'Household', price: 2, stock: 200, image: 'https://images.unsplash.com/photo-1607599026211-54c728771457?auto=format&fit=crop&q=80&w=500' },
  { id: 'h19', name: 'Mosquito Coil', category: 'Household', price: 45, stock: 50, image: 'https://images.unsplash.com/photo-1533560737130-9759d57a972c?auto=format&fit=crop&q=80&w=500' },
  { id: 'h20', name: 'Mosquito Liquid Refill', category: 'Household', price: 75, stock: 40, image: 'https://images.unsplash.com/photo-1616612739097-9e4719277025?auto=format&fit=crop&q=80&w=500' },
  { id: 'h21', name: 'Air Freshener', category: 'Household', price: 120, stock: 35, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=500' },
  { id: 'h22', name: 'Scrub Pad', category: 'Household', price: 25, stock: 100, image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&q=80&w=500' },
  
  // --- Stationery ---
  { id: 'stn1', name: 'Notebook (Long Book)', category: 'Stationery', price: 60, stock: 100, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=500' },
  { id: 'stn2', name: 'Ball Pens (Pack of 5)', category: 'Stationery', price: 50, stock: 100, image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&q=80&w=500' },
  { id: 'stn3', name: 'Pencils (Pack of 10)', category: 'Stationery', price: 50, stock: 80, image: 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&q=80&w=500' },
  { id: 'stn4', name: 'Eraser & Sharpener Set', category: 'Stationery', price: 20, stock: 100, image: 'https://images.unsplash.com/photo-1452838384813-2d2c77d48347?auto=format&fit=crop&q=80&w=500' },
  { id: 'stn5', name: 'Ruler (30cm)', category: 'Stationery', price: 20, stock: 50, image: 'https://images.unsplash.com/photo-1589305417436-1e66348c3b7a?auto=format&fit=crop&q=80&w=500' },
  { id: 'stn6', name: 'Geometry Box', category: 'Stationery', price: 150, stock: 30, image: 'https://images.unsplash.com/photo-1633532426367-17b5f58c7075?auto=format&fit=crop&q=80&w=500' },
  { id: 'stn7', name: 'Scientific Calculator', category: 'Stationery', price: 550, stock: 20, image: 'https://images.unsplash.com/photo-1594917666579-dac23cb41180?auto=format&fit=crop&q=80&w=500' },
  { id: 'stn8', name: 'Fevicol (100g)', category: 'Stationery', price: 45, stock: 60, image: 'https://images.unsplash.com/photo-1616422830846-5d9c22e4d026?auto=format&fit=crop&q=80&w=500' },
  { id: 'stn9', name: 'Scissors', category: 'Stationery', price: 80, stock: 40, image: 'https://images.unsplash.com/photo-1534645224344-f86a7d5324d6?auto=format&fit=crop&q=80&w=500' },
  { id: 'stn10', name: 'A4 Paper Ream (500 Sheets)', category: 'Stationery', price: 350, stock: 25, image: 'https://images.unsplash.com/photo-1586075010923-2dd45eeed8bd?auto=format&fit=crop&q=80&w=500' },
  { id: 'stn11', name: 'Office File', category: 'Stationery', price: 40, stock: 60, image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=500' },
  { id: 'stn12', name: 'Sticky Notes', category: 'Stationery', price: 50, stock: 50, image: 'https://images.unsplash.com/photo-1531604908901-b659c258ba70?auto=format&fit=crop&q=80&w=500' },
  { id: 'stn13', name: 'Highlighters (Set of 4)', category: 'Stationery', price: 120, stock: 40, image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=500' },
  { id: 'stn14', name: 'Whiteboard Marker', category: 'Stationery', price: 35, stock: 100, image: 'https://images.unsplash.com/photo-1586797262798-e6d89201d670?auto=format&fit=crop&q=80&w=500' },
  { id: 'stn15', name: 'Stapler', category: 'Stationery', price: 90, stock: 40, image: 'https://images.unsplash.com/photo-1622329788099-0e132057d692?auto=format&fit=crop&q=80&w=500' },
];
