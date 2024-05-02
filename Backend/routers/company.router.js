import express from 'express';
import { addCompany, deleteCompany, getCompanies, getCompany, updateCompany } from '../controllers/company.controller';

const router = express.Router();

router.get('/get-companies', getCompanies)
router.post('/add-company', addCompany)
router.get('/get-company/:company_id', getCompany)
router.put('/update-company/:company_id', updateCompany)
router.delete('/delete-company/:company_id', deleteCompany)

export default router