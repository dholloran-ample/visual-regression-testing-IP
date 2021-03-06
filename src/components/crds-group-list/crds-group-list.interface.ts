export interface GroupUser {
  groups: Group[];
  nickName: string;
  firstName: string;
}

export interface Group {
  id: string;
  name: string;
  url: string;
  role: Role;
  type: Type;
  meeting: Meeting;
  image: string;
  endDate: string;
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
