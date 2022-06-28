import { IApplication } from "./application";
import { ITechnology } from "./technology";

export interface IOffer {
  applications: IApplication[];
  companyName: string;
  id: string;
  positionName: string;
  salary: number;
  technologies: ITechnology[];
}
