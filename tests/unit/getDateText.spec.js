import { getDateText } from "@/utils";

describe("getDateText()", () => {
  test("Returns correct formatted date from an ISO Date", () => {
    const mockDate = "2021-04-25T13:02:37.879Z";
    const expectedResult = "2021-04-25";

    const result = getDateText(mockDate);
    expect(result).toEqual(expectedResult);
  });
});
