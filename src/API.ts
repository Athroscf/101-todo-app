/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTaskInput = {
  id?: string | null,
  task: string,
  important: boolean,
};

export type ModelTaskConditionInput = {
  task?: ModelStringInput | null,
  important?: ModelBooleanInput | null,
  and?: Array< ModelTaskConditionInput | null > | null,
  or?: Array< ModelTaskConditionInput | null > | null,
  not?: ModelTaskConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Task = {
  __typename: "Task",
  id: string,
  task: string,
  important: boolean,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTaskInput = {
  id: string,
  task?: string | null,
  important?: boolean | null,
};

export type DeleteTaskInput = {
  id: string,
};

export type CreateNotesInput = {
  id?: string | null,
  title: string,
  description?: string | null,
};

export type ModelNotesConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelNotesConditionInput | null > | null,
  or?: Array< ModelNotesConditionInput | null > | null,
  not?: ModelNotesConditionInput | null,
};

export type Notes = {
  __typename: "Notes",
  id: string,
  title: string,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateNotesInput = {
  id: string,
  title?: string | null,
  description?: string | null,
};

export type DeleteNotesInput = {
  id: string,
};

export type ModelTaskFilterInput = {
  id?: ModelIDInput | null,
  task?: ModelStringInput | null,
  important?: ModelBooleanInput | null,
  and?: Array< ModelTaskFilterInput | null > | null,
  or?: Array< ModelTaskFilterInput | null > | null,
  not?: ModelTaskFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelTaskConnection = {
  __typename: "ModelTaskConnection",
  items:  Array<Task | null >,
  nextToken?: string | null,
};

export type ModelNotesFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelNotesFilterInput | null > | null,
  or?: Array< ModelNotesFilterInput | null > | null,
  not?: ModelNotesFilterInput | null,
};

export type ModelNotesConnection = {
  __typename: "ModelNotesConnection",
  items:  Array<Notes | null >,
  nextToken?: string | null,
};

export type CreateTaskMutationVariables = {
  input: CreateTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type CreateTaskMutation = {
  createTask?:  {
    __typename: "Task",
    id: string,
    task: string,
    important: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTaskMutationVariables = {
  input: UpdateTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type UpdateTaskMutation = {
  updateTask?:  {
    __typename: "Task",
    id: string,
    task: string,
    important: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTaskMutationVariables = {
  input: DeleteTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type DeleteTaskMutation = {
  deleteTask?:  {
    __typename: "Task",
    id: string,
    task: string,
    important: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateNotesMutationVariables = {
  input: CreateNotesInput,
  condition?: ModelNotesConditionInput | null,
};

export type CreateNotesMutation = {
  createNotes?:  {
    __typename: "Notes",
    id: string,
    title: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateNotesMutationVariables = {
  input: UpdateNotesInput,
  condition?: ModelNotesConditionInput | null,
};

export type UpdateNotesMutation = {
  updateNotes?:  {
    __typename: "Notes",
    id: string,
    title: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteNotesMutationVariables = {
  input: DeleteNotesInput,
  condition?: ModelNotesConditionInput | null,
};

export type DeleteNotesMutation = {
  deleteNotes?:  {
    __typename: "Notes",
    id: string,
    title: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetTaskQueryVariables = {
  id: string,
};

export type GetTaskQuery = {
  getTask?:  {
    __typename: "Task",
    id: string,
    task: string,
    important: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTasksQueryVariables = {
  filter?: ModelTaskFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTasksQuery = {
  listTasks?:  {
    __typename: "ModelTaskConnection",
    items:  Array< {
      __typename: "Task",
      id: string,
      task: string,
      important: boolean,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetNotesQueryVariables = {
  id: string,
};

export type GetNotesQuery = {
  getNotes?:  {
    __typename: "Notes",
    id: string,
    title: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListNotesQueryVariables = {
  filter?: ModelNotesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotesQuery = {
  listNotes?:  {
    __typename: "ModelNotesConnection",
    items:  Array< {
      __typename: "Notes",
      id: string,
      title: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTaskSubscription = {
  onCreateTask?:  {
    __typename: "Task",
    id: string,
    task: string,
    important: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTaskSubscription = {
  onUpdateTask?:  {
    __typename: "Task",
    id: string,
    task: string,
    important: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTaskSubscription = {
  onDeleteTask?:  {
    __typename: "Task",
    id: string,
    task: string,
    important: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateNotesSubscription = {
  onCreateNotes?:  {
    __typename: "Notes",
    id: string,
    title: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateNotesSubscription = {
  onUpdateNotes?:  {
    __typename: "Notes",
    id: string,
    title: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteNotesSubscription = {
  onDeleteNotes?:  {
    __typename: "Notes",
    id: string,
    title: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
