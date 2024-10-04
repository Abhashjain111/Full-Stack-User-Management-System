// src/types/user.ts
export interface User {
  id?: number;
  name: string;
  email: string;
  image?: string | null;
  favoriteCodingLanguage: 'Java' | 'C++' | 'Python' | 'JavaScript'; 
  dateOfBirth: Date;
  age: number|null;
  domains:Array<string> ;
}
