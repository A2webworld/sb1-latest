import { Handler } from '@netlify/functions';
import fs from 'fs';
import path from 'path';

export const handler: Handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { products } = JSON.parse(event.body || '{}');
        
        if (!products || !Array.isArray(products)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid products data' })
            };
        }

        // Save to products.json in the public folder
        const filePath = path.join(process.cwd(), 'public', 'products.json');
        fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

        return {
            statusCode: 200,
            body: JSON.stringify({ 
                success: true, 
                message: `Saved ${products.length} products`,
                count: products.length
            })
        };
    } catch (error) {
        console.error('Error saving products:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Failed to save products',
                details: error instanceof Error ? error.message : 'Unknown error'
            })
        };
    }
};
