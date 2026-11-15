import { getAllCategories, getCategoryByID, getAllProjectsForCategory } from '../models/categories.js';

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

export { showCategoriesPage, showCategoriesDetailsPage };