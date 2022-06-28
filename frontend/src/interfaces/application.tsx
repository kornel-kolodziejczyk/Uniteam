import { ITechnology } from "./technology";

export interface IApplication {
  email: string;
  id: string;
  name: string;
  salary: number;
  technologies: ITechnology[];
}
