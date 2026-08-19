import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export const handler: Handler = async (event) => {
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

        // Delete all existing products
        await supabase.from('products').delete().neq('id', '');
        
        // Insert all products
        const { data, error } = await supabase
            .from('products')
            .insert(products.map(p => ({
                id: p.id || crypto.randomUUID(),
                name: p.name,
                price: p.price,
                original_price: p.originalPrice || null,
                image: p.image,
                category: p.category,
                rating: p.rating || 0,
                reviews: p.reviews || 0,
                description: p.description || '',
                in_stock: p.inStock !== false,
                is_new: p.isNew || false,
                is_on_sale: p.isOnSale || false
            })));

        if (error) {
            console.error('Supabase error:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Database error', details: error.message })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ 
                success: true, 
                message: `Saved ${products.length} products to database`,
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