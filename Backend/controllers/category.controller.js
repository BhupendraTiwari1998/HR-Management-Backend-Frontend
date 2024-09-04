import CategoryModel from "../models/category.model"

export const getCategories = async (req, res) => {
    try {

        const { search } = req.query;

        const generateSearchRgx = (pattern) => new RegExp(`.*${pattern}.*`);

        const searchRgx = generateSearchRgx(search);

        let filter = {}

        if (search) {
            filter = {
                $or: [
                    { course_name: { $regex: searchRgx, $options: "i" } },

                    // {course_description:{$regex:searchRgx, $options:"i"}}
                ]
            }
        }

        const getCat = await CategoryModel.find(filter)

        if (getCat) {
            return res.status(200).json({
                data: getCat,
                message: 'Fetched'
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

export const addCategory = async(req, res) => {
    try {

        const { course_name, course_description } = req.body;

        const existCourse = await CategoryModel.findOne({ course_name: course_name });
        if (existCourse) {
            return res.status(200).json({
                message: "Course already Exist"
            })
        } else {
            const addCat = new CategoryModel({
                course_name: course_name,
                course_description: course_description
            })
            addCat.save()

            if (addCat) {
                return res.status(201).json({
                    data: addCat,
                    message: "Course Created Successfully"
                })
            }

            return res.status(400).json({
                message: "Bad Request"
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}

export const getCategory = async (req, res) => {
    try {

        const categoryID = req.params.category_id;
        const cateGet = await CategoryModel.findOne({ _id: categoryID })

        if (cateGet) {
            return res.status(200).json({
                data: cateGet,
                message: "fetched"
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

export const updateCategory = async (req, res) => {
    try {

        const categoryID = req.params.category_id;
        const { course_name, course_description } = req.body;

        const updateCat = await CategoryModel.updateOne({ _id: categoryID }, {
            $set: {
                course_name: course_name,
                course_description: course_description
            }
        })

        if (updateCat.acknowledged) {
            return res.status(200).json({
                message: "updated"
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

export const deleteCategory = async (req, res) => {
    try {

        const categoryID = req.params.category_id;
        const cateDel = await CategoryModel.deleteOne({ _id: categoryID })
        console.log("course",cateDel)
        if (cateDel.acknowledged) {
            return res.status(200).json({
                message: "deleted",
                data:cateDel
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
