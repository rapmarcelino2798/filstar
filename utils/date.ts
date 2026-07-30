export const computeMinimumDate = (days: number) => {
    const today = new Date();
    const minDateObj = new Date(today);
    minDateObj.setDate(today.getDate() + days);
    const minDateStr = minDateObj.toISOString().split('T')[0];

    return minDateStr;
}