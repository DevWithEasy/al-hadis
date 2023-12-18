import { Router } from 'express'
import db from '../config/dbConfig'

const bookRouter = Router()

bookRouter.get('/', (req, res) => {
    try {
        let books
        let categories
        const booksQuery = 'SELECT * FROM books';
        const categoriesQuery = 'SELECT * FROM category';

        db.all(booksQuery, [], (err, bookRows) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    status: 500,
                    message: err.message
                });
            }

            books = bookRows

        })

        db.all(categoriesQuery, [], (err, categoriesRows) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    status: 500,
                    message: err.message
                });
            }

            categories = categoriesRows

            return res.status(200).json({
                success: true,
                status: 200,
                data: {
                    books,
                    categories
                },
            });

        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        });
    }
})

export default bookRouter