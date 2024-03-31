// export const createUserProfileImage = (name) => {
//   let result = "";
//   const arr = name?.split(" ");
//   result = result + arr[0].charAt(0).toUpperCase();
//   result = result + arr[1].charAt(0).toUpperCase();

//   return result;
// };

export const createUserProfileImage = (name) => {
  let result = "";

  if (typeof name === "string" && name.trim() !== "") {
    const arr = name.split(" ");

    if (arr.length >= 2) {
      result = result + arr[0].charAt(0).toUpperCase();
      result = result + arr[1].charAt(0).toUpperCase();
    } else if (arr.length === 1) {
      result = result + arr[0].charAt(0).toUpperCase();
    }
  }

  return result;
};
