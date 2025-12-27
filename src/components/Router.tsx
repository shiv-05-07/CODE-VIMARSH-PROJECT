import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import EventsPage from '@/components/pages/EventsPage';
import EventDetailPage from '@/components/pages/EventDetailPage';
import ProjectsPage from '@/components/pages/ProjectsPage';
import ProjectDetailPage from '@/components/pages/ProjectDetailPage';
import RoadmapPage from '@/components/pages/RoadmapPage';
import JoinPage from '@/components/pages/JoinPage';
import MembersDirectoryPage from '@/components/pages/MembersDirectoryPage';
import MemberDetailPage from '@/components/pages/MemberDetailPage';
import NotFoundPage from '@/components/pages/NotFoundPage';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "events",
        element: <EventsPage />,
      },
      {
        path: "events/:id",
        element: <EventDetailPage />,
      },
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetailPage />,
      },
      {
        path: "roadmap",
        element: <RoadmapPage />,
      },
      {
        path: "join",
        element: <JoinPage />,
      },
      {
        path: "members",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to view the team members directory">
            <MembersDirectoryPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "members/:id",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to view member details">
            <MemberDetailPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
