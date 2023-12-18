import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes'
import { Provider } from 'react-redux';
import Store from './store';
import { Toaster } from 'react-hot-toast';
import Layout from './Layout';
import CreateProfile from './pages/CreateProfile';
import Dashboard from './pages/Dashboard';
import PreviousQuestionPaper from './pages/PreviousQuestionPaper';
import Profile from './pages/Profile';
import PscBullettin from './pages/PscBullettin';
import SpecialTopic from './pages/SpecialTopic';
import StudyPlan from './pages/StudyPlan';
import LoginPage from './pages/LoginPage';
import QuizCat from './pages/QuizCat';
import CurrentAffairs from './pages/CurrentAffairs';
import EXAMCALENDERSYLLABUS from './pages/EXAM CALENDER & SYLLABUS';
import Referal from './pages/Admin/Referal';
import UserList from './pages/Admin/UserList';
import Payment from './pages/payment';
import CreateQuestionComponent from './pages/Admin/CreateQuestion';
import PublicWeb from './public';
import Questions from './pages/Admin/Questions';
import CreateCat from './pages/Admin/createCat';
import PrivacyPolicy from './public/privacy';

function App() {

  return (
    <Provider store={Store}>
      <div className="App">
        <Toaster position="top-center" reverseOrder={false} />
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>

              <Route
                path="home"
                element={
                  <Layout>
                    <Dashboard />
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
                    <PreviousQuestionPaper />
                  </Layout>
                }
              />
              <Route
                path="Profile"
                element={
                  <Layout>
                    <Profile />
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
                path="CurrentAffairs"
                element={
                  <Layout>
                    <CurrentAffairs />
                  </Layout>
                }
              />
              <Route
                path="Referal"
                element={
                  <Layout>
                    <Referal />
                  </Layout>
                }
              />
              <Route
                path="User"
                element={
                  <Layout>
                    <UserList />
                  </Layout>
                }
              />
              <Route
                path="question-create"
                element={
                  <Layout>
                    <CreateQuestionComponent />
                  </Layout>
                }
              />
              <Route
                path="/question-create/:questionId?"
                element={
                  <Layout>
                    <CreateQuestionComponent />
                  </Layout>
                }
              />

              <Route
                path="questions"
                element={
                  <Layout>
                    <Questions />
                  </Layout>
                }
              />
                 <Route
                path="cat"
                element={
                  <Layout>
                    <CreateCat/>
                  </Layout>
                }
              />
            </Route>
            <Route element={<LoginPage />} path="/login" />
            <Route element={<Payment />} path="/payment" />
            <Route element={<PublicWeb />} path="/" />
            <Route element={<PrivacyPolicy/>} path="/privacy" />
            <Route
              path="createprofile"
              element={

                <CreateProfile />

              }
            />

          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
