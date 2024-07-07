const db = require('./db');
const helper = require('../helper');

async function getFormattedGuideData() {
    const stageDataQuery = `
        SELECT 
            s.name AS stage,
            c.name AS category_name,
            cd.name AS item_name,
            cd.tier AS tier
        FROM
            stages s
        JOIN
            categories c ON s.id = c.stage_id
        JOIN
            category_data cd ON c.id = cd.category_id
        ORDER BY
            s.order_level
    `;
    const rawData = await db.query(stageDataQuery);
    const stagesData = helper.emptyOrRows(rawData);

    const formattedData = { stages: {} };

    stagesData.forEach(row => {
        const { stage, category_name, item_name, tier } = row;

        if (!formattedData.stages[stage]) {
            formattedData.stages[stage] = { categories: {} };
        }

        if (!formattedData.stages[stage].categories[category_name]) {
            formattedData.stages[stage].categories[category_name] = {};
        }

        formattedData.stages[stage].categories[category_name][item_name] = tier;
    });

    return formattedData;
}

module.exports = {
    getFormattedGuideData
}