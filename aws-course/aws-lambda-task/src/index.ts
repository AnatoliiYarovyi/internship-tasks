const arrExemple: number[] = [-1, -4, 4, 3];
// // ====== 1 =======
const findFirstPositiveElement = (arr: number[]) => {
  const firstPositiveElement: number = arr.find(el => el > 0);
  const indexFirstPositiveElement = arr.findIndex(
    el => el === firstPositiveElement,
  );

  return {
    firstPositiveElement,
    indexFirstPositiveElement,
  };
};

console.log('findFirstPositiveElement: ', findFirstPositiveElement(arrExemple));

// // ====== 2 =======
const findSumPositiveElements = (arr: number[]) => {
  const sumPositiveElement: number = arr.reduce((acc: number, el) => {
    if (el > 0) {
      acc += el;
    }
    return acc;
  }, 0);
  return sumPositiveElement;
};

console.log('findSumPositiveElements: ', findSumPositiveElements(arrExemple));

// ====== 3 =======
const getSumAndProductNumber = (value: number) => {
  // const arrNumber: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const arrNumber: number[] = [];
  for (let i = 1; i <= value; i++) {
    arrNumber.push(i);
  }
  const getSumAndProductNumber = arrNumber.reduce(
    (acc, el, i) => {
      if (i < value) {
        acc.sumNumber += el;
        acc.productNumber *= el;
      }
      return acc;
    },
    { sumNumber: 0, productNumber: 1 },
  );
  return getSumAndProductNumber;
};

console.log('getSumAndProductNumber: ', getSumAndProductNumber(10));

// ====== 4 =======
const getIndexNumber = () => {
  const currentYear = new Date().getFullYear();
  const dateStart = new Date(`January 1, ${currentYear} 00:00:01`);
  const dateToday = new Date();
  const elapsedMilliseconds = dateToday.getTime() - dateStart.getTime();
  const indexNumber = Math.floor(elapsedMilliseconds / 86400000);
  return indexNumber;
};
console.log('getIndexNumber: ', getIndexNumber());

// ====== 5 =======
const userData = [
  {
    firstName: 'Alo',
    lastName: 'Yasd',
    birthDate: '1993-05-26',
  },
  {
    firstName: 'Iren',
    lastName: 'Yarol',
    birthDate: '1988-10-09',
  },
  {
    firstName: 'Body',
    lastName: 'Zaser',
    birthDate: '1988-10-15',
  },
  {
    firstName: 'Ann',
    lastName: 'Dell',
    birthDate: '1996-12-27',
  },
  {
    firstName: 'Vlad',
    lastName: 'Chel',
    birthDate: '1992-06-04',
  },
];

interface Arr {
  firstName: string;
  lastName: string;
  birthDate: string;
}

const sortUserData = (arr: Arr[]) => {
  const byField = (field: string) => {
    return (a: any, b: any) => (a[field] > b[field] ? 1 : -1);
  };

  const copyArrForSortName = arr.slice(0);
  const sortName = copyArrForSortName.sort(byField('firstName'));

  const copyArrForSortBirthDate = arr.slice(0);
  const sortBirthDate = copyArrForSortBirthDate
    .sort(byField('birthDate'))
    .reverse();

  return { sortName, sortBirthDate };
};

console.log('sortUserData: ', sortUserData(userData));
