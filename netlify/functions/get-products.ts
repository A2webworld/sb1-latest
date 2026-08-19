import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export const handler: Handler = async (event) => {
    try {
        const { data: products, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Database error', details: error.message })
            };
        }

        // Convert database fields back to frontend format
        const formattedProducts = (products || []).map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            originalPrice: p.original_price,
            image: p.image,
            category: p.category,
            rating: p.rating || 0,
            reviews: p.reviews || 0,
            description: p.description || '',
            inStock: p.in_stock !== false,
            isNew: p.is_new || false,
            isOnSale: p.is_on_sale || false
        }));

        return {
            statusCode: 200,
            body: JSON.stringify(formattedProducts)
        };
    } catch (error) {
        console.error('Error loading products:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Failed to load products',
                details: error instanceof Error ? error.message : 'Unknown error'
            })
        };
    }
};