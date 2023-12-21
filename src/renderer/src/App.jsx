import { Routes, Route } from "react-router-dom"
import { Book, Bookmark, Books, Chapter, Donate, Home, Layout, Privacy, Projects, Subjects, Tahkik, Writers } from './pages/Index'

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/allhadiths'
          element={<Layout>
            <Books />
          </Layout>}
        />
        <Route
          path='/:name'
          element={<Layout>
            <Book />
          </Layout>}
        />
        <Route
          path='/:name/:chapterId'
          element={<Layout>
            <Chapter />
          </Layout>}
        />
        <Route
          path='/allsubjects'
          element={<Layout>
            <Subjects />
          </Layout>}
        />
        <Route
          path='/bookmark'
          element={<Layout>
            <Bookmark />
          </Layout>}
        />
        <Route
          path='/donate'
          element={<Layout>
            <Donate />
          </Layout>}
        />
        <Route
          path='/projects'
          element={<Layout>
            <Projects />
          </Layout>}
        />
        <Route
          path='/privacy'
          element={<Layout>
            <Privacy />
          </Layout>}
        />
        <Route
          path='/writers'
          element={<Layout>
            <Writers />
          </Layout>}
        />
        <Route
          path='/tahkik'
          element={<Layout>
            <Tahkik />
          </Layout>}
        />
      </Routes>
    </>
  )
}

export default App
