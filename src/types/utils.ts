export const getNonNullable = <T>(prop: T): NonNullable<T> => {
  if (!prop) {
    // eslint-disable-line no-alert
    throw new Error(`getNonNullable check failed ${prop}`);
  }

  return prop as NonNullable<T>;
};
