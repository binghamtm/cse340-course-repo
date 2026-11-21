import { getAllCategories, getCategoryByID, getAllProjectsForCategory, getCategoriesByServiceProjectId, updateCategoryAssignments, updateCategoryName, createCategory } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';
import { body, validationResult } from "express-validator";

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters'),
];

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Categories';
    res.render('categories', { title, categories });
};

const showCategoriesDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const [category] = await getCategoryByID(categoryId);
    const projects = await getAllProjectsForCategory(categoryId);
    const title = 'Category Details';
    res.render('category', { title, category, projects });
}

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByServiceProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    
    const selectedCategoryIds = req.body.categoryIds || [];

    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

const showNewCategoryForm = async (req, res) => {
    const title = 'Add New Category';

    res.render('new-category', { title });
}

const processNewCategoryForm = async (req, res) => {
    
    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        return res.redirect(`/new-category`);
    }

    const { name } = req.body;
    

    const categoryId = await createCategory(name);
    req.flash('success', 'Category added successfully!');
    res.redirect(`/categories/${categoryId}`);
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.categoryId;
    const [categoryDetails] = await getCategoryByID(categoryId);

    const title = 'Edit Category';
    res.render('edit-category', { title, categoryDetails });
};

const processEditCategoryForm = async (req, res) => {
    const categoryId = req.params.categoryId;
    const { name } = req.body;

    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        return res.redirect(`/edit-category/${categoryId}`);
    }

    
    await updateCategoryName(categoryId, name);

    // Set a success flash message
    req.flash('success', 'Category updated successfully!');

    res.redirect(`/categories/${categoryId}`);
};

export { showCategoriesPage, showCategoriesDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, processEditCategoryForm, showEditCategoryForm, processNewCategoryForm, showNewCategoryForm, categoryValidation };