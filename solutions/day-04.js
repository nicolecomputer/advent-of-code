const fs = require("fs");
function parseId(str) {
  return str.split(/\s+/).reduce((obj, field) => {
    const [key, value] = field.split(":");
    return {
      ...obj,
      [key]: value,
    };
  }, {});
}

function validateFieldsPresent(passport) {
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  for (const requiredField of requiredFields) {
    if (!passport[requiredField]) {
      return false;
    }
  }
  return true;
}

function validateFieldIsPresent(passport, field) {
  return !!passport[field];
}

function validateNumericRange(passport, field, low, high) {
  if (!validateFieldIsPresent(passport, field)) {
    return false;
  }

  const num = parseInt(passport[field]);

  return num >= low && num <= high;
}

function validateBirthyear(passport) {
  return validateNumericRange(passport, "byr", 1920, 2002);
}

function validateIssueYear(passport) {
  return validateNumericRange(passport, "iyr", 2010, 2020);
}

function validateExpirationYear(passport) {
  return validateNumericRange(passport, "eyr", 2020, 2030);
}

function validateHeight(passport) {
  if (!validateFieldIsPresent(passport, "hgt")) {
    return false;
  }

  const heightField = passport["hgt"];
  const unit = heightField.slice(-2);
  const numeric = parseInt(heightField.slice(0, -2));

  switch (unit) {
    case "cm":
      return numeric >= 150 && numeric <= 193;
    case "in":
      return numeric >= 59 && numeric <= 76;
    default:
      return false;
  }
}

function validateHairColor(passport) {
  if (!validateFieldIsPresent(passport, "hcl")) {
    return false;
  }

  const hairColorStr = passport["hcl"];
  if (hairColorStr.length != 7) {
    return false;
  }

  if (hairColorStr[0] != "#") {
    return false;
  }

  const validChars = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  for (var i = 1; i < hairColorStr.length; i++) {
    if (!validChars.includes(hairColorStr[i])) {
      return false;
    }
  }

  return true;
}

function validateEyeColor(passport) {
  if (!validateFieldIsPresent(passport, "ecl")) {
    return false;
  }

  return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(
    passport["ecl"]
  );
}

function validatePassportId(passport) {
  if (isNaN(passport["pid"])) {
    return false;
  }
  if (passport["pid"].length != 9) {
    return false;
  }
  return true;
}

function validateCompletePassport(passport) {
  return [
    validateFieldsPresent,
    validateBirthyear,
    validateIssueYear,
    validateExpirationYear,
    validateHeight,
    validateHairColor,
    validateEyeColor,
    validatePassportId,
  ].reduce((valid, validatorFn) => {
    return valid && validatorFn(passport);
  }, true);
}

function countIfValid(validationFn) {
  return (count, passport) => {
    if (validationFn(passport)) {
      return count + 1;
    }

    return count;
  };
}

// const input = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
// byr:1937 iyr:2017 cid:147 hgt:183cm

// iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
// hcl:#cfa07d byr:1929

// hcl:#ae17e1 iyr:2013
// eyr:2024

// ecl:brn pid:760753108 byr:1931
// hgt:179cm

// hcl:#cfa07d eyr:2025 pid:166559648
// iyr:2011 ecl:brn hgt:59in`.trim();

const input = fs.readFileSync("./day-04-input.txt").toString().trim();
const validPassportCount = input
  .split("\n\n")
  .map(parseId)
  .reduce(countIfValid(validateCompletePassport), 0);

console.log(validPassportCount);
