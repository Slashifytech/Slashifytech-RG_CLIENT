import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUsers } from "./features/getUserSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ViewPolicy from "./Components/ViewPolicy";
import ErrorPage from "./Components/ErrorPage";
import ProtectedAdmin from "./Components/ProtectedAdmin";
import Approval from "./pages/Approval";
import AgentForm from "./pages/AgentForm";
import AdminDashboard from "./pages/AdminDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import ProtectedAgent from "./Components/ProtectedAgent"  
import InvoiceForm from "./admin/InvoiceForm";
import InvoiceList from "./admin/InvoiceList";
import InvoiceView from "./pages/InvoiceView";
import AgentList from "./admin/AgentList";
import AddTeam from "./admin/AddTeam";
import TeamList from "./admin/TeamList";
import TeamInvoices from "./admin/TeamInvoices";
import ProtectedAdminTeam from "./Components/ProtectedAdminTeam";
import AMCForm from "./pages/AmcForm";
import BuyBackForm from "./pages/BuyBackForm";
import AdminAmcList from "./pages/AmcList";
import BuyBackLists from "./pages/BuyBackLists";
import AgentDocLists from "./pages/AgentDocLists";
import CancelledApprovals from "./admin/CancelledApprovals";
import CancelledPolicy from "./admin/CancelledPolicy";
import ViewAmc from "./pages/ViewAmc";
import ViewBuyBack from "./pages/ViewBuyBack";
import ChangePassword from "./admin/ChangePassword";
import ChangeEmail from "./admin/ChangeEmail";
import BuyBackProfileView from "./pages/BuyBackProfileView";
import AmcProfileView from "./pages/AmcProfileView";
import EwForm from "./pages/EwForm";
import AdminEwLists from "./pages/EwList";
import EwPdf from "./pages/EwPdf";
import AmcSalesForm from "./pages/AmcSalesForm";
import { ExtendedPolicyOpenForm } from "./pages/ExtendPolicyOpenForm";
import SubmitPage from "./Components/AdminComponents/SubmitPage";
import PublicSubmissionPopup from "./Components/PublicSubmissionPopup";
import BuyBackSalesForm from "./pages/ByBackSalesForm";
import EwSalesForm from "./pages/EwSalesForm";
import ProtectedThirdlev from "./Components/ProtectedThirdlev";

const router = createBrowserRouter([
  {
    path: "/raam-group/login",
    element: <Login></Login>,
  },
   {
    path: "/sales/new-amc",
    element: (
        <AmcSalesForm/>
    ),
  },
     {
    path: "/sales/new-buyback",
    element: (
        <BuyBackSalesForm/>
    ),
  },   {
    path: "/sales/new-ew",
    element: (
        <EwSalesForm/>
    ),
  },
  {
    path: "/submitted-form",
    element: (
        <SubmitPage/>
    ),
  },
  {
    path: "/extended-amc-submitted",
    element: (
        <PublicSubmissionPopup/>
    ),
  },
     {
    path: "/extend-amc",
    element: (
        <ExtendedPolicyOpenForm/>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedAdmin>
        <AdminDashboard></AdminDashboard>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/add-agent",
    element: (
      <ProtectedAdmin>
        <AgentForm></AgentForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/update-agent",
    element: (
      <ProtectedAdmin>
        <AgentForm></AgentForm>
      </ProtectedAdmin>
    ),
  },


  {
    path: "/admin/add-AMC",
    element: (
      <ProtectedAdmin>
        <AMCForm></AMCForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/add-ewpolicy",
    element: (
      <ProtectedAdmin>
        <EwForm></EwForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/agent/amc-form",
    element: (
      <ProtectedAgent>
        <AMCForm></AMCForm>
      </ProtectedAgent>
    ),
  },
  {
    path: "/agent/ewpolicy-form",
    element: (
      <ProtectedAgent>
        <EwForm></EwForm>
      </ProtectedAgent>
    ),
  },
  {
    path: "/admin/update-AMC",
    element: (
      <ProtectedAdmin>
        <AMCForm></AMCForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/agent/edit-AMC",
    element: (
      <ProtectedAgent>
        <AMCForm></AMCForm>
      </ProtectedAgent>
    ),
  },
  {
    path: "/admin/update-ewpolicy",
    element: (
      <ProtectedAdmin>
        <EwForm></EwForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/agent/edit-ewpolicy",
    element: (
      <ProtectedAgent>
        <EwForm></EwForm>
      </ProtectedAgent>
    ),
  },
  {
    path: "/admin/amc-lists",
    element: (
      <ProtectedAdmin>
        <AdminAmcList></AdminAmcList>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/mgsa/amc-lists",
    element: (
      <ProtectedThirdlev>
        <AdminAmcList></AdminAmcList>
      </ProtectedThirdlev>
    ),
  },
  {
    path: "/agent/amcs-list",
    element: (
      <ProtectedAgent>
        <AdminAmcList></AdminAmcList>
      </ProtectedAgent>
    ),
  },
  {
    path: "/agent/ewpolicy-list",
    element: (
      <ProtectedAgent>
        <AdminEwLists></AdminEwLists>
      </ProtectedAgent>
    ),
  },
  {
    path: "/admin/ew-list",
    element: (
      <ProtectedAdmin>
        <AdminEwLists></AdminEwLists>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/agent/ew-list",
    element: (
      <ProtectedAgent>
        <AdminEwLists></AdminEwLists>
      </ProtectedAgent>
    ),
  },
  
  {
    path: "/amc-view/:amcToken",
    element: (
        <ViewAmc></ViewAmc>
    ),
  },
  {
    path: "/buyback-view",
    element: (
        <ViewBuyBack></ViewBuyBack>
    ),
  },
  {
    path: "/buyback/profile-view",
    element: (
        <BuyBackProfileView></BuyBackProfileView>
    ),
  },
  {
    path: "/amc/profile-view",
    element: (
        <AmcProfileView></AmcProfileView>
    ),
  },
  {
    path: "/admin/add-buyback",
    element: (
      <ProtectedAdmin>
        <BuyBackForm></BuyBackForm>
      </ProtectedAdmin>
    ),                                                                                            
  },
  {
    path: "/agent/buyback-form",
    element: (
      <ProtectedAgent>
        <BuyBackForm></BuyBackForm>
      </ProtectedAgent>
    ),
  },
  {
    path: "/admin/update-buyback",
    element: (
      <ProtectedAdmin>
        <BuyBackForm></BuyBackForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/agent/edit-buyback",
    element: (
      <ProtectedAgent>
        <BuyBackForm></BuyBackForm>
      </ProtectedAgent>
    ),
  },
  {
    path: "/admin/buyBack-lists",
    element: (
      <ProtectedAdmin>
        <BuyBackLists></BuyBackLists>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/agent/buyBacks-list",
    element: (
      <ProtectedAgent>
        <BuyBackLists></BuyBackLists>
      </ProtectedAgent>
    ),
  },

  {
    path: "/new-AMC",
    element: (
      <ProtectedAgent>
        <AMCForm></AMCForm>
      </ProtectedAgent>
    ),
  },
  {
    path: "/new-buyback",
    element: (
      <ProtectedAgent>
        <BuyBackForm></BuyBackForm>
      </ProtectedAgent>
    ),
  },
  {
    path: "/admin/approval-lists",
    element: (
      <ProtectedAdminTeam>
        <Approval></Approval>
      </ProtectedAdminTeam>
    ),
  },

  {
    path: "/admin/agent-policies",
    element: (
      <ProtectedAdmin>
        <AgentDocLists></AgentDocLists>
      </ProtectedAdmin>
    ),
  },
 
  {
    path: "/admin/cancelled-policy",
    element: (
      <ProtectedAdmin>
        <CancelledPolicy></CancelledPolicy>
      </ProtectedAdmin>
    ),
  },

  {
    path: "/policy",
    element: <ViewPolicy></ViewPolicy>,
  },  
  {
    path: "/agent-dashboard",
    element: (
      <ProtectedAgent>
        <AgentDashboard/>
      </ProtectedAgent>
    ),
  },
 
  {
    path: "/admin/invoice-form",
    element: (
      <ProtectedAdminTeam>
        <InvoiceForm/>
      </ProtectedAdminTeam>
    ),
  },
  {
    path: "/admin/invoice-edit",
    element: (
      <ProtectedAdminTeam>
        <InvoiceForm/>
      </ProtectedAdminTeam>
    ),
  },
  {
    path: "/ew-view",
    element: (
        <EwPdf/>
    ),
  },
  
  {
    path: "/admin/invoice-lists",
    element: (
      <ProtectedAdminTeam>
        <InvoiceList/>
      </ProtectedAdminTeam>
    ),
  },

  {
    path: "/invoice/:invoiceToken",
    element: (
      // <ProtectedAdmin>
        <InvoiceView/>
      // </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/agent-lists",
    element: (
      <ProtectedAdmin>
        <AgentList/>
      </ProtectedAdmin>
    ),
  },
    {
    path: "/admin/new-team",
    element: (
      <ProtectedAdmin>
        <AddTeam/>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/update-team",
    element: (
      <ProtectedAdmin>
        <AddTeam/>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/team-lists",
    element: (
      <ProtectedAdmin>
        <TeamList/>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/team-invoices",
    element: (
      <ProtectedAdmin>
        <TeamInvoices/>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/cancel-approval-lists",
    element: (
      <ProtectedAdmin>
        <CancelledApprovals/>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/change-email",
    element: (
      <ProtectedAdmin>
        <ChangeEmail/>
      </ProtectedAdmin>
    ),
  },

  {
    path: "/admin/change-password",
    element: (
      <ProtectedAdmin>
        <ChangePassword/>
      </ProtectedAdmin>
    ),
  },


  // {
  //   path: "/test",
  //   element: (
  //       <TestDemo/>
  //   ),
  // },

  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
 
  return (
    <>
    <div className="overflow-hidden">
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
      <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
