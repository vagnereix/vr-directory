import { defineQuery } from "next-sanity";

/**
 * Query to fetch startups from Sanity.
 *
 * This query does the following:
 * - Selects all documents of type "startup".
 * - Ensures the `slug.current` field is defined.
 * - If the `$search` parameter is not defined, returns all documents.
 * - If the `$search` parameter is defined, filters the documents where:
 *   - The title (`title`) matches the `$search` value.
 *   - The category (`category`) matches the `$search` value.
 *   - The author's name (`author -> name`) matches the `$search` value.
 * - Orders the results by creation date (`_createdAt`) in descending order.
 * - Specifies the fields to return for each document.
 */
export const STARTUPS_QUERY = defineQuery(`
  *[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author -> name match $search] | order(_createdAt desc) {
    _id, 
    _createdAt,
    title,
    slug,
    image,
    description,
    views,
    category,
    author -> {
      _id, name, image, bio
    }
  }
`);

/**
 * Query to fetch a single startup by ID from Sanity.
 *
 * This query does the following:
 * - Selects a document of type "startup" with the specified ID.
 * - Specifies the fields to return for each document.
 */
export const STARTUP_BY_ID_QUERY = defineQuery(`
  *[_type == "startup" && _id == $id][0] {
    _id, 
    _createdAt,
    title,
    slug,
    image,
    description,
    views,
    category,
    pitch,
    author -> {
      _id, name, username, image, bio
    }
  }  
`);

export const STARTUP_VIEWS_QUERY = defineQuery(`
  *[_type == "startup" && _id == $id][0] {
    _id, views
  }
`);
