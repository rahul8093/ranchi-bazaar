/**
 * Converts a Saleor entity type and UUID to a Relay-compliant Global ID
 * (base64 of `${type}:${id}`)
 *
 * @param type - The GraphQL type (e.g., "ProductVariant", "Checkout")
 * @param id - The raw UUID
 * @returns The base64-encoded Global ID string
 */
export function toGlobalId(type: string, id: string): string {
  return Buffer.from(`${type}:${id}`).toString("base64");
}
