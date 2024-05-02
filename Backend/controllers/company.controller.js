import mongoose from "mongoose";
import CompanyModel from "../models/company.model";

export const getCompanies = async (req, res) => {
    try {
        const { search, limit, page, studentid } = req.query;
        const skipno = limit * (page - 1)

        const pipeline = [

            { $sort: { '_id': -1 } },
        ]

        const generateSearchRgx = (pattern) => new RegExp(`.*${pattern}.*`);
        const searchRgx = generateSearchRgx(search);
        let filter = {}

        if (search) {
            filter = {
                $or: [
                    { company_name: { $regex: searchRgx, $options: "i" } },
                    { company_description: { $regex: searchRgx, $options: "i" } },
                ]
            }
            pipeline.push({ $match: filter })
        }

        if (parseInt(limit) && parseInt(page)) {
            pipeline.push({ $skip: skipno }, { $limit: parseInt(limit) })
        }

        if (studentid) {
            const ObjectId = mongoose.Types.ObjectId;
            pipeline.push({ $match: { student_detail: new ObjectId(studentid) } })
        }
        // console.log(pipeline)
        const getComp = await CompanyModel.aggregate(pipeline);

        if (getComp) {
            return res.status(200).json({
                data: getComp,
                message: "Fetched"
            })
        }

        return res.status(400).json({
            message: "Bad Request"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}

export const addCompany = (req, res) => {
    try {

        const { company_name, company_description, date, company_status, student_detail } = req.body;

        const add_comp = new CompanyModel({
            company_name: company_name,
            company_description: company_description,
            date: date,
            company_status: company_status,
            student_detail: student_detail,
        })
        add_comp.save()

        if (add_comp) {
            return res.status(201).json({
                data: add_comp,
                message: "created"
            })
        }
        return res.status(400).json({
            message: "Bad r"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}

export const getCompany = async (req, res) => {
    try {
        const companyID = req.params.company_id;
        const get_company = await CompanyModel.findOne({ _id: companyID }).populate("student_detail")

        if (get_company) {
            return res.status(200).json({
                data: get_company,
                message: "Fetched"
            })
        }

        return res.status(400).json({
            message: "Bad request"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const updateCompany = async (req, res) => {
    try {
        const companyID = req.params.company_id;
        const { company_name, company_description, date, company_status, student_detail } = req.body;

        const update_comp = await CompanyModel.updateOne({ _id: companyID }, {
            $set: {
                company_name: company_name,
                company_description: company_description,
                date: date,
                company_status: company_status,
                student_detail: student_detail,
            }
        })

        if (update_comp.acknowledged) {
            return res.status(200).json({
                message: "Updated"
            })
        }

        return res.status(400).json({
            message: "Bad request"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const deleteCompany = async (req, res) => {
    try {
        const companyID = req.params.company_id;
        const delete_comp = await CompanyModel.deleteOne({ _id: companyID })

        if (delete_comp) {
            return res.status(200).json({
                message: "Deleted"
            })
        }

        return res.status(400).json({
            message: "Bad request"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}