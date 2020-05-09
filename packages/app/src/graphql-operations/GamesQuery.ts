/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GamesQuery
// ====================================================

export interface GamesQuery_games {
  __typename: "Game";
  croppedBackgroundImage: string | null;
  id: string;
  rating: number | null;
  ratings: string | null;
  title: string;
}

export interface GamesQuery {
  games: GamesQuery_games[];
}

export interface GamesQueryVariables {
  searchQuery: string;
  backgroundImageWidth: number;
  backgroundImageHeight: number;
}
