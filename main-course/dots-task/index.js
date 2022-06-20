function permute(str) {
  let allVariants = [];

  for (let i = 0; i < str.length; i++) {
    if (i === 0) {
      allVariants.push(str[i]);
    } else {
      const noDot = allVariants.map((el) => el + str[i]);
      const withDot = allVariants.map((el) => el + "." + str[i]);
      allVariants = [...noDot, ...withDot];
    }
  }

  return allVariants;
}

console.log(permute("abcd"));
