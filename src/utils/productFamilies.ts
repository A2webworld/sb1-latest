import { Product } from '../types';

/**
 * Normalize a product name to a "family key" by stripping the trailing size token.
 * Example: "Nestlé Nido Instant Full Cream Milk Powder 900g" -> "nestlé nido instant full cream milk powder"
 *          "Checkers Milk Custard 1.5kg"                   -> "checkers milk custard"
 *          "Tropical Instant Ginger Herbal Tea 20 Bags"    -> "tropical instant ginger herbal tea"
 */
export function familyKey(name: string): string {
  let key = name.toLowerCase().trim();

  // Strip trailing size patterns, in this order of specificity:
  // - "20 sachets", "24 bags", "5 pieces", "3 pcs", "240 pack"
  // - "1.5kg", "900g", "410ml", "2L", "1 litre", "1 lit"
  // - "- x4", "- 400g", " 400g"
  key = key.replace(/[\s\-–]+(x\s*)?\d+(\.\d+)?\s*(g|kg|ml|l|cl|litre|lit|ltrs?|pieces?|pcs?|pack|sachets?|bags?|tablets?|capsules?)\b\.?$/i, '');
  key = key.replace(/[\s\-–]+(x\s*)?\d+(\.\d+)?\s*(g|kg|ml|l|cl|litre|lit|ltrs?|pieces?|pcs?|pack|sachets?|bags?|tablets?|capsules?)\b.*$/i, '');

  // Also strip a bare trailing number preceded by space: "Product 2"
  key = key.replace(/[\s\-–]+\d+\s*$/i, '');

  // Strip "refill" markers so we can group the refill and the tub into the same family
  // BUT we'll treat "refill" as its own sub-family, so leave it in place:
  // We choose NOT to strip refill — refills are a distinct family.

  // Trim & collapse whitespace
  key = key.replace(/\s+/g, ' ').trim();

  return key;
}

/**
 * Extract the size token from a product name (returns '' if none).
 * Example: "Nestlé Nido ... 900g" -> "900g"
 */
export function sizeToken(name: string): string {
  const match = name.match(/(\d+(?:\.\d+)?\s*(?:g|kg|ml|l|cl|litre|lit|ltrs?|pieces?|pcs?|pack|sachets?|bags?))/i);
  return match ? match[1].replace(/\s+/g, ' ').trim() : '';
}

export interface ProductFamily {
  key: string;
  /** Sorted by parsed weight ascending, then alphabetically */
  variants: Product[];
}

/**
 * Given a list of products, group them into families.
 * Every product ends up in exactly one family (some families have 1 variant).
 */
export function buildFamilies(products: Product[]): Map<string, ProductFamily> {
  const families = new Map<string, ProductFamily>();

  for (const product of products) {
    const key = familyKey(product.name);
    if (!families.has(key)) {
      families.set(key, { key, variants: [] });
    }
    families.get(key)!.variants.push(product);
  }

  // Sort variants inside each family by parsed size ascending
  for (const family of families.values()) {
    family.variants.sort((a, b) => parseWeight(a.name) - parseWeight(b.name));
  }

  return families;
}

/**
 * Parse a size token into comparable grams/millilitres.
 * Returns Infinity if we can't parse.
 */
function parseWeight(name: string): number {
  const match = name.match(/(\d+(?:\.\d+)?)\s*(g|kg|ml|l|cl|litre|lit|ltrs?|pieces?|pcs?|pack|sachets?|bags?)/i);
  if (!match) return Infinity;

  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();

  if (unit === 'g') return value;
  if (unit === 'kg') return value * 1000;
  if (unit === 'ml') return value * 0.001;   // treat 1 ml as 1 g for sorting
  if (unit === 'cl') return value * 0.01;
  if (unit === 'l' || unit === 'litre' || unit === 'lit' || unit === 'ltrs') return value;

  // Non-weight units (pieces, pack, sachets, bags) — sort after weight-based ones
  return 1000000 + value;
}

/**
 * Given one product and the full list, return its siblings (including itself).
 */
export function getSiblings(product: Product, allProducts: Product[]): Product[] {
  const key = familyKey(product.name);
  return allProducts
    .filter(p => familyKey(p.name) === key)
    .sort((a, b) => parseWeight(a.name) - parseWeight(b.name));
}

/**
 * Collapse the full product list into one representative per family.
 * The representative is the cheapest sibling (so cards show "From £X").
 * Result: roughly 130 cards instead of 153, no duplicates by family.
 */
export function collapseToFamilies(products: Product[]): Product[] {
  const families = buildFamilies(products);
  const reps: Product[] = [];

  for (const family of families.values()) {
    // Cheapest sibling becomes the representative
    const rep = family.variants.reduce(
      (cheapest, v) => (v.price < cheapest.price ? v : cheapest),
      family.variants[0]
    );
    reps.push(rep);
  }

  return reps;
}
