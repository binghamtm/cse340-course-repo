import db from './db.js'

const getAllServiceProjects = async () => {
    const query = `
        SELECT p.project_id, p.organization_id, p.title, p.description,
        p.location, p.date, o.name AS organization_name
        FROM public.service_projects AS p
        LEFT JOIN public.organization AS o
        ON p.organization_id = o.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

export { getAllServiceProjects }  