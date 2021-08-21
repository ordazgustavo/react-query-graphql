/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Characters
// ====================================================

export interface Characters_characters_info {
  __typename: "Info";
  /**
   * The length of the response.
   */
  count: number | null;
  /**
   * The amount of pages.
   */
  pages: number | null;
  /**
   * Number of the next page (if it exists)
   */
  next: number | null;
}

export interface Characters_characters_results {
  __typename: "Character";
  /**
   * The name of the character.
   */
  name: string | null;
}

export interface Characters_characters {
  __typename: "Characters";
  info: Characters_characters_info | null;
  results: (Characters_characters_results | null)[] | null;
}

export interface Characters {
  /**
   * Get the list of all characters
   */
  characters: Characters_characters | null;
}
