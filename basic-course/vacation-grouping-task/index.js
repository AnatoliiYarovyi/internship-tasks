const fs = require("fs/promises");

const getAll = async () => {
  try {
    const data = await fs
      .readFile("dbStart.json")
      .then((data) => {
        return JSON.parse(data);
      })
      .catch((err) => console.log(err.message));

    const allEmployee = await getAllEmployee(data);
    const filterVacation = await getfilterVacation(data, allEmployee);
    const stringData = await JSON.stringify(filterVacation);

    await fs.writeFile("dbAfterFilter.json", stringData);
    console.log(`Data save in "dbAfterFilter.json"`);
  } catch (error) {
    console.log(error);
  }
};

const getAllEmployee = (data) => {
  const allId = data.reduce((acc, el) => {
    if (acc.find((x) => x.id === el.user._id) === undefined) {
      acc.push({
        id: el.user._id,
        name: el.user.name,
      });
    }
    return acc;
  }, []);

  return [...new Set(allId)];
};

const getfilterVacation = (data, allEmployee) => {
  return allEmployee.reduce((acc, el) => {
    acc.push({
      userId: el.id,
      name: el.name,
      weekendDates: data.reduce((acum, elem) => {
        if (el.id === elem.user._id) {
          acum.push({
            startDate: elem.startDate,
            endDate: elem.endDate,
          });
        }
        return acum;
      }, []),
    });
    return acc;
  }, []);
};

getAll();
