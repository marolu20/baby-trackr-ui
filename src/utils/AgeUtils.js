export function getAgeDisplay(baby) {
    if (!baby) return '';
    const { ageMonths, ageWeeks, ageYears, birthDate } = baby;

    let calculatedDays = 0;
    if (birthDate) {
        const birth = new Date(birthDate);
        const today = new Date();

        birth.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const differenceInTime = today.getTime() - birth.getTime();
        calculatedDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
    }

    if (ageMonths === 0 && ageWeeks === 0 && ageYears === 0) {
        if (calculatedDays > 0) {
            return `${calculatedDays} Day${calculatedDays > 1 ? 's' : ''}`;
        }
        return "0 Weeks";
    }

    if (ageYears >= 1 || ageMonths > 12) {
        const actualYears = ageYears || Math.floor(ageMonths / 12);
        const remainingMonths = ageMonths % 12;
        const yearText = `${actualYears} Year${actualYears > 1 ? 's' : ''}`;
        const monthText = remainingMonths > 0 ? `${remainingMonths} Month${remainingMonths > 1 ? 's' : ''}` : '';
        return [yearText, monthText].filter(Boolean).join(', ');
    }

    if (ageMonths > 0) {
        return `${ageMonths} Month${ageMonths > 1 ? 's' : ''}`;
    }

    if (ageWeeks === 0 && calculatedDays > 0) {
        return `${calculatedDays} Day${calculatedDays > 1 ? 's' : ''}`;
    }

    return `${ageWeeks} Week${ageWeeks > 1 ? 's' : ''}`;
}
