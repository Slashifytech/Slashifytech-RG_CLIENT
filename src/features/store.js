import { configureStore, createReducer } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import adminReducer from './adminDashboardSlice'
import masterReducer from './VehcleOptionsSlice'
import usersReducer from './getUserSlice'
import policyReducer from './policySlice'
import teamReducer from './teamSlice'
import invoiceReducer from './InvoiceSlice'
import documentsReducer from './DocumentSlice'
import agentReducer from './agentSlice'
import amcReducer  from './amcSlice'
import buyBackReducer from './BuyBackSlice'
import ewPolicyReducer from './EwSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    agent: agentReducer,
    master: masterReducer,
    users: usersReducer,
    policy: policyReducer,
    team: teamReducer,
    invoice: invoiceReducer,
    documents: documentsReducer,
    amc: amcReducer,
    buyBack: buyBackReducer,
    ewPolicy: ewPolicyReducer,
  },
});
  