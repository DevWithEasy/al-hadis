import bookRouter from "./bookRouter";
import categoryRouter from "./categoryRouter";

const routes = [
    {
        path: '/books',
        handler: bookRouter
    },
    {
        path: '/categories',
        handler: categoryRouter
    },
    {
        path: '/',
        handler: (req, res) => {
            res.json({
                success: true,
                message: 'Server is ready to serve'
            })
        }
    }
]

const applyRoutes = (server) => {
    routes.map(r => {
        if (r.path === "/") {
            server.get(r.path, r.handler)
        } else {
            server.use(r.path, r.handler)
        }
    })
}

export default applyRoutes