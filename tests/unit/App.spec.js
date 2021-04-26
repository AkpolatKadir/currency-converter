import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import { findByTestAttr } from "@/utils/testUtils";
import App from "@/App";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("font-awesome-icon", FontAwesomeIcon);

const factory = (data = {}, store) => {
  return shallowMount(App, {
    data() {
      return { ...data };
    },
    localVue,
    store,
  });
};

describe("App", () => {
  let store;
  let getters;
  let actions;
  let mutations;
  let state;

  beforeEach(() => {
    state = {
      selectedDate: "",
      exchangeRates: {},
      currencies: [],
      isLoading: false,
      error: null,
    };

    getters = {
      getExchangeRate: function() {
        return jest.fn();
      },
    };

    actions = {
      fetchExchangeRates: jest.fn(),
    };

    mutations = {
      setSelectedDate: jest.fn(),
    };

    store = new Vuex.Store({
      mutations,
      state,
      actions,
      getters,
    });
  });

  it("Switch Icon click swaps currencies", async () => {
    const mockExchangeRate = 10;
    const mockGetExchangeRate = function() {
      return jest.fn().mockReturnValue(mockExchangeRate);
    };

    getters = {
      getExchangeRate: mockGetExchangeRate,
    };

    store = new Vuex.Store({
      mutations,
      state,
      actions,
      getters,
    });

    const mockSource = {
      amount: "10",
      currency: "TRY",
    };

    const mockTarget = {
      amount: "1",
      currency: "USD",
    };

    const wrapper = factory({}, store);
    await localVue.nextTick(); // Skip created() life cycle data change

    await wrapper.setData({ source: mockSource, target: mockTarget });

    const label = findByTestAttr(wrapper, "icon-switch");
    await label.trigger("click");
    const { source, target } = wrapper.vm.$data;

    expect(source).toEqual({
      amount: "10",
      currency: "USD",
    });
    expect(target).toEqual({
      amount: "100.000",
      currency: "TRY",
    });
  });

  it("Source amount change updates target amount", async () => {
    const mockExchangeRate = 1.2;
    const mockGetExchangeRate = function() {
      return jest.fn().mockReturnValue(mockExchangeRate);
    };

    getters = {
      getExchangeRate: mockGetExchangeRate,
    };

    store = new Vuex.Store({
      mutations,
      state,
      actions,
      getters,
    });

    const mockSource = {
      amount: "10",
      currency: "EUR",
    };

    const expectedResult = {
      amount: "12.000",
      currency: "USD",
    };

    const wrapper = factory({}, store);
    await localVue.nextTick(); // Skip created() life cycle data change

    await wrapper.setData({ source: mockSource });

    const { target } = wrapper.vm.$data;

    expect(target).toEqual(expectedResult);
  });

  it("Target amount change updates source amount if its focused", async () => {
    const mockExchangeRate = 2;
    const mockGetExchangeRate = function() {
      return jest.fn().mockReturnValue(mockExchangeRate);
    };

    getters = {
      getExchangeRate: mockGetExchangeRate,
    };

    store = new Vuex.Store({
      mutations,
      state,
      actions,
      getters,
    });

    const mockTarget = {
      amount: "10",
      currency: "USD",
    };

    const expectedResult = {
      amount: "5.000",
      currency: "EUR",
    };

    const wrapper = factory({}, store);
    await localVue.nextTick(); // Skip created() life cycle data change

    await wrapper.setData({ focusedInput: "target" });

    await wrapper.setData({ target: mockTarget });

    const { source } = wrapper.vm.$data;

    expect(source).toEqual(expectedResult);
  });

  it("Target amount change doesn't update source amount if its not focused", async () => {
    const mockExchangeRate = 2;
    const mockGetExchangeRate = function() {
      return jest.fn().mockReturnValue(mockExchangeRate);
    };

    getters = {
      getExchangeRate: mockGetExchangeRate,
    };

    store = new Vuex.Store({
      mutations,
      state,
      actions,
      getters,
    });

    const mockTarget = {
      amount: "10",
      currency: "USD",
    };

    const expectedResult = {
      amount: "1",
      currency: "EUR",
    };

    const wrapper = factory({}, store);
    await localVue.nextTick(); // Skip created() life cycle data change

    await wrapper.setData({ target: mockTarget });

    const { source } = wrapper.vm.$data;

    expect(source).toEqual(expectedResult);
  });
});
