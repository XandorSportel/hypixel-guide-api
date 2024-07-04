const db = require('./db');
const helper = require('../helper');

async function getFormattedGuideData() {
    const guideDataQuery = `
        SELECT 
            g.level AS guide_level,
            c.category_name AS category_name,
            cd.item_name AS item_name,
            cd.quantity AS quantity
        FROM
            guides g
        JOIN
            categories c ON g.id = c.guide_id
        JOIN
            category_data cd ON c.id = cd.category_id
        ORDER BY
            g.order_level
    `;
    const rawData = await db.query(guideDataQuery);
    const guidesData = helper.emptyOrRows(rawData);

    const formattedData = {
        guides: {
            starter: { categories: {} },
            amateur: { categories: {} },
            intermediate: { categories: {} }
        }
    };

    guidesData.forEach(row => {
        const { guide_skill_level, category_name, item_name, quantity } = row;

        formattedData.guides[guide_skill_level].categories[category_name] = {
            [item_name]: quantity
        };
    });

    return {
        data: formattedData
    };
}

module.exports = {
    getFormattedGuideData
}