import BaseLayout from "@/layout/BaseLayout";
import { Home, About, NotFound, ContactUs, Team } from "@/pages";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/team" element={<Team />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

export default router;
