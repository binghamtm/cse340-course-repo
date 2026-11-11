import { getAllServiceProjects } from '../models/projects.js';

const showProjectsPage = async (req, res) => {
    const projects = await getAllServiceProjects();
    const title = 'Service Projects';
    res.render('projects', { title, projects });
};

export { showProjectsPage };