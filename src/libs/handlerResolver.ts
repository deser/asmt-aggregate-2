export const handlerPath = (context: string): string => {
  const path = context.split(process?.cwd())[1]?.substring(1).replace(/\\/g, '/');
  return path ? `${path}` : '';
};
