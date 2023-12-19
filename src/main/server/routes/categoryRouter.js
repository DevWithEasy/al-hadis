import { Router } from 'express'
import db from '../config/dbConfig'

const categoryRouter = Router()

categoryRouter.get('/', async(req, res) => {
    try {
        const query = 'SELECT * FROM category';

        db.all(query, [], (err, rows) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    status: 500,
                    message: err.message
                });
            }

            return res.status(200).json({
                success: true,
                status: 200,
                data: rows
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

categoryRouter.get('/sub/:catId', async(req, res) => {
    try {
        const query = `
            SELECT * 
            FROM subcategory
            where cat_id = ?
        `

        db.all(query, [req.params.catId], (err, rows) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    status: 500,
                    message: err.message
                });
            }

            return res.status(200).json({
                success: true,
                status: 200,
                data: rows
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

categoryRouter.get('/hadith/:catId/:subcatId', async (req, res) => {
    try {
        const query = `
            SELECT * 
            FROM hadith_for_category
            WHERE cat_id = ? AND subcat_id = ?
        `;

        const rows = await new Promise((resolve, reject) => {
            db.all(query, [req.params.catId, req.params.subcatId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        const hadiths = [];

        for (const row of rows) {
            const bookQuery = `
                SELECT * 
                FROM hadith 
                INDEXED BY hadith_book_chapter_index
                WHERE book_id = ? AND hadith_id = ?
            `;

            const bookRows = await new Promise((resolve, reject) => {
                db.all(bookQuery, [row.book_id,row.hadith_bn], (err, bookRows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(bookRows);
                    }
                });
            });

            hadiths.push(bookRows[0]);
        }

        return res.status(200).json({
            success: true,
            status: 200,
            data: hadiths,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            status: 500,
            message: err.message,
        });
    }
});


export default categoryRouter