import { Router } from 'express'
import db from '../config/dbConfig'

const bookRouter = Router()

bookRouter.get('/', async(req, res) => {
    try {
        const booksQuery = 'SELECT * FROM books';

        db.all(booksQuery, [], (err, bookRows) => {
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
                data: bookRows
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

bookRouter.get('/chapter/:bookId', async(req, res) => {
    try {
        const query = 'SELECT * FROM chapter WHERE book_id = ?';

        db.all(query, [req.params.bookId], (err, rows) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    status: 500,
                    message: err.message
                });
            }
            console.log(rows.length)
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

bookRouter.get('/section/:bookId/:chapterId', async(req, res) => {
    try {
        const query = `
            SELECT * 
            FROM section 
            WHERE  book_id = ? AND chapter_id = ?;
        `

        db.all(query, [req.params.bookId,req.params.chapterId], (err, rows) => {
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

bookRouter.get('/hadith/:bookId/:chapterId', async (req, res) => {
    try {
        const date1 = new Date()
        const sectionQuery = `
            SELECT * 
            FROM section
            WHERE  book_id = ? AND chapter_id = ?;
        `;

        const rows = await new Promise((resolve, reject) => {
            db.all(sectionQuery, [req.params.bookId, req.params.chapterId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        const hadiths = [];

        for (const row of rows) {
            const hadithQuery = `
                SELECT * 
                FROM hadith INDEXED BY hadith_book_chapter_index
                WHERE  book_id = ? AND chapter_id = ? AND section_id = ?;
            `;

            const hadithRows = await new Promise((resolve, reject) => {
                db.all(hadithQuery, [row.book_id, row.chapter_id, row.section_id], (err, hadithRows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(hadithRows);
                    }
                });
            });

            hadiths.push({ ...row, hadiths: hadithRows });
        }
const date2 = new Date()
console.log(date2-date1);
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


export default bookRouter