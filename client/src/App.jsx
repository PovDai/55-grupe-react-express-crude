

import { BrowserRouter, Route, Routes } from 'react-router'
import { PublicTemplate } from './templates/PublicTemplate'
import { HomePage } from './pages/public/Home'
import { LoginPage } from './pages/public/Login'
import { RegisterPage } from './pages/public/Register'
import { Page404 } from './pages/public/Page404'
import {Dashboard  } from './pages/admin/Dashboard'
import { AdminTemplate } from './templates/AdminTemplate'
import { CategoriesPage } from './pages/public/Categories'
import { UserContextWrapper } from './context/user/UserContextWrapper'
import { CategoryInnerPage } from './pages/public/CategorieInner'
import { LogoutPage } from './pages/public/Logout'
import { AdminCategoriesAllPage } from './pages/admin/categories/CategoriesAll'
import { AdminCategoriesDraftPage } from './pages/admin/categories/CategoriesDraft'
import { AdminCategoriesPublishedPage } from './pages/admin/categories/CategoriesPublished'
import { AdminNewCategoryPage } from './pages/admin/categories/NewCategory'
import { AdminEditCategoryPage } from './pages/admin/categories/EditCategory'
import { AdminViewCategoryPage } from './pages/admin/categories/ViewCategory'
import { CategoriesContextWrapper } from './context/categories/CategoriesContextWrapper'
import { StudentTemplate } from './templates/StudentTemplate';
import { Home } from './components/students/Home'
import { Create } from './components/students/Create'
import { Edit } from './components/students/Edit';
import { Read } from './components/students/Read'
import { HomeComments } from './components/komentarai/HomeComment'
import { CreateComments } from './components/komentarai/CreateComment'
import { EditComments } from './components/komentarai/EditComment';
import {ReadComments} from'./components/komentarai/ReadComment'

export function App() {
  

  return (
    <UserContextWrapper>
      <CategoriesContextWrapper>
     
        <BrowserRouter>
          <Routes>
            <Route element={<PublicTemplate />}>
              <Route path='/' index element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/logout' element={<LogoutPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/categories' element={<CategoriesPage />} />
              <Route path='/categories/:category' element={<CategoryInnerPage />} />
            
            </Route>

            <Route element={<AdminTemplate />}>
              <Route path='/admin/categories' element={<AdminCategoriesAllPage />} />
              <Route path='/admin/categories/new' element={<AdminNewCategoryPage />} />
              <Route path='/admin/categories/:category' element={<AdminViewCategoryPage />} />
              <Route path='/admin/categories/:category/edit' element={<AdminEditCategoryPage />} />
              <Route path='/admin/categories/draft' element={<AdminCategoriesDraftPage />} />
              <Route path='/admin/categories/published' element={<AdminCategoriesPublishedPage />} />
            
            </Route>
        <Route element={<StudentTemplate />}>
        <Route path="/students" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/read/:id" element={<Read />} />
              
              <Route path='/komentarai' element={<HomeComments/>} />
              <Route path='/kurti' element={<CreateComments />} />
              <Route path='/koreguoti/:id' element={<EditComments />} />
              <Route path='/skaityti/:id' element={<ReadComments/>}/>
            </Route>

          




            <Route element={<PublicTemplate />}>
              <Route path='*' element={<Page404 />} />
            </Route>
  
          </Routes>
        </BrowserRouter>
      </CategoriesContextWrapper>
    </UserContextWrapper>
  );
}


