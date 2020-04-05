const someCommonValues = ['common', 'values'];

export const dateFormater = (date) => {
   //Do something with the input
   let dateSplit = [];
   dateSplit = date.split("/");
   let correctDate = dateSplit[1] + "/" + dateSplit[0] + "/" + dateSplit[2];
   return correctDate;
};

