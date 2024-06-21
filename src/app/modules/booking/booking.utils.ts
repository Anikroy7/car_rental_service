export const calculateTotalTime = (startTime: string): number => {
  const start = new Date(startTime);
  const currentTime = Date.now();
  const differenceMs = currentTime - start.getTime();
  const differenceHours = Math.ceil(differenceMs / (1000 * 60 * 60));
  return differenceHours;
};
