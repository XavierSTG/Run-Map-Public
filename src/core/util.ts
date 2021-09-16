export default class Utils {
    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
}
