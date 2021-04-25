import { getSanitizedInputValue } from "@/utils";

describe("getSanitizedInputValue()", () => {
  test("Removes all chars from string", () => {
    const mockString = "123ab2c5";
    const expectedResult = "12325";

    const result = getSanitizedInputValue(mockString);
    expect(result).toEqual(expectedResult);
  });

  test("Converts comma to dot", () => {
    const mockString = "123,50";
    const expectedResult = "123.50";

    const result = getSanitizedInputValue(mockString);
    expect(result).toEqual(expectedResult);
  });

  test("Doesn't allow multiple decimals", () => {
    const mockString = "123.502.300";
    const expectedResult = "123.50";

    const result = getSanitizedInputValue(mockString);
    expect(result).toEqual(expectedResult);
  });
});
