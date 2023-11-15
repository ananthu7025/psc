import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes'
import { Provider } from 'react-redux';
import Store from './store';
import { Toaster } from 'react-hot-toast';
// import Login from './pages/auth/Login';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'jquery/dist/jquery.min.js'
// import 'bootstrap/dist/js/bootstrap.min.js'
import Layout from './Layout';
import CreateProfile from './pages/CreateProfile';
import Dashboard from './pages/Dashboard';
import MockTest from './pages/MockTest';
import PreviousQuestionPaper from './pages/PreviousQuestionPaper';
import Profile from './pages/Profile';
import PscBullettin from './pages/PscBullettin';
import SpecialTopic from './pages/SpecialTopic';
import StudyPlan from './pages/StudyPlan';
import Subscribition from './pages/Subscribition';
import Syllabus from './pages/Syllabus';
import LoginPage from './pages/LoginPage';
import QuizCat from './pages/QuizCat';
import CurrentAffairs from './pages/CurrentAffairs';
import EXAMCALENDERSYLLABUS from './pages/EXAM CALENDER & SYLLABUS';
import Referal from './pages/Admin/Referal';
import UserList from './pages/Admin/UserList';
function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <Toaster position="top-center" reverseOrder={false} />
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
        <Route
          path="createprofile"
          element={

              <CreateProfile />

          }
        />
        <Route
          path="home"
          element={
            <Layout>
              <Dashboard/>
            </Layout>
          }
        />
        <Route
          path="quiz-cat"
          element={
            <Layout>
              <QuizCat />
            </Layout>
          }
        />
        <Route
          path="PreviousQuestionPaper"
          element={
            <Layout>
              <PreviousQuestionPaper/>
            </Layout>
          }
        />
        <Route
          path="Profile"
          element={
            <Layout>
              <Profile/>
            </Layout>
          }
        />
        <Route
          path="PscBullettin"
          element={
            <Layout>
              <PscBullettin />
            </Layout>
          }
        />
        <Route
          path="EXAMCALENDER&SYLLABUS"
          element={
            <Layout>
              <EXAMCALENDERSYLLABUS />
            </Layout>
          }
        />
        <Route
          path="SpecialTopic"
          element={
            <Layout>
              <SpecialTopic />
            </Layout>
          }
        />
        <Route
          path="StudyPlan"
          element={
            <Layout>
              <StudyPlan />
            </Layout>
          }
        />
        <Route
          path="Subscribition"
          element={
            <Layout>
              <Subscribition />
            </Layout>
          }
        />
        <Route
          path="CurrentAffairs"
          element={
            <Layout>
              <CurrentAffairs/>
            </Layout>
          }
        />
         <Route
          path="Referal"
          element={
            <Layout>
              <Referal/>
            </Layout>
          }
        />
        <Route
          path="User"
          element={
            <Layout>
              <UserList/>
            </Layout>
          }
        />


            </Route>
            <Route element={<LoginPage />} path="/" />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
