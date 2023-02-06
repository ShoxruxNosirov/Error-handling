try {
    console.log('Start of try runs');
    console.log('End of try runs');
} catch (err) {
    console.log('Catch is ignored, because there are no errors'); // (3)
}

try {
    console.log('Start of try runs');
    lalala; // error, variable is not defined!
    console.log('End of try (never reached)');  // (2)
} catch (err) {
    console.log(`Error has occurred!`); // (3) <--
}

// try...catch not handles the error!
//   try {
//     setTimeout(function() {
//       noSuchVariable; // script will die here
//     }, 1000);
//   } catch (err) {
//     console.log( "won't work" );
//   }

setTimeout(function () {
    try {
        noSuchVariable; // try...catch handles the error!
    } catch {
        console.log("error is caught here!");
    }
}, 1000);

try {
    lalala; // error, variable is not defined!
} catch (err) {
    console.log(err.name);
    console.log(err.message);
    console.log(err.stack);
    console.log(err);
}

let json = "{ bad json }";
try {
    let user = JSON.parse(json);
    console.log(user.name);

} catch (err) {
    console.log(err.name);
    console.log(err.message);
}

json = '{ "age": 30 }';
try {
    let user = JSON.parse(json);
    console.log(user.name); // no name!
} catch (err) {
    console.log("doesn't execute");
}

let error = new Error("Things happen o_O");
console.log(error.name); // Error
console.log(error.message); // Things happen o_O

try {
    JSON.parse("{ bad json o_O }");
} catch (err) {
    console.log(err.name); // SyntaxError
    console.log(err.message); // Expected property name or '}' in JSON at position 2
}

json = '{ "age": 30 }'; // incomplete data
try {
    let user = JSON.parse(json); // <-- no errors
    if (!user.name) {
        throw new SyntaxError("Incomplete data: no name"); // (*)
    }
    console.log(user.name);
} catch (err) {
    console.log("JSON Error: " + err.message); // JSON Error: Incomplete data: no name
}

json = '{ "age": 30 }'; // incomplete data
try {
    user = JSON.parse(json); // <-- forgot to put "let" before user
} catch (err) {
    console.log("JSON Error: " + err); // JSON Error: ReferenceError: user is not defined
}

json = '{ "age": 30 }'; // incomplete data
try {
    let user = JSON.parse(json);
    if (!user.name) {
        throw new SyntaxError("Incomplete data: no name");
    }
    blabla(); // unexpected error
    console.log(user.name);
} catch (err) {
    if (err instanceof SyntaxError) {
        console.log("JSON Error: " + err.message);
    } else {
        throw err; // rethrow (*)
    }
}

function readData() {
    let json = '{ "age": 30 }';
    try {
        blabla(); // error!
    } catch (err) {
        if (!(err instanceof SyntaxError)) {
            throw err; // rethrow
        }
    }
}
try {
    readData();
} catch (err) {
    console.log("External catch got: " + err); // caught it!
}

try {
    console.log( 'try' );
    if (confirm('Make an error?')) BAD_CODE();
  } catch (err) {
    console.log( 'catch' );
  } finally {
    console.log( 'finally' );
  }

let num = 35; // +prompt("Enter a positive integer number?", 35)
let diff, result;
function fib(n) {
  if (n < 0 || Math.trunc(n) != n) {
    throw new Error("Must not be negative, and also an integer.");
  }
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}
let start = Date.now();
try {
  result = fib(num);
} catch (err) {
  result = 0;
} finally {
  diff = Date.now() - start;
}
console.log(result || "error occurred");
console.log( `execution took ${diff}ms` );

function func() {
    try {
      return 1;
    } catch (err) {
      /* ... */
    } finally {
      console.log( 'finally' );
    }
  }
  console.log( func() );

//   globalThis.onerror = function(message, url, line, col, error) {
//     console.log(`${message}\n At ${line}:${col} of ${url}`);
//   };
//   function readData() {
//     badFunc(); // Whoops, something went wrong!
//   }
//   readData();