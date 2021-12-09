// Access to 2D array. If out of bounds it returns the defaultVal
export function saveAccess(input, x, y, defaultVal = null) {
    if (y < 0 || x < 0) {
        return defaultVal;
    }
    if (y >= input.length || x >= input[0].length) {
        return defaultVal;
    }
    return input[y][x];
}
