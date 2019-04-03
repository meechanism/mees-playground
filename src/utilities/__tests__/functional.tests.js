import { compose, reduce, map, filter } from "../functional";

describe("Tools utility", () => {
  describe("compose()", () => {
    const users = [
      { name: "Jane", age: 28 },
      { name: "Curry", age: 7 },
      { name: "George", age: 56 }
    ];

    it("should return a function", () => {
      expect(typeof compose).toBe("function");
    });

    it("should compose curried map and filter fns return result", () => {
      const getAdults = compose(
        map(u => u.name),
        filter(u => u.age >= 18)
      );
      expect(getAdults(users)).toEqual(["Jane", "George"]);
    });

    it("should compose multiple fns with our curried reduce fns", () => {
      const head = x => x[0];
      const reverse = reduce((acc, x) => [x].concat(acc), []);
      const last = compose(
        head,
        reverse
      );
      expect(last(["jumpkick", "roundhouse", "uppercut"])).toBe("uppercut");
    });
  });

  describe("reduce()", () => {
    it("should return a function", () => {
      expect(typeof reduce).toBe("function");
    });

    it("should reduce our list with provided fn", () => {
      const wordList = ["lollipop", "candy bar", "mints", "corn"];
      const reverse = reduce((acc, curr) => {
        return [curr].concat(acc);
      });
      expect(reverse(wordList)).toEqual([
        "corn",
        "mints",
        "candy bar",
        "lollipop"
      ]);
    });
  });

  describe("map()", () => {
    it("should return a function", () => {
      expect(typeof map).toBe("function");
    });

    it("should return all items as censored", () => {
      const bleep = "***";
      const wordList = ["very", "naught", "vulgar", "words"];
      const censored = map(() => bleep);
      const wordsThroughCensor = censored(wordList);
      wordsThroughCensor.forEach(word => {
        expect(word).toBe(bleep);
      });
    });
  });

  describe("filter()", () => {
    it("should return a function", () => {
      expect(typeof filter).toBe("function");
    });

    it("should return filtered list of items", () => {
      // Jane collects pea pods from her garden and  names them
      const peaPodCollection = [
        {
          id: "Billy",
          peas: 3
        },
        {
          id: "Janet",
          peas: 2
        },
        {
          id: "Greg",
          peas: 7
        }
      ];

      const littlePods = filter(pod => pod.peas < 3);
      expect(littlePods(peaPodCollection).length).toBe(1);
      expect(littlePods(peaPodCollection)[0].id).toBe("Janet");
    });
  });
});
