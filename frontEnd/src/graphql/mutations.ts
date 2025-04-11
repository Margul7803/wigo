import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export const REGISTER_USER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, password: $password, email: $email)
}
`;

export const CREATE_ARTICLE = gql`
  mutation PostArticle($title: String!, $content: String!) {
    postArticle(title: $title, content: $content) {
      id
      title
      content
      authorId
      createdAt
      updatedAt
    }
}
`;

export const EDIT_ARTICLE = gql`
  mutation Mutation($articleId: String!, $content: String!, $title: String!) {
    updateArticle(id: $articleId, content: $content, title: $title) {
      title
      content
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($articleId: String!) {
    deleteArticle(id: $articleId)
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($content: String!, $articleId: String!) {
    addComment(content: $content, articleId: $articleId) {
      content
      authorId
      articleId
      createdAt
    }
}
`;

export const TOGGLE_LIKE = gql`
  mutation ToggleLike($userId: String!, $articleId: String!) {
    toggleLike(userId: $userId, articleId: $articleId)
}
`;