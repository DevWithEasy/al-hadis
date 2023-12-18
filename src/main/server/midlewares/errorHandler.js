import con from 'sqlite3'
const sqlite3 = con.verbose()

const errorHandler = (server) => {
    server.use((err, req, res, next) => {
        console.error(err.stack);

        // Handle database-related errors
        if (err instanceof sqlite3.DatabaseError) {
            return res.status(500).json({ error: 'Database error' });
        }

        // Handle other errors
        res.status(500).json({ error: 'Something went wrong!' });
    });
}

export default errorHandler