export interface IFileCreateData {
  name: string;
  size: number;
  key: string;
  url: string;
  userID: number;
  emailRead: boolean;
}

export interface IFileReturnDataCreate {
  id: number,
  createdAt: Date,
  name: String,
  size: number,
  key: String,
  url: String,
  userID: number,
  emailRead: boolean,
}

export interface IFileDeleteData {
  id: string,
}

export interface IFileWhereConditions {
  id?: string | undefined,
  createdAt?: Date | undefined,
  name?: string | undefined,
  size?: number | undefined,
  key?: string | undefined,
  url?: string | undefined,
  userID?: number | undefined,
  emailRead?: boolean | undefined,
}

export interface IFileUpdateConditions {
  name?: string | undefined,
  key?: string | undefined,
  url?: string | undefined,
  emailRead?: boolean | undefined,
}

export interface IFileRepository {
  create: (data: IFileCreateData) => Promise<IFileReturnDataCreate>;
  read: () => Promise<IFileReturnDataCreate[]>;
  delete: (data: IFileDeleteData) => Promise<void>;
  readWhere: (where: IFileWhereConditions) => Promise<IFileReturnDataCreate[]>;
  updateWhere: (data: IFileUpdateConditions, where: IFileWhereConditions) => Promise<void>;
}