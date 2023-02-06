class MyError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
    }
  }

class ValidationError extends MyError {
    
}

class PropertyRequiredError extends ValidationError {
    constructor(property) {
        super("No property: " + property);
        this.property = property;
    }
}
function readUser(json) {
    let user = JSON.parse(json);
    if (!user.age) {
        throw new PropertyRequiredError("age");
    }
    if (!user.name) {
        throw new PropertyRequiredError("name");
    }
    return user;
}
try {
    let user = readUser('{ "age": 25 }');
} catch (err) {
    if (err instanceof ValidationError) {
        console.log("Invalid data: " + err.message); // Invalid data: No property: name
        console.log(err.name); // PropertyRequiredError
        console.log(err.property); // name
    } else if (err instanceof SyntaxError) {
        console.log("JSON Syntax Error: " + err.message);
    } else {
        throw err; // unknown error, rethrow it
    }
}


console.log( new PropertyRequiredError("field").name ); // PropertyRequiredError