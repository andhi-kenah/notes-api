class Validator {
    static stringNotEmpty = (...strings) => {
        for (let string of strings) {
            string = string.trim();
            if (!string) {
                return false;
            }
        }
        return true;
    }
}

export default Validator;
