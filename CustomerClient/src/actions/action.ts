import { Action as BaseAction } from 'redux';

export interface Action<TType extends string, TPayload> extends BaseAction {
  type: TType;
  payload: TPayload;
}

export interface ActionCreator<TType extends string, TPayload> {
  (payload: TPayload): Action<TType, TPayload>;
  type: TType;
  shape: Action<TType, TPayload>;
}

export function createAction<TType extends string, TPayload = never>(type: TType): ActionCreator<TType, TPayload> {
  const action = ((payload: TPayload): Action<TType, TPayload> => {
    return { type, payload };
  }) as ActionCreator<TType, TPayload>;

  action.type = type;
  action.toString = () => type;

  return action;
}
