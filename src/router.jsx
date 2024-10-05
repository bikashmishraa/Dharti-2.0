import BaseLayout from '@/layout/BaseLayout';
import { Home, About, NotFound } from '@/pages';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<BaseLayout />}>
        <Route index element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
        {/* <Route path='/contactus' element={<ContactUs />} /> */}
      </Route>
    </>
  )
);

export default router;
