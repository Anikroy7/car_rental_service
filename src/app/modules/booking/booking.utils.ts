export const calculateTotalTime = (
  startTime: string,
  endTime: string
): number => {
  const startDate = new Date(`2000-01-01T${startTime}:00`);
  const endDate = new Date(`2000-01-01T${endTime}:00`);
  const timeDiffMs = endDate.getTime() - startDate.getTime();
  const timeDiffHours = timeDiffMs / (1000 * 60 * 60);
  return timeDiffHours;
};
