import exchangeRates from "@/store/modules/exchangeRates";
const { getters, mutations } = exchangeRates;

describe("getters", () => {
  describe("getExchangeRate", () => {
    test("Returns correct exchange rate", () => {
      const expectedRate = 1.5;
      const initialState = {
        selectedDate: "2001-02-20",
        exchangeRates: {
          "2001-02-20": {
            EUR: {
              TRY: expectedRate,
            },
          },
        },
      };
      const source = "EUR";
      const target = "TRY";

      const result = getters.getExchangeRate(initialState)(source, target);

      expect(result).toEqual(expectedRate);
    });

    test("Returns 1 if date exists but target base could not be found", () => {
      const expectedRate = 1;

      const initialState = {
        selectedDate: "2001-02-20",
        exchangeRates: {
          "2001-02-20": {
            USD: {
              TRY: 1.5,
            },
          },
        },
      };
      const source = "EUR";
      const target = "TRY";

      const result = getters.getExchangeRate(initialState)(source, target);

      expect(result).toEqual(expectedRate);
    });

    test("Returns 1 if date doesn't exist", () => {
      const expectedRate = 1;

      const initialState = {
        selectedDate: "2001-02-20",
        exchangeRates: {
          "2005-07-12": {
            USD: {
              TRY: 1.5,
            },
          },
        },
      };
      const source = "USD";
      const target = "TRY";

      const result = getters.getExchangeRate(initialState)(source, target);

      expect(result).toEqual(expectedRate);
    });
  });
});

describe("mutations", () => {
  describe("setSelectedDate", () => {
    test("Sets selected date", () => {
      const state = {
        selectedDate: "2001-02-20",
        exchangeRates: {},
      };
      const selectedDate = "2015-04-12";

      mutations.setSelectedDate(state, selectedDate);

      expect(state.selectedDate).toEqual(selectedDate);
    });
  });

  describe("fetchExchangeRates", () => {
    test("on request", () => {
      const state = {
        isLoading: false,
        error: "Mock error",
      };

      mutations.fetchExchangeRatesRequest(state);

      expect(state).toEqual({
        isLoading: true,
        error: null,
      });
    });

    test("on success", () => {
      const state = {
        isLoading: true,
        error: "Mock error",
      };

      mutations.fetchExchangeRatesSuccess(state);

      expect(state).toEqual({
        isLoading: false,
        error: null,
      });
    });
    test("on failure", () => {
      const state = {
        isLoading: true,
        error: null,
      };

      const mockError = "Mock error";
      mutations.fetchExchangeRatesFailure(state, mockError);

      expect(state).toEqual({
        isLoading: false,
        error: mockError,
      });
    });
  });
});
