import { Router } from 'express'
import db from '../config/dbConfig'

const categoryRouter = Router()

categoryRouter.get('/', (req, res) => {
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

export default categoryRouter