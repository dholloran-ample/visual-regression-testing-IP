import { Contact } from "../crds-greeting/crds-greeting-interface";

export interface GroupUser {
  contact: Contact
  groups: Group[];
}

export interface Group {
  id: string;
  name: string;
  role: Role;
  type: Type;
  meeting: Meeting;
}

export interface Role {
  name: string;
  id: string;
}

export interface Type {
  name: string;
  id: string;
}

export interface Meeting {
  day: string;
  time: string;
  frequency: string;
}
