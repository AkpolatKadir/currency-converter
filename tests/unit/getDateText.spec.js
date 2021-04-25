import { getDateText } from "@/utils";

describe("getDateText()", () => {
  test("Returns correct formatted date from an ISO Date", () => {
    const mockDate = new Date("2021-04-25");
    const expectedResult = "2021-04-25";

    const result = getDateText(mockDate);
    expect(result).toEqual(expectedResult);
  });
});
