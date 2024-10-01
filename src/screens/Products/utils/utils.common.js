export function disambiguateLabel(key, value) {
  switch (key) {
    case "moneySpent":
      return `Money spent is between ${value[0]} and ${value[1]}`;
    case "taggedWith":
      return `Tagged with ${value}`;
    case "accountStatus":
      return value.map((val) => `Account status: ${val}`).join(", ");
    default:
      return value;
  }
}

export function isEmpty(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else {
    return value === "" || value == null;
  }
}
export const status_product = {
  ACTIVE: "ACTIVE",
  NO_RULE: "NO_RULE",
};
