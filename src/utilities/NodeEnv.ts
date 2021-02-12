/**
 * 本番モードの場合にTRUEを返却する.
 */
export const isProduction = (): boolean => {
  return process.env.NODE_ENV == 'production';
};
