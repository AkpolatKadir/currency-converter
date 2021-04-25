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
  describe("setExchangeRates", () => {
    let state;
    let mockBaseResponse;
    let mockRatesResponse;
    beforeEach(() => {
      state = {
        selectedDate: "2001-02-20",
        exchangeRates: {
          "2001-02-20": {
            EUR: {
              TRY: 1.5,
              USD: 1.2,
            },
          },
        },
      };

      mockBaseResponse = "USD";
      mockRatesResponse = {
        TRY: 6,
        EUR: 0.8,
      };
    });

    test("Sets exchange rates and preserves current data in same date", () => {
      const date = "2001-02-20";
      const exchangeRates = {
        base: mockBaseResponse,
        rates: {
          ...mockRatesResponse,
        },
      };

      mutations.setExchangeRates(state, { exchangeRates, date });

      expect(state.exchangeRates).toEqual({
        "2001-02-20": {
          EUR: {
            TRY: 1.5,
            USD: 1.2,
          },
          [mockBaseResponse]: {
            ...mockRatesResponse,
          },
        },
      });
    });

    test("Sets exchange rates under a new date", () => {
      const date = "2001-02-25";
      const exchangeRates = {
        base: mockBaseResponse,
        rates: {
          ...mockRatesResponse,
        },
      };

      mutations.setExchangeRates(state, { exchangeRates, date });

      expect(state.exchangeRates).toEqual({
        "2001-02-20": {
          EUR: {
            TRY: 1.5,
            USD: 1.2,
          },
        },
        [date]: {
          [mockBaseResponse]: {
            ...mockRatesResponse,
          },
        },
      });
    });
  });

  describe("setCurrencies", () => {
    test("Sorts and sets currencies", () => {
      const state = {
        currencies: [],
      };
      const mockCurrencies = ["USD", "AUD", "EUR"];
      const expectedResult = ["AUD", "EUR", "USD"];

      mutations.setCurrencies(state, mockCurrencies);

      expect(state.currencies).toEqual(expectedResult);
    });
  });

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
