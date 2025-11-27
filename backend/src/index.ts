import express, { Request, Response } from 'express';
import cors from 'cors';
import pool from './db';
import { User, Transaction, CartItem } from './types';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// --- GET Endpoints ---
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

app.get('/api/customers', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM customers');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error });
  }
});

app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// --- POST Endpoints ---
app.post('/api/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  try {
    const [rows]: any[] = await pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error });
  }
});

app.post('/api/signup', async (req: Request, res: Response) => {
    const newUser = req.body as User;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Create user
        const [userResult]: any = await connection.query(
            'INSERT INTO users (username, password, role, name, phone) VALUES (?, ?, ?, ?, ?)',
            [newUser.username, newUser.password, newUser.role, newUser.name, newUser.phone]
        );

        // If user is a customer, create a corresponding customer entry
        if (newUser.role === 'customer') {
            const newCustomerId = `c${userResult.insertId}`;
            await connection.query(
                'INSERT INTO customers (id, name, phone, debt, lastVisit) VALUES (?, ?, ?, ?, ?)',
                [newCustomerId, newUser.name, newUser.phone, 0, new Date()]
            );
        }

        await connection.commit();
        res.status(201).json(newUser);
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ message: 'Error during signup', error });
    } finally {
        connection.release();
    }
});

app.post('/api/customers', async (req: Request, res: Response) => {
    const { id, name, phone } = req.body;
    try {
        await pool.query(
            'INSERT INTO customers (id, name, phone, debt, lastVisit) VALUES (?, ?, ?, ?, ?)',
            [id, name, phone, 0, new Date()]
        );
        res.status(201).json({ id, name, phone, debt: 0, lastVisit: new Date() });
    } catch (error) {
        res.status(500).json({ message: 'Error creating customer', error });
    }
});

app.delete('/api/customers/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM customers WHERE id = ?', [id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting customer', error });
    }
});

app.put('/api/customers/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { debt } = req.body;
    try {
        await pool.query('UPDATE customers SET debt = ? WHERE id = ?', [debt, id]);
        res.status(200).json({ message: 'Customer updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating customer', error });
    }
});

app.post('/api/checkout', async (req: Request, res: Response) => {
    const { items, customerId, paymentMethod, subtotal, tax, discount, total, amountPaid } = req.body;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Create a transaction record
        const transactionId = `txn-${crypto.randomUUID()}`;
        await connection.query(
            'INSERT INTO transactions (id, date, customerId, paymentMethod, subtotal, tax, discount, total, amountPaid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [transactionId, new Date(), customerId, paymentMethod, subtotal, tax, discount, total, amountPaid]
        );

        // 2. Create transaction items and update product stock
        for (const item of items as CartItem[]) {
            await connection.query(
                'INSERT INTO transaction_items (transactionId, productId, quantity, price) VALUES (?, ?, ?, ?)',
                [transactionId, item.id, item.quantity, item.price]
            );
            await connection.query(
                'UPDATE products SET stock = stock - ? WHERE id = ?',
                [item.quantity, item.id]
            );
        }

        // 3. Update customer debt if necessary
        const remainingBalance = total - amountPaid;
        if (customerId && remainingBalance > 0) {
            await connection.query(
                'UPDATE customers SET debt = debt + ? WHERE id = ?',
                [remainingBalance, customerId]
            );
        }
        
        // 4. Update customer last visit
        if(customerId) {
            await connection.query(
                'UPDATE customers SET lastVisit = ? WHERE id = ?',
                [new Date(), customerId]
            );
        }

        await connection.commit();
        res.status(201).json({ message: 'Checkout successful', transactionId });

    } catch (error) {
        await connection.rollback();
        res.status(500).json({ message: 'Error during checkout', error });
    } finally {
        connection.release();
    }
});


app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
