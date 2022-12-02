export interface User {
  name: string;
  surname: string;
  login: string;
  password: string;
}

export interface Post {
  id: string;
  user: User;
  body: string;
  date: string;
}

export interface PostProps {
  post: Post;
}
