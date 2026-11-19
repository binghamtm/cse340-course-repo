import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT category_id, category_name
        FROM public.categories;
        `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryByID = async (categoryID) => {
  const query = `
    SELECT category_id, category_name
    FROM public.categories
    WHERE category_id = $1;
    `;
  const queryParams = [categoryID];
  const result = await db.query(query, queryParams);

  return result.rows;
}

const getAllProjectsForCategory = async (categoryID) => {
  const query = `
        SELECT
            sp.project_id,
            sp.organization_id,
            sp.title,
            sp.description,
            sp.location,
            sp.date
        FROM public.service_projects sp
        INNER JOIN public.projects_categories pc
        ON sp.project_id = pc.project_id
        WHERE pc.category_id = $1;
    `;
  const queryParams = [categoryID];
  const result = await db.query(query, queryParams);

  return result.rows;
}

const getCategoriesByServiceProjectId = async (projectId) => {
  const query = `
        SELECT c.category_id, c.category_name
        FROM public.categories c
        INNER JOIN public.projects_categories pc
        ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;
  const result = await db.query(query, [projectId]);

  return result.rows;
}

const assignCategoryToProject = async (categoryId, projectId) => {
  const query = `
        INSERT INTO public.projects_categories (category_id, project_id)
        VALUES ($1, $2);
    `;

  await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async (projectId, categoryIds) => {
  // First, remove existing category assignments for the project
  const deleteQuery = `
        DELETE FROM public.projects_categories
        WHERE project_id = $1;
    `;
  await db.query(deleteQuery, [projectId]);

  // Next, add the new category assignments
  for (const categoryId of categoryIds) {
    await assignCategoryToProject(categoryId, projectId);
  }
}

export { getAllCategories, getCategoryByID, getAllProjectsForCategory, getCategoriesByServiceProjectId, updateCategoryAssignments }