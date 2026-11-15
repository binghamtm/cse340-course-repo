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

export { getAllCategories, getCategoryByID, getAllProjectsForCategory }