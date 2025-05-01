import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import About from './pages/About';
import Post from './pages/Post';
import Search from './pages/Search';
import CreatePost from './pages/CreatePost';
import Tags from './pages/Tags';
import Admin from './pages/Admin';
import Remedies from './pages/Remedies';
import ChatBot from './pages/ChatBot';
import DoctorConsultations from './pages/DoctorConsultations';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/sonner';
import FloatingChatButton from './components/FloatingChatButton';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:categorySlug" element={<CategoryPage />} />
          <Route path="/posts/:slug" element={<Post />} />
          <Route path="/search" element={<Search />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/tags/:tagSlug" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/remedies" element={<Remedies />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/consultations" element={<DoctorConsultations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Only show the floating chat button when not on the ChatBot page */}
        <Routes>
          <Route path="/chatbot" element={null} />
          <Route path="*" element={<FloatingChatButton />} />
        </Routes>
        
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
