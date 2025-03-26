export function formatDate(date: string | Date, format: string = 'yyyy-MM-dd'): string {
    let dateObject: Date;
  
    if (typeof date === 'string') {
      dateObject = new Date(date);
      if (isNaN(dateObject.getTime())) {
        console.error('Format de date invalide:', date);
        return '';
      }
    } else if (date instanceof Date) {
      dateObject = date;
    } else {
      console.error('Type de date invalide:', date);
      return '';
    }
  
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
  
    if (format === 'yyyy-MM-dd') {
      return `${year}-${month}-${day}`;
    } else if (format === 'dd-MM-YYYY') {
      return `${day}-${month}-${year}`;
    } else if (format === 'dd/MM/yyyy HH:mm') {
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } else if (format === 'dd/MM/yyyy') {
      return `${day}/${month}/${year}`;
    }
    console.warn('Format de date non pris en charge:', format);
    return '';
}

export function getCurrentDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}